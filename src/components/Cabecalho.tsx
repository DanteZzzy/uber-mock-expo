import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Cabecalho() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const paddingHorizontal = width >= 768 ? 48 : 20;

  return (
    <View
      style={[styles.header, { paddingTop: insets.top + 12, paddingHorizontal }]}
    >
      <Text style={styles.logo}>Uber</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#000",
    paddingBottom: 16,
  },
  logo: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
});