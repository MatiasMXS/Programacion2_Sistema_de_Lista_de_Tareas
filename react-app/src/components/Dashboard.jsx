/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthProvider";


import Menu from "./Menu";
import Tareas from "./Tareas";

//import TablaClientes from "./TablaClientes";
//import TablaProductos from "./TablaProductos";
//import TablaDetalle from "./TablaDetalle";


import { useReactToPrint } from "react-to-print";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
const [tareas, setTareas] = useState([]);
const [etiquetas, setEtiquetas] = useState([]);
const [etiquetasUsadas, setEtiquetasUsadas] = useState([]);
  //const [cliente, setCliente] = useState({});
  //const [productos, setProductos] = useState([]);
  //const [producto, setProducto] = useState({});
 // const [cantidad, setCantidad] = useState(1);
 // const [facturaId, setFacturaId] = useState(0);
 // const [items, setItems] = useState({});

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
     console.log(etiquetasUsadas);
     
     
    };
  


 // const getProductos = async () => {
 //   const response = await fetch("http://localhost:3000/productos", {
   //   method: "GET",
   //   headers: {
    //    "Content-Type": "application/json",
    //    Authorization: `Bearer ${token}`,
    //  },
  //  });
  //  const data = await response.json();
  //  setProductos(data);
  //};
/*
  const getFacturaId = async (clienteId) => {
    const response = await fetch(`http://localhost:3000/factura/${clienteId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { ultimoId } = await response.json();
    setFacturaId(ultimoId);
  };

  const addItem = async () => {
    const response = await fetch("http://localhost:3000/detalle/agregar-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productoId: producto.id,
        facturaId: facturaId,
        cantidad: cantidad,
      }),
    });
    const data = await response.json();

    setItems(data);
    getProductos();
  };

  const quitarItem = async (item) => {
    const response = await fetch("http://localhost:3000/detalle/quitar-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productoId: item.producto_id,
        facturaId: item.factura_id,
      }),
    });
    const data = await response.json();
    setItems(data);
    getProductos();
  };
*/
  useEffect(() => {
    getTareas();
    getEtiquetas();
      getEtiquetasUsadas()
    
  }, []);
/*
  const handleCliente = (cliente) => {
    getFacturaId(cliente.id);
    setCliente(cliente);
  };

  const handleProducto = (producto) => {
    setProducto(producto);
  };

  const handleItem = (item) => {
    quitarItem(item);
  };

  const handleIncrementa = () => {
    setCantidad(cantidad + 1);
  };

  const handleDecrementa = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleSubmit = () => {
    addItem();
  };

  const handleLogout = () => {
    logout();
  };
*/
  return (
    <div>
    <Menu
    etiquetas={etiquetas}
    getEtiquetas={getEtiquetas}
    />
    
    <br></br>
    <br></br>

    <Tareas
    tareas={tareas} 
    getTareas={getTareas}
      etiquetasUsadas={etiquetasUsadas}
      getEtiquetasUsadas={getEtiquetasUsadas}
      etiquetas={etiquetas}
    />
    
    </div>
    
      
    
    /*<div className="container">
      <h2 className="text-center">Sistema de Ventas</h2>
      <TablaClientes
        clientes={clientes}
        cliente={handleCliente}
        getClientes={getClientes}
      />
      <h4>
        {cliente.id && `${cliente.dni}, ${cliente.nombre} ${cliente.apellido}`}
      </h4>
      <br />
      <TablaProductos productos={productos} producto={handleProducto} />
      <h4>{producto.id && `${producto.nombre}, ${producto.descripcion}`}</h4>
      <br />
      <div className="input-group container-md">
        <span className="input-group-text">Cantidad</span>
        <input type="text" value={cantidad} className="form-control" readOnly />
        <button
          className="btn btn-outline-secondary"
          onClick={handleIncrementa}
        >
          +
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={handleDecrementa}
        >
          -
        </button>
        <button className="btn btn-success" onClick={handleSubmit}>
          Añadir producto
        </button>
      </div>
      <br />
      {items.length > 0 && (
        <div>
          <TablaDetalle innerRef={contentRef} items={items} item={handleItem} />
          <button className="btn btn-primary float-end" onClick={handlePrint}>
            Imprimir Factura
          </button>
        </div>
      )}
      <br />
      <br />
      <button onClick={handleLogout} className="btn btn-secondary float-end">
        Cerrar Sesión
      </button>
    </div>*/
  );
};

export default Dashboard;
