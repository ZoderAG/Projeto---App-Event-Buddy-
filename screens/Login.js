import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, TouchableOpacity, Alert } from "react-native";
import { signIn } from "../services/firebaseAuth";
import { useAuth } from "../context/AuthContext";
import { loginStyles } from "../styles/loginStyles";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuth();

 useEffect(() => {
  navigation.navigate("Home");
}, [navigation]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor preencha email e password");
      return;
    }
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert("Erro no login", error.message);
    }
  };

  return (
    <View style={loginStyles.container}>
      <Text style={loginStyles.title}>Bem Vindo ao Silvers Plus</Text>

      <Text style={loginStyles.label}>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={loginStyles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="exemplo@email.com"
      />

      <Text style={loginStyles.label}>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={loginStyles.input}
        placeholder="••••••••"
      />

      <View style={loginStyles.button}>
        <Button title="Log In" onPress={handleLogin} color="#007AFF" />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={loginStyles.signupText}>Não tem conta? Registe-se</Text>
      </TouchableOpacity>
    </View>
  );
}
