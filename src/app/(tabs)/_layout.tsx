import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { cores } from "../../theme/cores";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: cores.textoPrincipal,
        tabBarInactiveTintColor: cores.textoSecundario,
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 16,
          height: 64,
          borderRadius: 32,
          backgroundColor: cores.superficie,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: { fontSize: 12, marginBottom: 6 },
        sceneStyle: { backgroundColor: cores.fundo },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Página inicial",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="atividade"
        options={{
          title: "Atividade",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="conta"
        options={{
          title: "Conta",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}