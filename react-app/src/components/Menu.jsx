import "./Menu.css";

const Menu = () => {
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
                    <li>
                      <a className="dropdown-item" href="#">
                        Grupal
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Individual
                      </a>
                    </li>
                  </ul>
                </li>
                <button type="button" className="CerrarSesion mt-auto btn btn-light">Cerrar Sesión</button>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};
export default Menu;
