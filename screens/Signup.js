import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { signUp } from "../services/firebaseAuth";
import styles from "../styles/signupStyles"; // ou "./styles" dependendo da estrutura de pastas

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Faça parte da nossa App</Text>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Voltar" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}
