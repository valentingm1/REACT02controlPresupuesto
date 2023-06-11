import React from 'react'

const ControlPresupuesto = ({presupuesto}) => {

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
                <span>Disponible: </span>{formatoPresupuesto(0)}
            </p>

            <p>
                <span>Gastado: </span>{formatoPresupuesto(0)}
            </p>
        </div>
      
    </div>
  )
}

export default ControlPresupuesto
