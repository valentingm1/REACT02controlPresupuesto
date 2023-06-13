import React, { useEffect, useState } from 'react'
import {CircularProgressbar, buildStyles} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({gastos,presupuesto,setGastos,setPresupuesto, setIsValidPresupuesto}) => {


    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible ] = useState(0)
    const [gastado, setGastado ] = useState(0)

    useEffect(() =>{
        const totalGastado = gastos.reduce((total,gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado

        const nuevoPorcentaje = (((presupuesto - totalDisponible)/ presupuesto) * 100).toFixed(2)

        
        setDisponible(presupuesto-totalGastado)
        setGastado(totalGastado)

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 500);
    },[gastos])

    const formatoPresupuesto = (cantidad) => {
        return cantidad.toLocaleString('en-US',{
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const resultado = confirm("Deseas reiniciar la aplicación?")

        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar
        styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
            trailColor:"#f5f5f5",
            textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6"
        })}
        text={`${porcentaje}% Gastado`}
        value={porcentaje}

        />
    </div>
        <div className='contenido-presupuesto'>
            <button className='reset-app' type='button' onClick={handleResetApp}>
                Resetear App
            </button>
            <p>
                <span>Presupuesto: </span>{formatoPresupuesto(presupuesto)}
            </p>

            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span>{formatoPresupuesto(disponible)}
            </p>

            <p>
                <span>Gastado: </span>{formatoPresupuesto(gastado)}
            </p>
        </div>
      
    </div>
  )
}

export default ControlPresupuesto
