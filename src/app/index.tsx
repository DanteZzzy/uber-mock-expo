import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [contato, setContato] = useState("");

  function continuar() {
    // Quando a Home existir, vamos navegar para ela aqui
    console.log("Continuar com:", contato);
  }

  return (
    <View>
      <View>
        <Text>Uber</Text>
      </View>

      <View>
        <Text>Qual é o seu número de telefone ou e-mail?</Text>

        <TextInput
          placeholder="Informar telefone ou e-mail"
          value={contato}
          onChangeText={setContato}
          autoCapitalize="none"
        />

        <Pressable onPress={continuar}>
          <Text>Continuar</Text>
        </Pressable>

        <View>
          <View />
          <Text>ou</Text>
          <View />
        </View>

        <Pressable>
          <Ionicons name="logo-google" size={20} />
          <Text>Continuar com o Google</Text>
        </Pressable>

        <Pressable>
          <Ionicons name="logo-apple" size={20} />
          <Text>Continuar com a Apple</Text>
        </Pressable>

        <Text>
          Você concorda em receber um código de verificação por mensagem de
          texto ou WhatsApp. Sujeito a cobranças de tarifas por uso de dados e
          envio de mensagens.
        </Text>
      </View>
    </View>
  );
}