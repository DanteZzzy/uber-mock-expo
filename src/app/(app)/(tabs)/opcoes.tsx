import { useRouter } from "expo-router";
import { useMemo } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CartaoOpcao } from "../../../components/opcoes/CartaoOpcao";
import { opcoesPrincipais, opcoesSecundarias } from "../../../data/opcoes";
import { useTema } from "../../../theme/TemaContext";
import type { Cores } from "../../../theme/temas";

const LARGURA_MAXIMA_DESKTOP = 900;
const COLUNAS = 4;
const ESPACO = 16;

const todasOpcoes = [...opcoesPrincipais, ...opcoesSecundarias];

export default function Opcoes() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const desktop = width >= 900;
  const router = useRouter();

  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  const larguraConteudo = Math.min(width - 24, LARGURA_MAXIMA_DESKTOP) - 40;
  const larguraCartao = Math.floor(
    (larguraConteudo - ESPACO * (COLUNAS - 1)) / COLUNAS,
  );

  function mostrarAviso(titulo: string, mensagem: string) {
    if (Platform.OS === "web") {
      window.alert(`${titulo}\n\n${mensagem}`);
    } else {
      Alert.alert(titulo, mensagem);
    }
  }

  function aoTocarOpcao(id: string) {
    if (id === "viagem") {
      router.push({
        pathname: "/pedir-viagem",
        params: { categoria: "uber" },
      });
    } else if (id === "moto") {
      router.push({
        pathname: "/pedir-viagem",
        params: { categoria: "moto" },
      });
    } else if (id === "reserve") {
      router.push({
        pathname: "/pedir-viagem",
        params: { categoria: "comfort" },
      });
    } else if (id === "comida") {
      router.push({
        pathname: "/home",
        params: { aba: "ifood" },
      });
    } else if (id === "enviar") {
      router.push("/enviar");
    } else if (id === "teens") {
      mostrarAviso(
        "Uber Teens",
        "Contas exclusivas para jovens de 13 a 17 anos com recursos de segurança e acompanhamento ao vivo pelos responsáveis.",
      );
    } else if (id === "seniors") {
      mostrarAviso(
        "Uber Seniors",
        "Serviço com assistência dedicada e veículos com acessibilidade facilitada.",
      );
    }
  }

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={{
        paddingTop: insets.top + (desktop ? 32 : 36),
        paddingBottom: 120,
      }}
    >
      <View
        style={[
          styles.conteudo,
          { maxWidth: desktop ? LARGURA_MAXIMA_DESKTOP : 480 },
        ]}
      >
        <Text style={styles.titulo}>Opções</Text>
        <Text style={styles.subtitulo}>
          Vá para onde quiser, peça o que precisar
        </Text>

        {desktop ? (
          <View style={styles.grade}>
            {todasOpcoes.map((opcao) => (
              <CartaoOpcao
                key={opcao.id}
                opcao={opcao}
                style={{ width: larguraCartao }}
                onPress={() => aoTocarOpcao(opcao.id)}
              />
            ))}
          </View>
        ) : (
          <>
            <View style={styles.linha}>
              {opcoesPrincipais.map((opcao) => (
                <CartaoOpcao
                  key={opcao.id}
                  opcao={opcao}
                  style={styles.cartaoFlex}
                  onPress={() => aoTocarOpcao(opcao.id)}
                />
              ))}
            </View>

            <View style={styles.linha}>
              {opcoesSecundarias.map((opcao) => (
                <CartaoOpcao
                  key={opcao.id}
                  opcao={opcao}
                  style={styles.cartaoFlex}
                  onPress={() => aoTocarOpcao(opcao.id)}
                />
              ))}
            </View>
          </>
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
    subtitulo: {
      color: cores.textoPrincipal,
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 32,
    },
    linha: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 28,
    },
    cartaoFlex: {
      flex: 1,
    },
    grade: {
      flexDirection: "row",
      flexWrap: "wrap",
      columnGap: ESPACO,
      rowGap: 32,
    },
  });