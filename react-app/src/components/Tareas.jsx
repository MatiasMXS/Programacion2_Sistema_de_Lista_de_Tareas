/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "./Tareas.css";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

// eslint-disable-next-line react/prop-types
const Tareas = ({ tareas  /*, cliente*/, getTareas}) => {
  const { token } = useContext(AuthContext);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha_Limite, setfecha_Limite] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [estado, setEstado] = useState("");
  const [materia, setMateria] = useState("");
  const [usuario_id, setUsuario_id] = useState("");
  const [title, setTitle] = useState("");

  const openModal = (
    opcion,
    id,
    nombre,
    descripcion,
    fecha_Limite,
    prioridad,
    estado,
    materia,
    usuario_id
  ) => {
    if (opcion === 1) {
      setTitle("Añadir nuevo cliente");
      setId("");
      setNombre("");
      setDescripcion("");
      setfecha_Limite("");
      setPrioridad("");
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

  const sendDataTarea = async () => {
    // falta validar los datos (que no este vacio o solo espacios en blanco, etc.)
    try {
      const metodo = id ? "PUT" : "POST";
      const url = id
        ? `http://localhost:3000/tareas/${id}`
        : "http://localhost:3000/tareas";

      const response = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          nombre,
          descripcion,
          fecha_Limite,
          prioridad,
          estado,
          materia,
          usuario_id,
        }),
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert(id ? "Tarea actualizado con éxito" : "Tarea añadida con éxito");
        document.getElementById("btnCerrar").click();
        getTareas();
      }
    } catch (error) {
      console.log(error);
    }
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
          data-bs-target="#tareasModal"
        >
          +
        </button>
      </div>

      <div className="modal fade" id="tareasModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{title}</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id" value={id} />
              <div className="input-group mb-3">
                <input
                  type="text"
                  id="dni"
                  className="form-control"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Fecha Límite"
                  value={fecha_Limite}
                  onChange={(e) => setfecha_Limite(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Prioridad"
                  value={prioridad}
                  onChange={(e) => setPrioridad(e.target.value)}
                />
              </div>


              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Materia"
                  value={materia}
                  onChange={(e) => setMateria(e.target.value)}
                />
              </div>

            </div>
            <div className="modal-footer">
              <button
                type="button"
                id="btnCerrar"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={sendDataTarea}
                className="btn btn-primary"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
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
                    onClick={() =>
                      openModal(
                        2,
                        row.id,
                        row.nombre,
                        row.descripcion,
                        row.fecha_Limite,
                        row.prioridad,
                        row.estado,
                        row.materia
                      )
                    }
                    title="Editar"
                    data-bs-toggle="modal"
                    data-bs-target="#tareasModal"
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
