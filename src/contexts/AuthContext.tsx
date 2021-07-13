import { useRouter } from "next/dist/client/router";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import firebase from "../services/firebase";
import User from "../types/user";

type AuthContextProps = {
  user?: User;
  loading?: boolean;
  loginGoogle?: () => Promise<void>;
  login?: (email: string, password: string) => Promise<void>;
  create?: (email: string, password: string) => Promise<void>;
  logout?: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>({});

async function getUser(user: firebase.User) {
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
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>(null);

  async function handleSession(firebaseUser: firebase.User) {
    try {
      if (firebaseUser?.email) {
        const user = await getUser(firebaseUser);
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
    } finally {
      setLoading(false);
    }
  }

  async function loginGoogle() {
    try {
      const response = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());

      await handleSession(response.user);
      push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    try {
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

  async function create(email: string, password: string) {
    try {
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (Cookies.get("auth-admin")) {
      const unsubscribe = firebase.auth().onIdTokenChanged(handleSession);
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
        loginGoogle,
        login,
        create,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
