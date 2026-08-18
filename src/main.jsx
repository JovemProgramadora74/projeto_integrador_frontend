import './global.css'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Index from './pages/Index/Index.jsx'
import Login from './pages/Login/Login.jsx'
import Cadastro from './pages/Cadastro/Cadastro.jsx'
import CriaChef from "./pages/CriaChef/CriaChef.jsx";
import ListagemChefs from './pages/ListagemChefs/ListagemChefs.jsx'
import ReceitaCompleta from './pages/ReceitaCompleta/ReceitaCompleta.jsx'
import ReceitasFavoritas from "./pages/ReceitasFavoritas/ReceitasFavoritas.jsx";
import Categoria from "./pages/Categorias/Categorias.jsx";

createRoot(document.getElementById('root')).render(<StrictMode>
    <BrowserRouter>
        <Routes>
            {/*Adicionar as rotas aqui abaixo */}
            <Route path='/' element={<Index/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/cadastro' element={<Cadastro/>}/>
            <Route path="/cria-chef" element={<CriaChef/>}/>
            <Route path='/meus-chefes' element={<ListagemChefs/>}/>
            <Route path='/receitas/:id' element={<ReceitaCompleta/>}/>
            <Route path="/receitas/favoritas" element={<ReceitasFavoritas />} />
            <Route path="/categoria" element={<Categoria />} />
        </Routes>
    </BrowserRouter>
</StrictMode>);
