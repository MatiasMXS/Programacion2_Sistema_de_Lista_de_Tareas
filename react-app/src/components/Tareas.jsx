/* eslint-disable no-unused-vars */
import "./Tareas.css";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

// eslint-disable-next-line react/prop-types
const Tareas = ({ tareas } /*, cliente, getClientes*/) => {
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
        
          {tareas.map((row) => (
            <div className="accordion-item" id="" key={row.id}>
              <h2
                className="accordion-header d-flex align-items-center justify-content-between"
                id={`flush-heading-${row.id}`}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id={`checkbox-${row.id}`}
                />

                <button
                  className="accordion-button collapsed flex-grow-1 "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapse-${row.id}`}
          aria-expanded="false"
          aria-controls={`flush-collapse-${row.id}`}
                >
                  {row.nombre}
                </button>
              </h2>
              <div
                id={`flush-collapse-${row.id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`flush-heading-${row.id}`}
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  Descripción: {row.descripcion} <br />
                  Fecha Límite: {row.fecha_Limite}
                  <br />
                  Prioridad: {row.prioridad}
                  <br />
                  Estado: {row.estado}
                  <br />
                  Materia: {row.materia}
                  <br />
                  <div className="btn-container">
                    <button
                      className="btnInsideTareas btn btn-primary btn-sm"
                      type="button"
                      title="Editar"
                      data-bs-toggle="modal"
                      data-bs-target="#clientesModal"
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      type="button"
                      title="Borrar"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    
  );
};

export default Tareas;
