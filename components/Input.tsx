// Input.tsx
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";

interface InputProps extends TextInputProps {
  label: string;
  initialValue?: string;
  mask?: "cpf";
  onValueChange?: (value: string) => void;
  error?: boolean;
}

export const Input = ({
  label,
  initialValue = "",
  mask,
  onValueChange,
  error = false,
  style,
  ...props
}: InputProps) => {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const { colors } = useTheme();

  const handleChange = (text: string) => {
    let newValue = text;

    if (mask === "cpf") {
      const onlyNumbers = text.replace(/\D/g, "").slice(0, 11);
      if (onlyNumbers.length <= 11) {
        newValue = onlyNumbers;
      }
      if (onlyNumbers.length === 11) {
        newValue = onlyNumbers.replace(
          /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
          "$1.$2.$3-$4"
        );
      }
    }

    setValue(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  return (
    <View style={{ marginBottom: 16 }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        placeholderTextColor={colors.onSurface + "99"}
        onChangeText={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.input,
          style,
          {
            borderColor: error
              ? colors.error
              : isFocused
              ? "#18996F"
              : "#D6D3D1",
            borderWidth: 1,
            ...(isFocused && Platform.OS === "ios"
              ? {
                  shadowColor: "#E6F2E6",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 1,
                  shadowRadius: 4,
                }
              : {}),
            ...(isFocused && Platform.OS === "android" ? { elevation: 4 } : {}),
          },
        ]}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 4,
    color: "#57534E",
  },
  input: {
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 14,
    width: "100%",
  },
});
