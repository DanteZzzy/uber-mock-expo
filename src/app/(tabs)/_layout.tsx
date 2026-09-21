import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useWindowDimensions } from "react-native";

import { cores } from "../../theme/cores";

const corBorda = "rgba(255, 255, 255, 0.25)";
const corBrilho = "rgba(255, 255, 255, 0.18)";

export default function TabsLayout() {
  const { width } = useWindowDimensions();
  const larguraBarra = Math.min(width - 32, 600);
  const margemLateral = (width - larguraBarra) / 2;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: cores.textoPrincipal,
        tabBarInactiveTintColor: cores.textoSecundario,
        tabBarStyle: {
          position: "absolute",
          left: margemLateral,
          right: margemLateral,
          bottom: 16,
          height: 64,
          borderRadius: 32,
          backgroundColor: cores.superficie,
          borderWidth: 1,
          borderTopWidth: 1,
          borderColor: corBorda,
          borderTopColor: corBorda,
          boxShadow: `0 0 14px ${corBrilho}`,
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
        name="opcoes"
        options={{
          title: "Opções",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dots-grid" size={size} color={color} />
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