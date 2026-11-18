import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useArmazenamento } from "../../hooks/useArmazenamento";
import { useTema } from "../../theme/TemaContext";
import type { Cores } from "../../theme/temas";

type CartaoCarteira = {
  id: string;
  apelido: string;
  final: string;
  bandeira: "visa" | "mastercard" | "elo";
};

const SALDO_FIXO = "R$ 47,50";

const BANDEIRAS: CartaoCarteira["bandeira"][] = ["visa", "mastercard", "elo"];

export default function Carteira() {
  const insets = useSafeAreaInsets();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  const [cartoes, salvarCartoes] = useArmazenamento<CartaoCarteira[]>(
    "@uber_cartoes",
    [],
  );

  const [modalVisivel, setModalVisivel] = useState(false);
  const [apelido, setApelido] = useState("");
  const [final, setFinal] = useState("");
  const [bandeiraSelecionada, setBandeiraSelecionada] =
    useState<CartaoCarteira["bandeira"]>("visa");

  function abrirModal() {
    setApelido("");
    setFinal("");
    setBandeiraSelecionada("visa");
    setModalVisivel(true);
  }

  function fecharModal() {
    setModalVisivel(false);
  }

  function confirmarAdicao() {
    const apelidoTrim = apelido.trim();
    const finalTrim = final.trim();

    if (!apelidoTrim) {
      Alert.alert("Campo obrigatório", "Informe um apelido para o cartão.");
      return;
    }
    if (finalTrim.length !== 4 || !/^\d{4}$/.test(finalTrim)) {
      Alert.alert(
        "Campo inválido",
        "Informe exatamente 4 dígitos para o final do cartão.",
      );
      return;
    }

    const novoCartao: CartaoCarteira = {
      id: Date.now().toString(),
      apelido: apelidoTrim,
      final: finalTrim,
      bandeira: bandeiraSelecionada,
    };

    salvarCartoes((anteriores) => [...anteriores, novoCartao]);
    fecharModal();
  }

  function removerCartao(id: string) {
    salvarCartoes((anteriores) => anteriores.filter((c) => c.id !== id));
  }

  return (
    <View style={[styles.tela, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={[styles.conteudo, { paddingBottom: insets.bottom + 24 }]}
      >
        {/* Saldo */}
        <View style={styles.cardSaldo}>
          <Text style={styles.labelSaldo}>Saldo disponível</Text>
          <Text style={styles.valorSaldo}>{SALDO_FIXO}</Text>
        </View>

        {/* Título seção */}
        <Text style={styles.secaoTitulo}>Seus cartões</Text>

        {/* Estado vazio */}
        {cartoes.length === 0 && (
          <Text style={styles.textoVazio}>
            Nenhum cartão adicionado ainda.
          </Text>
        )}

        {/* Lista de cartões */}
        {cartoes.map((cartao) => (
          <View key={cartao.id} style={styles.cartao}>
            <View style={styles.cartaoInfo}>
              <Ionicons
                name="card-outline"
                size={22}
                color={cores.destaque}
                style={styles.cartaoIcone}
              />
              <View>
                <Text style={styles.cartaoApelido}>{cartao.apelido}</Text>
                <Text style={styles.cartaoDetalhe}>
                  {cartao.bandeira.toUpperCase()} •••• {cartao.final}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => removerCartao(cartao.id)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close-circle" size={22} color={cores.textoSecundario} />
            </TouchableOpacity>
          </View>
        ))}

        {/* Botão adicionar */}
        <TouchableOpacity style={styles.botaoAdicionar} onPress={abrirModal} activeOpacity={0.8}>
          <Ionicons name="add" size={20} color={cores.fundo} style={{ marginRight: 6 }} />
          <Text style={styles.botaoAdicionarTexto}>Adicionar cartão</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de novo cartão */}
      <Modal
        visible={modalVisivel}
        animationType="slide"
        transparent
        onRequestClose={fecharModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { paddingBottom: insets.bottom + 16 }]}>
            <Text style={styles.modalTitulo}>Novo cartão</Text>

            <Text style={styles.inputLabel}>Apelido</Text>
            <TextInput
              style={styles.input}
              placeholder='Ex: Meu Nubank'
              placeholderTextColor={cores.textoSecundario}
              value={apelido}
              onChangeText={setApelido}
            />

            <Text style={styles.inputLabel}>Últimos 4 dígitos</Text>
            <TextInput
              style={styles.input}
              placeholder='0000'
              placeholderTextColor={cores.textoSecundario}
              value={final}
              onChangeText={setFinal}
              keyboardType="number-pad"
              maxLength={4}
            />

            <Text style={styles.inputLabel}>Bandeira</Text>
            <View style={styles.bandeiras}>
              {BANDEIRAS.map((b) => (
                <TouchableOpacity
                  key={b}
                  style={[
                    styles.bandeiraBotao,
                    bandeiraSelecionada === b && styles.bandeiraSelecionada,
                  ]}
                  onPress={() => setBandeiraSelecionada(b)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.bandeiraTexto,
                      bandeiraSelecionada === b && styles.bandeiraTextoSelecionado,
                    ]}
                  >
                    {b.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.botaoConfirmar}
              onPress={confirmarAdicao}
              activeOpacity={0.8}
            >
              <Text style={styles.botaoConfirmarTexto}>Confirmar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoCancelar} onPress={fecharModal} activeOpacity={0.8}>
              <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    tela: {
      flex: 1,
      backgroundColor: cores.fundo,
    },
    conteudo: {
      paddingHorizontal: 20,
      paddingTop: 24,
      maxWidth: 480,
      width: "100%",
      alignSelf: "center",
    },
    cardSaldo: {
      backgroundColor: cores.destaque,
      borderRadius: 16,
      paddingVertical: 28,
      paddingHorizontal: 24,
      marginBottom: 28,
      alignItems: "center",
    },
    labelSaldo: {
      fontSize: 14,
      color: "#fff",
      opacity: 0.85,
      marginBottom: 6,
    },
    valorSaldo: {
      fontSize: 36,
      fontWeight: "800",
      color: "#fff",
    },
    secaoTitulo: {
      fontSize: 17,
      fontWeight: "700",
      color: cores.textoPrincipal,
      marginBottom: 12,
    },
    textoVazio: {
      fontSize: 14,
      color: cores.textoSecundario,
      marginBottom: 20,
    },
    cartao: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: cores.superficie,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 16,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: cores.borda,
    },
    cartaoInfo: {
      flexDirection: "row",
      alignItems: "center",
    },
    cartaoIcone: {
      marginRight: 12,
    },
    cartaoApelido: {
      fontSize: 15,
      fontWeight: "600",
      color: cores.textoPrincipal,
    },
    cartaoDetalhe: {
      fontSize: 12,
      color: cores.textoSecundario,
      marginTop: 2,
    },
    botaoAdicionar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: cores.destaque,
      borderRadius: 12,
      paddingVertical: 14,
      marginTop: 8,
    },
    botaoAdicionarTexto: {
      fontSize: 15,
      fontWeight: "700",
      color: "#fff",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end",
    },
    modalBox: {
      backgroundColor: cores.fundo,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    modalTitulo: {
      fontSize: 18,
      fontWeight: "700",
      color: cores.textoPrincipal,
      marginBottom: 20,
      textAlign: "center",
    },
    inputLabel: {
      fontSize: 13,
      fontWeight: "600",
      color: cores.textoSecundario,
      marginBottom: 6,
    },
    input: {
      backgroundColor: cores.superficie,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: cores.borda,
      paddingVertical: 12,
      paddingHorizontal: 14,
      fontSize: 15,
      color: cores.textoPrincipal,
      marginBottom: 16,
    },
    bandeiras: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 24,
    },
    bandeiraBotao: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: cores.borda,
      alignItems: "center",
      backgroundColor: cores.superficie,
    },
    bandeiraSelecionada: {
      backgroundColor: cores.destaque,
      borderColor: cores.destaque,
    },
    bandeiraTexto: {
      fontSize: 13,
      fontWeight: "700",
      color: cores.textoSecundario,
    },
    bandeiraTextoSelecionado: {
      color: "#fff",
    },
    botaoConfirmar: {
      backgroundColor: cores.destaque,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: "center",
      marginBottom: 10,
    },
    botaoConfirmarTexto: {
      fontSize: 15,
      fontWeight: "700",
      color: "#fff",
    },
    botaoCancelar: {
      paddingVertical: 12,
      alignItems: "center",
    },
    botaoCancelarTexto: {
      fontSize: 15,
      color: cores.textoSecundario,
    },
  });
