import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import Alerta from "../../components/Alerta"
import clienteAxios from "../../config/axios"
import FormButton from "../../components/FormButton"

const Login = () => {
  

  const [email, setEmail] = useState('')
  const [password, setPassword ]= useState('')
  const [alerta, setAlerta] = useState({})

  const {setAuth} = useAuth()

  const navigate = useNavigate()
  const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  const handleSubmit = async e =>{
    e.preventDefault()

    if([email,password].includes('')){
      setAlerta({msg: 'Todos los campo son obligatorios', error: true})
      return
    }

    if(!validEmail.test(email)){
      setAlerta({msg:'El correo es invalido',error: true})
      return
    }

    try {
      const {data} = await clienteAxios.post('/veterinarios/login',{
          email,
          password
      })
      setAuth(data)
      localStorage.setItem('apv_token_crv', data.token)
      navigate('/admin')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true})
    }
  }

  const {msg} = alerta
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl text-center md:text-left">
          Inicia Sesión y administra tus {""} 
          <span className="text-black">pacientes</span>
        </h1>
      </div>
      <div className="mt-14 md:mt-0 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && 
          <Alerta
            alerta={alerta}
          />
        }
        <form onSubmit={handleSubmit} >
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
              placeholder="correo electronico"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label 
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >Contraseña</label>
            <input 
              name="password"
              id="password"
              type="password" 
              placeholder="contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <FormButton
            valor="Iniciar Sesión"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-500" 
            to="/registrar">¿No tienes una cuenta? Registrate</Link>
          <Link 
          className="block text-center my-5 text-gray-500"
            to="/verificar-correo">¿Olvidaste tu contraseña?</Link>
        </nav>
      </div>
    </>
  )
}

export default Login
