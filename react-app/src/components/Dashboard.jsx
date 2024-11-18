/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthProvider";


import Menu from "./Menu";
import Tareas from "./Tareas";
import Perfil from "./Perfil";
import TareasPendientes from "./TareasPendientes"
import TareasEtiquetas from "./TareasEtiquetas"



import { useReactToPrint } from "react-to-print";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
const [tareas, setTareas] = useState([]);
const [etiquetas, setEtiquetas] = useState([]);
const [etiquetasUsadas, setEtiquetasUsadas] = useState([]);
const [paginaActual, setPaginaActual] = useState("tareas");
const [TareasFecha, setTareasFecha] = useState([]);
const [tareasEtiquetas, seTareasEtiquetas] = useState([]);
const [Num, setNum] = useState([]);


  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });

  const getTareas = async () => {
 const response = await fetch("http://localhost:3000/tareas", {
  method: "GET",
  headers: {
 "Content-Type": "application/json",
 Authorization: `Bearer ${token}`,
},
 });
const data = await response.json();
  setTareas(data);
  
 };

 const getEtiquetas = async () => {
  const response = await fetch("http://localhost:3000/etiquetas", {
   method: "GET",
   headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
 },
  });
 const data = await response.json();
   setEtiquetas(data);
   
  };

  const getEtiquetasUsadas = async () => {
    const response = await fetch("http://localhost:3000/etiquetas/ocupada/tarea", {
     method: "GET",
     headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
   },
    });
   const data = await response.json();
     setEtiquetasUsadas(data);
     
    };

    const getbuscarTareaFecha = async (dia) => {
      try {
        const response = await fetch(
          `http://localhost:3000/tareas/proximas-vencer/${dia}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (!response.ok) throw new Error("Error al buscar tareas");
        const data = await response.json();
        setTareasFecha(data);
      } catch (error) {
        console.error(error);
        setTareasFecha([]); 
      }
    };
  
    const getbuscarTareaEtiqueta = async (id) => {
      try {
        const response = await fetch(
          `http://localhost:3000/tareas/etiqueta/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (!response.ok) throw new Error("Error al buscar tareas");
        const data = await response.json();
        seTareasEtiquetas(data);
      } catch (error) {
        console.error(error);
        seTareasEtiquetas([]); 
      }
    };
  
  useEffect(() => {
    getTareas();
    getEtiquetas();
      getEtiquetasUsadas();
      getbuscarTareaFecha(1)
      getbuscarTareaEtiqueta(2);
    
  }, []);

  const cambiarPagina = (pagina) => {
    setPaginaActual(pagina);
  };

  return (
    <div>
    <Menu
    etiquetas={etiquetas}
    getEtiquetas={getEtiquetas}
    cambiarPagina={cambiarPagina}
    setTareasFecha={setTareasFecha}
    seTareasEtiquetas={seTareasEtiquetas}
    getbuscarTareaFecha={getbuscarTareaFecha}
    getbuscarTareaEtiqueta={getbuscarTareaEtiqueta}
    setNum={setNum}
    />
    
    <br></br>
    <br></br>
    {paginaActual === "tareas" && (
    <Tareas
    tareas={tareas} 
    getTareas={getTareas}
      etiquetasUsadas={etiquetasUsadas}
      getEtiquetasUsadas={getEtiquetasUsadas}
      etiquetas={etiquetas}
      />
    )}
    
     {paginaActual === "perfil" && <Perfil />}
     {paginaActual === "tareasPendientes" && (
    <TareasPendientes
    tareas={tareas} 
    getTareas={getTareas}
      etiquetasUsadas={etiquetasUsadas}
      getEtiquetasUsadas={getEtiquetasUsadas}
      etiquetas={etiquetas}
      TareasFecha={TareasFecha}
      getbuscarTareaFecha={getbuscarTareaFecha}
      Num={Num}

    />
    )}
    {paginaActual === "tareasEtiquetas" && (
    <TareasEtiquetas
    tareas={tareas} 
    getTareas={getTareas}
      etiquetasUsadas={etiquetasUsadas}
      getEtiquetasUsadas={getEtiquetasUsadas}
      etiquetas={etiquetas}
      getbuscarTareaEtiqueta={getbuscarTareaEtiqueta}
      tareasEtiquetas={tareasEtiquetas}
      Num={Num}
      
    />
    )}
    </div>
    
      

  );
};

export default Dashboard;
