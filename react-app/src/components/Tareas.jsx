/* eslint-disable no-unused-vars */
import "./Tareas.css";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Tareas = (/*clientes, cliente, getClientes*/) => {
  const { token } = useContext(AuthContext);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha_Limite, setfecha_Limite] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [estado, setEstado] = useState("");
  const [materia, setMateria] = useState("");
  const [title, setTitle] = useState("");

  const openModal = (
    opcion,
    id,
    nombre,
    descripcion,
    fecha_Limite,
    prioridad,
    estado,
    materia
  ) => {
    if (opcion === 1) {
      setTitle("Añadir nuevo cliente");
      setId("");
      setNombre("");
      setDescripcion("");
      setfecha_Limite("");
      setPrioridad("");
      setEstado("");
      setMateria("");
    } else if (opcion === 2) {
      setTitle("Editar datos del cliente");
      setId(id);
      setNombre(nombre);
      setDescripcion(descripcion);
      setfecha_Limite(fecha_Limite);
      setPrioridad(prioridad);
      setEstado(estado);
      setMateria(materia);
    }
    setTimeout(() => {
      document.getElementById("id").focus();
    }, 500);
  };

  return (
    <div className="container mt-4">

      <h3>Lista de Tareas</h3>

      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Busca o crea una tarea"
          aria-label="Busca o crea una tarea"
        />
        <button className="btn btn-outline-success" type="submit">
        🔍︎
        </button>
        <button
          className="btn btn-success"
          type="button"
          onClick={() => openModal(1)}
          data-bs-toggle="modal"
          data-bs-target="#clientesModal"
        >
          +
        </button>
      </div>
  
      <br></br>

      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2
              className="accordion-header d-flex align-items-center justify-content-between"
              id="flush-headingOne"
            >
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="checkboxThree"
              />
              <button
                className="accordion-button collapsed flex-grow-1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                Entregar TP Programación
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                Aquí puedes incluir detalles sobre la entrega del TP de
                Programación.
              </div>
            </div>
          </div>

          <div className="accordion-item ">
            <h2
              className="accordion-header d-flex align-items-center justify-content-between"
              id="flush-headingTwo"
            >
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="checkboxTwo"
              />
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                Promocionar todo
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                Detalles sobre cómo promocionar las actividades.
                <div className="d-flex justify-content-end mt-2"></div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2
              className="accordion-header d-flex align-items-center justify-content-between"
              id="flush-headingThree"
            >
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="checkboxThree"
              />
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                Estudiar APS
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingThree"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                Información adicional sobre el estudio de APS.
                <div className="d-flex justify-content-end mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tareas;
