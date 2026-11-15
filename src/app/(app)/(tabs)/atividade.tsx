import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CartaoAviso } from "../../../components/atividade/CartaoAviso";
import { CartaoDestaque } from "../../../components/atividade/CartaoDestaque";
import { ItemAtividade } from "../../../components/atividade/ItemAtividade";
import {
  atividadeDestaque,
  atividadesAnteriores,
  avisoAtividade,
} from "../../../data/atividades";
import { useTema } from "../../../theme/TemaContext";
import type { Cores } from "../../../theme/temas";

export default function Atividade() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const duasColunas = width >= 900;
  const router = useRouter();

  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  function abrirDetalhe(id: string) {
    router.push(`/viagem/${id}`);
  }

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={{
        paddingTop: insets.top + (duasColunas ? 32 : 36),
        paddingBottom: 120,
      }}
    >
      <View style={[styles.conteudo, { maxWidth: duasColunas ? 1080 : 480 }]}>
        <Text style={styles.titulo}>Atividade</Text>

        <View style={styles.cabecalhoSecao}>
          <Text style={styles.secao}>Anteriores</Text>
          <Pressable style={styles.filtro}>
            <Ionicons
              name="options-outline"
              size={22}
              color={cores.textoPrincipal}
            />
          </Pressable>
        </View>

        <View style={duasColunas ? styles.colunas : undefined}>
          <View style={duasColunas ? styles.coluna : undefined}>
            <CartaoAviso
              titulo={avisoAtividade.titulo}
              acao={avisoAtividade.acao}
              emoji={avisoAtividade.emoji}
            />
            <Pressable onPress={() => abrirDetalhe(atividadeDestaque.id)}>
              <CartaoDestaque atividade={atividadeDestaque} />
            </Pressable>
          </View>

          <View style={duasColunas ? styles.coluna : undefined}>
            {atividadesAnteriores.map((atividade) => (
              <Pressable
                key={atividade.id}
                onPress={() => abrirDetalhe(atividade.id)}
              >
                <ItemAtividade atividade={atividade} />
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    tela: {
      flex: 1,
      backgroundColor: cores.fundo,
    },
    conteudo: {
      width: "100%",
      alignSelf: "center",
      paddingHorizontal: 20,
    },
    titulo: {
      color: cores.textoPrincipal,
      fontSize: 36,
      fontWeight: "700",
      marginBottom: 24,
    },
    cabecalhoSecao: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    secao: {
      color: cores.textoPrincipal,
      fontSize: 22,
      fontWeight: "700",
    },
    filtro: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: cores.superficieClara,
      alignItems: "center",
      justifyContent: "center",
    },
    colunas: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 32,
    },
    coluna: {
      flex: 1,
    },
  });