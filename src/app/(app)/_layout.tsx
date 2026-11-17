import { Redirect, Stack } from "expo-router";

import { useAuth } from "../../context/AuthContext";
import { useTema } from "../../theme/TemaContext";

export default function AppLayout() {
  const { usuario } = useAuth();
  const { cores } = useTema();

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