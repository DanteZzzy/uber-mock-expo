import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

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
  const router = useRouter();
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

  const linhas = [
    { rotulo: "E-mail", valor: motorista.email },
    { rotulo: "Cidade", valor: motorista.address.city },
    { rotulo: "Telefone", valor: motorista.phone },
    { rotulo: "Empresa", valor: motorista.company.name },
    { rotulo: "Site", valor: motorista.website },
  ];

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <View style={styles.coluna}>
        <View style={styles.cabecalho}>
          <View style={styles.avatar}>
            <Text style={styles.iniciais}>{iniciais(motorista.name)}</Text>
          </View>
          <Text style={styles.nome}>{motorista.name}</Text>
        </View>

        {linhas.map((linha) => (
          <View key={linha.rotulo} style={styles.linha}>
            <Text style={styles.rotulo}>{linha.rotulo}</Text>
            <Text style={styles.valor}>{linha.valor}</Text>
          </View>
        ))}

        <Pressable
          style={styles.botaoAvaliar}
          onPress={() => router.push(`/avaliar/${motorista.id}`)}
        >
          <Ionicons name="star-outline" size={18} color={cores.fundo} />
          <Text style={styles.textoBotaoAvaliar}>Avaliar motorista</Text>
        </Pressable>
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
    linha: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
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
      flexShrink: 1,
      textAlign: "right",
      marginLeft: 16,
    },
    botaoAvaliar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: cores.textoPrincipal,
      borderRadius: 12,
      paddingVertical: 14,
      marginTop: 28,
    },
    textoBotaoAvaliar: {
      color: cores.fundo,
      fontSize: 16,
      fontWeight: "700",
    },
  });
