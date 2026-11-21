import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useAuth } from "../../context/AuthContext";
import { useTema } from "../../theme/TemaContext";

export default function AuthLayout() {
  const { usuario, carregado } = useAuth();
  const { cores } = useTema();

  if (!carregado) {
    return (
      <View style={[styles.centro, { backgroundColor: cores.fundo }]}>
        <ActivityIndicator size="large" color={cores.textoPrincipal} />
      </View>
    );
  }

  // Guarda inversa: se já existe sessão ativa, impede voltar para Login/Cadastro
  if (usuario) {
    return <Redirect href="/home" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="cadastro" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});