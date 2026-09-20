import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [contato, setContato] = useState("");
  const insets = useSafeAreaInsets();

  function continuar() {
    // Quando a Home existir, vamos navegar para ela aqui
    console.log("Continuar com:", contato);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.logo}>Uber</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.titulo}>
          Qual é o seu número de telefone ou e-mail?
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Informar telefone ou e-mail"
          placeholderTextColor="#6b6b6b"
          value={contato}
          onChangeText={setContato}
          autoCapitalize="none"
        />

        <Pressable style={styles.botaoPrincipal} onPress={continuar}>
          <Text style={styles.textoBotaoPrincipal}>Continuar</Text>
        </Pressable>

        <View style={styles.divisor}>
          <View style={styles.linha} />
          <Text style={styles.textoDivisor}>ou</Text>
          <View style={styles.linha} />
        </View>

        <Pressable style={styles.botaoSocial}>
          <Ionicons name="logo-google" size={20} color="#000" />
          <Text style={styles.textoSocial}>Continuar com o Google</Text>
        </Pressable>

        <Pressable style={styles.botaoSocial}>
          <Ionicons name="logo-apple" size={20} color="#000" />
          <Text style={styles.textoSocial}>Continuar com a Apple</Text>
        </Pressable>

        <Text style={styles.aviso}>
          Você concorda em receber um código de verificação por mensagem de
          texto ou WhatsApp. Sujeito a cobranças de tarifas por uso de dados e
          envio de mensagens.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  logo: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
  content: {
    padding: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#f3f3f3",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  botaoPrincipal: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  textoBotaoPrincipal: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  divisor: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  linha: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  textoDivisor: {
    marginHorizontal: 12,
    color: "#6b6b6b",
  },
  botaoSocial: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 10,
  },
  textoSocial: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  aviso: {
    fontSize: 12,
    color: "#6b6b6b",
    marginTop: 12,
  },
});