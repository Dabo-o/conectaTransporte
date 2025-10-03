import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "react-native-paper";
import { HeaderMenu } from "@/components/HeaderMenu";
import { Menu } from "@/components/Menu";

export default function Profile() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderMenu />

      <View style={styles.header}>
        <Ionicons
          name="person-circle-outline"
          size={150}
          color={colors.primary}
        />
        <Text style={[styles.title, { color: colors.onSurface }]}>
          DEYVID GUSTAVO CORREIA DE SOUSA
        </Text>
      </View>

      <View style={styles.infoWrapper}>
        <Information category="CPF" information="123.456.678-90" />
        <Information category="Telefone" information="4002-8922" />
        <Information
          category="Instituição de Ensino"
          information="Unifavip Wyden"
        />

        <View style={styles.row}>
          <Information
            category="Período"
            information="3º Período"
            style={{ flex: 1 }}
          />
          <Information
            category="Turno"
            information="Noite"
            style={{ flex: 1 }}
          />
        </View>

        <Information category="Dias da semana" information="Segunda à Sexta" />
      </View>

      <Menu />
    </View>
  );
}

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
    paddingTop: 40,
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
  },
  infoWrapper: {
    gap: 0,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    width: "100%",
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
