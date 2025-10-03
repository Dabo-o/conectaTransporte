import { Menu } from "@/components/Menu";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function Home() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity
        style={styles.containerAlert}
        onPress={() => console.log("Alerta pressionado")}
        accessibilityRole="button"
        accessibilityLabel="Abrir alertas"
        activeOpacity={0.7}
      >
        <Feather name="alert-triangle" size={35} color={colors.primary} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.container_logo}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/icon-light.png")}
          />
          <Text style={[styles.title, { color: colors.primary }]}>CONECTA</Text>
          <Text style={[styles.title, { color: colors.onSurface }]}>TRANSPORTE</Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => router.push("/scan")}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Ler QR Code"
          >
            <Text style={[styles.text, { color: colors.background }]}>
              Ler o QR Code
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.secondary,
              },
            ]}
            onPress={() => router.push("/home")}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Gerar QR Code"
          >
            <Text style={[styles.text, { color: colors.secondary }]}>
              Gerar o QR Code
            </Text>
          </TouchableOpacity>
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
    zIndex: 10,
  },
  container_logo: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 166,
    height: 107,
    marginBottom: 15,
    resizeMode: "contain",
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  buttons: {
    gap: 20,
    width: "100%",
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
