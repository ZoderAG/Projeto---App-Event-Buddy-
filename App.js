import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/Login";
import SignupScreen from "./screens/Signup";
import MainTabs from "./MainTabs";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { appStyles } from "./styles/appStyles";

const Stack = createStackNavigator();

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={[appStyles.appContainer, appStyles.container]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={appStyles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={appStyles.appContainer}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <Stack.Screen name="Main" component={MainTabs} />
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
