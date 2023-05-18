import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types'
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";


const PacienteContext = createContext()

const PacientesProvider = ({children})=>{

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})
    const {auth} = useAuth()

    useEffect(()=>{
        const obtenerPacientes = async () =>{
            try {
                const token = localStorage.getItem('apv_token_crv')

                if(!token)return
             
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios('/pacientes',config)
                setPacientes(data.paciente)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes()
    },[auth])

    const setEdicion = paciente =>{
        setPaciente(paciente)
    }

    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('apv_token_crv')
        if(!token)return
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        if(paciente.id){
            try {
                const {data} = await clienteAxios.put(`pacientes/${paciente.id}`,paciente,config)
                const pacientesActualizados = pacientes.map(pacienteState => pacienteState._id === data.pacienteActualizado._id ? data.pacienteActualizado : pacienteState) 
                setPacientes(pacientesActualizados)
            } catch (error) {
                console.log(error.response.data.msg)
            }
            return
        }

        try {
            
            const {data} = await clienteAxios.post('/pacientes', paciente,config)

            // eslint-disable-next-line no-unused-vars
            const {createdAt,updatedAt,__v, ...pacienteGuardado} = data.pacienteAlmacenado
            setPacientes([pacienteGuardado, ...pacientes])
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    const eliminarPaciente = async id =>{
        const confirmar = confirm('¿Deseas eliminar al paciente?')

        if(!confirmar)return

        try {
            const token = localStorage.getItem('apv_token_crv')
            if(!token)return
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            await clienteAxios.delete(`/pacientes/${id}`,config)
            const pacientesActualizados = pacientes.filter(pacienteState => pacienteState._id !== id)
            setPacientes(pacientesActualizados)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <PacienteContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacienteContext.Provider>
    )
}

PacientesProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export {PacientesProvider}

export default PacienteContext