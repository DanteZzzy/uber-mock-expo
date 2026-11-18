import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import {
  Alert,
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
  Atividade,
  atividadeDestaque,
  atividadesAnteriores,
  avisoAtividade,
} from "../../../data/atividades";
import { useArmazenamento } from "../../../hooks/useArmazenamento";
import { useTema } from "../../../theme/TemaContext";
import type { Cores } from "../../../theme/temas";
import type { ViagemSalva } from "../../../types";

export default function AtividadeTela() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const duasColunas = width >= 900;
  const router = useRouter();

  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  // Carrega viagens persistidas no AsyncStorage
  const [viagensSalvas] = useArmazenamento<ViagemSalva[]>("@uber_viagens", []);

  // Combina as viagens novas com as viagens mockadas existentes
  const todasAtividades = useMemo(() => {
    const doStorage: Atividade[] = viagensSalvas.map((v) => ({
      id: v.id,
      destino: v.destino,
      data: v.data,
      valor: v.valor,
      detalhe:
        v.detalhe ??
        (v.status === "cancelada"
          ? "Cancelada"
          : v.status === "concluida"
            ? "Concluída"
            : undefined),
    }));

    return [...doStorage, ...atividadesAnteriores];
  }, [viagensSalvas]);

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
          <Pressable
            style={styles.filtro}
            onPress={() =>
              Alert.alert(
                "Filtro de Atividades",
                "Exibindo todas as viagens e solicitações recentes.",
              )
            }
          >
            <Ionicons
              name="options-outline"
              size={22}
              color={cores.textoPrincipal}
            />
          </Pressable>
        </View>

        <View style={duasColunas ? styles.colunas : undefined}>
          <View style={duasColunas ? styles.coluna : undefined}>
            <Pressable
              onPress={() =>
                Alert.alert(
                  "Clube Plus",
                  "Seus créditos foram aplicados na sua conta com sucesso!",
                )
              }
            >
              <CartaoAviso
                titulo={avisoAtividade.titulo}
                acao={avisoAtividade.acao}
                emoji={avisoAtividade.emoji}
              />
            </Pressable>

            <Pressable onPress={() => abrirDetalhe(atividadeDestaque.id)}>
              <CartaoDestaque atividade={atividadeDestaque} />
            </Pressable>
          </View>

          <View style={duasColunas ? styles.coluna : undefined}>
            {todasAtividades.map((atividade) => (
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
