import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { BotaoPilula } from "../../../components/BotaoPilula";
import {
  atividadeDestaque,
  atividadesAnteriores,
} from "../../../data/atividades";
import { useTema } from "../../../theme/TemaContext";
import type { Cores } from "../../../theme/temas";

const todasAtividades = [atividadeDestaque, ...atividadesAnteriores];

export default function DetalheViagem() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  // o id chega como texto; aqui os ids também são texto ("a1", "destaque"),
  // então a comparação direta funciona (se fossem números: Number(id))
  const atividade = todasAtividades.find((item) => item.id === id);

  if (!atividade) {
    return (
      <View style={styles.vazio}>
        <Text style={styles.titulo}>Viagem não encontrada</Text>
        <BotaoPilula
          titulo="Voltar"
          icone="arrow-back"
          onPress={() => router.back()}
        />
      </View>
    );
  }

  const linhas = [
    { rotulo: "Data", valor: atividade.data },
    { rotulo: "Valor", valor: atividade.valor },
    ...(atividade.detalhe
      ? [{ rotulo: "Observação", valor: atividade.detalhe }]
      : []),
    { rotulo: "Código", valor: atividade.id },
  ];

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <View style={styles.coluna}>
        <View style={styles.cabecalho}>
          <View style={styles.miniatura}>
            <Text style={styles.emoji}>🚗</Text>
          </View>
          <Text style={styles.titulo}>{atividade.destino}</Text>
        </View>

        {linhas.map((linha) => (
          <View key={linha.rotulo} style={styles.linha}>
            <Text style={styles.rotulo}>{linha.rotulo}</Text>
            <Text style={styles.valor}>{linha.valor}</Text>
          </View>
        ))}
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
      paddingTop: 24,
      paddingBottom: 40,
      paddingHorizontal: 20,
    },
    coluna: {
      width: "100%",
      maxWidth: 480,
      alignSelf: "center",
    },
    vazio: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      backgroundColor: cores.fundo,
    },
    cabecalho: {
      alignItems: "center",
    },
    miniatura: {
      width: 80,
      height: 80,
      borderRadius: 16,
      backgroundColor: cores.superficie,
      alignItems: "center",
      justifyContent: "center",
    },
    emoji: {
      fontSize: 40,
    },
    titulo: {
      color: cores.textoPrincipal,
      fontSize: 28,
      fontWeight: "700",
      textAlign: "center",
      marginTop: 16,
      marginBottom: 24,
    },
    linha: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: cores.borda,
    },
    rotulo: {
      color: cores.textoSecundario,
      fontSize: 16,
    },
    valor: {
      color: cores.textoPrincipal,
      fontSize: 16,
      fontWeight: "600",
    },
  });