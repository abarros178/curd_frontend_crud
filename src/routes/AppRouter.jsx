import React from 'react'
import { Route, Routes, BrowserRouter,HashRouter } from 'react-router-dom'
import { Inicio } from '../components/Inicio.jsx'
import { Materias } from '../components/Materias.jsx'
import { Profesores } from '../components/Profesores.jsx'
// import { Clases } from '../components/Clases.jsx'
import { Estudiantes } from '../components/Estudiantes.jsx'




export const AppRouter = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Inicio />}/>
                    <Route path='/materias' element={<Materias />}></Route>
                    <Route path='/profesores' element={<Profesores />}></Route>
                    <Route path='/estudiantes' element={<Estudiantes />}></Route>



                </Routes>
            </BrowserRouter>
        </div>
    )
}