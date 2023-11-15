import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import Componentes from "../pages/Componentes"
import { Clientes } from "../pages/Clientes"
import  PageLogin  from "../pages/PageLogin"

import * as React from 'react';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}> </Route>
        <Route path="/admin" element={<Clientes/>}></Route>
        <Route path='/componentes' element={<Componentes/>}> </Route>
        <Route path="/login" element={<PageLogin/>}></Route>
    </Routes>
  )
}

export default AppRoutes