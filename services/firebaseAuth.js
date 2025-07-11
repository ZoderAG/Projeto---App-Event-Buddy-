import { auth } from "../firebaseConfig";

export const signIn = async (email, password) => {
  return await auth.signInWithEmailAndPassword(email, password);
};

export const signOut = async () => {
  return await auth.signOut();
};
