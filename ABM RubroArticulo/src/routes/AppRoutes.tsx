import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import Componentes from "../pages/Componentes"
import { RubroArticulos } from "../pages/RubroArticulos"
import  PageLogin  from "../pages/PageLogin"

import * as React from 'react';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}> </Route>
        <Route path="/admin" element={<RubroArticulos/>}></Route>
        <Route path='/componentes' element={<Componentes/>}> </Route>
        <Route path="/login" element={<PageLogin/>}></Route>
    </Routes>
  )
}

export default AppRoutes