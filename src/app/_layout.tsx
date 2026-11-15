import { Stack } from "expo-router";

import { TemaProvider } from "../theme/TemaContext";

export default function RootLayout() {
  return (
    <TemaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TemaProvider>
  );
}