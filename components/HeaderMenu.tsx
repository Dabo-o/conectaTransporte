import { useAuth } from "@/contexts/AuthContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Menu, IconButton } from "react-native-paper";

export const HeaderMenu = () => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingRight: 10,
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<IconButton icon="menu" size={28} onPress={openMenu} style={{color: "#000"}} />}
      >
        <Menu.Item
          onPress={() => {
            router.push("/settings")
            closeMenu();
          }}
          title="Configuração"
        />
        <Menu.Item
          onPress={() => {
            toggleTheme();
            closeMenu();
          }}
          title={`Modo ${isDark ? "claro" : "escuro"}`}
        />
        <Menu.Item
          onPress={() => {
            logout();
            closeMenu();
          }}
          title="Sair"
        />
      </Menu>
    </View>
  );
};
