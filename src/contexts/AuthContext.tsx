import { useRouter } from "next/dist/client/router";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import firebase from "../services/firebase";
import User from "../types/user";

type AuthContextProps = {
  user?: User;
  loading?: boolean;
  signInWithGoogle?: () => Promise<void>;
  signInWithEmailAndPassword?: (email: string, password: string) => Promise<void>;
  createUser?: (email: string, password: string) => Promise<void>;
  logout?: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>({});

async function getTokenAndUser(user: firebase.User) {
  const token = await user.getIdToken();
  return {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    token,
    provider: user.providerData[0].providerId,
    avatar: user.photoURL,
  };
}

function handleCookie(logged: boolean) {
  if (logged) {
    Cookies.set("auth-admin", logged, {
      expires: 3,
    });
  } else {
    Cookies.remove("auth-admin");
  }
}

export function AuthProvider(props) {
  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>(null);

  async function handleSession(firebaseUser: firebase.User) {
    try {
      if (firebaseUser?.email) {
        const user = await getTokenAndUser(firebaseUser);
        setUser(user);
        handleCookie(true);
        return user.email;
      } else {
        setUser(null);
        handleCookie(false);
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function signInWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()

      const response = await firebase
        .auth()
        .signInWithPopup(provider);

      await handleSession(response.user);
      push("/");
    } catch (err) {
      console.log(err);
    }
  }

  async function signInWithEmailAndPassword(email: string, password: string) {
    try {
      setLoading(true);
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      await handleSession(response.user);
      push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function createUser(email: string, password: string) {
    try {
      setLoading(true);
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await handleSession(response.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await firebase.auth().signOut();
      await handleSession(null);
      push("/login");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (Cookies.get("auth-admin")) {
      const unsubscribe = firebase.auth().onAuthStateChanged(handleSession);
      setLoading(false);
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithEmailAndPassword,
        createUser,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
