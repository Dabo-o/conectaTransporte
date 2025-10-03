import { useState } from "react";
import { Modal, Text, StyleSheet, View, Pressable } from "react-native";
import { useTheme } from "react-native-paper";

export const ModalComponent = () => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const styles = StyleSheet.create({
    buttonOpen: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 20,
      paddingHorizontal: 100,
      alignItems: "center",
      marginTop: 8,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonClose: {
      backgroundColor: colors.secondary,
      paddingVertical: 10,
      paddingHorizontal: 40,
      borderRadius: 5,
      marginTop: 15,
    },
    textStyle: {
      color: colors.surface,
      textAlign: "center",
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
      paddingHorizontal: 30,
    },
    modalView: {
      backgroundColor: colors.primary,
      padding: 30,
      borderRadius: 10,
      alignItems: "center",
      gap: 15,
    },
    informationContainer: {
      width: "90%",
      flexDirection: "row",
      gap: 10,
      justifyContent: "space-between",
    },
    informationTextTitle: {
      fontWeight: "bold",
      color: colors.surface,
      fontSize: 18,
    },
    informationTextContent: {
      color: colors.surface,
      fontSize: 18,
    },
  });

  const Information = ({ title, content }: { title: string; content: string }) => (
    <View style={styles.informationContainer}>
      <Text style={styles.informationTextTitle}>{title}</Text>
      <Text style={styles.informationTextContent}>{content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.buttonOpen} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Consultar Informações</Text>
      </Pressable>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Information title="Destino" content="Unifavip" />
            <Information title="Código" content="KZ19-92A3" />
            <Information title="Motorista" content="Erivan" />
            <Information title="Quantidade" content="40 Assentos" />
            <Information title="Vagas" content="11 Disponíveis" />
            <Information title="Horário de Saída" content="17:45" />
            <Information
              title="Adicionais"
              content="Carregamento, Wi-Fi e Ar-Condicionado"
            />
            <Pressable style={styles.buttonClose} onPress={() => setModalVisible(false)}>
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
