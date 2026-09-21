import { ReactNode } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";

type Props = {
  children: ReactNode;
  larguraMaxima?: number;
};

export function Container({ children, larguraMaxima = 368 }: Props) {
  const { width } = useWindowDimensions();
  const desktop = width >= 768;

  return (
    <View
      style={[
        styles.container,
        { maxWidth: larguraMaxima, marginTop: desktop ? 64 : 0 },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    padding: 20,
  },
});