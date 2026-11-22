import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { BotaoPilula } from "../../../components/BotaoPilula";
import EstadoVazio from "../../../components/EstadoVazio";
import { BarraCarrinho } from "../../../components/ifood/BarraCarrinho";
import { SeletorQuantidade } from "../../../components/ifood/SeletorQuantidade";
import { useCarrinho } from "../../../context/CarrinhoContext";
import { buscarRestaurante } from "../../../data/restaurantes";
import { useTema } from "../../../theme/TemaContext";
import type { Cores } from "../../../theme/temas";
import type { ItemCardapio } from "../../../types";
import { formatarMoeda } from "../../../utils/formatacao";

export default function DetalheRestaurante() {
  const params = useLocalSearchParams<{ id: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);
  const carrinho = useCarrinho();

  const restaurante = id ? buscarRestaurante(id) : undefined;

  if (!restaurante) {
    return (
      <View style={styles.vazio}>
        <EstadoVazio mensagem="Restaurante não encontrado." />
        <BotaoPilula
          titulo="Voltar"
          icone="arrow-back"
          onPress={() => router.back()}
        />
      </View>
    );
  }

  function adicionarItem(item: ItemCardapio) {
    if (!restaurante) return;
    void carrinho.adicionar(restaurante.id, item);
  }

  return (
    <View style={styles.tela}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.coluna}>
          <Image source={{ uri: restaurante.imagem }} style={styles.imagem} />

          <Text style={styles.nome}>{restaurante.nome}</Text>

          <View style={styles.infos}>
            <View style={styles.info}>
              <Ionicons name="star" size={16} color="#E8A317" />
              <Text style={styles.textoInfo}>{restaurante.nota.toFixed(1)}</Text>
            </View>
            <View style={styles.info}>
              <Ionicons
                name="time-outline"
                size={16}
                color={cores.textoSecundario}
              />
              <Text style={styles.textoInfo}>{restaurante.tempoEntrega}</Text>
            </View>
            <View style={styles.info}>
              <Ionicons
                name="bicycle-outline"
                size={16}
                color={cores.textoSecundario}
              />
              <Text style={styles.textoInfo}>
                Entrega {formatarMoeda(restaurante.taxaEntrega)}
              </Text>
            </View>
          </View>

          <Text style={styles.secao}>Cardápio</Text>

          {restaurante.cardapio.map((item) => {
            const quantidade = carrinho.quantidadeDoItem(item.id);

            return (
              <View key={item.id} style={styles.linha}>
                <View style={styles.textos}>
                  <Text style={styles.nomeItem}>{item.nome}</Text>
                  <Text style={styles.descricao}>{item.descricao}</Text>
                  <Text style={styles.preco}>{formatarMoeda(item.preco)}</Text>
                </View>

                {quantidade > 0 ? (
                  <SeletorQuantidade
                    quantidade={quantidade}
                    onAumentar={() => {
                      void carrinho.alterarQuantidade(item.id, 1);
                    }}
                    onDiminuir={() => {
                      void carrinho.alterarQuantidade(item.id, -1);
                    }}
                  />
                ) : (
                  <BotaoPilula
                    titulo="Adicionar"
                    icone="add"
                    onPress={() => adicionarItem(item)}
                  />
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      <BarraCarrinho onPress={() => router.push("/carrinho")} />
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
    imagem: {
      width: "100%",
      height: 180,
      borderRadius: 16,
      backgroundColor: cores.superficie,
    },
    nome: {
      color: cores.textoPrincipal,
      fontSize: 26,
      fontWeight: "800",
      marginTop: 16,
    },
    infos: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 16,
      marginTop: 8,
    },
    info: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    textoInfo: {
      color: cores.textoSecundario,
      fontSize: 14,
      fontWeight: "600",
    },
    secao: {
      color: cores.textoPrincipal,
      fontSize: 20,
      fontWeight: "700",
      marginTop: 24,
      marginBottom: 4,
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
    descricao: {
      color: cores.textoSecundario,
      fontSize: 13,
    },
    preco: {
      color: cores.textoPrincipal,
      fontSize: 15,
      fontWeight: "600",
      marginTop: 4,
    },
  });