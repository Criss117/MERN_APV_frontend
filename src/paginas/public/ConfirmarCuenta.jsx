import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import clienteAxios from "../../config/axios"
import Alerta from "../../components/Alerta"

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)

  const params = useParams()
  const {token} = params

  useEffect(()=>{
    const confirmarCuenta = async () =>{
      try {
        const url = `/veterinarios/confirmar/${token}`

        const {data} = await clienteAxios(url)
        setCuentaConfirmada(true)
        setAlerta({
          msg: data.msg,
          error: false
        })
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }

      setCargando(false)
    }
    confirmarCuenta()
  },[])

  return (
    <>
      <div>        
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu cuenta y empieza a administra tus {""} 
          <span className="text-black">pacientes</span>
        </h1>  
      </div>

      <div className="mt-14 md:mt-0 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!cargando &&
          <Alerta
            alerta={alerta}
          />
        }

        {cuentaConfirmada && (
          <Link
            className="block text-center my-5 text-gray-500" 
            to="/">Iniciar sesión</Link>
        )}
      </div>
    </>
  )
}

export default ConfirmarCuenta