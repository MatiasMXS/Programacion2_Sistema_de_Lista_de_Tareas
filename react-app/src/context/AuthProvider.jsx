import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const isTokenExpired = (token) => {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica el payload del JWT
    const expiry = payload.exp; // Campo de expiración en el token
    const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    return expiry < now; // Retorna true si el token ha expirado
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      if (isTokenExpired(storedToken)) {
        localStorage.removeItem("token");
        setToken(null);
      } else {
        setToken(storedToken);
      }
    }
    setLoading(false);
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
