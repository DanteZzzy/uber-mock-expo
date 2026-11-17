import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import EstadoCarregando from "../../../components/EstadoCarregando";
import EstadoErro from "../../../components/EstadoErro";
import EstadoVazio from "../../../components/EstadoVazio";
import { useFetch } from "../../../hooks/useFetch";
import { api } from "../../../services/api";
import { useTema } from "../../../theme/TemaContext";
import type { Cores } from "../../../theme/temas";
import { iniciais } from "../../../utils/iniciais";

export default function DetalheMotorista() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  const buscar = useCallback(() => api.usuario(Number(id)), [id]);
  const { dados: motorista, loading, erro, recarregar } = useFetch(buscar);

  if (loading) {
    return (
      <View style={styles.telaCentralizada}>
        <EstadoCarregando mensagem="Buscando detalhes do motorista..." />
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.telaCentralizada}>
        <EstadoErro mensagem={erro} onTentarDeNovo={recarregar} />
      </View>
    );
  }

  if (!motorista) {
    return (
      <View style={styles.telaCentralizada}>
        <EstadoVazio mensagem="Motorista não encontrado." />
      </View>
    );
  }

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <View style={styles.coluna}>
        <View style={styles.cabecalho}>
          <View style={styles.avatar}>
            <Text style={styles.iniciais}>{iniciais(motorista.name)}</Text>
          </View>
          <Text style={styles.nome}>{motorista.name}</Text>
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
      paddingTop: 24,
      paddingBottom: 40,
      paddingHorizontal: 20,
    },
    coluna: {
      width: "100%",
      maxWidth: 480,
      alignSelf: "center",
    },
    telaCentralizada: {
      flex: 1,
      backgroundColor: cores.fundo,
      alignItems: "center",
      justifyContent: "center",
    },
    cabecalho: {
      alignItems: "center",
      marginBottom: 24,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: cores.superficieClara,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
    },
    iniciais: {
      color: cores.textoPrincipal,
      fontSize: 28,
      fontWeight: "800",
    },
    nome: {
      color: cores.textoPrincipal,
      fontSize: 24,
      fontWeight: "700",
      textAlign: "center",
    },
  });
