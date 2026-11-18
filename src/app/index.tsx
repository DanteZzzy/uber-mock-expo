import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useAuth } from "../context/AuthContext";
import { useTema } from "../theme/TemaContext";

export default function Index() {
  const { usuario, carregado } = useAuth();
  const { cores } = useTema();

  if (!carregado) {
    return (
      <View style={[styles.centro, { backgroundColor: cores.fundo }]}>
        <ActivityIndicator size="large" color={cores.textoPrincipal} />
      </View>
    );
  }

  return <Redirect href={usuario ? "/home" : "/login"} />;
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
