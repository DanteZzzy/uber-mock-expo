import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import EstadoCarregando from "../../../components/EstadoCarregando";
import EstadoErro from "../../../components/EstadoErro";
import EstadoVazio from "../../../components/EstadoVazio";
import { CartaoAviso } from "../../../components/atividade/CartaoAviso";
import { CartaoDestaque } from "../../../components/atividade/CartaoDestaque";
import { ItemAtividade } from "../../../components/atividade/ItemAtividade";
import {
  Atividade,
  atividadeDestaque,
  atividadesAnteriores,
  avisoAtividade,
} from "../../../data/atividades";
import { CHAVE_ENVIOS, nomeDoTipoEnvio } from "../../../data/envios";
import { CHAVE_PEDIDOS } from "../../../data/restaurantes";
import { useArmazenamento } from "../../../hooks/useArmazenamento";
import { useFetch } from "../../../hooks/useFetch";
import { useTema } from "../../../theme/TemaContext";
import type { Cores } from "../../../theme/temas";
import type {
  EnvioSalvo,
  PedidoSalvo,
  Post,
  ViagemSalva,
} from "../../../types";
import { formatarMoeda } from "../../../utils/formatacao";

function carimbo(id: string): number {
  return Number(id.split("_")[1]) || 0;
}

const BASE_API =
  process.env.EXPO_PUBLIC_API_URL ?? "https://jsonplaceholder.typicode.com";

async function buscarAtividadesApi(): Promise<Post[]> {
  const controlador = new AbortController();
  const timer = setTimeout(() => controlador.abort(), 8000);

  try {
    const resposta = await fetch(`${BASE_API}/users/1/posts`, {
      cache: "no-store",
      signal: controlador.signal,
    });
    if (!resposta.ok) throw new Error(`Falha ${resposta.status}`);
    return (await resposta.json()) as Post[];
  } catch (erro) {
    if (erro instanceof Error && erro.name === "AbortError") {
      throw new Error("A conexão demorou demais. Tente de novo.");
    }
    if (erro instanceof TypeError) {
      throw new Error("Sem conexão com a internet.");
    }
    throw erro;
  } finally {
    clearTimeout(timer);
  }
}

