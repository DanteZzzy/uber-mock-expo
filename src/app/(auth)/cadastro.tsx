import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
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

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const router = useRouter();
  const { cadastrar } = useAuth();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  async function aoCadastrar() {
    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim().toLowerCase();

    if (!nomeLimpo || !emailLimpo || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(emailLimpo)) {
      setErro("Informe um e-mail válido.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setErro("");
    setCarregando(true);

    try {
      await cadastrar({
        nome: nomeLimpo,
        email: emailLimpo,
        senha,
      });

      // Login automático já é feito no cadastrar, agora redireciona para a home
      router.replace("/home");
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao cadastrar.");
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
          <Text style={styles.titulo}>Criar uma conta</Text>
          <Text style={styles.subtitulo}>
            Preencha seus dados para começar a viajar ou pedir pelo app
          </Text>

          <Text style={styles.rotulo}>Nome completo</Text>
          <CampoTexto
            style={styles.campo}
            placeholder="Seu nome completo"
            value={nome}
            onChangeText={(texto) => {
              setNome(texto);
              setErro("");
            }}
            editable={!carregando}
          />

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
            placeholder="Pelo menos 6 caracteres"
            value={senha}
            onChangeText={(texto) => {
              setSenha(texto);
              setErro("");
            }}
            secureTextEntry
            editable={!carregando}
          />

          <Text style={styles.rotulo}>Confirmar senha</Text>
          <CampoTexto
            style={styles.campo}
            placeholder="Repita a sua senha"
            value={confirmarSenha}
            onChangeText={(texto) => {
              setConfirmarSenha(texto);
              setErro("");
            }}
            secureTextEntry
            editable={!carregando}
          />

          {erro !== "" && <Text style={styles.erro}>{erro}</Text>}

          <Botao
            titulo="Cadastrar"
            onPress={aoCadastrar}
            carregando={carregando}
            desabilitado={carregando}
          />

          <Divisor />

          <View style={styles.rodape}>
            <Text style={styles.textoRodape}>Já tem uma conta?</Text>
            <Pressable
              onPress={() => router.replace("/login")}
              disabled={carregando}
            >
              <Text style={styles.linkEntrar}>Entrar</Text>
            </Pressable>
          </View>
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
    rodape: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      marginTop: 16,
    },
    textoRodape: {
      fontSize: 14,
      color: cores.textoSecundario,
    },
    linkEntrar: {
      fontSize: 14,
      fontWeight: "700",
      color: cores.textoPrincipal,
      textDecorationLine: "underline",
    },
  });
