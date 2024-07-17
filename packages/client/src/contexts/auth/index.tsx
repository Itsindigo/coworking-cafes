import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { trpc } from "../../trpc";

type IAuthContext = {
  authInfo: AuthInfo;
  setAuthInfo: (state: AuthInfo) => void;
  logout: () => void;
  isLoggedIn: boolean;
};

const AuthContext = createContext<IAuthContext>(undefined as any);

export type AuthInfo = {
  expiresAt: number | null;
  id: string | null;
  email: string | null;
};

const placeholderAuthInfo: AuthInfo = {
  expiresAt: null,
  id: null,
  email: null,
};

const getInitialAuthInfo = () => {
  const authInfoFromStorage = localStorage.getItem("authInfo");

  if (authInfoFromStorage) {
    try {
      const authInfo = JSON.parse(authInfoFromStorage);
      return authInfo;
    } catch {
      console.error("Failed to parse authInfo from localStorage, purging data");
      localStorage.removeItem("authInfo");
    }
  }

  return placeholderAuthInfo;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const mutation = trpc.userAuth.logout.useMutation();
  const [authInfo, setAuthInfoState] = useState<AuthInfo>(getInitialAuthInfo());

  const setAuthInfo = useCallback((state: AuthInfo) => {
    localStorage.setItem("authInfo", JSON.stringify(state));
    setAuthInfoState(state);
  }, []);

  const logout = useCallback(() => {
    mutation.mutate(undefined, {
      onSuccess() {
        localStorage.removeItem("authInfo");
        setAuthInfoState(placeholderAuthInfo);
      },
    });
  }, []);

  const isLoggedIn = useMemo(
    () =>
      !!authInfo.expiresAt && new Date().getTime() / 1000 < authInfo.expiresAt,
    [authInfo.expiresAt]
  );

  return (
    <AuthContext.Provider value={{ authInfo, setAuthInfo, isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
