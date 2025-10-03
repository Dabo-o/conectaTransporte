import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useAuth } from "@/contexts/AuthContext";
import { FirebaseError } from "firebase/app";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useTheme } from "react-native-paper";

export default function Login() {
  const { login, loading } = useAuth(); // Pegamos o 'loading' do nosso contexto
  const { colors } = useTheme();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Por favor, preencha o e-mail e a senha.");
      return;
    }

    try {
      await login(email, password);
      // O redirecionamento é feito pelo _layout.tsx!
    } catch (err) {
      console.error("Erro no login:", err);
      if (err instanceof FirebaseError && (err.code === 'auth/invalid-credential' || err.code === 'auth/invalid-email')) {
        setError("E-mail ou senha inválidos.");
      } else {
        setError("Ocorreu um erro. Tente novamente.");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container_logo}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/icon-light.png")}
          />
          <Text style={[styles.title, { color: "#3EA382" }]}>CONECTA</Text>
          <Text style={[styles.title, { color: "#0B573E" }]}>TRANSPORTE</Text>
        </View>

        <View>
          <Text style={styles.subtitle}>Faça Login</Text>
        </View>

        <View style={styles.container_input}>
          <Input
            label="E-mail"
            onValueChange={setEmail}
            placeholder="seu@email.com"
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Senha"
            onValueChange={setPassword}
            placeholder="Senha"
            value={password}
            secureTextEntry
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {loading && <ActivityIndicator size="small" style={{ marginVertical: 10 }} />}

          <Text style={[styles.link, { color: colors.primary }]}>
            Esqueceu a senha? clique aqui
          </Text>

          <Button text="Entrar" onPress={handleLogin} disabled={loading} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Seus estilos permanecem os mesmos, mas adicione o errorText
const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContainer: { flexGrow: 1, marginTop: 50, padding: 30 },
    container_logo: { alignItems: "center", marginBottom: 30 },
    logo: { width: 166, height: 107, marginBottom: 15 },
    title: { fontSize: 22, fontWeight: "bold" },
    subtitle: { fontSize: 22, fontWeight: "500", textAlign: "center", marginBottom: 30 },
    container_input: { gap: 15, width: "100%", maxWidth: 400, alignSelf: 'center' },
    link: { textAlign: "right" },
    errorText: { color: 'red', textAlign: 'center', marginBottom: 10 },
});

