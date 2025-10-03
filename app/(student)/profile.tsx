import { HeaderMenu } from "@/components/HeaderMenu";
import { Menu } from "@/components/Menu";
import { useAuth } from "@/contexts/AuthContext"; // 1. Importamos o useAuth
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function Profile() {
  const { colors } = useTheme();
  const { user, loading } = useAuth(); // 2. Obtemos o utilizador e o estado de carregamento

  // 3. Enquanto os dados do utilizador estão a ser carregados, mostramos um spinner
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 4. Se o carregamento terminou mas não há utilizador, mostramos uma mensagem de erro
  if (!user) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: colors.error }}>Erro: Não foi possível carregar os dados do perfil.</Text>
      </View>
    );
  }

  // 5. Se temos os dados do utilizador, renderizamos a tela com as informações reais
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderMenu />

      <View style={styles.header}>
        <Ionicons
          name="person-circle-outline"
          size={150}
          color={colors.primary}
        />
        {/* Usamos o nome real do utilizador, com um fallback */}
        <Text style={[styles.title, { color: colors.onSurface }]}>
          {user.nome?.toUpperCase() ?? 'NOME NÃO ENCONTRADO'}
        </Text>
      </View>

      <View style={styles.infoWrapper}>
        {/* Cada campo agora usa os dados do objeto 'user', com '??' para o caso de o dado não existir */}
        <Information category="CPF" information={user.cpf ?? "Não informado"} />
        <Information category="Telefone" information={user.telefone ?? "Não informado"} />
        
        {/* Mostramos informações específicas dependendo do tipo de utilizador */}
        {user.tipo === 'student' && (
          <>
            <Information
              category="Instituição de Ensino"
              information={user.faculdade ?? "Não informada"}
            />
            <View style={styles.row}>
              <Information
                category="Período"
                information={user.periodo ?? "N/A"}
                style={{ flex: 1 }}
              />
              <Information
                category="Turno"
                information={user.turno ?? "N/A"}
                style={{ flex: 1 }}
              />
            </View>
            <Information category="Dias da semana" information={user.diasSemana ?? "Não informado"} />
          </>
        )}

        {/* Aqui pode adicionar a lógica para o perfil do motorista */}
        {user.tipo === 'driver' && (
           <Information category="CNH" information={user.cnh ?? "Não informada"} />
        )}

      </View>

      <Menu />
    </SafeAreaView>
  );
}

// O componente Information permanece exatamente o mesmo
function Information({
  category,
  information,
  style,
}: {
  category: string;
  information: string;
  style?: object;
}) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.informationContainer,
        { backgroundColor: colors.elevation.level1 },
        style,
      ]}
      accessibilityLabel={`${category}: ${information}`}
    >
      <Text style={[styles.category, { color: colors.primary }]}>
        {category}
      </Text>
      <Text
        style={[
          styles.text,
          { color: colors.onSurface, borderColor: colors.secondary },
        ]}
      >
        {information}
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 16, // Adicionado para evitar que nomes grandes quebrem o layout
  },
  infoWrapper: {
    gap: 12, // Adicionado um 'gap' para espaçamento
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12, // Adicionado um 'gap' para espaçamento
  },
  informationContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 4,
  },
  category: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    padding: 8,
    borderWidth: 1.5,
    borderRadius: 8,
  },
});
