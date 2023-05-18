import { Link } from "react-router-dom"
import { useState } from "react"
import clienteAxios from "../../config/axios"
import Alerta from "../../components/Alerta"
import FormButton from "../../components/FormButton"

const Registrar = () => {
  const [nombre,setNombre] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [repetirPassword,setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e =>{
    e.preventDefault()
    const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({msg:'Todos los campos son obligatorios', error: true})
      return
    }
    
    if(!validEmail.test(email)){
      setAlerta({msg:'El correo es invalido',error: true})
      return
    }

    if(password !== repetirPassword){
      setAlerta({msg:'las contraseñas no son iguales', error: true})
      return
    }
    if(password.length < 6){
      setAlerta({msg:'la contraseña debe debe contener minimo 6 caracteres', error: true})
      return
    }

    setAlerta({})
    //crer usuario
    try {
      await clienteAxios.post(`/veterinarios`,{
        nombre,
        email,
        password  
      })

      setAlerta({
        msg:'Creado correctamente revisa tu email',
        error: false
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
          Crea tu cuenta y administra {""}
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
              htmlFor="nombre"
              className="uppercase text-gray-600 block text-xl font-bold"
            >Nombre</label>
            <input 
              name="nombre"
              id="nombre"
              type="text" 
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Nombre"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>

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

          <div className="my-5">
            <label 
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >Contraseña</label>
            <input 
              name="password"
              id="password"
              type="password" 
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label 
              htmlFor="reppassword"
              className="uppercase text-gray-600 block text-xl font-bold"
            >Repetir Contraseña</label>
            <input 
              name="reppassword"
              id="reppassword"
              type="password" 
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="vuelve a escribir tu contraseña"
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>
          
          <FormButton
            valor="Registrar cuenta"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-500" 
            to="/">¿Ya tienes una cuenta? Inicia sesión</Link>
          <Link 
          className="block text-center my-5 text-gray-500"
            to="/verificar-correo">¿Olvidaste tu contraseña?</Link>
        </nav>
      </div>  
    </>
  )
}

export default Registrar
