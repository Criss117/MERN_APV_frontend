import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../../components/Alerta"
import clienteAxios from "../../config/axios"
import FormButton from "../../components/FormButton"

const VerificarCorreo = () => {
  const[email,setEmail] = useState('')
  const[alerta,setAlerta] = useState({})

  const handleSubmit = async e =>{
    e.preventDefault()
    const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if(email === ''){
      setAlerta({msg:'El correo es obligatorio',error: true})
      return
    }

    if(!validEmail.test(email)){
      setAlerta({msg:'El correo es invalido',error: true})
      return
    }

    try {
      const {data} = await clienteAxios.post('/veterinarios/verificar-email',{
        email
      })

      setAlerta({msg: data.msg})
    } catch (error) {
      console.log(error)
      setAlerta({
        msg:error.response.data.msg,
        error: true})
    }
  }

  const {msg} = alerta

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu Acceso y no pierdas {""}
          <span className="text-black"> tus pacientes</span>
          </h1>
      </div>
      <div className="mt-14 md:mt-0 shadow-lg px-5 py-10 rounded-xl bg-white">
        <form onSubmit={handleSubmit}>
          {msg &&
            <Alerta
              alerta={alerta}
            />
          }
          <div className="my-5">
            <label 
              htmlFor="email"
              className="uppercase text-gray-600 block text-xl font-bold"
            >Correo</label>
            <input 
              name="email"
              id="email"
              type="email" 
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <FormButton
            valor="Verificar correo"
          />

        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-500" 
            to="/">¿Ya tienes una cuenta? Inicia sesión</Link>
          <Link 
          className="block text-center my-5 text-gray-500"
            to="/registrar">¿No tienes una cuenta? Registrate</Link>
        </nav>
      </div>  
    </>
  )
}

export default VerificarCorreo
