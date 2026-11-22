import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AbasTopo, { AbaId } from "../../../components/AbasTopo";
import ConteudoEnvios from "../../../components/home/ConteudoEnvios";
import ConteudoIfood from "../../../components/home/ConteudoIfood";
import ConteudoUber from "../../../components/home/ConteudoUber";
import { useFetch } from "../../../hooks/useFetch";
import { api } from "../../../services/api";
import { useTema } from "../../../theme/TemaContext";
import type { Cores } from "../../../theme/temas";

export default function Home() {
  const params = useLocalSearchParams<{ aba?: string }>();
  const [abaSelecionada, setAbaSelecionada] = useState<AbaId>(
    params.aba === "ifood" || params.aba === "envios" ? params.aba : "uber",
  );
  const [atualizando, setAtualizando] = useState(false);

  useEffect(() => {
    if (
      params.aba === "uber" ||
      params.aba === "envios" ||
      params.aba === "ifood"
    ) {
      setAbaSelecionada(params.aba);
    }
  }, [params.aba]);

  const insets = useSafeAreaInsets();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  const motoristas = useFetch(api.usuarios);

  async function aoAtualizar() {
    setAtualizando(true);
    try {
      await motoristas.atualizar();
    } finally {
      setAtualizando(false);
    }
  }

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={[
        styles.conteudo,
        { paddingTop: insets.top + 12 },
      ]}
      refreshControl={
        abaSelecionada === "uber" ? (
          <RefreshControl
            refreshing={atualizando}
            onRefresh={aoAtualizar}
            tintColor={cores.textoPrincipal}
          />
        ) : undefined
      }
    >
      <AbasTopo
        abaSelecionada={abaSelecionada}
        onSelecionar={setAbaSelecionada}
      />

      {abaSelecionada === "uber" && (
        <ConteudoUber
          motoristas={motoristas}
          onMudarAba={setAbaSelecionada}
        />
      )}

      {abaSelecionada === "envios" && <ConteudoEnvios />}

      {abaSelecionada === "ifood" && <ConteudoIfood />}
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
      paddingHorizontal: 16,
      paddingBottom: 100,
    },
  });