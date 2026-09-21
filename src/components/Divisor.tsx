import { StyleSheet, Text, View } from "react-native";

export function Divisor({ texto = "ou" }: { texto?: string }) {
  return (
    <View style={styles.divisor}>
      <View style={styles.linha} />
      <Text style={styles.texto}>{texto}</Text>
      <View style={styles.linha} />
    </View>
  );
}

const styles = StyleSheet.create({
  divisor: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  linha: {
    flex: 1,
    height: 1,
    backgroundColor: "#999",
  },
  texto: {
    marginHorizontal: 12,
    color: "#6b6b6b",
  },
});