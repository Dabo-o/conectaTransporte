import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

// O componente RootLayoutNav é o nosso "guarda de trânsito".
// Ele vive dentro do AuthProvider, então tem acesso ao estado de login.
function RootLayoutNav() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Se ainda estamos a verificar o utilizador, não fazemos nada.
    if (loading) {
      return;
    }

    const inAuthGroup = segments[0] === "(auth)";

    // Se o utilizador NÃO está logado e NÃO está na área de login,
    // mandamo-lo para o login.
    if (!user && !inAuthGroup) {
      router.replace("/(auth)/login");
    } 
    // Se o utilizador ESTÁ logado e está na área de login,
    // mandamo-lo para a home correta.
    else if (user && inAuthGroup) {
      router.replace(user.tipo === 'student' ? "/(student)/home" : "/(driver)/home");
    }
  }, [user, loading, segments, router]); // O useEffect re-executa quando estes valores mudam.

  // Enquanto a verificação inicial está a decorrer, mostramos um ecrã de carregamento.
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Se a verificação terminou, renderizamos a rota atual.
  return <Slot />;
}

// Este é o layout raiz.
// A sua função é configurar os provedores de contexto.
export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RootLayoutNav />
      </ThemeProvider>
    </AuthProvider>
  );
}

