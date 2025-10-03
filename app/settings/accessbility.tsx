import { View, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "react-native-paper";
import { router } from "expo-router";

export default function Account() { 
  const { colors } = useTheme();
  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Ionicons
          name="arrow-back"
          size={22}
          color={colors.onSurface}
          onPress={() => router.back()}
        />
        <Text style={styles.headerTitle}>Acessibilidade</Text>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.outline }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    width: "100%",
    marginBottom: 12,
  },
  optionsList: {
    gap: 12,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  optionTextContainer: {
    flexDirection: "column",
    gap: 2,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  optionDescription: {
    fontSize: 15,
    color: "#666",
  },
});
