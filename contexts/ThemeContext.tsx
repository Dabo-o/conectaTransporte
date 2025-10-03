import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

type ThemeContextData = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeContext must be used within ThemeProvider");
  return context;
};

const CustomLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#1D4F29",
    secondary: "#2E7D32",
    tertiary: "#A5D6A7",
    background: "#F5F5F5",
    surface: "#ffffff",
    onPrimary: "#ffffff",
    onSecondary: "#ffffff",
    text: "#333333",
    error: "#C62828",
  },
};

const CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#A5D6A7",
    secondary: "#2E7D32",
    tertiary: "#1D4F29",
    background: "#121212",
    surface: "#1e1e1e",
    onPrimary: "#000000",
    onSecondary: "#ffffff",
    text: "#ffffff",
    error: "#EF5350",
  },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const deviceScheme = useColorScheme();
  const [isDark, setIsDark] = useState(deviceScheme === "light");

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = useMemo(() => (isDark ? CustomDarkTheme : CustomLightTheme), [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};
