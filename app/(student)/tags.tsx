import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/config";
import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { width } = Dimensions.get("window");

// 1. Definimos as nossas tags e as suas cores num só sítio para ser fácil de configurar
const TAGS_CONFIG = [
  { name: "Em aula", color: "#FF0000" },
  { name: "Aguardando", color: "#FFD700" },
  { name: "No ônibus", color: "#058B03" },
];
type TagName = "Em aula" | "Aguardando" | "No ônibus";

export default function Tag() {
  const { user, firebaseUser, loading: authLoading } = useAuth();

  // 2. Criamos um estado para guardar as contagens de cada tag
  const [tagCounts, setTagCounts] = useState<Record<TagName, number>>({
    "Em aula": 0,
    "Aguardando": 0,
    "No ônibus": 0,
  });
  const [loading, setLoading] = useState(true);

  // 3. Este useEffect é o cérebro da contagem em tempo real
  useEffect(() => {
    // Se não soubermos quem é o utilizador ou em que autocarro ele está, não fazemos nada.
    if (!user?.onibusAtual) {
      setLoading(false);
      return;
    }

    // Criamos uma consulta que busca TODOS os utilizadores...
    const usersCollectionRef = collection(db, "usuarios");
    // ...mas filtramos para pegar apenas os que estão no MESMO autocarro que o nosso utilizador atual.
    const q = query(usersCollectionRef, where("onibusAtual", "==", user.onibusAtual));

    // O onSnapshot "ouve" esta consulta em tempo real
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // Sempre que algo muda, recalculamos do zero
      const counts: Record<TagName, number> = { "Em aula": 0, "Aguardando": 0, "No ônibus": 0 };
      
      querySnapshot.forEach((doc) => {
        const student = doc.data();
        if (student.statusTag && counts.hasOwnProperty(student.statusTag)) {
          counts[student.statusTag as TagName]++;
        }
      });
      
      setTagCounts(counts); // Atualizamos o estado com as novas contagens
      setLoading(false);
    });

    return () => unsubscribe(); // Limpamos a escuta quando o ecrã é fechado
  }, [user?.onibusAtual]); // Este efeito depende do autocarro em que o utilizador está

  // 4. Esta função atualiza a tag do PRÓPRIO utilizador
  const handleUpdateMyTag = async (newTag: TagName) => {
    if (!firebaseUser) return;
    try {
      const userDocRef = doc(db, "usuarios", firebaseUser.uid);
      await updateDoc(userDocRef, {
        statusTag: newTag,
      });
    } catch (error) {
      console.error("Erro ao atualizar a tag:", error);
    }
  };

  if (authLoading || loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (!user?.onibusAtual) {
    return (
      <SafeAreaView style={styles.container}>
         <View style={styles.main}>
            <Text style={styles.title}>Faça o check-in no seu autocarro para ver o status dos passageiros!</Text>
         </View>
      </SafeAreaView>
    )
  }

  // 5. O componente de visualização agora é um botão clicável
  const InformationTagButton = ({
    quantity,
    tag,
    color,
    onPress,
  }: {
    quantity: number;
    tag: TagName;
    color: string;
    onPress: () => void;
  }) => {
    return (
      <TouchableOpacity style={styles.tag} onPress={onPress} activeOpacity={0.7}>
        <View style={[styles.tagBox, styles.quantityBox, { backgroundColor: color }]}>
          <Text style={styles.quantityText}>{quantity}</Text>
        </View>
        <View style={[styles.tagBox, { backgroundColor: color, flex: 1 }]}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Status dos Passageiros</Text>

        <View style={styles.containerImage}>
          <Image
            source={require("../../assets/images/Bus_Icon.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.titleTime}>22:02</Text>
        </View>

        {/* 6. Renderizamos os botões dinamicamente a partir da nossa configuração */}
        <View style={styles.containerTags}>
          {TAGS_CONFIG.map(({ name, color }) => (
            <InformationTagButton
              key={name}
              quantity={tagCounts[name as TagName]}
              tag={name as TagName}
              color={color}
              onPress={() => handleUpdateMyTag(name as TagName)}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  main: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 28,
  },
  image: {
    width: width * 0.55,
    height: width * 0.45,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    color: "#222",
  },
  containerImage: {
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  titleTime: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1C1C1C",
    letterSpacing: 1,
  },
  containerTags: {
    flexDirection: "column",
    width: "100%",
    gap: 14,
    paddingHorizontal: 12,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  tagBox: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  quantityBox: {
    minWidth: 55,
    borderRadius: 50,
  },
  quantityText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
  },
  tagText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
});
