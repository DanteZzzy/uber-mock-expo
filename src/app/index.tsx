import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Botao } from "../components/Botao";
import { Cabecalho } from "../components/Cabecalho";
import { CampoTexto } from "../components/CampoTexto";
import { Container } from "../components/Container";
import { Divisor } from "../components/Divisor";

export default function Login() {
  const [contato, setContato] = useState("");
  const router = useRouter();

  function irParaHome() {
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
          onChangeText={setContato}
        />

        <Botao titulo="Continuar" onPress={irParaHome} />

        <Divisor />

        <View style={styles.sociais}>
          <Botao
            variante="social"
            titulo="Continuar com o Google"
            icone={<Ionicons name="logo-google" size={20} color="#000" />}
            onPress={irParaHome}
          />
          <Botao
            variante="social"
            titulo="Continuar com a Apple"
            icone={<Ionicons name="logo-apple" size={20} color="#000" />}
            onPress={irParaHome}
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