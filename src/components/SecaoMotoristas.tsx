import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import type { ResultadoFetch } from "../../hooks/useFetch";
import { useTema } from "../../theme/TemaContext";
import type { Cores } from "../../theme/temas";
import type { Usuario } from "../../types";
import EstadoCarregando from "../EstadoCarregando";
import EstadoErro from "../EstadoErro";
import EstadoVazio from "../EstadoVazio";

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

      {/* os 4 estados: carregando -> erro -> vazio -> sucesso */}
      {loading ? (
        <EstadoCarregando />
      ) : erro ? (
        <EstadoErro mensagem={erro} onTentarDeNovo={recarregar} />
      ) : !dados || dados.length === 0 ? (
        <EstadoVazio mensagem="Nenhum motorista disponível agora." />
      ) : (
        <Text style={styles.provisorio}>{dados.length} motoristas encontrados</Text>
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
    provisorio: {
      color: cores.textoSecundario,
      fontSize: 14,
    },
  });