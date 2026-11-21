import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import EstadoCarregando from "../../components/EstadoCarregando";
import EstadoErro from "../../components/EstadoErro";
import EstadoVazio from "../../components/EstadoVazio";
import { useArmazenamento } from "../../hooks/useArmazenamento";
import { useFetch } from "../../hooks/useFetch";
import { api } from "../../services/api";
import { useTema } from "../../theme/TemaContext";
import type { Cores } from "../../theme/temas";
import type { MotoristaViagem, ViagemSalva } from "../../types";
import { iniciais } from "../../utils/iniciais";

type EstagioViagem = "buscando" | "a_caminho" | "em_andamento" | "chegou";

function formatarDataAtual() {
  const agora = new Date();
  const mes = agora
    .toLocaleString("pt-BR", { month: "short" })
    .replace(".", "");
  const hora = agora.getHours().toString().padStart(2, "0");
  const minuto = agora.getMinutes().toString().padStart(2, "0");
  return `${agora.getDate()} de ${mes} • ${hora}:${minuto}`;
}

export default function AcompanharViagem() {
  const params = useLocalSearchParams<{
    id: string;
    origem: string;
    destino: string;
    categoria: string;
    valor: string;
    tempo: string;
    postId?: string;
  }>();

  const router = useRouter();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  const {
    dados: motoristas,
    loading: loadingApi,
    erro: erroApi,
    recarregar,
  } = useFetch(api.usuarios);

  const [, setViagens] = useArmazenamento<ViagemSalva[]>("@uber_viagens", []);

  const [estagio, setEstagio] = useState<EstagioViagem>("buscando");
  const [motoristaAtribuido, setMotoristaAtribuido] =
    useState<MotoristaViagem | null>(null);
  const [tempoRestanteMin, setTempoRestanteMin] = useState(4);
  const [processandoAcao, setProcessandoAcao] = useState(false);

  useEffect(() => {
    if (motoristas && motoristas.length > 0 && !motoristaAtribuido) {
      const idx = Math.floor(Math.random() * motoristas.length);
      const selecionado = motoristas[idx];

      const veiculos = [
        "Chevrolet Onix • Prata",
        "Hyundai HB20 • Preto",
        "Toyota Corolla • Branco",
        "Honda Civic • Cinza",
        "Honda CG 160 • Vermelha",
      ];
      const placas = ["ABC-4E12", "BRA-2E19", "RIO-9X31", "KLU-7H80"];

      setMotoristaAtribuido({
        id: selecionado.id,
        nome: selecionado.name,
        telefone: selecionado.phone,
        veiculo: veiculos[Math.floor(Math.random() * veiculos.length)],
        placa: placas[Math.floor(Math.random() * placas.length)],
        avaliacao: 4.95,
      });
    }
  }, [motoristas, motoristaAtribuido]);

  useEffect(() => {
    if (estagio === "buscando") {
      const timer = setTimeout(() => {
        setEstagio("a_caminho");
      }, 2500);
      return () => clearTimeout(timer);
    }

    if (estagio === "a_caminho") {
      const timer = setTimeout(() => {
        setEstagio("em_andamento");
        setTempoRestanteMin(2);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [estagio]);

  async function executarCancelamento() {
    setProcessandoAcao(true);
    try {
      const viagemCancelada: ViagemSalva = {
        id: params.id || `v_${Date.now()}`,
        origem: params.origem || "Origem não informada",
        destino: params.destino || "Destino não informado",
        categoria: params.categoria || "UberX",
        valor: "R$ 0,00",
        data: formatarDataAtual(),
        detalhe: "Cancelada",
        status: "cancelada",
        motorista: motoristaAtribuido ?? undefined,
        postId: params.postId ? Number(params.postId) : undefined,
      };

      await setViagens((anteriores) => [
        viagemCancelada,
        ...anteriores.filter((v) => v.id !== viagemCancelada.id),
      ]);

      router.replace("/atividade");
    } finally {
      setProcessandoAcao(false);
    }
  }

  function confirmarCancelamento() {
    if (Platform.OS === "web") {
      const confirmou = window.confirm(
        "Tem certeza que deseja cancelar a solicitação?",
      );
      if (confirmou) {
        executarCancelamento();
      }
      return;
    }

    Alert.alert(
      "Cancelar viagem",
      "Tem certeza que deseja cancelar a solicitação?",
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim, cancelar",
          style: "destructive",
          onPress: executarCancelamento,
        },
      ],
    );
  }

  async function concluirViagem() {
    setProcessandoAcao(true);
    try {
      const idViagem = params.id || `v_${Date.now()}`;
      const viagemConcluida: ViagemSalva = {
        id: idViagem,
        origem: params.origem || "Origem não informada",
        destino: params.destino || "Destino não informado",
        categoria: params.categoria || "UberX",
        valor: params.valor || "R$ 0,00",
        data: formatarDataAtual(),
        detalhe: "Concluída",
        status: "concluida",
        motorista: motoristaAtribuido ?? undefined,
        postId: params.postId ? Number(params.postId) : undefined,
      };

      await setViagens((anteriores) => [
        viagemConcluida,
        ...anteriores.filter((v) => v.id !== idViagem),
      ]);

      if (Platform.OS === "web") {
        window.alert("Viagem Concluída! Você chegou ao seu destino.");
        router.replace(`/viagem/${idViagem}`);
        return;
      }

      Alert.alert("Viagem Concluída!", "Você chegou ao seu destino.", [
        {
          text: "Ver Detalhes",
          onPress: () => router.replace(`/viagem/${idViagem}`),
        },
      ]);
    } finally {
      setProcessandoAcao(false);
    }
  }

  if (loadingApi) {
    return (
      <View style={styles.telaCentral}>
        <EstadoCarregando mensagem="Conectando à rede de motoristas parceiros..." />
      </View>
    );
  }

  if (erroApi) {
    return (
      <View style={styles.telaCentral}>
        <EstadoErro
          mensagem={`Falha ao buscar motoristas: ${erroApi}`}
          onTentarDeNovo={recarregar}
        />
      </View>
    );
  }

  if (!motoristas || motoristas.length === 0) {
    return (
      <View style={styles.telaCentral}>
        <EstadoVazio mensagem="Nenhum motorista parceiro disponível no momento." />
      </View>
    );
  }

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.scroll}>
      <View style={styles.conteudo}>
        <View style={styles.mapaSimulado}>
          <Ionicons
            name="navigate-circle"
            size={48}
            color={cores.textoPrincipal}
          />
          <Text style={styles.textoMapa}>
            {estagio === "buscando"
              ? "Localizando o motorista mais próximo..."
              : estagio === "a_caminho"
                ? `Motorista a caminho (${tempoRestanteMin} min)`
                : "Em rota para o destino"}
          </Text>
          <View style={styles.animacaoBarra}>
            <ActivityIndicator size="small" color={cores.textoPrincipal} />
          </View>
        </View>

        <View style={styles.cardStatus}>
          <View style={styles.cabecalhoStatus}>
            <View>
              <Text style={styles.tituloStatus}>
                {estagio === "buscando"
                  ? "Procurando motoristas..."
                  : estagio === "a_caminho"
                    ? "Motorista a caminho"
                    : "Em viagem"}
              </Text>
              <Text style={styles.subtituloStatus}>
                Previsão de chegada: {tempoRestanteMin} minutos
              </Text>
            </View>
            <View style={styles.badgeCategoria}>
              <Text style={styles.textoBadge}>{params.categoria}</Text>
            </View>
          </View>

          {motoristaAtribuido && (
            <View style={styles.blocoMotorista}>
              <View style={styles.avatarMotorista}>
                <Text style={styles.iniciaisMotorista}>
                  {iniciais(motoristaAtribuido.nome)}
                </Text>
              </View>

              <View style={styles.infoMotorista}>
                <Text style={styles.nomeMotorista}>
                  {motoristaAtribuido.nome}
                </Text>
                <Text style={styles.veiculoMotorista}>
                  {motoristaAtribuido.veiculo}
                </Text>
                <View style={styles.linhaPlaca}>
                  <Text style={styles.placaMotorista}>
                    {motoristaAtribuido.placa}
                  </Text>
                  <Text style={styles.notaMotorista}>
                    ⭐ {motoristaAtribuido.avaliacao}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.botaoLigar}
                activeOpacity={0.7}
                onPress={() => {
                  const msg = `Ligando para ${motoristaAtribuido.nome} (${motoristaAtribuido.telefone ?? "Sem número"})`;
                  if (Platform.OS === "web") {
                    window.alert(msg);
                  } else {
                    Alert.alert("Contato", msg);
                  }
                }}
              >
                <Ionicons
                  name="call"
                  size={20}
                  color={cores.textoPrincipal}
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.blocoTrajeto}>
            <View style={styles.linhaTrajeto}>
              <View style={styles.bolinhaOrigem} />
              <Text style={styles.textoTrajeto} numberOfLines={1}>
                {params.origem}
              </Text>
            </View>
            <View style={styles.linhaTrajeto}>
              <View style={styles.quadradoDestino} />
              <Text style={styles.textoTrajeto} numberOfLines={1}>
                {params.destino}
              </Text>
            </View>
          </View>

          <View style={styles.divisor} />

          <View style={styles.linhaPreco}>
            <Text style={styles.rotuloPreco}>Valor estimado:</Text>
            <Text style={styles.valorPreco}>{params.valor}</Text>
          </View>
        </View>

        <View style={styles.acoes}>
          {estagio === "em_andamento" ? (
            <TouchableOpacity
              style={styles.botaoConcluir}
              onPress={concluirViagem}
              disabled={processandoAcao}
              activeOpacity={0.8}
            >
              {processandoAcao ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.textoBotaoConcluir}>Concluir Viagem</Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.botaoAcelerar}
              onPress={() => setEstagio("em_andamento")}
              activeOpacity={0.8}
            >
              <Text style={styles.textoBotaoAcelerar}>
                Simular Início da Viagem
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.botaoCancelar}
            onPress={confirmarCancelamento}
            disabled={processandoAcao}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBotaoCancelar}>Cancelar Solicitação</Text>
          </TouchableOpacity>
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
    telaCentral: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: cores.fundo,
      padding: 20,
    },
    mapaSimulado: {
      height: 180,
      backgroundColor: cores.superficieClara,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: cores.borda,
      gap: 10,
    },
    textoMapa: {
      fontSize: 14,
      fontWeight: "600",
      color: cores.textoPrincipal,
      textAlign: "center",
      paddingHorizontal: 20,
    },
    animacaoBarra: {
      marginTop: 4,
    },
    cardStatus: {
      backgroundColor: cores.superficie,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: cores.borda,
      padding: 16,
      marginTop: 16,
    },
    cabecalhoStatus: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    tituloStatus: {
      fontSize: 20,
      fontWeight: "800",
      color: cores.textoPrincipal,
    },
    subtituloStatus: {
      fontSize: 13,
      color: cores.textoSecundario,
      marginTop: 2,
    },
    badgeCategoria: {
      backgroundColor: cores.superficieClara,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    textoBadge: {
      fontSize: 12,
      fontWeight: "700",
      color: cores.textoPrincipal,
    },
    blocoMotorista: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: cores.superficieClara,
      borderRadius: 12,
      padding: 12,
      marginTop: 16,
      gap: 12,
    },
    avatarMotorista: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: cores.textoPrincipal,
      alignItems: "center",
      justifyContent: "center",
    },
    iniciaisMotorista: {
      color: cores.fundo,
      fontSize: 16,
      fontWeight: "800",
    },
    infoMotorista: {
      flex: 1,
    },
    nomeMotorista: {
      fontSize: 15,
      fontWeight: "700",
      color: cores.textoPrincipal,
    },
    veiculoMotorista: {
      fontSize: 12,
      color: cores.textoSecundario,
      marginTop: 1,
    },
    linhaPlaca: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginTop: 2,
    },
    placaMotorista: {
      fontSize: 11,
      fontWeight: "700",
      color: cores.textoPrincipal,
      backgroundColor: cores.superficie,
      paddingHorizontal: 4,
      paddingVertical: 1,
      borderRadius: 4,
    },
    notaMotorista: {
      fontSize: 12,
      fontWeight: "600",
      color: cores.textoPrincipal,
    },
    botaoLigar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: cores.superficie,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: cores.borda,
    },
    blocoTrajeto: {
      marginTop: 16,
      gap: 8,
    },
    linhaTrajeto: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    bolinhaOrigem: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: cores.textoPrincipal,
    },
    quadradoDestino: {
      width: 8,
      height: 8,
      backgroundColor: cores.destaque,
      borderRadius: 1,
    },
    textoTrajeto: {
      flex: 1,
      fontSize: 13,
      color: cores.textoSecundario,
      fontWeight: "500",
    },
    divisor: {
      height: 1,
      backgroundColor: cores.borda,
      marginVertical: 14,
    },
    linhaPreco: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    rotuloPreco: {
      fontSize: 14,
      color: cores.textoSecundario,
      fontWeight: "500",
    },
    valorPreco: {
      fontSize: 18,
      fontWeight: "800",
      color: cores.textoPrincipal,
    },
    acoes: {
      marginTop: 20,
      gap: 10,
    },
    botaoConcluir: {
      backgroundColor: "#000",
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    textoBotaoConcluir: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "700",
    },
    botaoAcelerar: {
      backgroundColor: cores.superficieClara,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: cores.borda,
    },
    textoBotaoAcelerar: {
      color: cores.textoPrincipal,
      fontSize: 15,
      fontWeight: "600",
    },
    botaoCancelar: {
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    textoBotaoCancelar: {
      color: "#e11900",
      fontSize: 15,
      fontWeight: "600",
    },
  });