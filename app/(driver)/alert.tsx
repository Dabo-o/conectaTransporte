import { Menu } from "@/components/Menu";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/config";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useTheme } from "react-native-paper";

// Assumimos que a tela do aluno exporta o tipo Message
type Message = {
  id: string;
  texto: string;
  autorNome: string;
  timestamp: any;
};

// Lista de canais disponíveis para o motorista (pode vir do Firestore no futuro)
const CHANNELS = ["Unifavip Wyden", "Asces Unita", "Uninassau", "Grau Técnico", "Unip", "Ufpe", "Centro"];

export default function AlertDriver() {
  const { colors } = useTheme();
  const { user, loading: authLoading } = useAuth();
  
  const [selectedChannel, setSelectedChannel] = useState<string | null>(CHANNELS[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Efeito para buscar as mensagens do canal selecionado
  useEffect(() => {
    if (!selectedChannel) return;

    setLoading(true);
    const messagesPath = `canais_de_aviso/${selectedChannel}/mensagens`;
    const messagesRef = collection(db, messagesPath);
    const q = query(messagesRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages: Message[] = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(fetchedMessages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [selectedChannel]); // Este efeito re-executa sempre que o canal muda

  // Função para enviar uma nova mensagem
  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !selectedChannel || !user) return;
    
    const messagesPath = `canais_de_aviso/${selectedChannel}/mensagens`;
    await addDoc(collection(db, messagesPath), {
      texto: newMessage,
      autorNome: user.nome,
      autorId: user.uid, // Supondo que adicionamos o uid ao UserProfile
      timestamp: serverTimestamp(), // O Firebase coloca a data/hora do servidor
    });

    setNewMessage(""); // Limpa a caixa de texto
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Feather name="alert-triangle" size={40} color={colors.secondary} />
        <Text style={[styles.headerText, { color: colors.primary }]}>
          Enviar Alerta
        </Text>
      </View>

      {/* Seletor de Canais */}
      <View style={styles.channelSelector}>
        {CHANNELS.map(channel => (
          <TouchableOpacity 
            key={channel} 
            style={[styles.channelButton, selectedChannel === channel && {backgroundColor: colors.primary}]}
            onPress={() => setSelectedChannel(channel)}
          >
            <Text style={[styles.channelText, selectedChannel === channel && {color: '#fff'}]}>{channel}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Lista de Mensagens */}
      {loading ? <ActivityIndicator size="large"/> : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageItem person={item.autorNome} comment={item.texto} />}
          contentContainerStyle={styles.messages}
          inverted // Faz o chat começar de baixo para cima
        />
      )}

      {/* Caixa de Envio */}
      <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, {borderColor: colors.primary, color: colors.onSurface}]}
            placeholder="Digite seu aviso..."
            value={newMessage}
            onChangeText={setNewMessage}
            placeholderTextColor={colors.onSurfaceVariant}
          />
          <TouchableOpacity style={[styles.sendButton, {backgroundColor: colors.primary}]} onPress={handleSendMessage}>
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
      </View>
      <Menu />
    </SafeAreaView>
  );
}

// Componente de UI reutilizável para mostrar uma mensagem
const MessageItem = ({ person, comment }: { person: string, comment: string }) => {
    const { colors } = useTheme();
    return (
        <View style={[styles.messageContainer, { backgroundColor: colors.elevation.level1, shadowColor: "#000" }]}>
            <View style={[styles.avatar, { backgroundColor: colors.secondary }]}>
                <Ionicons name="person" size={24} color="#fff" />
            </View>
            <View style={styles.commentBox}>
                <Text style={[styles.personName, { color: colors.primary }]}>{person}</Text>
                <Text style={[styles.commentText, { color: colors.onSurface }]}>{comment}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: "center", paddingTop: 20, marginBottom: 10 },
  headerText: { fontSize: 20, fontWeight: "bold", marginTop: 8 },
  channelSelector: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginBottom: 20},
  channelButton: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: '#ccc' },
  channelText: { fontWeight: '600' },
  messages: { flexGrow: 1, gap: 16, paddingHorizontal: 30, paddingBottom: 10 },
  messageContainer: { flexDirection: "row", alignItems: "center", borderRadius: 10, padding: 12, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  avatar: { width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center", marginRight: 12 },
  commentBox: { flex: 1 },
  personName: { fontWeight: "bold", fontSize: 14, marginBottom: 4 },
  commentText: { fontSize: 14 },
  inputContainer: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderTopColor: '#eee'},
  input: { flex: 1, borderWidth: 1, borderRadius: 20, paddingHorizontal: 15, paddingVertical: 8, marginRight: 10 },
  sendButton: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' }
});
