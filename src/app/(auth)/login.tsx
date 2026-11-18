import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Botao } from "../../components/Botao";
import { Cabecalho } from "../../components/Cabecalho";
import { CampoTexto } from "../../components/CampoTexto";
import { Container } from "../../components/Container";
import { Divisor } from "../../components/Divisor";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [contato, setContato] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();
  const { entrar } = useAuth();

  async function entrarComContato() {
    if (contato.trim().length < 3) {
      setErro("Informe um telefone ou e-mail válido");
      return;
    }
    setErro("");
    await entrar(contato.trim());
    router.replace("/home"); // replace: o botão voltar não retorna ao login
  }

  async function entrarComConta(nome: string) {
    await entrar(nome);
    router.replace("/home");
  }

  return (
    <View style={styles.tela}>
      <Cabecalho />

      <Container>
        <Text style={styles.titulo}>
          Qual é o seu número de telefone ou e-mail?
        </Text>

        <CampoTexto
          style={styles.campo}
          placeholder="Informar telefone ou e-mail"
          value={contato}
          onChangeText={(texto) => {
            setContato(texto);
            setErro("");
          }}
        />
        {erro !== "" && <Text style={styles.erro}>{erro}</Text>}

        <Botao titulo="Continuar" onPress={entrarComContato} />

        <Divisor />

        <View style={styles.sociais}>
          <Botao
            variante="social"
            titulo="Continuar com o Google"
            icone={<Ionicons name="logo-google" size={20} color="#000" />}
            onPress={() => entrarComConta("Conta Google")}
          />
          <Botao
            variante="social"
            titulo="Continuar com a Apple"
            icone={<Ionicons name="logo-apple" size={20} color="#000" />}
            onPress={() => entrarComConta("Conta Apple")}
          />
        </View>

        <Text style={styles.aviso}>
          Você concorda em receber um código de verificação por mensagem de
          texto ou WhatsApp. Sujeito a cobranças de tarifas por uso de dados e
          envio de mensagens.
        </Text>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
  },
  campo: {
    marginBottom: 12,
  },
  erro: {
    color: "#e11900",
    fontSize: 13,
    marginTop: -4,
    marginBottom: 12,
  },
  sociais: {
    gap: 8,
  },
  aviso: {
    fontSize: 12,
    lineHeight: 18,
    color: "#6b6b6b",
    marginTop: 24,
  },
});