import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Botao } from "../../components/Botao";
import { BotaoPilula } from "../../components/BotaoPilula";
import EstadoVazio from "../../components/EstadoVazio";
import { SeletorQuantidade } from "../../components/ifood/SeletorQuantidade";
import { useCarrinho } from "../../context/CarrinhoContext";
import { CHAVE_PEDIDOS } from "../../data/restaurantes";
import { useArmazenamento } from "../../hooks/useArmazenamento";
import { api } from "../../services/api";
import { useTema } from "../../theme/TemaContext";
import type { Cores } from "../../theme/temas";
import type { PedidoSalvo } from "../../types";
import { formatarDataHora, formatarMoeda } from "../../utils/formatacao";

export default function CarrinhoTela() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);
  const carrinho = useCarrinho();

  const [, setPedidos, pedidosCarregados] = useArmazenamento<PedidoSalvo[]>(
    CHAVE_PEDIDOS,
    [],
  );
  const [finalizando, setFinalizando] = useState(false);

  async function finalizarPedido() {
    const restaurante = carrinho.restaurante;
    if (!restaurante || carrinho.itens.length === 0) return;

    setFinalizando(true);

    try {
      const resumoItens = carrinho.itens
        .map((item) => `${item.quantidade}x ${item.nome}`)
        .join(", ");

      // POST /posts conforme Seção 4 (JSONPlaceholder simula a criação do pedido)
      const postCriado = await api.criarPost({
        title: `Pedido iFood: ${restaurante.nome}`,
        body: `Itens: ${resumoItens} | Total: ${formatarMoeda(carrinho.total)}`,
        userId: 1,
      });

      const pedido: PedidoSalvo = {
        id: `p_${Date.now()}`,
        restauranteId: restaurante.id,
        restauranteNome: restaurante.nome,
        itens: carrinho.itens,
        subtotal: carrinho.subtotal,
        taxaEntrega: carrinho.taxaEntrega,
        total: carrinho.total,
        data: formatarDataHora(new Date()),
        postId: postCriado.id,
      };

      await setPedidos((anteriores) => [pedido, ...anteriores]);
      await carrinho.limpar();

      Alert.alert(
        "Pedido confirmado!",
        `${restaurante.nome} já está preparando o seu pedido.`,
        [
          {
            text: "Ver na Atividade",
            onPress: () => router.replace("/(tabs)/atividade"),
          },
        ],
        { cancelable: false },
      );
    } catch (e) {
      Alert.alert(
        "Erro ao finalizar",
        e instanceof Error
          ? e.message
          : "Não foi possível finalizar o pedido. Tente novamente.",
      );
    } finally {
      setFinalizando(false);
    }
  }

  if (carrinho.itens.length === 0) {
    return (
      <View style={styles.vazio}>
        <EstadoVazio mensagem="Seu carrinho está vazio." />
        <BotaoPilula
          titulo="Escolher um restaurante"
          icone="restaurant-outline"
          onPress={() => router.back()}
        />
      </View>
    );
  }

  return (
    <View style={styles.tela}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.coluna}>
          <Text style={styles.loja}>{carrinho.restaurante?.nome}</Text>

          {carrinho.itens.map((item) => (
            <View key={item.itemId} style={styles.linha}>
              <View style={styles.textos}>
                <Text style={styles.nomeItem}>{item.nome}</Text>
                <Text style={styles.precoItem}>
                  {formatarMoeda(item.preco * item.quantidade)}
                </Text>
                <Pressable
                  onPress={() => carrinho.remover(item.itemId)}
                  accessibilityRole="button"
                  accessibilityLabel={`Remover ${item.nome}`}
                >
                  <Text style={styles.remover}>Remover</Text>
                </Pressable>
              </View>

              <SeletorQuantidade
                quantidade={item.quantidade}
                onAumentar={() => carrinho.alterarQuantidade(item.itemId, 1)}
                onDiminuir={() => carrinho.alterarQuantidade(item.itemId, -1)}
              />
            </View>
          ))}

          <View style={styles.resumo}>
            <View style={styles.linhaResumo}>
              <Text style={styles.rotulo}>Subtotal</Text>
              <Text style={styles.valor}>{formatarMoeda(carrinho.subtotal)}</Text>
            </View>
            <View style={styles.linhaResumo}>
              <Text style={styles.rotulo}>Taxa de entrega</Text>
              <Text style={styles.valor}>{formatarMoeda(carrinho.taxaEntrega)}</Text>
            </View>
            <View style={styles.linhaResumo}>
              <Text style={styles.rotuloTotal}>Total</Text>
              <Text style={styles.valorTotal}>{formatarMoeda(carrinho.total)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.rodape, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.coluna}>
          <Botao
            titulo={`Finalizar pedido • ${formatarMoeda(carrinho.total)}`}
            onPress={finalizarPedido}
            carregando={finalizando}
            desabilitado={!pedidosCarregados}
          />
        </View>
      </View>
    </View>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    tela: {
      flex: 1,
      backgroundColor: cores.fundo,
    },
    scroll: {
      paddingTop: 16,
      paddingBottom: 24,
    },
    coluna: {
      width: "100%",
      maxWidth: 520,
      alignSelf: "center",
      paddingHorizontal: 16,
    },
    vazio: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      backgroundColor: cores.fundo,
    },
    loja: {
      color: cores.textoPrincipal,
      fontSize: 22,
      fontWeight: "800",
      marginBottom: 8,
    },
    linha: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: cores.borda,
    },
    textos: {
      flex: 1,
      gap: 2,
    },
    nomeItem: {
      color: cores.textoPrincipal,
      fontSize: 16,
      fontWeight: "700",
    },
    precoItem: {
      color: cores.textoSecundario,
      fontSize: 14,
    },
    remover: {
      color: cores.destaque,
      fontSize: 13,
      fontWeight: "700",
      marginTop: 4,
    },
    resumo: {
      marginTop: 20,
      gap: 10,
    },
    linhaResumo: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    rotulo: {
      color: cores.textoSecundario,
      fontSize: 15,
    },
    valor: {
      color: cores.textoPrincipal,
      fontSize: 15,
      fontWeight: "600",
    },
    rotuloTotal: {
      color: cores.textoPrincipal,
      fontSize: 18,
      fontWeight: "800",
    },
    valorTotal: {
      color: cores.textoPrincipal,
      fontSize: 18,
      fontWeight: "800",
    },
    rodape: {
      backgroundColor: cores.fundo,
      borderTopWidth: 1,
      borderTopColor: cores.borda,
      paddingTop: 12,
    },
  });
