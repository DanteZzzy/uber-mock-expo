
import { useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import type { ResultadoFetch } from "../hooks/useFetch";
import { useTema } from "../theme/TemaContext";
import type { Cores } from "../theme/temas";
import type { Usuario } from "../types";

import CardMotorista from "./CardMotorista";
import EstadoCarregando from "./EstadoCarregando";
import EstadoErro from "./EstadoErro";
import EstadoVazio from "./EstadoVazio";

type Props = {
  motoristas: ResultadoFetch<Usuario[]>;
};

export default function SecaoMotoristas({ motoristas }: Props) {
  const { dados, loading, erro, recarregar } = motoristas;
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  return (
    <View style={styles.secao}>
      <Text style={styles.titulo}>Motoristas perto de você</Text>

      {loading ? (
        <EstadoCarregando />
      ) : erro ? (
        <EstadoErro mensagem={erro} onTentarDeNovo={recarregar} />
      ) : !dados || dados.length === 0 ? (
        <EstadoVazio mensagem="Nenhum motorista disponível agora." />
      ) : (
        <FlatList
          horizontal
          data={dados}
          keyExtractor={(usuario) => String(usuario.id)}
          renderItem={({ item }) => <CardMotorista usuario={item} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.lista}
        />
      )}
    </View>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    secao: {
      marginTop: 24,
    },
    titulo: {
      color: cores.textoPrincipal,
      fontSize: 20,
      fontWeight: "800",
      marginBottom: 12,
    },
    lista: {
      gap: 12,
      paddingRight: 8,
    },
  });
