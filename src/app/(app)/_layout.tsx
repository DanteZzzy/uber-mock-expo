import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useAuth } from "../../context/AuthContext";
import { useTema } from "../../theme/TemaContext";

export default function AppLayout() {
  const { usuario, carregado } = useAuth();
  const { cores } = useTema();

  if (!carregado) {
    return (
      <View style={[styles.centro, { backgroundColor: cores.fundo }]}>
        <ActivityIndicator size="large" color={cores.textoPrincipal} />
      </View>
    );
  }

  if (!usuario) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: cores.fundo },
        headerTintColor: cores.textoPrincipal,
        headerTitleStyle: { fontWeight: "700" },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: cores.fundo },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="pedir-viagem"
        options={{ title: "Pedir viagem", headerBackTitle: "Voltar" }}
      />
      <Stack.Screen
        name="acompanhar-viagem"
        options={{ title: "Acompanhar viagem", headerBackTitle: "Voltar" }}
      />
      <Stack.Screen
        name="enderecos"
        options={{ title: "Endereços salvos", headerBackTitle: "Voltar" }}
      />
      <Stack.Screen
        name="viagem/[id]"
        options={{ title: "Detalhes da viagem", headerBackTitle: "Voltar" }}
      />
      <Stack.Screen
        name="motorista/[id]"
        options={{ title: "Detalhes do motorista", headerBackTitle: "Voltar" }}
      />
      <Stack.Screen
        name="avaliar/[id]"
        options={{
          presentation: "modal",
          title: "Avaliar motorista",
          headerBackTitle: "Fechar",
        }}
      />
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
