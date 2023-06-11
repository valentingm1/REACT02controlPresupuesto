import { formatFecha } from "./helpers"

const Gasto = ({gasto}) => {
    const {nombre,categoria,cantidad,id,fecha} = gasto
  return (
    <div className='gasto sombra'>
        <div className='contenido-gasto'>

            <div className='descripcion-gasto'>
                <p className='categoria'>{categoria}</p>
                <p className='nombre-gasto'>{nombre}</p>
                <p className="fecha-gasto">Agregado el: {""}
                    <span>{formatFecha(fecha)}</span>
                </p>
                
            </div>
        
        </div>
        <p className="cantidad-gasto">${cantidad}</p>
    </div>
  )
}

export default Gasto