export default function AtividadeTela() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const duasColunas = width >= 900;
  const telaBaixa = height < 760;
  const router = useRouter();

  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  const {
    dados: postsApi,
    loading: carregandoApi,
    erro: erroApi,
    recarregar: recarregarApi,
  } = useFetch(buscarAtividadesApi);

  const [atualizandoLista, setAtualizandoLista] = useState(false);

  const [viagensSalvas, , , , recarregarViagens] = useArmazenamento<
    ViagemSalva[]
  >("@uber_viagens", []);
  const [pedidosSalvos, , , , recarregarPedidos] = useArmazenamento<
    PedidoSalvo[]
  >(CHAVE_PEDIDOS, []);
  const [enviosSalvos, , , , recarregarEnvios] = useArmazenamento<EnvioSalvo[]>(
    CHAVE_ENVIOS,
    [],
  );

  useFocusEffect(
    useCallback(() => {
      recarregarViagens();
      recarregarPedidos();
      recarregarEnvios();
    }, [recarregarViagens, recarregarPedidos, recarregarEnvios]),
  );

  async function aoPuxarParaAtualizar() {
    setAtualizandoLista(true);
    try {
      await Promise.all([
        recarregarApi(),
        recarregarViagens(),
        recarregarPedidos(),
        recarregarEnvios(),
      ]);
    } finally {
      setAtualizandoLista(false);
    }
  }

  const todasAtividades = useMemo(() => {
    const viagens: Atividade[] = viagensSalvas.map((v) => ({
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
      tipo: "viagem",
    }));

    const pedidos: Atividade[] = pedidosSalvos.map((p) => {
      const quantidade = p.itens.reduce((soma, i) => soma + i.quantidade, 0);
      return {
        id: p.id,
        destino: p.restauranteNome,
        data: p.data,
        valor: formatarMoeda(p.total),
        detalhe: `${quantidade} ${quantidade === 1 ? "item" : "itens"}`,
        tipo: "comida",
      };
    });

    const envios: Atividade[] = enviosSalvos.map((e) => ({
      id: e.id,
      destino: e.destinatarioNome,
      data: e.data,
      valor: formatarMoeda(e.valor),
      detalhe: nomeDoTipoEnvio(e.tipo),
      tipo: "envio",
    }));

    const gravadas = [...viagens, ...pedidos, ...envios].sort(
      (a, b) => carimbo(b.id) - carimbo(a.id),
    );

    const daApi: Atividade[] = (postsApi ?? []).slice(0, 3).map((post) => ({
      id: `api_${post.id}`,
      destino: post.title.slice(0, 36),
      data: "Sincronizado via API",
      valor: formatarMoeda(14.9 + post.id * 3.5),
      detalhe: `Registro #${post.id}`,
      tipo: "viagem",
    }));

    return [...gravadas, ...atividadesAnteriores, ...daApi];
  }, [viagensSalvas, pedidosSalvos, enviosSalvos, postsApi]);

  function abrirDetalhe(id: string) {
    if (id.startsWith("api_")) {
      const msg = "Este registro foi sincronizado da API de demonstração.";
      if (Platform.OS === "web") {
        window.alert(msg);
      } else {
        Alert.alert("Histórico sincronizado", msg);
      }
      return;
    }
    router.push(`/viagem/${id}`);
  }

  // Estado 1: Carregando
  if (carregandoApi) {
    return (
      <View
        style={[
          styles.telaCentral,
          { paddingTop: insets.top + 32, paddingBottom: 120 },
        ]}
      >
        <EstadoCarregando mensagem="Buscando histórico de atividades..." />
      </View>
    );
  }

  // Estado 2: Erro de rede / Modo Avião
  if (erroApi) {
    return (
      <View
        style={[
          styles.telaCentral,
          { paddingTop: insets.top + 32, paddingBottom: 120 },
        ]}
      >
        <EstadoErro mensagem={erroApi} onTentarDeNovo={recarregarApi} />
      </View>
    );
  }

  const painelDestaques = (
    <View style={telaBaixa && duasColunas ? styles.destaquesCompactos : undefined}>
      <Pressable
        onPress={() => {
          const msg = "Seus créditos foram aplicados na sua conta com sucesso!";
          if (Platform.OS === "web") {
            window.alert(msg);
          } else {
            Alert.alert("Clube Plus", msg);
          }
        }}
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
  );

  // Desktop: lado esquerdo fixo (com scroll de segurança apenas se o monitor for baixo) e lista da direita rolando
  if (duasColunas) {
    return (
      <View
        style={[
          styles.tela,
          {
            paddingTop: insets.top + 24,
          },
        ]}
      >
        <View style={[styles.conteudoDesktop, { maxWidth: 1080 }]}>
          <Text style={[styles.titulo, telaBaixa && styles.tituloCompacto]}>
            Atividade
          </Text>

          <View style={styles.cabecalhoSecao}>
            <Text style={styles.secao}>Anteriores</Text>
            <Pressable style={styles.filtro} onPress={aoPuxarParaAtualizar}>
              <Ionicons
                name="refresh-outline"
                size={22}
                color={cores.textoPrincipal}
              />
            </Pressable>
          </View>

          <View style={styles.colunas}>
            <ScrollView
              style={styles.coluna}
              contentContainerStyle={{ paddingBottom: 112 }}
              showsVerticalScrollIndicator={false}
              scrollEnabled={telaBaixa}
            >
              {painelDestaques}
            </ScrollView>

            <FlatList
              style={styles.coluna}
              contentContainerStyle={{ paddingBottom: 120 }}
              showsVerticalScrollIndicator={false}
              data={todasAtividades}
              keyExtractor={(item) => String(item.id)}
              ListEmptyComponent={
                <EstadoVazio mensagem="Nenhuma atividade registrada até o momento." />
              }
              refreshing={atualizandoLista}
              onRefresh={aoPuxarParaAtualizar}
              renderItem={({ item }) => (
                <Pressable onPress={() => abrirDetalhe(item.id)}>
                  <ItemAtividade atividade={item} />
                </Pressable>
              )}
            />
          </View>
        </View>
      </View>
    );
  }

  // Mobile: coluna única com FlatList + Pull-to-Refresh
  return (
    <FlatList
      style={styles.tela}
      contentContainerStyle={[
        styles.conteudoMobile,
        {
          maxWidth: 480,
          paddingTop: insets.top + 36,
          paddingBottom: 120,
        },
      ]}
      data={todasAtividades}
      keyExtractor={(item) => String(item.id)}
      ListHeaderComponent={
        <View>
          <Text style={styles.titulo}>Atividade</Text>

          <View style={styles.cabecalhoSecao}>
            <Text style={styles.secao}>Anteriores</Text>
            <Pressable style={styles.filtro} onPress={aoPuxarParaAtualizar}>
              <Ionicons
                name="refresh-outline"
                size={22}
                color={cores.textoPrincipal}
              />
            </Pressable>
          </View>

          {painelDestaques}
        </View>
      }
      ListEmptyComponent={
        <EstadoVazio mensagem="Nenhuma atividade registrada até o momento." />
      }
      refreshing={atualizandoLista}
      onRefresh={aoPuxarParaAtualizar}
      renderItem={({ item }) => (
        <Pressable onPress={() => abrirDetalhe(item.id)}>
          <ItemAtividade atividade={item} />
        </Pressable>
      )}
    />
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    tela: {
      flex: 1,
      backgroundColor: cores.fundo,
    },
    telaCentral: {
      flex: 1,
      backgroundColor: cores.fundo,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    conteudoDesktop: {
      flex: 1,
      width: "100%",
      alignSelf: "center",
      paddingHorizontal: 20,
    },
    conteudoMobile: {
      width: "100%",
      alignSelf: "center",
      paddingHorizontal: 20,
    },
    titulo: {
      color: cores.textoPrincipal,
      fontSize: 36,
      fontWeight: "700",
      marginBottom: 20,
    },
    tituloCompacto: {
      fontSize: 30,
      marginBottom: 12,
    },
    cabecalhoSecao: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14,
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
      flex: 1,
      flexDirection: "row",
      alignItems: "stretch",
      gap: 32,
    },
    coluna: {
      flex: 1,
    },
    destaquesCompactos: {
      transform: [{ scale: 0.96 }],
      transformOrigin: "top left",
    },
  });