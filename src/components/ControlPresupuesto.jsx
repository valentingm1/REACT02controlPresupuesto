import React, { useEffect, useState } from 'react'

const ControlPresupuesto = ({gastos,presupuesto}) => {

    const [disponible, setDisponible ] = useState(0)
    const [gastado, setGastado ] = useState(0)

    useEffect(() =>{
        const totalGastado = gastos.reduce((total,gasto) => gasto.cantidad + total, 0)

        setDisponible(presupuesto-totalGastado)
        setGastado(totalGastado)

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
        <p>Grafico acá</p>
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
