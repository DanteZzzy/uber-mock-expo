import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Botao } from "../../components/Botao";
import { CampoRotulado } from "../../components/CampoRotulado";
import { SeletorChips } from "../../components/SeletorChips";
import { useAuth } from "../../context/AuthContext";
import {
  buscarTipoEnvio,
  calcularValorEnvio,
  CHAVE_ENVIOS,
  nomeDoTamanhoEnvio,
  nomeDoTipoEnvio,
  TAMANHOS_ENVIO,
  TIPOS_ENVIO,
} from "../../data/envios";
import { useArmazenamento } from "../../hooks/useArmazenamento";
import { api } from "../../services/api";
import { useTema } from "../../theme/TemaContext";
import type { Cores } from "../../theme/temas";
import type { EnvioSalvo, TamanhoEnvio, TipoEnvio } from "../../types";
import {
  apenasDigitos,
  formatarDataHora,
  formatarMoeda,
  formatarTelefone,
} from "../../utils/formatacao";

const OPCOES_TIPO = TIPOS_ENVIO.map((tipo) => ({
  id: tipo.id,
  rotulo: tipo.nome,
}));

const OPCOES_TAMANHO = TAMANHOS_ENVIO.map((tamanho) => ({
  id: tamanho.id,
  rotulo: `${tamanho.nome} • ${tamanho.descricao}`,
}));

