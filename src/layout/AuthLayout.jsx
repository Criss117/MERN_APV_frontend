import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const AuthLayout = () => {
    const {auth,cargando} = useAuth()

    if(cargando)return 'Cargando...'

    return (
        <>
            {!auth?._id ? (
                <main className="container mx-auto md:grid md:grid-cols-2 gap-14 lg:px-32 items-center py-20">
                    <Outlet/>
                </main>
            ): <Navigate to="/admin"/>}
        </>       
    )
}


export default AuthLayout