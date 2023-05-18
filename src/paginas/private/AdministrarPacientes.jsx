import { useState } from "react"
import Form from "../../components/Form"
import ListadoPacientes from "../../components/ListadoPacientes"

const AdministrarPacientes = () => {
  const [mostrarForm, setMostrarForm] = useState(false)

  return (
    <div className="flex flex-col md:flex-row">
      <button
        type="button"
        className="bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md mb-10 md:hidden"
        onClick={()=>setMostrarForm(!mostrarForm)}
      >
        {mostrarForm ? 'Ocultar' : 'Mostrar'} formulario
      </button>

      <div className={`${mostrarForm ? 'block' : 'hidden'} md:w-1/2 lg:w-2/5 md:block`}>
        <Form/>
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes/>
      </div>
    </div>
  )
}

export default AdministrarPacientes
