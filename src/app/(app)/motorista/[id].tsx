import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import EstadoCarregando from "../../../components/EstadoCarregando";
import EstadoErro from "../../../components/EstadoErro";
import EstadoVazio from "../../../components/EstadoVazio";
import { useFetch } from "../../../hooks/useFetch";
import { api } from "../../../services/api";
import { useTema } from "../../../theme/TemaContext";
import type { Cores } from "../../../theme/temas";

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
    <View style={styles.tela}>
      <Text style={styles.texto}>Motorista ID: {motorista.id}</Text>
    </View>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    tela: {
      flex: 1,
      backgroundColor: cores.fundo,
      padding: 16,
    },
    telaCentralizada: {
      flex: 1,
      backgroundColor: cores.fundo,
      alignItems: "center",
      justifyContent: "center",
    },
    texto: {
      color: cores.textoPrincipal,
      fontSize: 16,
    },
  });
