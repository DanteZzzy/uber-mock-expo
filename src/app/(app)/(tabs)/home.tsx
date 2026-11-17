import { useMemo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AbasTopo, { AbaId } from "../../../components/AbasTopo";
import ConteudoEnvios from "../../../components/home/ConteudoEnvios";
import ConteudoIfood from "../../../components/home/ConteudoIfood";
import ConteudoUber from "../../../components/home/ConteudoUber";
import { useTema } from "../../../theme/TemaContext";
import type { Cores } from "../../../theme/temas";
import { useFetch } from "../../../hooks/useFetch";
import { api } from "../../../services/api";

export default function Home() {
  const [abaSelecionada, setAbaSelecionada] = useState<AbaId>("uber");
  const insets = useSafeAreaInsets();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);
  // a Home busca os motoristas na API e repassa o resultado para a aba Uber
  const motoristas = useFetch(api.usuarios);
  
  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={[styles.conteudo, { paddingTop: insets.top + 12 }]}
    >
      <AbasTopo
        abaSelecionada={abaSelecionada}
        onSelecionar={setAbaSelecionada}
      />

      {abaSelecionada === "uber" && <ConteudoUber />}
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
      paddingBottom: 100, // espaço pra não colidir com a navbar flutuante
    },
  });
