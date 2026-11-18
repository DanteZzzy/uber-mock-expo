import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CartaoAviso } from "../../../components/atividade/CartaoAviso";
import { CartaoDestaque } from "../../../components/atividade/CartaoDestaque";
import { ItemAtividade } from "../../../components/atividade/ItemAtividade";
import EstadoVazio from "../../../components/EstadoVazio";
import PillBotao from "../../../components/PillBotao";
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

type Filtro = "viagens" | "comida" | "envios";

export default function AtividadeTela() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const duasColunas = width >= 900;
  const router = useRouter();

  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("viagens");

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

  const atividadesFiltradas = useMemo(() => {
    if (filtro !== "viagens") return [];
    if (!busca.trim()) return todasAtividades;
    return todasAtividades.filter((v) =>
      v.destino.toLowerCase().includes(busca.toLowerCase()),
    );
  }, [todasAtividades, busca, filtro]);

  function abrirDetalhe(id: string) {
    router.push(`/viagem/${id}`);
  }

  function limparFiltros() {
    setBusca("");
    setFiltro("viagens");
  }

  const filtros: { id: Filtro; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: "viagens", label: "Viagens", icon: "car-outline" },
    { id: "comida", label: "Comida", icon: "fast-food-outline" },
    { id: "envios", label: "Envios", icon: "cube-outline" },
  ];

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

        {/* Campo de busca */}
        <View style={styles.campoBuscaContainer}>
          <Ionicons name="search-outline" size={18} color={cores.textoSecundario} />
          <TextInput
            style={styles.campoBusca}
            value={busca}
            onChangeText={setBusca}
            placeholder="Buscar destino..."
            placeholderTextColor={cores.textoSecundario}
          />
          {busca.length > 0 && (
            <Pressable onPress={() => setBusca("")}>
              <Ionicons name="close-circle" size={18} color={cores.textoSecundario} />
            </Pressable>
          )}
        </View>

        {/* Filtros por categoria */}
        <View style={styles.filtrosLinha}>
          {filtros.map((f) => (
            <View
              key={f.id}
              style={[
                styles.pillWrapper,
                filtro === f.id && styles.pillWrapperAtivo,
              ]}
            >
              <PillBotao
                icon={f.icon}
                label={f.label}
                onPress={() => setFiltro(f.id)}
              />
            </View>
          ))}
        </View>

        <View style={styles.cabecalhoSecao}>
          <Text style={styles.secao}>Anteriores</Text>
          <Pressable style={styles.filtroBotao} onPress={limparFiltros}>
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
            {filtro === "comida" ? (
              <EstadoVazio mensagem="Nenhuma atividade de Comida" />
            ) : filtro === "envios" ? (
              <EstadoVazio mensagem="Nenhuma atividade de Envios" />
            ) : atividadesFiltradas.length === 0 ? (
              <EstadoVazio mensagem="Nenhuma atividade encontrada" />
            ) : (
              atividadesFiltradas.map((atividade) => (
                <Pressable
                  key={atividade.id}
                  onPress={() => abrirDetalhe(atividade.id)}
                >
                  <ItemAtividade atividade={atividade} />
                </Pressable>
              ))
            )}
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
    campoBuscaContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: cores.superficieClara,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      gap: 8,
      marginBottom: 12,
    },
    campoBusca: {
      flex: 1,
      color: cores.textoPrincipal,
      fontSize: 15,
    },
    filtrosLinha: {
      flexDirection: "row",
      gap: 8,
      marginBottom: 20,
    },
    pillWrapper: {
      borderRadius: 20,
      opacity: 0.55,
    },
    pillWrapperAtivo: {
      opacity: 1,
      borderWidth: 2,
      borderColor: cores.textoPrincipal,
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
    filtroBotao: {
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
