import { Stack } from "expo-router";

import { AuthProvider } from "../context/AuthContext";
import { CarrinhoProvider } from "../context/CarrinhoContext";
import { TemaProvider } from "../theme/TemaContext";

export default function RootLayout() {
  return (
    <TemaProvider>
      <AuthProvider>
        <CarrinhoProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </CarrinhoProvider>
      </AuthProvider>
    </TemaProvider>
  );
}