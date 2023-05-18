import { useState, useEffect, createContext } from "react"
import PropTypes from 'prop-types'
import clienteAxios from "../config/axios"

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)
    
    useEffect(()=>{
        const authUser = async () => {
            const token = localStorage.getItem('apv_token_crv')
            if(!token){
                setCargando(false)
                return
            }

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios('/veterinarios/perfil',config)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
            setCargando(false)
        }
        authUser()
    },[])

    const cerrarSesion = () => {
        localStorage.removeItem('apv_token_crv')
        setAuth({})
    }

    const actualizarPerfil = async datos =>{
        const token = localStorage.getItem('apv_token_crv')
        if(!token){
            setCargando(false)
            return
        }

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            await clienteAxios.put(url,datos,config)

            return {
                msg: 'Actualizado correctamente',
                error: false
            }
        } catch (error) {
            return{
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const actualizarPassword = async datos => {
        const token = localStorage.getItem('apv_token_crv')
        if(!token){
            setCargando(false)
            return
        }

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = '/veterinarios/actualizar-password'
            const {data} = await clienteAxios.put(url,datos,config)
            return{
                msg: data.msg,
                error: false
            }
        } catch (error) {
            return{
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                actualizarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    ) 
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export{
    AuthProvider
}

export default AuthContext