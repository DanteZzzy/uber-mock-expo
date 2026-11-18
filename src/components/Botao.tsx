import { ReactNode } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

type Props = {
  titulo: string;
  onPress?: () => void;
  variante?: "primario" | "social";
  icone?: ReactNode;
  desabilitado?: boolean;
  carregando?: boolean;
};

export function Botao({
  titulo,
  onPress,
  variante = "primario",
  icone,
  desabilitado = false,
  carregando = false,
}: Props) {
  const primario = variante === "primario";
  const bloqueado = desabilitado || carregando;

  return (
    <Pressable
      onPress={bloqueado ? undefined : onPress}
      disabled={bloqueado}
      style={({ pressed }) => [
        styles.base,
        primario ? styles.primario : styles.social,
        bloqueado && styles.desabilitado,
        pressed && !bloqueado && styles.pressionado,
      ]}
    >
      {carregando ? (
        <ActivityIndicator
          size="small"
          color={primario ? "#fff" : "#000"}
        />
      ) : (
        <>
          {icone}
          <Text style={[styles.texto, primario && styles.textoPrimario]}>
            {titulo}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 8,
    paddingVertical: 14,
  },
  primario: {
    backgroundColor: "#111",
  },
  social: {
    backgroundColor: "#eee",
  },
  desabilitado: {
    opacity: 0.6,
  },
  pressionado: {
    opacity: 0.8,
  },
  texto: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  textoPrimario: {
    color: "#fff",
  },
});
