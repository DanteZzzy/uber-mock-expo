import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { api } from "../../../services/api";
import { useTema } from "../../../theme/TemaContext";
import type { Cores } from "../../../theme/temas";

export default function AvaliarMotorista() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  const [titulo, setTitulo] = useState("");
  const [comentario, setComentario] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function submeter() {
    if (!titulo.trim() || !comentario.trim() || enviando) return;

    setEnviando(true);
    try {
      await api.criarPost({
        title: titulo.trim(),
        body: comentario.trim(),
        userId: Number(id),
      });
    } catch {
      // tratamento com Alert na tarefa 38
    } finally {
      setEnviando(false);
    }
  }

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <View style={styles.coluna}>
        <Text style={styles.titulo}>Avaliar Motorista #{id}</Text>
        <Text style={styles.subtitulo}>
          Compartilhe sua experiência sobre a viagem realizada.
        </Text>

        <Text style={styles.rotulo}>Título da avaliação</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Excelente motorista, muito pontual"
          placeholderTextColor={cores.textoSecundario}
          value={titulo}
          onChangeText={setTitulo}
          editable={!enviando}
        />

        <Text style={styles.rotulo}>Comentário</Text>
        <TextInput
          style={[styles.input, styles.areaTexto]}
          placeholder="Conte mais detalhes sobre sua experiência..."
          placeholderTextColor={cores.textoSecundario}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={comentario}
          onChangeText={setComentario}
          editable={!enviando}
        />

        <Pressable
          style={[styles.botao, enviando && styles.botaoDesabilitado]}
          onPress={submeter}
          disabled={enviando}
        >
          {enviando ? (
            <ActivityIndicator size="small" color={cores.fundo} />
          ) : (
            <Text style={styles.textoBotao}>Enviar avaliação</Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    tela: {
      flex: 1,
      backgroundColor: cores.fundo,
    },
    conteudo: {
      paddingTop: 24,
      paddingBottom: 40,
      paddingHorizontal: 20,
    },
    coluna: {
      width: "100%",
      maxWidth: 480,
      alignSelf: "center",
    },
    titulo: {
      color: cores.textoPrincipal,
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 8,
    },
    subtitulo: {
      color: cores.textoSecundario,
      fontSize: 14,
      marginBottom: 24,
    },
    rotulo: {
      color: cores.textoPrincipal,
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 8,
    },
    input: {
      backgroundColor: cores.superficie,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: cores.textoPrincipal,
      marginBottom: 20,
    },
    areaTexto: {
      height: 120,
    },
    botao: {
      backgroundColor: cores.textoPrincipal,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 8,
    },
    botaoDesabilitado: {
      opacity: 0.6,
    },
    textoBotao: {
      color: cores.fundo,
      fontSize: 16,
      fontWeight: "700",
    },
  });
