import { View, Text, StyleSheet, Pressable, Switch } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "react-native-paper";
import { router } from "expo-router";
import { useState } from "react";
import { ThemedSwitch } from "@/components/ThemedSwitch";

export default function Account() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
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
        <Text style={styles.headerTitle}>Notificações</Text>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.outline }]} />
      <View style={styles.optionsList}>
        <View style={styles.optionContainer}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Sons de notificações</Text>
            <Text style={styles.optionDescription}>
              Reproduzir sons ao receber notificações
            </Text>
          </View>
          <ThemedSwitch value={isEnabled} onToggle={toggleSwitch} />
        </View>
        <View style={styles.optionContainer}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Lembretes</Text>
            <Text style={styles.optionDescription}>
              Receba lemnbretes de atualizações <br/> que você ainda não viu
            </Text>
          </View>
          <ThemedSwitch value={isEnabled} onToggle={toggleSwitch} />
        </View>
      </View>
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
    justifyContent: "space-between",
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
