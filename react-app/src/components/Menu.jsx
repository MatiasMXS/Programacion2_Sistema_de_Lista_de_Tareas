/* eslint-disable react/prop-types */
import "./Menu.css";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Menu = ({ etiquetas , getEtiquetas }) => {
  const { token } = useContext(AuthContext);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [color, setColor] = useState("");
  const [usuario_id, setUsuario_id] = useState("");


  const { logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Para redireccionar

  const sendDataEtiqueta = async () => {
    // falta validar los datos (que no este vacio o solo espacios en blanco, etc.)
    try {

      const response = await fetch("http://localhost:3000/etiquetas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          nombre,
          color,
          usuario_id
        }),
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Etiqueta añadida con éxito");
        document.getElementById("btnCerrar").click();
        getEtiquetas();
      }
    } catch (error) {
      console.log(error);
    }
  };




  const handleLogout = () => {
    logout();
    navigate("/");
  };


  const handlecrear=e=>{

    console.log(e.target.value);
    setNombre(e.target.value);
  
   }
  return (
    <section>
      <div>
        <h3>Lista de Tareas</h3>
      </div>

      <nav className="navbar navbar-custom fixed-top">
        <div className="container-fluid d-flex align-items-center">
          <button
            className="navbar-toggler me-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <h1 className="titulo">Planificador Personal Escolar</h1>

          <div
            className="offcanvas offcanvas-custom offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Menú
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Inicio
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Perfil
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Calendario
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Materias
                  </a>

                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Programación
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        APS
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Pendientes
                  </a>

                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Hoy
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Mañana
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Próxima Semana
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Etiquetas
                  </a>

                  <ul className="dropdown-menu">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nueva etiqueta"
                        aria-label="Nueva etiqueta"
                        aria-describedby="button-addon2"
                        onChange={handlecrear}
                      ></input>
                      <button
                        className="btn btn-success"
                        type="button"
                        id="button-addon2"
                        onClick={sendDataEtiqueta}
                      >
                        +
                      </button>
                    </div>

                    {etiquetas.map((row) => (
                      
                      <li key={row.id}>
                        
                        <a className="dropdown-item" href="#">
                          {row.nombre}

                          
                            <button className="customize-1">
                              <i className="fa-solid fa-pencil"></i>
                            </button>
                            <button
                              className="btn btn-danger btn-sm customize-2"
                              type="button"
                              title="Borrar"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          
                        </a>
                       
                      </li>
                      
                    ))}
                  </ul>
                </li>
                <button
                  onClick={handleLogout}
                  type="button"
                  className="CerrarSesion mt-auto btn btn-light"
                >
                  Cerrar Sesión
                </button>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};
export default Menu;
