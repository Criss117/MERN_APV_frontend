import { useState } from "react"
import Alerta from "../../components/Alerta"
import FormButton from "../../components/FormButton"
import AdminNav from "../../components/AdminNav"
import useAuth from "../../hooks/useAuth"

const CambiarPassword = () => {
  const [password, setPassword] = useState({
    current: '',
    newPassword: ''
  })
  const [alerta, setAlerta] = useState({})
  const {actualizarPassword} = useAuth()

  const handleSubmit = async e =>{
    e.preventDefault()
  
    if(Object.values(password).some(campo => campo === '')){
      setAlerta({
        msg:'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if(password.newPassword.length < 6){
      setAlerta({
        msg:'La contraseña debe de tener minimo 6 caracteres',
        error: true
      })
      return
    }

    const respuesta = await actualizarPassword(password)
    setAlerta(respuesta)
  }

  const {msg} = alerta
  return (
    <>
        <AdminNav/>

        <h2 className="font-black text-3xl text-center mt-10 ">Cambiar Contraseña</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className="text-indigo-600 font-bold">contraseña</span></p>

        <div className="flex justify-center">
            <form 
                className="w-full lg:w-1/2 bg-white shadow rounded-lg p-5 flex flex-col"
                onSubmit={handleSubmit}    
                >
                {msg && <Alerta alerta={alerta}/>}
                <div className="my-3">
                    <label htmlFor="current" className="uppercase font-bold text-gray-600">Contraseña actual</label>
                    <input 
                        type="password" 
                        id="current"
                        name="current"
                        placeholder="Escribe tu contraseña actual"
                        className="border bg-gray-50 w-full p-2 rounded-lg"
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name] : e.target.value
                        })}
                    />
                </div>

                <div className="my-3 ">
                    <label htmlFor="newPassword" className="uppercase font-bold text-gray-600">Contraseña nueva</label>
                    <input 
                        type="password" 
                        id="newPassword"
                        name="newPassword"
                        placeholder="Escribe tu nueva contraseña"
                        className="border bg-gray-50 w-full p-2 rounded-lg"
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name] : e.target.value
                        })}
                    />
                </div>
                <FormButton
                    valor='Actualizar contraseña'
                />
                
            </form>
        </div>
    </>
  )
}

export default CambiarPassword