import { StyleSheet, Text, View } from "react-native";
import { cores } from "../../theme/cores";

export default function Home() {
  return (
    <View style={styles.tela}>
      <Text style={styles.texto}>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.fundo,
  },
  texto: { color: cores.textoPrincipal, fontSize: 20 },
});