import { useState, useEffect } from "react";
import { generarId } from "./helpers";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

import Header from "./components/Header";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
import Filtro from "./components/Filtro";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );
  const [editarGasto, setEditarGasto] = useState({});

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados,setGastosFiltrados] = useState([])

  useEffect(() => {
    if (Object.keys(editarGasto).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 250);
    }
  }, [editarGasto]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    const presupuestoLocalStorage =
      Number(localStorage.getItem("presupuesto")) ?? 0;

    if (presupuestoLocalStorage > 0) setIsValidPresupuesto(true);
  }, []);

  useEffect(() => {
    if(filtro) {
        const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
        setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro]);

  const handleNuevoGasto = () => {
    setModal(true);

    setEditarGasto({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 250);
  };

  const guardarGastos = (gasto) => {
    if (gasto.id) {
      // Actualizar
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
      setEditarGasto({});
    } else {
      // Nuevo Gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);

    setGastos(gastosActualizados);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      {isValidPresupuesto && (
        <>
          <main>
          <Filtro 
                filtro={filtro}
                setFiltro={setFiltro}
              />
            <ListadoGastos
              gastos={gastos}
              setEditarGasto={setEditarGasto}
              eliminarGasto={eliminarGasto}
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
            />
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
