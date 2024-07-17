import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";

type IAuthContext = {
  authInfo: AuthInfo;
  setAuthInfo: (state: AuthInfo) => void;
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
  const [authInfo, setAuthInfoState] = useState<AuthInfo>(getInitialAuthInfo());

  const setAuthInfo = useCallback(
    (state: AuthInfo) => {
      localStorage.setItem("authInfo", JSON.stringify(state));
      setAuthInfoState(state);
    },
    [authInfo]
  );

  const isLoggedIn = useMemo(
    () =>
      !!authInfo.expiresAt && new Date().getTime() / 1000 < authInfo.expiresAt,
    [authInfo.expiresAt]
  );

  return (
    <AuthContext.Provider value={{ authInfo, setAuthInfo, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
