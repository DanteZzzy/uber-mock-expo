import { useState } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export function CampoTexto(props: TextInputProps) {
  const [focado, setFocado] = useState(false);

  return (
    <TextInput
      placeholderTextColor="#6b6b6b"
      autoCapitalize="none"
      {...props}
      onFocus={(e) => {
        setFocado(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocado(false);
        props.onBlur?.(e);
      }}
      style={[styles.input, focado && styles.focado, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#f3f3f3",
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
  },
  focado: {
    borderColor: "#000",
  },
});