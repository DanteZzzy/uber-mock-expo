import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Botao } from "../../components/Botao";
import { api } from "../../services/api";
import { useTema } from "../../theme/TemaContext";
import type { Cores } from "../../theme/temas";
import type { CategoriaOpcaoViagem } from "../../types";

const CATEGORIAS: CategoriaOpcaoViagem[] = [
  {
    id: "uber",
    nome: "UberX",
    descricao: "Viagens acessíveis no dia a dia",
    tempoMin: 4,
    fatorPreco: 1.0,
    emoji: "🚗",
  },
  {
    id: "moto",
    nome: "Uber Moto",
    descricao: "Chegue mais rápido sobre duas rodas",
    tempoMin: 3,
    fatorPreco: 0.65,
    emoji: "🏍️",
  },
  {
    id: "comfort",
    nome: "Uber Comfort",
    descricao: "Carros mais novos e motoristas top",
    tempoMin: 6,
    fatorPreco: 1.45,
    emoji: "✨",
  },
];

export default function PedirViagem() {
  const params = useLocalSearchParams<{
    destino?: string;
    categoria?: string;
  }>();

  const router = useRouter();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  const [origem, setOrigem] = useState("Localização atual (Av. Central, 100)");
  const [destino, setDestino] = useState(params.destino ?? "");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<
    "uber" | "moto" | "comfort"
  >(
    params.categoria === "moto"
      ? "moto"
      : params.categoria === "comfort" || params.categoria === "reserve"
        ? "comfort"
        : "uber",
  );
  const [solicitando, setSolicitando] = useState(false);
  const [erro, setErro] = useState("");

  // Cálculo dinâmico próprio de valor baseado no tamanho do destino e categoria
  const estimativas = useMemo(() => {
    const distanciaSimuladaKm = Math.max(
      3.2,
      Math.min(22, (destino.trim().length || 10) * 0.55),
    );

    return CATEGORIAS.map((cat) => {
      const valorBase = 7.5 + distanciaSimuladaKm * 2.35 * cat.fatorPreco;
      const valorFormatado = `R$ ${valorBase.toFixed(2).replace(".", ",")}`;
      const tempoFinal = Math.round(cat.tempoMin + distanciaSimuladaKm * 1.4);

      return {
        ...cat,
        valorFormatado,
        tempoFormatado: `${tempoFinal} min`,
      };
    });
  }, [destino]);

  const categoriaAtual = estimativas.find(
    (c) => c.id === categoriaSelecionada,
  )!;

  async function aoSolicitarViagem() {
    if (!origem.trim()) {
      setErro("Informe o local de partida.");
      return;
    }

    if (!destino.trim()) {
      setErro("Informe o endereço de destino.");
      return;
    }

    setErro("");
    setSolicitando(true);

    try {
      // POST /posts conforme Seção 4 (JSONPlaceholder simula criação)
      const postCriado = await api.criarPost({
        title: `Viagem ${categoriaAtual.nome}: ${origem.trim()} -> ${destino.trim()}`,
        body: `Categoria: ${categoriaAtual.nome} | Valor: ${categoriaAtual.valorFormatado} | Tempo: ${categoriaAtual.tempoFormatado}`,
        userId: 1,
      });

      const idViagem = `v_${Date.now()}`;

      // Redireciona para tela de acompanhamento com os dados
      router.push({
        pathname: "/acompanhar-viagem",
        params: {
          id: idViagem,
          origem: origem.trim(),
          destino: destino.trim(),
          categoria: categoriaAtual.nome,
          valor: categoriaAtual.valorFormatado,
          tempo: categoriaAtual.tempoFormatado,
          postId: String(postCriado.id),
        },
      });
    } catch (e) {
      Alert.alert(
        "Erro ao solicitar",
        e instanceof Error
          ? e.message
          : "Não foi possível solicitar a viagem. Tente novamente.",
      );
    } finally {
      setSolicitando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.tela}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.conteudo}>
          <Text style={styles.titulo}>Para onde vamos?</Text>
          <Text style={styles.subtitulo}>
            Confirme os endereços e escolha a opção que melhor te atende
          </Text>

          {/* Card de Rotas */}
          <View style={styles.cardRotas}>
            <View style={styles.pontoOrigem} />
            <View style={styles.linhaConexao} />
            <View style={styles.pontoDestino} />

            <View style={styles.inputsRotas}>
              <View style={styles.blocoInput}>
                <Text style={styles.rotuloInput}>Partida</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Local de partida"
                  placeholderTextColor={cores.textoSecundario}
                  value={origem}
                  onChangeText={(t) => {
                    setOrigem(t);
                    setErro("");
                  }}
                  editable={!solicitando}
                />
              </View>

              <View style={styles.divisorRotas} />

              <View style={styles.blocoInput}>
                <Text style={styles.rotuloInput}>Destino</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Para onde você quer ir?"
                  placeholderTextColor={cores.textoSecundario}
                  value={destino}
                  onChangeText={(t) => {
                    setDestino(t);
                    setErro("");
                  }}
                  editable={!solicitando}
                  autoFocus={!params.destino}
                />
              </View>
            </View>
          </View>

          {erro !== "" && <Text style={styles.textoErro}>{erro}</Text>}

          {/* Seleção de Categorias */}
          <Text style={styles.tituloCategorias}>Escolha sua categoria</Text>

          <View style={styles.listaCategorias}>
            {estimativas.map((item) => {
              const selecionado = item.id === categoriaSelecionada;

              return (
                <Pressable
                  key={item.id}
                  style={[
                    styles.itemCategoria,
                    selecionado && styles.itemCategoriaAtivo,
                  ]}
                  onPress={() => setCategoriaSelecionada(item.id)}
                  disabled={solicitando}
                >
                  <Text style={styles.emojiCategoria}>{item.emoji}</Text>

                  <View style={styles.infoCategoria}>
                    <View style={styles.topoCategoria}>
                      <Text style={styles.nomeCategoria}>{item.nome}</Text>
                      <Text style={styles.tempoCategoria}>
                        {item.tempoFormatado}
                      </Text>
                    </View>
                    <Text
                      style={styles.descCategoria}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.descricao}
                    </Text>
                  </View>

                  <Text style={styles.precoCategoria}>
                    {item.valorFormatado}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Botão de Solicitação */}
          <View style={styles.rodape}>
            <View style={styles.resumoRodape}>
              <Ionicons
                name="card-outline"
                size={18}
                color={cores.textoSecundario}
              />
              <Text style={styles.textoPagamento}>
                Pagamento no app • Dinheiro ou Cartão
              </Text>
            </View>

            <Botao
              titulo={`Solicitar ${categoriaAtual.nome} • ${categoriaAtual.valorFormatado}`}
              onPress={aoSolicitarViagem}
              carregando={solicitando}
              desabilitado={solicitando}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    tela: {
      flex: 1,
      backgroundColor: cores.fundo,
    },
    scroll: {
      flexGrow: 1,
      paddingBottom: 40,
    },
    conteudo: {
      width: "100%",
      maxWidth: 520,
      alignSelf: "center",
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    titulo: {
      fontSize: 26,
      fontWeight: "800",
      color: cores.textoPrincipal,
      letterSpacing: -0.5,
    },
    subtitulo: {
      fontSize: 14,
      color: cores.textoSecundario,
      marginTop: 4,
      marginBottom: 18,
    },
    cardRotas: {
      position: "relative",
      flexDirection: "row",
      backgroundColor: cores.superficie,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: cores.borda,
      padding: 16,
    },
    pontoOrigem: {
      position: "absolute",
      left: 20,
      top: 30,
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: cores.textoPrincipal,
    },
    linhaConexao: {
      position: "absolute",
      left: 24,
      top: 42,
      width: 2,
      height: 48,
      backgroundColor: cores.borda,
    },
    pontoDestino: {
      position: "absolute",
      left: 20,
      top: 92,
      width: 10,
      height: 10,
      borderRadius: 2,
      backgroundColor: cores.destaque,
    },
    inputsRotas: {
      flex: 1,
      marginLeft: 26,
    },
    blocoInput: {
      paddingVertical: 4,
    },
    rotuloInput: {
      fontSize: 11,
      fontWeight: "700",
      color: cores.textoSecundario,
      textTransform: "uppercase",
      marginBottom: 2,
    },
    input: {
      fontSize: 15,
      fontWeight: "600",
      color: cores.textoPrincipal,
      paddingVertical: 2,
    },
    divisorRotas: {
      height: 1,
      backgroundColor: cores.borda,
      marginVertical: 8,
    },
    textoErro: {
      color: "#e11900",
      fontSize: 13,
      fontWeight: "500",
      marginTop: 10,
      marginBottom: 4,
    },
    tituloCategorias: {
      fontSize: 18,
      fontWeight: "700",
      color: cores.textoPrincipal,
      marginTop: 22,
      marginBottom: 12,
    },
    listaCategorias: {
      gap: 10,
    },
    itemCategoria: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: cores.superficie,
      borderRadius: 14,
      borderWidth: 2,
      borderColor: "transparent",
      padding: 14,
      gap: 12,
    },
    itemCategoriaAtivo: {
      borderColor: cores.textoPrincipal,
      backgroundColor: cores.superficieClara,
    },
    emojiCategoria: {
      fontSize: 32,
    },
    infoCategoria: {
      flex: 1,
    },
    topoCategoria: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    nomeCategoria: {
      fontSize: 16,
      fontWeight: "700",
      color: cores.textoPrincipal,
    },
    tempoCategoria: {
      fontSize: 12,
      color: cores.textoSecundario,
      fontWeight: "600",
    },
    descCategoria: {
      fontSize: 12,
      color: cores.textoSecundario,
      marginTop: 2,
    },
    precoCategoria: {
      fontSize: 16,
      fontWeight: "800",
      color: cores.textoPrincipal,
    },
    rodape: {
      marginTop: 24,
      gap: 12,
    },
    resumoRodape: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
    },
    textoPagamento: {
      fontSize: 12,
      color: cores.textoSecundario,
      fontWeight: "500",
    },
  });
