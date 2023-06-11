import { useState } from "react";
import Header from "./components/Header";
import IconoNuevoGasto from "./img/nuevo-gasto.svg"
import Modal from "./components/Modal";

function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal,setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const handleNuevoGasto = () => {
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    }, 250)

  }

  return (
    <div>
      <Header 
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}/>

      {isValidPresupuesto && 
      (<div className="nuevo-gasto">
        <img src={IconoNuevoGasto}
        onClick={handleNuevoGasto}
        alt="icono de agregar nuevo gasto"/>

      </div>)}

      {modal &&
      <Modal
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
      />}
      

    </div>
  );
}

export default App;
