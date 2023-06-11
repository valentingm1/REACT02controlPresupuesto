import React from "react";
import cerrarBtn from "../img/cerrar.svg";
import Mensaje from "./Mensaje";
import { useState } from "react";

const Modal = ({ setModal, animarModal, setAnimarModal }) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [mensaje, setMensaje] = useState("")

  const ocultarModal = () => {
    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 250);
  };

  const handleSubmit = e => {
    e.preventDefault()
    
    if([nombre,cantidad,categoria].includes('')){
        setMensaje("Uno de los campos está vacío")

        setTimeout(() => {
            setMensaje("")
        }, 3000)

        return
    }
  }

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
        <legend>Nuevo Gasto</legend>
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

        <input type="submit" value="Añadir Gasto" />
      </form>
    </div>
  );
};

export default Modal;
