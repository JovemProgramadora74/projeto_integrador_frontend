import './global.css'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Index from './pages/Index/Index.jsx'
import Login from './pages/Login/Login.jsx'
import Cadastrar from './pages/Cadastrar/Cadastrar.jsx'
import CriaChef from "./pages/CriaChef/CriaChef.jsx";
import ListarChefs from './pages/ListarChefs/ListarChefs.jsx'
import ReceitaCompleta from './pages/ReceitaCompleta/ReceitaCompleta.jsx'
import ReceitasFavoritas from "./pages/ReceitasFavoritas/ReceitasFavoritas.jsx";
import Categorias from "./pages/Categorias/Categorias.jsx";
import BotaoChat from "./components/BotaoChat/BotaoChat.jsx";
import EditarChef from "./pages/EditarChef/EditarChef.jsx";
import Deslogar from "./pages/Deslogar/Deslogar.jsx";

createRoot(document.getElementById('root')).render(<StrictMode>
    <BrowserRouter>
        <Routes>
            {/*Adicionar as rotas aqui abaixo */}
            <Route path='/' element={<Index/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/logout' element={<Deslogar />}/>
            <Route path='/cadastrar' element={<Cadastrar/>}/>
            <Route path='/cria-chef' element={<CriaChef/>}/>
            <Route path='/editar-chef/:id' element={<EditarChef/>}/>
            <Route path='/meus-chefes' element={<ListarChefs/>}/>
            <Route path='/receitas/:id' element={<ReceitaCompleta/>}/>
            <Route path="/receitas/favoritas" element={<ReceitasFavoritas/>}/>
            <Route path="/categorias" element={<Categorias/>}/>
        </Routes>
        <BotaoChat />
    </BrowserRouter>
</StrictMode>)
