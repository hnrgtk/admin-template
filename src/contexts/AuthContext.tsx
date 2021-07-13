import { useRouter } from "next/dist/client/router";
import { createContext, useState } from "react";
import firebase from "../services/firebase";
import User from "../types/user";

type AuthContextProps = {
  user?: User;
  loginGoogle?: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>({});

export function AuthProvider(props) {
  const { push } = useRouter();
  const [user, setUser] = useState<User>(null);

  async function loginGoogle() {
    const response = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());

    if (response.user?.email) {
      const token = await response.user.getIdToken();
      setUser({
        uid: response.user.uid,
        name: response.user.displayName,
        email: response.user.email,
        token,
        provider: response.user.providerData[0].providerId,
        avatar: response.user.photoURL,
      });
      push("/");
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        loginGoogle,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
