import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import clienteAxios from "../../config/axios"
import Alerta from "../../components/Alerta"
import FormButton from "../../components/FormButton"

const ReestablecerPass = () => {
  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState('')
  const [tokenValido, setTokenValido] = useState(false)
  const [passModificado, setPassModificado] = useState(false)

  const params = useParams()
  const {token} = params

  useEffect(()=>{
    const comprobarToken = async ()=>{
      try {
        await clienteAxios(`/veterinarios/verificar/${token}`)
        setTokenValido(true)
        setAlerta({
          msg: 'Escribe tu nueva contraseña',
          error: false
        })
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error',
          error: true
        })
      }
    }
    comprobarToken()
  }, [])

  const handleSubmit = async e =>{
    e.preventDefault()

    if(password.length < 6){
      setAlerta({
        msg: 'La contraseña debe contener mínimo 6 caracteres',
        error: true
      })
      return
    }

    try {
      const url = `/veterinarios/verificar/${token}`

      const {data} = await clienteAxios.post(url,{
        password
      })

      setPassModificado(true)
      setAlerta({
        msg: data.msg
      })

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta

  return (
    <>
      <div>        
        <h1 className="text-indigo-600 font-black text-6xl">
        Recupera tu Acceso y no pierdas {""} 
          <span className="text-black">tus pacientes</span>
        </h1>  
      </div>
      <div className="mt-14 md:mt-0 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg &&
          <Alerta
            alerta={alerta}
          />
        }
        {tokenValido && !passModificado &&(
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label 
                htmlFor="password"
                className="uppercase text-gray-600 block text-xl font-bold"
              >Nueva Contraseña</label>
              <input 
                name="password"
                id="password"
                type="password" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                placeholder="nueva contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <FormButton
              valor="Guardar nueva contraseña"
            />
          </form>
        )}

        {passModificado && (
          <Link
            className="block text-center my-5 text-gray-500" 
            to="/">Iniciar sesión
          </Link>
        )}
      </div>  
    </>
  )
}

export default ReestablecerPass
