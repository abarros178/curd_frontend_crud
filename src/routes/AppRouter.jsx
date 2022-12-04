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
            <HashRouter>
                <Routes>
                    <Route path='/' element={<Inicio />}/>
                    <Route path='/materias' element={<Materias />}/>
                    <Route path='/profesores' element={<Profesores />}/>
                    <Route path='/estudiantes' element={<Estudiantes />}/>



                </Routes>
            </HashRouter>
        </div>
    )
}