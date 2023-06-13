import Gasto from "./Gasto"

const ListadoGastos = ({gastos, setEditarGasto,eliminarGasto}) => {
  return (
    <div className='listado-gastos contenedor'>
      <h2>{gastos.length ? "Gastos" : "Todavía no hay gastos"}</h2>

      {gastos.map( gasto => 
        <Gasto
        key={gasto.id}
        gasto={gasto}
        setEditarGasto={setEditarGasto}
        eliminarGasto={eliminarGasto}
        />
      )}
    </div>
  )
}

export default ListadoGastos
