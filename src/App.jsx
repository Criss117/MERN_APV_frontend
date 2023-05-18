import {BrowserRouter,Route, Routes} from 'react-router-dom'

//layout
import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida'

//area publica
import Login from './paginas/public/Login'
import ConfirmarCuenta from './paginas/public/ConfirmarCuenta'
import Registrar from './paginas/public/Registrar'
import VerificarCorreo from './paginas/public/VerificarCorreo'
import ReestablecerPass from './paginas/public/ReestablecerPass'

//area privada
import AdministrarPacientes from './paginas/private/AdministrarPacientes'
import CambiarPassword from './paginas/private/CambiarPassword'
import EditarPerfil from './paginas/private/EditarPerfil'

import { AuthProvider } from './context/AuthProvider'
import { PacientesProvider } from './context/PacientesProvider'

function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            {/* Area publica */}
            <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Login/>} />
              <Route path="registrar" element={<Registrar/>} />
              <Route path="confirmar-cuenta/:token" element={<ConfirmarCuenta/>} />
              <Route path="verificar-correo" element={<VerificarCorreo/>} />
              <Route path="reestablecer-password/:token" element={<ReestablecerPass/>} />
            </Route>

            {/* Area privada */}
            <Route path='/admin' element={<RutaProtegida/>}>
              <Route index element={<AdministrarPacientes/>}/>
              <Route path='perfil' element={<EditarPerfil/>}/>
              <Route path='cambiar-password' element={<CambiarPassword/>}/>
            </Route>

          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
