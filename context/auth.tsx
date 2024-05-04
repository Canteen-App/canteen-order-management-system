import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";

export const AuthContext = createContext({
  user: null,
  loading: false,
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        console.log(user);
        setUser(user);
        setLoading(false);

        router.push("/dashboard");
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const AuthValues = {
    user: user,
    loading: loading,
  };

  if (!loading && !user) {
    router.push("/login");
  }

  if (user) {
    return (
      <AuthContext.Provider value={AuthValues}>
        {loading ? <div>Loading...</div> : <>{children}</>}
      </AuthContext.Provider>
    );
  }
};

export const useAuth = () => {
  return useContext(AuthContext);
};
