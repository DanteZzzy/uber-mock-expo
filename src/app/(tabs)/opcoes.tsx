import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Container } from "../../components/Container";
import { CartaoOpcao } from "../../components/opcoes/CartaoOpcao";
import { opcoesPrincipais, opcoesSecundarias } from "../../data/opcoes";
import { cores } from "../../theme/cores";

export default function Opcoes() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 120 }}
    >
      <Container larguraMaxima={480}>
        <Text style={styles.titulo}>Opções</Text>
        <Text style={styles.subtitulo}>
          Vá para onde quiser, peça o que precisar
        </Text>

        <View style={styles.linha}>
          {opcoesPrincipais.map((opcao) => (
            <CartaoOpcao key={opcao.id} opcao={opcao} />
          ))}
        </View>

        <View style={styles.linha}>
          {opcoesSecundarias.map((opcao) => (
            <CartaoOpcao key={opcao.id} opcao={opcao} />
          ))}
        </View>
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
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
});