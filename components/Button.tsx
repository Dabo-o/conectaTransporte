import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "react-native-paper";

// --- 1. ATUALIZAMOS A INTERFACE DE PROPRIEDADES ---
// Adicionamos 'disabled' como uma propriedade opcional (o '?' a torna opcional).
interface ButtonProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

// --- 2. RECEBEMOS A NOVA PROPRIEDADE ---
// Agora, além de 'text' e 'onPress', também recebemos 'disabled'.
export const Button = ({ text, onPress, disabled }: ButtonProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      // --- 3. APLICAMOS OS ESTILOS E COMPORTAMENTO ---
      // O estilo agora é um array. Ele sempre tem o estilo base 'button'.
      // Se 'disabled' for verdadeiro, adicionamos o estilo 'disabledButton'.
      style={[
        styles.button, 
        { backgroundColor: colors.primary },
        disabled && styles.disabledButton // Estilo condicional
      ]}
      onPress={onPress}
      // O TouchableOpacity já tem uma propriedade 'disabled'. Passamos o nosso valor para ela.
      // Isso impede que o 'onPress' seja disparado.
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7} // Remove o efeito de clique se estiver desabilitado
    >
      <Text style={[styles.text, { color: colors.background }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    paddingVertical: 20,
    alignItems: "center",
    marginTop: 8,
  },
  // --- 4. CRIAMOS O ESTILO PARA O ESTADO DESABILITADO ---
  // Este estilo será aplicado sobre o estilo base quando o botão estiver desabilitado.
  disabledButton: {
    backgroundColor: '#A9A9A9', // Um cinza para indicar que está desabilitado
    opacity: 0.7,
  },
  text: {
    color: "#FFF",
    fontSize: 16,
    // O valor correto para fontWeight é uma string numérica ou 'bold'/'normal'
    fontWeight: "600", 
  },
});
