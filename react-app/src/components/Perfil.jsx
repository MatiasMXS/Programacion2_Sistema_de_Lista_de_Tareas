/* eslint-disable no-unused-vars */
import { AuthContext } from "../context/AuthProvider";
import { useContext, useState } from "react";
import "./Login.css";

const Perfil = () => {
  const { token, usuario_id  } = useContext(AuthContext);
  const [nick, setNick] = useState("");
  const [contraseña, setContraseña] = useState("");

  const actualizar = async (nick, contraseña, id) => {
  try {
    const response = await fetch("http://localhost:3000/auth/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      
      body: JSON.stringify({ nick, contraseña, id }),
      
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Cambios guardados exitosamente");
      console.log(`Nick: ${nick}`);
      console.log(`Contraseña: ${contraseña}`);
      console.log(`id: ${id}`);
    } else {
      console.error("Error al guardar los cambios:", data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    console.log(`Nick: ${nick}`);
      console.log(`Contraseña: ${contraseña}`);
      console.log(`id: ${id}`);
  }
};


  return (
    <div className="container py-5">
    <h1 className="text-center mb-4">Editar Perfil</h1>
    <div className="card mx-auto" style={{ maxWidth: "500px" }}>
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label htmlFor="nick" className="form-label">
              Nick
            </label>
            <input
             type="text"
             id="nick"
             name="nick"
             className="form-control"
             value={nick}
              placeholder="Escribe un nuevo nick"
             onChange={(e) => setNick(e.target.value)} // Actualiza el estado de nick
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contraseña" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              className="form-control"
              value={contraseña}
             placeholder="Escribe una nueva contraseña"
              onChange={(e) => setContraseña(e.target.value)} // Actualiza el estado de contraseña
            />
          </div>
          <div className="d-grid gap-2">
          <button
              type="button"
              className="btn btn-outline-light"
              onClick={() => actualizar(nick, contraseña, usuario_id)} // Reemplaza "1" con el ID real si es necesario
              disabled={!nick || !contraseña}
            >
              Guardar cambios
            </button>
            </div>
        </form>
      </div>
    </div>
  </div>
);
};
export default Perfil;
