import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useWindowDimensions } from "react-native";

import { useTema } from "../../../theme/TemaContext";

export default function TabsLayout() {
  const { width } = useWindowDimensions();
  const { modo, cores } = useTema();

  const larguraBarra = Math.min(width - 32, 480);
  const margemLateral = (width - larguraBarra) / 2;
  const tamanhoFonte = width < 400 ? 11 : 12;

  const corBorda =
    modo === "escuro" ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.15)";
  const corBrilho =
    modo === "escuro" ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.12)";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: cores.textoPrincipal,
        tabBarInactiveTintColor: cores.textoSecundario,
        tabBarLabelPosition: "below-icon",
        tabBarStyle: {
          position: "absolute",
          left: margemLateral,
          right: margemLateral,
          bottom: 16,
          height: 76,
          paddingTop: 6,
          paddingBottom: 6,
          paddingHorizontal: 8,
          borderRadius: 38,
          backgroundColor: cores.superficie,
          borderWidth: 1,
          borderTopWidth: 1,
          borderColor: corBorda,
          borderTopColor: corBorda,
          boxShadow: `0 0 14px ${corBrilho}`,
        },
        tabBarLabelStyle: { fontSize: tamanhoFonte },
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