import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Botao } from "../../components/Botao";
import EstadoVazio from "../../components/EstadoVazio";
import { useArmazenamento } from "../../hooks/useArmazenamento";
import { api } from "../../services/api";
import { useTema } from "../../theme/TemaContext";
import type { Cores } from "../../theme/temas";
import type { EnderecoUsuario } from "../../types";

import { CHAVE_ENDERECOS, ENDERECOS_PADRAO } from "../../data/enderecos"; 

export default function EnderecosTela() {
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  // Persistência local no AsyncStorage conforme Seção 5
  const [enderecos, setEnderecos] = useArmazenamento<EnderecoUsuario[]>(
    "@uber_enderecos",
    ENDERECOS_PADRAO,
  );

  // Estados do formulário
  const [modoFormulario, setModoFormulario] = useState<"fechado" | "novo" | "editar">("fechado");
  const [idEdicao, setIdEdicao] = useState<string | null>(null);

  const [rotulo, setRotulo] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");

  const [buscandoCep, setBuscandoCep] = useState(false);
  const [erroForm, setErroForm] = useState("");

  function abrirNovoFormulario() {
    setRotulo("Outro");
    setCep("");
    setRua("");
    setNumero("");
    setComplemento("");
    setBairro("");
    setCidade("");
    setUf("");
    setErroForm("");
    setIdEdicao(null);
    setModoFormulario("novo");
  }

  function abrirEdicao(endereco: EnderecoUsuario) {
    setRotulo(endereco.rotulo);
    setCep(endereco.cep);
    setRua(endereco.rua);
    setNumero(endereco.numero);
    setComplemento(endereco.complemento ?? "");
    setBairro(endereco.bairro);
    setCidade(endereco.cidade);
    setUf(endereco.uf);
    setErroForm("");
    setIdEdicao(endereco.id);
    setModoFormulario("editar");
  }

  function fecharFormulario() {
    setModoFormulario("fechado");
    setIdEdicao(null);
    setErroForm("");
  }

  // Integração com API pública ViaCEP conforme Seção 4
  async function buscarCepViaCep() {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) {
      setErroForm("O CEP deve ter 8 dígitos (ex: 24730030).");
      return;
    }

    setBuscandoCep(true);
    setErroForm("");

    try {
      const dados = await api.viaCep(cepLimpo);
      if (dados.logradouro) setRua(dados.logradouro);
      if (dados.bairro) setBairro(dados.bairro);
      if (dados.localidade) setCidade(dados.localidade);
      if (dados.uf) setUf(dados.uf);
      if (dados.complemento && !complemento) setComplemento(dados.complemento);
    } catch (e) {
      setErroForm(
        e instanceof Error
          ? e.message
          : "Erro ao consultar o CEP. Verifique e tente de novo.",
      );
    } finally {
      setBuscandoCep(false);
    }
  }

  async function salvarEndereco() {
    if (!rotulo.trim() || !rua.trim() || !numero.trim() || !cidade.trim()) {
      setErroForm("Preencha o rótulo, a rua, o número e a cidade.");
      return;
    }

    const enderecoFormatado: EnderecoUsuario = {
      id: idEdicao ?? `end_${Date.now()}`,
      rotulo: rotulo.trim(),
      rua: rua.trim(),
      numero: numero.trim(),
      complemento: complemento.trim() ? complemento.trim() : undefined,
      bairro: bairro.trim(),
      cidade: cidade.trim(),
      uf: uf.trim().toUpperCase() || "BR",
      cep: cep.trim(),
    };

    if (modoFormulario === "novo") {
      await setEnderecos((anteriores) => [enderecoFormatado, ...anteriores]);
    } else {
      await setEnderecos((anteriores) =>
        anteriores.map((item) =>
          item.id === idEdicao ? enderecoFormatado : item,
        ),
      );
    }

    fecharFormulario();
    Alert.alert(
      "Sucesso",
      modoFormulario === "novo"
        ? "Endereço adicionado com sucesso!"
        : "Endereço atualizado com sucesso!",
    );
  }

  function excluirEndereco(id: string, rotuloItem: string) {
    Alert.alert(
      "Excluir endereço",
      `Deseja remover "${rotuloItem}" dos seus endereços salvos?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await setEnderecos((anteriores) =>
              anteriores.filter((item) => item.id !== id),
            );
          },
        },
      ],
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.tela}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.conteudo}>
          <View style={styles.cabecalhoTopo}>
            <View>
              <Text style={styles.titulo}>Endereços Salvos</Text>
              <Text style={styles.subtitulo}>
                Gerencie seus pontos frequentes para pedir com agilidade
              </Text>
            </View>

            {modoFormulario === "fechado" && (
              <TouchableOpacity
                style={styles.botaoAdicionarTopo}
                activeOpacity={0.7}
                onPress={abrirNovoFormulario}
              >
                <Ionicons
                  name="add"
                  size={20}
                  color={cores.textoPrincipal}
                />
                <Text style={styles.textoBotaoAdicionarTopo}>Novo</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Formulário de Adicionar / Editar */}
          {modoFormulario !== "fechado" ? (
            <View style={styles.cardForm}>
              <View style={styles.cabecalhoForm}>
                <Text style={styles.tituloForm}>
                  {modoFormulario === "novo"
                    ? "Adicionar endereço"
                    : "Editar endereço"}
                </Text>
                <TouchableOpacity onPress={fecharFormulario}>
                  <Ionicons
                    name="close"
                    size={22}
                    color={cores.textoSecundario}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.rotuloCampo}>Rótulo ou Apelido</Text>
              <View style={styles.gradeRotulos}>
                {["Casa", "Trabalho", "Faculdade", "Academia"].map((r) => (
                  <Pressable
                    key={r}
                    style={[
                      styles.opcaoRotulo,
                      rotulo === r && styles.opcaoRotuloAtivo,
                    ]}
                    onPress={() => setRotulo(r)}
                  >
                    <Text
                      style={[
                        styles.textoOpcaoRotulo,
                        rotulo === r && styles.textoOpcaoRotuloAtivo,
                      ]}
                    >
                      {r}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <TextInput
                style={styles.input}
                placeholder="Ou digite outro rótulo..."
                placeholderTextColor={cores.textoSecundario}
                value={rotulo}
                onChangeText={setRotulo}
              />

              {/* Busca por CEP com ViaCEP */}
              <Text style={styles.rotuloCampo}>Buscar por CEP (ViaCEP)</Text>
              <View style={styles.linhaCep}>
                <TextInput
                  style={[styles.input, styles.inputCep]}
                  placeholder="00000-000"
                  placeholderTextColor={cores.textoSecundario}
                  keyboardType="numeric"
                  value={cep}
                  onChangeText={(texto) => {
                    setCep(texto);
                    setErroForm("");
                  }}
                  maxLength={9}
                />
                <TouchableOpacity
                  style={[
                    styles.botaoBuscarCep,
                    buscandoCep && styles.botaoDesabilitado,
                  ]}
                  onPress={buscarCepViaCep}
                  disabled={buscandoCep}
                  activeOpacity={0.7}
                >
                  {buscandoCep ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>
                      <Ionicons name="search" size={16} color="#fff" />
                      <Text style={styles.textoBotaoBuscarCep}>Buscar</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>

              <Text style={styles.rotuloCampo}>Rua / Logradouro</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome da rua ou avenida"
                placeholderTextColor={cores.textoSecundario}
                value={rua}
                onChangeText={setRua}
              />

              <View style={styles.linhaDupla}>
                <View style={styles.colunaDupla}>
                  <Text style={styles.rotuloCampo}>Número</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="123"
                    placeholderTextColor={cores.textoSecundario}
                    value={numero}
                    onChangeText={setNumero}
                  />
                </View>
                <View style={styles.colunaDupla}>
                  <Text style={styles.rotuloCampo}>Complemento</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Apto, Bloco..."
                    placeholderTextColor={cores.textoSecundario}
                    value={complemento}
                    onChangeText={setComplemento}
                  />
                </View>
              </View>

              <View style={styles.linhaDupla}>
                <View style={styles.colunaDupla}>
                  <Text style={styles.rotuloCampo}>Bairro</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Bairro"
                    placeholderTextColor={cores.textoSecundario}
                    value={bairro}
                    onChangeText={setBairro}
                  />
                </View>
                <View style={styles.colunaDupla}>
                  <Text style={styles.rotuloCampo}>Cidade / UF</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Cidade"
                    placeholderTextColor={cores.textoSecundario}
                    value={uf ? `${cidade} - ${uf}` : cidade}
                    onChangeText={(t) => {
                      const partes = t.split("-");
                      setCidade(partes[0].trim());
                      if (partes[1]) setUf(partes[1].trim());
                    }}
                  />
                </View>
              </View>

              {erroForm !== "" && (
                <Text style={styles.textoErro}>{erroForm}</Text>
              )}

              <View style={styles.botoesForm}>
                <Botao titulo="Salvar Endereço" onPress={salvarEndereco} />
              </View>
            </View>
          ) : null}

          {/* Lista de Endereços Salvos */}
          {enderecos.length === 0 ? (
            <EstadoVazio mensagem="Nenhum endereço salvo. Adicione o primeiro usando a busca por CEP!" />
          ) : (
            <View style={styles.lista}>
              {enderecos.map((item) => (
                <View key={item.id} style={styles.cardItem}>
                  <View style={styles.iconeWrapper}>
                    <Ionicons
                      name={
                        item.rotulo.toLowerCase().includes("casa")
                          ? "home"
                          : item.rotulo.toLowerCase().includes("trabalho")
                            ? "briefcase"
                            : "location"
                      }
                      size={20}
                      color={cores.textoPrincipal}
                    />
                  </View>

                  <View style={styles.dadosItem}>
                    <View style={styles.topoItem}>
                      <Text style={styles.rotuloItem}>{item.rotulo}</Text>
                      {item.cep ? (
                        <Text style={styles.cepItem}>{item.cep}</Text>
                      ) : null}
                    </View>
                    <Text style={styles.logradouroItem} numberOfLines={2}>
                      {item.rua}, {item.numero}
                      {item.complemento ? ` (${item.complemento})` : ""}
                    </Text>
                    <Text style={styles.cidadeItem}>
                      {item.bairro ? `${item.bairro} • ` : ""}
                      {item.cidade} - {item.uf}
                    </Text>
                  </View>

                  <View style={styles.acoesItem}>
                    <TouchableOpacity
                      style={styles.botaoAcaoItem}
                      activeOpacity={0.7}
                      onPress={() => abrirEdicao(item)}
                    >
                      <Ionicons
                        name="pencil-outline"
                        size={18}
                        color={cores.textoPrincipal}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.botaoAcaoItem}
                      activeOpacity={0.7}
                      onPress={() => excluirEndereco(item.id, item.rotulo)}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={18}
                        color="#e11900"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    tela: {
      flex: 1,
      backgroundColor: cores.fundo,
    },
    scroll: {
      flexGrow: 1,
      paddingBottom: 40,
    },
    conteudo: {
      width: "100%",
      maxWidth: 520,
      alignSelf: "center",
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    cabecalhoTopo: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 20,
    },
    titulo: {
      fontSize: 26,
      fontWeight: "800",
      color: cores.textoPrincipal,
      letterSpacing: -0.5,
    },
    subtitulo: {
      fontSize: 13,
      color: cores.textoSecundario,
      marginTop: 4,
    },
    botaoAdicionarTopo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: cores.superficieClara,
      borderRadius: 18,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: cores.borda,
    },
    textoBotaoAdicionarTopo: {
      fontSize: 13,
      fontWeight: "700",
      color: cores.textoPrincipal,
    },
    cardForm: {
      backgroundColor: cores.superficie,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: cores.borda,
      padding: 16,
      marginBottom: 20,
    },
    cabecalhoForm: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
    },
    tituloForm: {
      fontSize: 18,
      fontWeight: "700",
      color: cores.textoPrincipal,
    },
    rotuloCampo: {
      fontSize: 12,
      fontWeight: "600",
      color: cores.textoSecundario,
      marginTop: 10,
      marginBottom: 6,
      textTransform: "uppercase",
    },
    gradeRotulos: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 10,
    },
    opcaoRotulo: {
      backgroundColor: cores.superficieClara,
      borderRadius: 16,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderWidth: 1,
      borderColor: cores.borda,
    },
    opcaoRotuloAtivo: {
      backgroundColor: cores.textoPrincipal,
      borderColor: cores.textoPrincipal,
    },
    textoOpcaoRotulo: {
      fontSize: 12,
      fontWeight: "600",
      color: cores.textoPrincipal,
    },
    textoOpcaoRotuloAtivo: {
      color: cores.fundo,
    },
    linhaCep: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
    },
    inputCep: {
      flex: 1,
    },
    botaoBuscarCep: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: "#111",
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
    },
    textoBotaoBuscarCep: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "700",
    },
    botaoDesabilitado: {
      opacity: 0.6,
    },
    input: {
      backgroundColor: cores.superficieClara,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: cores.borda,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 15,
      color: cores.textoPrincipal,
    },
    linhaDupla: {
      flexDirection: "row",
      gap: 10,
    },
    colunaDupla: {
      flex: 1,
    },
    textoErro: {
      color: "#e11900",
      fontSize: 13,
      fontWeight: "500",
      marginTop: 10,
      marginBottom: 4,
    },
    botoesForm: {
      marginTop: 16,
    },
    lista: {
      gap: 12,
    },
    cardItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: cores.superficie,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: cores.borda,
      padding: 14,
      gap: 12,
    },
    iconeWrapper: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: cores.superficieClara,
      alignItems: "center",
      justifyContent: "center",
    },
    dadosItem: {
      flex: 1,
    },
    topoItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 2,
    },
    rotuloItem: {
      fontSize: 16,
      fontWeight: "700",
      color: cores.textoPrincipal,
    },
    cepItem: {
      fontSize: 11,
      fontWeight: "600",
      color: cores.textoSecundario,
    },
    logradouroItem: {
      fontSize: 13,
      fontWeight: "500",
      color: cores.textoPrincipal,
      lineHeight: 18,
    },
    cidadeItem: {
      fontSize: 12,
      color: cores.textoSecundario,
      marginTop: 2,
    },
    acoesItem: {
      flexDirection: "row",
      gap: 6,
    },
    botaoAcaoItem: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: cores.superficieClara,
      alignItems: "center",
      justifyContent: "center",
    },
  });
