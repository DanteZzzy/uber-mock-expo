import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CartaoOpcao } from "../../components/opcoes/CartaoOpcao";
import { opcoesPrincipais, opcoesSecundarias } from "../../data/opcoes";
import { cores } from "../../theme/cores";

const LARGURA_MAXIMA_DESKTOP = 900;
const COLUNAS = 4;
const ESPACO = 16;

const todasOpcoes = [...opcoesPrincipais, ...opcoesSecundarias];

export default function Opcoes() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const desktop = width >= 900;

  // largura útil da grade (descontando o recuo lateral de 20px de cada lado)
  const larguraConteudo = Math.min(width - 24, LARGURA_MAXIMA_DESKTOP) - 40;
  const larguraCartao = Math.floor(
    (larguraConteudo - ESPACO * (COLUNAS - 1)) / COLUNAS
  );

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
                />
              ))}
            </View>

            <View style={styles.linha}>
              {opcoesSecundarias.map((opcao) => (
                <CartaoOpcao
                  key={opcao.id}
                  opcao={opcao}
                  style={styles.cartaoFlex}
                />
              ))}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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