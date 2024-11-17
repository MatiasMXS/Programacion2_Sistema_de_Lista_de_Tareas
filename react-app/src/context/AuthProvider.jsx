import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [usuario_id, setUsuario_id] = useState(null); 
  const [loading, setLoading] = useState(true);

  const isTokenExpired = (token) => {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica el payload del JWT
    const expiry = payload.exp; // Campo de expiración en el token
    const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    return expiry < now; // Retorna true si el token ha expirado
  };

  const extractUsuarioIdFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica el payload del JWT
      return payload.uid || null; // Asegúrate de usar el nombre correcto del campo en tu token
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  };


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      if (isTokenExpired(storedToken)) {
        localStorage.removeItem("token");
        setToken(null);
      } else {
        setToken(storedToken);
        setUsuario_id(extractUsuarioIdFromToken(storedToken));
      }
    }
    setLoading(false);
    
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, setToken,usuario_id, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
