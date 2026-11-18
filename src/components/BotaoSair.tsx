import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAuth } from "../context/AuthContext";
import { useTema } from "../theme/TemaContext";
import type { Cores } from "../theme/temas";

export function BotaoSair() {
  const { cores } = useTema();
  const { usuario, sair } = useAuth();
  const router = useRouter();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  async function aoSair() {
    await sair();
    router.replace("/login");
  }

  return (
    <View style={styles.bloco}>
      <Pressable
        onPress={aoSair}
        style={({
          pressed,
          hovered,
        }: {
          pressed: boolean;
          hovered?: boolean;
        }) => [
          styles.botao,
          (hovered || pressed) && styles.destacado,
          pressed && styles.pressionado,
        ]}
      >
        <Ionicons name="log-out-outline" size={22} color={cores.destaque} />
        <Text style={styles.texto}>Sair</Text>
      </Pressable>
      {usuario && (
        <Text style={styles.legenda}>Conectado como {usuario.nome}</Text>
      )}
    </View>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    bloco: {
      marginTop: 24,
      alignItems: "center",
      gap: 8,
    },
    botao: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      alignSelf: "stretch",
      backgroundColor: cores.superficie,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 12,
      paddingVertical: 14,
    },
    destacado: {
      borderColor: cores.destaque,
    },
    pressionado: {
      opacity: 0.8,
    },
    texto: {
      color: cores.destaque,
      fontSize: 16,
      fontWeight: "700",
    },
    legenda: {
      color: cores.textoSecundario,
      fontSize: 13,
    },
  });