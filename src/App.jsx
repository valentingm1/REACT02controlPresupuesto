import { useState } from "react";
import { generarId } from "./components/helpers";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

import Header from "./components/Header";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";

function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState([]);

  const handleNuevoGasto = () => {
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 250);
  };

  const guardarGastos = (gasto) => {
    gasto.id = generarId();
    setGastos([...gastos, gasto]);

    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 250);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
      />

      {isValidPresupuesto && (
        <>
         <main>
          <ListadoGastos
          gastos={gastos}/>
         </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              onClick={handleNuevoGasto}
              alt="icono de agregar nuevo gasto"
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGastos={guardarGastos}
        />
      )}
    </div>
  );
}

export default App;
