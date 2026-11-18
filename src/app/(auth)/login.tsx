import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Botao } from "../../components/Botao";
import { Cabecalho } from "../../components/Cabecalho";
import { CampoTexto } from "../../components/CampoTexto";
import { Container } from "../../components/Container";
import { Divisor } from "../../components/Divisor";
import { useAuth } from "../../context/AuthContext";
import { useTema } from "../../theme/TemaContext";
import type { Cores } from "../../theme/temas";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const router = useRouter();
  const { loginComCredenciais, entrar } = useAuth();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  async function entrarComCredenciais() {
    const emailLimpo = email.trim().toLowerCase();

    if (!emailLimpo || !senha) {
      setErro("Informe o seu e-mail e sua senha.");
      return;
    }

    setErro("");
    setCarregando(true);

    try {
      await loginComCredenciais(emailLimpo, senha);
      router.replace("/home");
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao entrar.");
    } finally {
      setCarregando(false);
    }
  }

  async function entrarComConta(nome: string) {
    setCarregando(true);
    try {
      await entrar(nome);
      router.replace("/home");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.tela}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Cabecalho />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <Text style={styles.titulo}>Entrar na sua conta</Text>
          <Text style={styles.subtitulo}>
            Informe seu e-mail e senha cadastrados
          </Text>

          <Text style={styles.rotulo}>E-mail</Text>
          <CampoTexto
            style={styles.campo}
            placeholder="exemplo@email.com"
            value={email}
            onChangeText={(texto) => {
              setEmail(texto);
              setErro("");
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!carregando}
          />

          <Text style={styles.rotulo}>Senha</Text>
          <CampoTexto
            style={styles.campo}
            placeholder="Sua senha"
            value={senha}
            onChangeText={(texto) => {
              setSenha(texto);
              setErro("");
            }}
            secureTextEntry
            editable={!carregando}
          />

          {erro !== "" && <Text style={styles.erro}>{erro}</Text>}

          <Botao
            titulo="Entrar"
            onPress={entrarComCredenciais}
            carregando={carregando}
            desabilitado={carregando}
          />

          <Divisor />

          <View style={styles.sociais}>
            <Botao
              variante="social"
              titulo="Continuar com o Google"
              icone={<Ionicons name="logo-google" size={20} color="#000" />}
              onPress={() => entrarComConta("Conta Google")}
              desabilitado={carregando}
            />
            <Botao
              variante="social"
              titulo="Continuar com a Apple"
              icone={<Ionicons name="logo-apple" size={20} color="#000" />}
              onPress={() => entrarComConta("Conta Apple")}
              desabilitado={carregando}
            />
          </View>

          <Text style={styles.aviso}>
            Ao continuar, você concorda com os Termos de Serviço e a Política de
            Privacidade da Uber.
          </Text>
        </Container>
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
    titulo: {
      fontSize: 24,
      fontWeight: "700",
      color: cores.textoPrincipal,
      marginBottom: 6,
    },
    subtitulo: {
      fontSize: 14,
      color: cores.textoSecundario,
      marginBottom: 20,
      lineHeight: 20,
    },
    rotulo: {
      fontSize: 13,
      fontWeight: "600",
      color: cores.textoPrincipal,
      marginBottom: 6,
    },
    campo: {
      marginBottom: 14,
    },
    erro: {
      color: "#e11900",
      fontSize: 13,
      fontWeight: "500",
      marginTop: -4,
      marginBottom: 14,
    },
    sociais: {
      gap: 10,
    },
    aviso: {
      fontSize: 12,
      lineHeight: 18,
      color: cores.textoSecundario,
      marginTop: 24,
      textAlign: "center",
    },
  });
