import { Stack } from "expo-router";

import { AuthProvider } from "../context/AuthContext";
import { TemaProvider } from "../theme/TemaContext";

export default function RootLayout() {
  return (
    <TemaProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </TemaProvider>
  );
}