import { useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [nick, setUsername] = useState("");
  const [contraseña, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Para redireccionar

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nick, contraseña }),
        
      });

      console.log(nick)
      console.log(contraseña)
      console.log(JSON.stringify({ nick, contraseña }))
      
      const data = await response.json();
      console.log(data);
      

        navigate("/");
      
    
    } catch (error) {
      setError("Error de servidor. Intenta más tarde.");
      console.log(error);
    }
  };

  return (
    <div>
      <div className="titulo">
        <h1>Planificador Personal Escolar</h1>
      </div>

      <section className="py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
              <div className="card border border-light-subtle rounded-3 shadow-sm">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <h2 className="fs-5 fw-light text-center text-normal mb-4">
                    Registro
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="row gy-2 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            name="username"
                            id="username"
                            value={nick}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nombre de usuario"
                            required
                          />
                          <label className="form-label">
                            Nombre de usuario
                          </label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            value={contraseña}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            required
                          />
                          <label className="form-label">Contraseña</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="d-grid my-3">
                          <button className="boton" type="submit">
                            Registrarse
                          </button>
                        </div>
                      </div>
                    </div>

                  </form>
                  {error && <div className="alert alert-danger">{error}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Login;
