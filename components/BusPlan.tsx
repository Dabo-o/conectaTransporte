import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { Button } from './Button';

const BUS_ID = "ABC1D23"; 

type Seat = {
  id: string;
  status: 'livre' | 'ocupado';  
  ocupadoPor: string | null;
};

type ModalInfo = {
  visible: boolean;
  title: string;
  message: string;
}

const BUS_BACKGROUND_IMAGE = require('../assets/images/bus_layout.png');

export const BusPlan = () => {

  const { colors } = useTheme();
  const { user, firebaseUser } = useAuth();

  const [seats, setSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({ visible: false, title: '', message: '' });

  useEffect(() => {
    if (!BUS_ID) {
      console.error("--- [BusPlan] ERRO FATAL: BUS_ID não está definido! ---");
      setLoading(false);
      return;
    }
    
    const seatsCollectionPath = `onibus/${BUS_ID}/assentos`;
    const seatsCollectionRef = collection(db, seatsCollectionPath);
    
    const unsubscribe = onSnapshot(seatsCollectionRef, 
      (querySnapshot) => {    
        const seatsData: Seat[] = [];
        querySnapshot.forEach((doc) => {
          seatsData.push({ id: doc.id, ...doc.data() } as Seat);
        });
        
        seatsData.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
        setSeats(seatsData);
        setLoading(false); // <--- O ponto crucial
      }, 
      (error) => {
        console.error(error);
        setLoading(false);
        setModalInfo({ visible: true, title: "Erro de Conexão", message: "Não foi possível carregar os assentos." });
      }
    );
    
    return () => {
      unsubscribe();
    };
  }, []); // O useEffect roda apenas uma vez

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }
  
  if (!user) {
    return <Text style={{color: 'red'}}>Erro: Utilizador não autenticado!</Text>;
  }

  // A partir daqui, o resto do seu código permanece o mesmo.
  // ... handleSeatPress, return com o ImageBackground, etc. ...
const handleSeatPress = async (seat: Seat) => {
  console.log("➡️ Clique detectado no assento:", seat);

  if (!user || !firebaseUser) {
    console.warn("⚠️ Usuário não autenticado");
    setModalInfo({ visible: true, title: "Erro", message: "Usuário não autenticado." });
    return;
  }

  const currentUserId = firebaseUser.uid;
  const currentUserType = user.tipo;

  console.log("👤 Usuário:", currentUserId, " | Tipo:", currentUserType);

  try {
    if (currentUserType === "student") {
      const mySeat = seats.find((s) => s.ocupadoPor === currentUserId);
      console.log("🔎 Meu assento atual:", mySeat);

      if (mySeat && mySeat.id === seat.id) {
        console.log("♻️ Desocupando assento:", seat.id);
        const seatRef = doc(db, `onibus/${BUS_ID}/assentos`, seat.id);
        await updateDoc(seatRef, { status: "livre", ocupadoPor: null });
        return;
      }

      if (mySeat && mySeat.id !== seat.id) {
        console.log("🚫 Tentou escolher outro assento sem liberar o atual");
        setModalInfo({
          visible: true,
          title: "Ação inválida",
          message: "Você já selecionou um assento. Desmarque o seu para escolher outro.",
        });
        return;
      }

      if (seat.status === "ocupado") {
        console.log("🚫 Assento já ocupado por:", seat.ocupadoPor);
        setModalInfo({
          visible: true,
          title: "Assento Ocupado",
          message: "Este assento já foi selecionado por outro aluno.",
        });
        return;
      }

      try {
        const seatRef = doc(db, `onibus/${BUS_ID}/assentos`, seat.id);
        await updateDoc(seatRef, { status: "ocupado", ocupadoPor: currentUserId });
        console.log("🟢 Sucesso ao reservar!");
      } catch (err: any) {
        console.error("❌ Erro no updateDoc:", err.code, err.message);
        setModalInfo({
          visible: true,
          title: "Erro Firestore",
          message: `Não foi possível atualizar o assento. Motivo: ${err.message}`,
  });
}

    }

    if (currentUserType === "driver") {
      console.log("🚌 Motorista clicou no assento:", seat.id);
      if (seat.status === "ocupado" && seat.ocupadoPor) {
        setModalInfo({
          visible: true,
          title: "Informação do Aluno",
          message: `Assento ocupado atualmente pelo usuário com ID: ${seat.ocupadoPor}`,
        });
      } else {
        console.log("ℹ️ Motorista clicou em assento livre (não faz nada)");
      }
    }
  } catch (err) {
    console.error("❌ Erro ao atualizar assento:", err);
    setModalInfo({
      visible: true,
      title: "Erro",
      message: "Falha ao reservar ou atualizar o assento.",
    });
  }
};


  if (loading || !user) { // Adicionado '!user' para segurança
    return <ActivityIndicator size="large" style={styles.loading} />;
  }

  return (
    <ImageBackground 
      source={BUS_BACKGROUND_IMAGE} 
      style={styles.imageBackground} 
      resizeMode="contain"
    >
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalInfo.visible}
        onRequestClose={() => setModalInfo({ ...modalInfo, visible: false })}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.onSurface }]}>{modalInfo.title}</Text>
            <Text style={[styles.modalMessage, { color: colors.onSurfaceVariant }]}>{modalInfo.message}</Text>
            <Button
              text="OK"
              onPress={() => setModalInfo({ ...modalInfo, visible: false })}
            />
          </View>
        </View>
      </Modal>
      
      <FlatList
        data={seats}
        renderItem={({ item, index }) => { 
          const isSecondColumn = index % 4 === 1;

          let backgroundColor = "#008000"; 
          let textColor = "#fff"; 
          let borderColor = "gray"; 

          if (item.status === 'ocupado') {
            // 4. Todas as referências a FAKE_USER_ID são trocadas pelo ID real.
            if (item.ocupadoPor === firebaseUser?.uid) {
              backgroundColor = "#2196f3"; // Azul
              textColor = '#fff';
              borderColor = "#2196f3";
            } else {
              backgroundColor = colors.error; // Vermelho
              textColor = colors.onError;
              borderColor = colors.error;   
            }
          }

          return (
            <TouchableOpacity
              style={[
                styles.seat, 
                { backgroundColor, borderColor },
                isSecondColumn && styles.corridorMargin 
              ]}
              onPress={() => handleSeatPress(item)}
              // 5. A lógica para desabilitar o botão também usa o tipo de usuário real.
              disabled={user.tipo === 'driver' && item.status === 'livre'}
            >
              <Text style={[styles.seatText, { color: textColor }]}>{item.id}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
        numColumns={4}
        contentContainerStyle={styles.grid}
      />
    </ImageBackground>
  );
};

// Os estilos (styles) permanecem exatamente os mesmos.
const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imageBackground: {
    width: '100%',
    height: '110%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    position: 'absolute',
    top: 30,
  },
  grid: {
    paddingTop: 160,
    justifyContent: 'center', 
  },
  seat: { 
    width: 52, 
    height: 52, 
    margin: 2, 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 2, 
  },
  seatText: { fontSize: 16, fontWeight: '500' },
  corridorMargin: {
    marginRight: 48, 
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});
