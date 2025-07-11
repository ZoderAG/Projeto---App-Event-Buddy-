import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    marginVertical: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  eventDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  image: {
  width: '100%',
  height: 200,
  borderRadius: 10,
  marginBottom: 10,
},
});

export const homeStyles = StyleSheet.create({
  ...commonStyles,
  logoutButton: {
    marginTop: 20,
  },
});

export const profileStyles = StyleSheet.create({
  ...commonStyles,
  emailText: {
    fontSize: 18,
    marginBottom: 12,
    color: "#555",
  },
  logoutButton: {
    marginTop: 30,
  },
});

export const loginStyles = StyleSheet.create({
  ...commonStyles,
  signUpText: {
    color: "#007bff",
    marginTop: 16,
    textAlign: "center",
  },
});

export const signupStyles = StyleSheet.create({
  ...commonStyles,
  loginText: {
    color: "#007bff",
    marginTop: 16,
    textAlign: "center",
  },
});

export const favoritesStyles = StyleSheet.create({
  ...commonStyles,
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 40,
    fontSize: 16,
  },
});

