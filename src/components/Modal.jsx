import React from "react";
import cerrarBtn from "../img/cerrar.svg";
import Mensaje from "./Mensaje";

import { useState, useEffect } from "react";

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGastos,
  editarGasto,
  setEditarGasto
}) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [id, setId] = useState("")
  const [fecha, setFecha] = useState("")


  useEffect(() => {
    if (Object.keys(editarGasto).length > 0) {
      setNombre(editarGasto.nombre);
      setCantidad(editarGasto.cantidad);
      setCategoria(editarGasto.categoria);
      setId(editarGasto.id)
      setFecha(editarGasto.fecha)
    }
  }, []);

  const ocultarModal = () => {
    setAnimarModal(false);
    setEditarGasto({})

    setTimeout(() => {
      setModal(false);
    }, 250);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Uno de los campos está vacío");

      setTimeout(() => {
        setMensaje("");
      }, 3000);

      return;
    }
    guardarGastos({ nombre, cantidad, categoria, id, fecha });
    setModal(false);
    setAnimarModal(false);
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={cerrarBtn}
          alt="boton de cerrar formulario de añadir presupuesto"
          onClick={ocultarModal}
        />
      </div>
      <form
        action=""
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        onSubmit={handleSubmit}
      >
        <legend>{editarGasto.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            type="text"
            id="nombre"
            placeholder="Añadir el nombre del gasto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            id="cantidad"
            placeholder="Añadir cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select
            name="categoria"
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccionar Categoria --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripcion a un servicio</option>
            <option value="gastos">Gastos Generales</option>
          </select>
        </div>

        <input type="submit" value={editarGasto.id ? "Guardar Cambios" : "Añadir Gasto"} />
      </form>
    </div>
  );
};

export default Modal;
