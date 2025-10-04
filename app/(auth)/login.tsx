// Login.tsx
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
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";

export default function Login() {
  const { login, loading } = useAuth();
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
    } catch (err) {
      console.error("Erro no login:", err);
      if (
        err instanceof FirebaseError &&
        (err.code === "auth/invalid-credential" ||
          err.code === "auth/invalid-email")
      ) {
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

        <Text style={styles.subtitle}>Acesse sua conta</Text>
        <View style={styles.container_input}>
          <Input
            label="E-mail"
            onValueChange={setEmail}
            placeholder="seu@email.com"
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            error={!!error}
          />

          <Input
            label="Senha"
            onValueChange={setPassword}
            placeholder="Senha"
            value={password}
            secureTextEntry
            error={!!error}
          />

          {error ? (
            <Text style={[styles.errorText, { color: colors.error }]}>
              {error}
            </Text>
          ) : null}

          {loading && (
            <ActivityIndicator size="small" style={{ marginVertical: 10 }} />
          )}

          <TouchableOpacity
            style={[styles.forgotWrapper, { marginTop: -12 }]}
            onPress={() => console.log("Esqueceu a senha")}
          >
            <Text style={[styles.forgotText, { color: colors.primary }]}>
              Esqueceu a senha? clique aqui
            </Text>
          </TouchableOpacity>

          <View style={{ marginTop: 20 }}>
            <Button text="Entrar" onPress={handleLogin} disabled={loading} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 30,
    marginTop: 60,
  },
  container_logo: {
    alignItems: "center",
    marginBottom: 45,
  },
  logo: {
    width: 166,
    height: 107,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 45,
  },
  container_input: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  forgotWrapper: {
    alignSelf: "flex-end",
  },
  forgotText: {
    fontWeight: "400",
  },
  errorText: {
    textAlign: "left",
    marginTop: -12,
    marginBottom: 20,
  },
});
