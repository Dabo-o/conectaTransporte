import { Button } from "@/components/Button";
import { Menu } from "@/components/Menu";
import { router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function Scan() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Image
          source={require("../../assets/images/scan.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Button text="Ler o QrCode" onPress={() => router.push("/assentos")} />
      </View>
      <Menu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 24, 
  },
  image: {
    width: "80%",
    maxHeight: 300,
    marginBottom: 16,
  },
});