export default function Enviar() {
  const params = useLocalSearchParams<{ tipo?: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { usuario } = useAuth();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  const inicial = buscarTipoEnvio(params.tipo);
  const nomeUsuario = usuario?.nome ?? "";
  const telefoneUsuario = formatarTelefone(usuario?.telefone ?? "");

  const [tipo, setTipo] = useState<TipoEnvio>(inicial.id);
  const [tamanho, setTamanho] = useState<TamanhoEnvio>("pequeno");
  const [remetenteNome, setRemetenteNome] = useState(
    inicial.recebe ? "" : nomeUsuario,
  );
  const [enderecoColeta, setEnderecoColeta] = useState("");
  const [destinatarioNome, setDestinatarioNome] = useState(
    inicial.recebe ? nomeUsuario : "",
  );
  const [destinatarioTelefone, setDestinatarioTelefone] = useState(
    inicial.recebe ? telefoneUsuario : "",
  );
  const [enderecoEntrega, setEnderecoEntrega] = useState("");
  const [item, setItem] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const [, setEnvios, enviosCarregados] = useArmazenamento<EnvioSalvo[]>(
    CHAVE_ENVIOS,
    [],
  );

  const valor = useMemo(
    () => calcularValorEnvio(tipo, tamanho, enderecoEntrega),
    [tipo, tamanho, enderecoEntrega],
  );

  function validar(): string {
    const digitosTelefone = apenasDigitos(destinatarioTelefone);

    if (remetenteNome.trim().length < 2) return "Informe o nome do remetente.";
    if (enderecoColeta.trim().length < 5) return "Informe o endereço de coleta.";
    if (destinatarioNome.trim().length < 2) {
      return "Informe o nome do destinatário.";
    }
    if (digitosTelefone.length < 10 || digitosTelefone.length > 11) {
      return "Informe um telefone válido com DDD.";
    }
    if (enderecoEntrega.trim().length < 5) {
      return "Informe o endereço de entrega.";
    }
    if (
      enderecoColeta.trim().toLowerCase() ===
      enderecoEntrega.trim().toLowerCase()
    ) {
      return "Coleta e entrega não podem ser no mesmo endereço.";
    }
    if (item.trim().length < 3) return "Descreva o item que será enviado.";
    return "";
  }

  function alterar(atualizar: (texto: string) => void) {
    return (texto: string) => {
      atualizar(texto);
      setErro("");
    };
  }

  async function aoSolicitar() {
    const mensagem = validar();
    if (mensagem !== "") {
      setErro(mensagem);
      return;
    }

    setErro("");
    setEnviando(true);

    try {
      const postCriado = await api.criarPost({
        title: `Envio ${nomeDoTipoEnvio(tipo)}: ${enderecoColeta.trim()} -> ${enderecoEntrega.trim()}`,
        body: `Remetente: ${remetenteNome.trim()} | Destinatário: ${destinatarioNome.trim()} | Item: ${item.trim()} (${nomeDoTamanhoEnvio(tamanho)}) | Valor: ${formatarMoeda(valor)}`,
        userId: 1,
      });

      const envio: EnvioSalvo = {
        id: `e_${Date.now()}`,
        tipo,
        remetenteNome: remetenteNome.trim(),
        enderecoColeta: enderecoColeta.trim(),
        destinatarioNome: destinatarioNome.trim(),
        destinatarioTelefone,
        enderecoEntrega: enderecoEntrega.trim(),
        item: item.trim(),
        tamanho,
        valor,
        data: formatarDataHora(new Date()),
        postId: postCriado.id,
      };

      await setEnvios((anteriores) => [envio, ...anteriores]);

      const msgSucesso =
        "Envio solicitado! Um entregador parceiro vai coletar o seu item em breve.";

      if (Platform.OS === "web") {
        window.alert(msgSucesso);
        router.replace("/atividade");
        return;
      }

      Alert.alert(
        "Envio solicitado!",
        "Um entregador parceiro vai coletar o seu item em breve.",
        [
          {
            text: "Ver na Atividade",
            onPress: () => router.replace("/atividade"),
          },
        ],
        { cancelable: false },
      );
    } catch (e) {
      const msgErro =
        e instanceof Error
          ? e.message
          : "Não foi possível solicitar o envio. Tente novamente.";

      if (Platform.OS === "web") {
        window.alert(msgErro);
      } else {
        Alert.alert("Erro ao solicitar", msgErro);
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.tela}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + 40 },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.conteudo}>
          <Text style={styles.titulo}>Envios</Text>
          <Text style={styles.subtitulo}>
            Preencha os dados e um entregador parceiro faz o resto
          </Text>

          <Text style={styles.secao}>O que você precisa?</Text>
          <SeletorChips
            opcoes={OPCOES_TIPO}
            selecionado={tipo}
            onSelecionar={(id) => {
              setTipo(id);
              setErro("");
            }}
            desabilitado={enviando}
          />

          <Text style={styles.secao}>Remetente</Text>
          <View style={styles.grupo}>
            <CampoRotulado
              rotulo="Nome"
              placeholder="Quem envia"
              value={remetenteNome}
              onChangeText={alterar(setRemetenteNome)}
              autoCapitalize="words"
              editable={!enviando}
            />
            <CampoRotulado
              rotulo="Endereço de coleta"
              placeholder="Rua, número e bairro"
              value={enderecoColeta}
              onChangeText={alterar(setEnderecoColeta)}
              autoCapitalize="sentences"
              editable={!enviando}
            />
          </View>

          <Text style={styles.secao}>Destinatário</Text>
          <View style={styles.grupo}>
            <CampoRotulado
              rotulo="Nome"
              placeholder="Quem recebe"
              value={destinatarioNome}
              onChangeText={alterar(setDestinatarioNome)}
              autoCapitalize="words"
              editable={!enviando}
            />
            <CampoRotulado
              rotulo="Telefone"
              placeholder="(21) 99999-9999"
              value={destinatarioTelefone}
              onChangeText={alterar((texto) =>
                setDestinatarioTelefone(formatarTelefone(texto)),
              )}
              keyboardType="phone-pad"
              editable={!enviando}
            />
            <CampoRotulado
              rotulo="Endereço de entrega"
              placeholder="Rua, número e bairro"
              value={enderecoEntrega}
              onChangeText={alterar(setEnderecoEntrega)}
              autoCapitalize="sentences"
              editable={!enviando}
            />
          </View>

          <Text style={styles.secao}>Item</Text>
          <View style={styles.grupo}>
            <CampoRotulado
              rotulo="Descrição"
              placeholder="Ex.: documentos, caixa de presente"
              value={item}
              onChangeText={alterar(setItem)}
              autoCapitalize="sentences"
              editable={!enviando}
            />
            <SeletorChips
              opcoes={OPCOES_TAMANHO}
              selecionado={tamanho}
              onSelecionar={setTamanho}
              desabilitado={enviando}
            />
          </View>

          {erro !== "" && <Text style={styles.textoErro}>{erro}</Text>}

          <View style={styles.rodape}>
            <View style={styles.resumoRodape}>
              <Ionicons
                name="bicycle-outline"
                size={18}
                color={cores.textoSecundario}
              />
              <Text style={styles.textoResumo}>
                O valor varia com o endereço de entrega e o tamanho
              </Text>
            </View>

            <Botao
              titulo={`Solicitar envio • ${formatarMoeda(valor)}`}
              onPress={aoSolicitar}
              carregando={enviando}
              desabilitado={!enviosCarregados}
            />
          </View>
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
    },
    conteudo: {
      width: "100%",
      maxWidth: 520,
      alignSelf: "center",
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    titulo: {
      color: cores.textoPrincipal,
      fontSize: 26,
      fontWeight: "800",
      letterSpacing: -0.5,
    },
    subtitulo: {
      color: cores.textoSecundario,
      fontSize: 14,
      marginTop: 4,
    },
    secao: {
      color: cores.textoPrincipal,
      fontSize: 18,
      fontWeight: "700",
      marginTop: 22,
      marginBottom: 12,
    },
    grupo: {
      gap: 14,
    },
    textoErro: {
      color: cores.destaque,
      fontSize: 13,
      fontWeight: "500",
      marginTop: 16,
    },
    rodape: {
      marginTop: 24,
      gap: 12,
    },
    resumoRodape: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
    },
    textoResumo: {
      color: cores.textoSecundario,
      fontSize: 12,
      fontWeight: "500",
    },
  });