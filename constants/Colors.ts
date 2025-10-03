import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperLightTheme,
} from "react-native-paper";

const CustomLightTheme = {
  ...PaperLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    primary: "#18996F",
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
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary: "#A5D6A7",        
    secondary: "#2E7D32",
    tertiary: "#1D4F29",         
    background: "#3f3a41",
    surface: "#1e1e1e",
    onPrimary: "#000000",
    onSecondary: "#ffffff",
    text: "#ffffff",
    error: "#EF5350",            
  },
};
