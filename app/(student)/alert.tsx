import { Menu } from "@/components/Menu";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/config";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useTheme } from "react-native-paper";

// Definimos o "molde" de uma mensagem
export type Message = {
  id: string;
  texto: string;
  autorNome: string;
  timestamp: any; // O timestamp do Firebase será convertido
};

export default function AlertStudent() {
  const { colors } = useTheme();
  const { user, loading: authLoading } = useAuth();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Se não soubermos a faculdade do aluno, não fazemos nada.
    if (!user?.faculdade) {
      setLoading(false);
      return;
    }

    // O caminho para a subcoleção de mensagens da faculdade do aluno
    const messagesPath = `canais_de_aviso/${user.faculdade}/mensagens`;
    const messagesRef = collection(db, messagesPath);
    // Criamos uma consulta para ordenar as mensagens pela mais recente primeiro
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
  }, [user?.faculdade]); // O efeito depende da faculdade do aluno

  if (authLoading || loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Feather name="alert-triangle" size={40} color={colors.secondary} />
        <Text style={[styles.headerText, { color: colors.primary }]}>
          Alertas Recentes
        </Text>
      </View>
      
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageItem person={item.autorNome} comment={item.texto} />}
        contentContainerStyle={styles.messages}
        ListEmptyComponent={<Text style={{textAlign: 'center', color: colors.onSurface}}>Nenhum aviso por enquanto.</Text>}
      />
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
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingTop: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },
  messages: {
    flexGrow: 1,
    gap: 16,
    paddingHorizontal: 30,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 12,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  commentBox: {
    flex: 1,
  },
  personName: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
  },
});
