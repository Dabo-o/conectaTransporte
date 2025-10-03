import { Menu } from "@/components/Menu";
import { Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "react-native-paper";

export default function Alert() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Feather name="alert-triangle" size={40} color={colors.secondary} />
        <Text style={[styles.headerText, { color: colors.primary }]}>
          Alertas recentes
        </Text>
      </View>

      <View style={styles.messages}>
        <Message person="Deyvid" comment="Horrível" theme={colors} />
        <Message person="Davi" comment="Péssimo" theme={colors} />
        <Message person="Maria" comment="Falta organização" theme={colors} />
      </View>

      <Menu />
    </View>
  );
}

const Message = ({
  person,
  comment,
  theme,
}: {
  person: string;
  comment: string;
  theme: any;
}) => (
  <View
    style={[
      styles.messageContainer,
      { backgroundColor: theme.tertiary, shadowColor: "#000" },
    ]}
  >
    <View style={[styles.avatar, { backgroundColor: theme.secondary }]}>
      <Ionicons name="person" size={24} color="#fff" />
    </View>
    <View style={styles.commentBox}>
      <Text style={[styles.personName, { color: theme.primary }]}>
        {person}
      </Text>
      <Text style={[styles.commentText, { color: theme.text }]}>{comment}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },
  messages: {
    flex: 1,
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
