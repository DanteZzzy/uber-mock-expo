import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CartaoAviso } from "../../components/atividade/CartaoAviso";
import { CartaoDestaque } from "../../components/atividade/CartaoDestaque";
import { ItemAtividade } from "../../components/atividade/ItemAtividade";
import { Container } from "../../components/Container";
import {
  atividadeDestaque,
  atividadesAnteriores,
  avisoAtividade,
} from "../../data/atividades";
import { cores } from "../../theme/cores";

export default function Atividade() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 120 }}
    >
      <Container larguraMaxima={480}>
        <Text style={styles.titulo}>Atividade</Text>

        <View style={styles.cabecalhoSecao}>
          <Text style={styles.secao}>Anteriores</Text>
          <Pressable style={styles.filtro}>
            <Ionicons
              name="options-outline"
              size={22}
              color={cores.textoPrincipal}
            />
          </Pressable>
        </View>

        <CartaoAviso
          titulo={avisoAtividade.titulo}
          acao={avisoAtividade.acao}
          emoji={avisoAtividade.emoji}
        />

        <CartaoDestaque atividade={atividadeDestaque} />

        <View>
          {atividadesAnteriores.map((atividade) => (
            <ItemAtividade key={atividade.id} atividade={atividade} />
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
    marginBottom: 24,
  },
  cabecalhoSecao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
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
});