import React, { useEffect, useState } from 'react'
import {CircularProgressbar, buildStyles} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({gastos,presupuesto}) => {


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

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar
        styles={buildStyles({
            pathColor: "#3B82F6"
        })}
        text={`${porcentaje}% Gastado`}
        value={porcentaje}

        />
    </div>
        <div className='contenido-presupuesto'>
            <p>
                <span>Presupuesto: </span>{formatoPresupuesto(presupuesto)}
            </p>

            <p>
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
