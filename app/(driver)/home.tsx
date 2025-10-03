import { Menu } from "@/components/Menu";
import { Button } from "@/components/Button";
import QrCode from "../../assets/images/qrCode.png";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "react-native-paper";

export default function Home() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity
        style={[styles.containerAlert, { backgroundColor: colors.secondary }]}
      >
        <Feather name="alert-triangle" size={35} color="#fff" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.onSurface }]}>
          Bem-vindo à Home driver!
        </Text>
        <Image style={styles.image} source={QrCode} />
        <View style={styles.buttons}>
          <Button text="Ler QR Code" onPress={() => console.log("ler qrcode")} />
          <View style={{ height: 12 }} />
        </View>
      </View>

      <Menu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  containerAlert: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 15,
    borderRadius: 50,
    zIndex: 10,
  },
  buttons: {
    width: "100%",
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 24,
  },
});
