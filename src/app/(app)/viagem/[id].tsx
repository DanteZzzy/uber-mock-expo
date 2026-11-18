import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { BotaoPilula } from "../../../components/BotaoPilula";
import {
  atividadeDestaque,
  atividadesAnteriores,
} from "../../../data/atividades";
import { CHAVE_PEDIDOS } from "../../../data/restaurantes";
import { useArmazenamento } from "../../../hooks/useArmazenamento";
import { useTema } from "../../../theme/TemaContext";
import type { Cores } from "../../../theme/temas";
import type { PedidoSalvo, ViagemSalva } from "../../../types";
import { formatarMoeda } from "../../../utils/formatacao";

const todasAtividadesEstaticas = [atividadeDestaque, ...atividadesAnteriores];

export default function DetalheViagem() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  // Carrega viagens salvas no AsyncStorage
  const [viagensSalvas, , viagensCarregadas] = useArmazenamento<ViagemSalva[]>(
    "@uber_viagens",
    [],
  );
  const [pedidosSalvos, , pedidosCarregados] = useArmazenamento<PedidoSalvo[]>(
    CHAVE_PEDIDOS,
    [],
  );

  // Busca primeiro nas viagens salvas localmente
  const viagemStorage = viagensSalvas.find((item) => item.id === id);

  // Busca nas atividades mockadas se não achar no storage
  const atividadeEstatica = todasAtividadesEstaticas.find(
    (item) => item.id === id,
  );

  const pedido = pedidosSalvos.find((item) => item.id === id);

  // Espera a leitura do armazenamento para não piscar "não encontrada"
  if (!viagensCarregadas || !pedidosCarregados) {
    return <View style={styles.vazio} />;
  }

  if (!viagemStorage && !atividadeEstatica && !pedido) {
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

  // Linhas para exibição detalhada
  const tituloDestino = pedido
    ? pedido.restauranteNome
    : viagemStorage
      ? viagemStorage.destino
      : atividadeEstatica!.destino;

  const linhas = pedido
    ? [
        {
          rotulo: "Itens",
          valor: pedido.itens
            .map((item) => `${item.quantidade}x ${item.nome}`)
            .join("\n"),
        },
        { rotulo: "Subtotal", valor: formatarMoeda(pedido.subtotal) },
        { rotulo: "Taxa de entrega", valor: formatarMoeda(pedido.taxaEntrega) },
        { rotulo: "Total", valor: formatarMoeda(pedido.total) },
        { rotulo: "Data e Horário", valor: pedido.data },
        {
          rotulo: "Código do Pedido",
          valor: pedido.postId ? `API #${pedido.postId}` : pedido.id,
        },
      ]
    : viagemStorage
    ? [
        { rotulo: "Origem", valor: viagemStorage.origem },
        { rotulo: "Destino", valor: viagemStorage.destino },
        { rotulo: "Categoria", valor: viagemStorage.categoria },
        {
          rotulo: "Status",
          valor:
            viagemStorage.status === "concluida"
              ? "Concluída"
              : "Cancelada",
        },
        { rotulo: "Data e Horário", valor: viagemStorage.data },
        { rotulo: "Valor", valor: viagemStorage.valor },
        ...(viagemStorage.motorista
          ? [
              {
                rotulo: "Motorista",
                valor: viagemStorage.motorista.nome,
              },
              {
                rotulo: "Veículo",
                valor: `${viagemStorage.motorista.veiculo} (${viagemStorage.motorista.placa})`,
              },
            ]
          : []),
        {
          rotulo: "Código da Solicitação",
          valor: viagemStorage.postId
            ? `API #${viagemStorage.postId}`
            : viagemStorage.id,
        },
      ]
    : [
        { rotulo: "Data", valor: atividadeEstatica!.data },
        { rotulo: "Valor", valor: atividadeEstatica!.valor },
        ...(atividadeEstatica!.detalhe
          ? [{ rotulo: "Observação", valor: atividadeEstatica!.detalhe }]
          : []),
        { rotulo: "Código", valor: atividadeEstatica!.id },
      ];

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      {pedido && <Stack.Screen options={{ title: "Detalhes do pedido" }} />}
      <View style={styles.coluna}>
        <View style={styles.cabecalho}>
          <View style={styles.miniatura}>
            <Text style={styles.emoji}>{pedido ? "🍔" : "🚗"}</Text>
          </View>
          <Text style={styles.titulo}>{tituloDestino}</Text>
        </View>

        {linhas.map((linha) => (
          <View key={linha.rotulo} style={styles.linha}>
            <Text style={styles.rotulo}>{linha.rotulo}</Text>
            <Text style={styles.valor}>{linha.valor}</Text>
          </View>
        ))}

        {/* Botão de ver motorista parceiro caso a viagem possua motorista atribuído */}
        {viagemStorage?.motorista && (
          <Pressable
            style={styles.botaoMotorista}
            onPress={() =>
              router.push(`/motorista/${viagemStorage.motorista!.id}`)
            }
          >
            <Ionicons
              name="person-circle-outline"
              size={20}
              color={cores.textoPrincipal}
            />
            <Text style={styles.textoBotaoMotorista}>
              Ver perfil de {viagemStorage.motorista.nome}
            </Text>
          </Pressable>
        )}
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
      fontSize: 24,
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
      fontSize: 15,
      flex: 1,
    },
    valor: {
      color: cores.textoPrincipal,
      fontSize: 15,
      fontWeight: "600",
      flex: 1.5,
      textAlign: "right",
    },
    botaoMotorista: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: cores.superficieClara,
      borderRadius: 12,
      paddingVertical: 14,
      marginTop: 24,
      borderWidth: 1,
      borderColor: cores.borda,
    },
    textoBotaoMotorista: {
      color: cores.textoPrincipal,
      fontSize: 15,
      fontWeight: "700",
    },
  });
