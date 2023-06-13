import { useState, useEffect } from "react";
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

  const [editarGasto, setEditarGasto] = useState({})

  useEffect(() =>{
    if( Object.keys(editarGasto).length > 0){
      setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 250);
    }
  }, [editarGasto])

  const handleNuevoGasto = () => {
    setModal(true);

    setEditarGasto({})

    setTimeout(() => {
      setAnimarModal(true);
    }, 250);
  };

  const guardarGastos = gasto => {
    if(gasto.id) {
      // Actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados);
      setEditarGasto({})
    } else {
      // Nuevo Gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto ])
    }
    setAnimarModal(false)
    setTimeout(() => {
        setModal(false)
    }, 500);
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)

    setGastos(gastosActualizados)
  }

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
          gastos={gastos}
          setEditarGasto={setEditarGasto}
          eliminarGasto={eliminarGasto}/>
          
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
          editarGasto={editarGasto}
          setEditarGasto={setEditarGasto}
        />
      )}
    </div>
  );
}

export default App;
