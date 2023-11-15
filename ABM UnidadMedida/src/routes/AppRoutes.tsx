import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import Componentes from "../pages/Componentes"
import { UnidadMedidas } from "../pages/UnidadMedidas"
import  PageLogin  from "../pages/PageLogin"

const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}> </Route>
        <Route path='/componentes' element={<Componentes/>}> </Route>
        <Route path='/unidadMedidas' element={<UnidadMedidas/>}> </Route>
        <Route path="/login" element={<PageLogin/>}></Route>
    </Routes>
  )
}

export default AppRoutes