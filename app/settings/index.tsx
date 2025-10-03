import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export default function SettingsScreen() {
  const { colors } = useTheme();

  interface SettingsOptionProps {
    icon: string;
    title: string;
    description: string;
    path: string;
  }

  const SettingsOption = ({
    icon,
    title,
    description,
    path,
  }: SettingsOptionProps) => {
    return (
      <Pressable
        onPress={() => router.push(path)}
        style={styles.optionContainer}
      >
        <Ionicons name={icon} size={22} color={colors.onSurface} />
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionTitle}>{title}</Text>
          <Text style={styles.optionDescription}>{description}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Ionicons name="arrow-back" size={22} color={colors.onSurface} onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.outline }]} />
      <View style={styles.optionsList}>
        <SettingsOption
          icon="key-outline"
          title="Conta"
          description="Alterações de dados pessoais, renovação de matrícula"
          path="/settings/account"
        />
        <SettingsOption
          icon="notifications-outline"
          title="Notificações"
          description="Mensagens"
          path="/settings/notifications"
        />
        <SettingsOption
          icon="accessibility-outline"
          title="Acessibilidade"
          description="Aumentar o contraste"
          path="/settings/accessbility"
        />
        <SettingsOption
          icon="help-circle-outline"
          title="Ajuda"
          description="Central de ajuda, fale conosco, Política de Privacidade"
          path="/settings/help"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingVertical: 16
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
