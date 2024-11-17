/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "./Tareas.css";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

 
const Tareas = ({ tareas  /*, cliente*/, getTareas}) => {
  const [buscartareas, setbuscarTareas] = useState([]);
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
  const [busqueda, setBusqueda] = useState("");


  const openModal = (
    opcion,
    id,
    nombre,
    descripcion,
    fecha_Limite,
    prioridad,
    materia,
  ) => {
    if (opcion === 1) {
      setTitle("Añadir nuevo cliente");
      setId("");
      setNombre(busqueda);
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
      setMateria(materia);
    }
    setTimeout(() => {
      document.getElementById("id").focus();
    }, 500);
  };

 const ChequearTarea = async (id, estadoActual) => {
  try {
    const response = await fetch(`http://localhost:3000/tareas/check/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        estadoActual
      }),
    });
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      document.getElementById("btnCerrar").click();
      getTareas();
      
    }
  } catch (error) {
    console.log(error);
  }
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

  const deleteTarea = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar cliente?")) return;

    try {
      const response = await fetch(`http://localhost:3000/tareas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        getTareas();
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBusqueda=e=>{

   setBusqueda(e.target.value);
   console.log(e.target.value);
   buscar(e.target.value);
  }
  
const buscar = async (e) => {
  try {
    const response = await fetch(`http://localhost:3000/tareas/nombre/${e}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Error al buscar tareas");
      const data = await response.json();
      setbuscarTareas(data);
    } catch (error) {
      console.error(error);
      setbuscarTareas([]); // Restablece a un arreglo vacío si hay errores
    }
  };

 
  return (
    <div className="container mt-4">
      <h3>Lista de Tareas</h3>
  
      <div className="input-group">
        <input
          type="text"
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Busca o crea una tarea"
          aria-label="Busca o crea una tarea"
          onChange={handleBusqueda}
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
  
      <br />
  
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {(busqueda ? buscartareas : tareas).length > 0 ? (
          (busqueda ? buscartareas : tareas).map((row) => (
            <div className="accordion-item" id="" key={row.id}>
              <h2
                className={`accordion-header d-flex align-items-center justify-content-between checkbox-${row.estado}`}
                id={`flush-heading-${row.id}`}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  checked={row.estado === 1}
                  onChange={() => ChequearTarea(row.id, row.estado)}
                  id={`checkbox-${row.id}`}
                />
                <button
                  className="accordion-button collapsed flex-grow-1"
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
                      onClick={() => deleteTarea(row.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron tareas</p>
        )}
      </div>
    </div>
  );
}
export default Tareas;
