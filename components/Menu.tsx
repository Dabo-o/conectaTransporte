import { Pressable, StyleSheet, View, Text, Image } from "react-native";
import { router, usePathname } from "expo-router";
import { useTheme } from "react-native-paper";

const icons = {
  home: require("../assets/images/home.png"),
  alert: require("../assets/images/alert.png"),
  chat: require("../assets/images/chat.png"),
  user: require("../assets/images/user.png"),
};

const navItems = [
  { label: "Alerta", icon: "alert", path: "/alert" },
  { label: "Home", icon: "home", path: "/home" },
  { label: "Chat", icon: "chat", path: "/chat" },
  { label: "Perfil", icon: "user", path: "/profile" },
];

export const Menu = () => {
  const { colors } = useTheme();
  const pathname = usePathname();

  return (
    <View style={[styles.navBar, { backgroundColor: colors.surface }]}>
      {navItems.map((item) => (
        <NavItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          onPress={() => router.push(item.path)}
          isActive={pathname.startsWith(item.path)}
        />
      ))}
    </View>
  );
};

const NavItem = ({
  icon,
  label,
  onPress,
  isActive,
}: {
  icon: keyof typeof icons;
  label: string;
  onPress: () => void;
  isActive: boolean;
}) => {
  const { colors } = useTheme();
  const activeColor = isActive ? "#18996F" : colors.onSurface;

  return (
    <Pressable
      style={({ pressed }) => [styles.navButton, pressed && { opacity: 0.5 }]}
      onPress={onPress}
      android_ripple={{ color: colors.primary, borderless: true }}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Image
        style={[styles.icon, { tintColor: activeColor }]}
        source={icons[icon]}
      />
      <Text style={[styles.navText, { color: activeColor }]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#18996F",
  },
  navButton: {
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
});
