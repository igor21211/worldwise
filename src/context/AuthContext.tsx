import { createContext, useContext, useReducer } from "react";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: UserCredentials) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

interface UserCredentials {
  email: string;
  password: string;
}

interface User extends UserCredentials {
  name: string;
  avatar: string;
}

interface State {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: State = {
  user: null,
  isAuthenticated: false,
};

interface Action {
  type: "LOGIN" | "LOGOUT";
  payload?: User;
}
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload || null,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const login = (credentials: UserCredentials): void => {
    const user: User = {
      ...FAKE_USER,
      email: credentials.email,
    };
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
