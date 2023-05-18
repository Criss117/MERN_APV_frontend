import { useEffect, useState } from "react"
import AdminNav from "../../components/AdminNav"
import FormButton from "../../components/FormButton"
import useAuth from '../../hooks/useAuth'
import Alerta from "../../components/Alerta"

const EditarPerfil = () => {
    const {auth, actualizarPerfil} = useAuth()
    const [perfil, setPerfil] = useState({})
    const [alerta, setAlerta] = useState({})
    
    useEffect(()=>{
        setPerfil(auth)
    },[auth])
 
    const handleSubmit = async e =>{
        e.preventDefault()
        const {nombre,email} = perfil

        if([nombre,email].includes('')){
            setAlerta({
                msg:'El nombre y el correo son obligatorios',
                error: true
            })
            return
        }

        const resultado = await actualizarPerfil(perfil)
        setAlerta(resultado)
    }
    
    const {msg} = alerta
    return (
    <>
        <AdminNav/>

        <h2 className="font-black text-3xl text-center mt-10 ">Editar Perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className="text-indigo-600 font-bold">Información aquí</span></p>

        <div className="flex justify-center">
            <form 
                className="w-full lg:w-1/2 bg-white shadow rounded-lg p-5 flex flex-col"
                onSubmit={handleSubmit}    
                >
                {msg && <Alerta alerta={alerta}/>}
                <div className="my-3">
                    <label htmlFor="nombre" className="uppercase font-bold text-gray-600">Nombre</label>
                    <input 
                        type="text" 
                        id="nombre"
                        name="nombre"
                        placeholder="Tu nombre"
                        className="border bg-gray-50 w-full p-2 rounded-lg"
                        value={perfil.nombre || ''}
                        onChange={e => setPerfil({
                            ...perfil,
                            [e.target.name] : e.target.value
                        })}
                    />
                </div>

                <div className="my-3 ">
                    <label htmlFor="web" className="uppercase font-bold text-gray-600">Sitio Web</label>
                    <input 
                        type="text" 
                        id="web"
                        name="web"
                        placeholder="Tu web"
                        className="border bg-gray-50 w-full p-2 rounded-lg"
                        value={perfil.web || ''}
                        onChange={e => setPerfil({
                            ...perfil,
                            [e.target.name] : e.target.value
                        })}
                    />
                </div>

                <div className="my-3 ">
                    <label htmlFor="telefono" className="uppercase font-bold text-gray-600">Teléfono</label>
                    <input 
                        type="number" 
                        id="telefono"
                        name="telefono"
                        placeholder="Tu telefono"
                        className="border bg-gray-50 w-full p-2 rounded-lg"
                        value={perfil.telefono || ''}
                        onChange={e => setPerfil({
                            ...perfil,
                            [e.target.name] : e.target.value
                        })}
                    />
                </div>
                
                <div className="my-3 ">
                    <label htmlFor="email" className="uppercase font-bold text-gray-600">Correo Electrónico</label>
                    <input 
                        type="email" 
                        id="email"
                        name="email"
                        placeholder="Tu correo electronico"
                        className="border bg-gray-50 w-full p-2 rounded-lg"
                        value={perfil.email || ''}
                        onChange={e => setPerfil({
                            ...perfil,
                            [e.target.name] : e.target.value
                        })}
                    />
                </div>

                <FormButton
                    valor='Guardar Cambios'
                />
                
            </form>
        </div>
    </>
  )
}

export default EditarPerfil