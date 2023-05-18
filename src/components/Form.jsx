import {useState, useEffect} from 'react'
import usePacientes from '../hooks/usePacientes'
import Alerta from "./Alerta"
import FormButton from './FormButton'

const Form = () => {
    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})

    const {guardarPaciente,paciente} = usePacientes()

    useEffect(()=>{
        if(paciente?.nombre){
            const fechaFormateada = new Date(paciente.fecha).toISOString().split('T')[0];
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(fechaFormateada)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente])

    const handleSubmit = e =>{
        e.preventDefault()
        //validar formulario
        if([nombre,propietario,email,fecha,sintomas].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error:true
            })
            return
        }

        setAlerta({})

        guardarPaciente({
            nombre,
            propietario,
            email,
            fecha,
            sintomas,
            id
        })

        setAlerta({
            msg: 'Guardado Correctamente',
            error: false
        })
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId('')

        setTimeout(()=>{
            setAlerta({
                msg: '',
                error: true
            })
        },2000)
    }
    const {msg} = alerta
   
    return (
    <>
        <h2 className='font-black text-3xl text-center'>Listado de pacientes</h2>
        <p className="mt-5 text-lg text-center mb-10">
            Añade a tus pacientes y {''} 
            <span className="text-indigo-600 font-bold">Administralos</span> 
        </p>
        {msg && 
              <Alerta
                alerta={alerta}
              />
            }
        <form
            className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
            onSubmit={handleSubmit}
        >
            <div className="mb-5">
                <label 
                    htmlFor="nombre"
                    className="text-gray-700 uppercase font-bold"    
                >Mascota</label>
                <input 
                    type="text" 
                    id="nombre"
                    placeholder="Nombre de la mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="propietario"
                    className="text-gray-700 uppercase font-bold"    
                >Propietario</label>
                <input 
                    type="text" 
                    id="propietario"
                    placeholder="Nombre del propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={propietario}
                    onChange={e => setPropietario(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="email"
                    className="text-gray-700 uppercase font-bold"    
                >Correo electrónico</label>
                <input 
                    type="email" 
                    id="email"
                    placeholder="Nombre del email"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="fecha"
                    className="text-gray-700 uppercase font-bold"    
                >Fecha de alta</label>
                <input 
                    type="date" 
                    id="fecha"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="sintomas"
                    className="text-gray-700 uppercase font-bold"    
                >Síntomas</label>
                <textarea  
                    id="sintomas"
                    placeholder="describe los sintomas"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={sintomas}
                    onChange={e => setSintomas(e.target.value)}
                />
            </div>

            <FormButton
                valor={id ? 'Guardar Cambios' : 'Agregar paciente'}
            />
        </form>
    </>
    )
}

export default Form