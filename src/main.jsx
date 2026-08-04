import "./index.css";
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css'
import Cadastro from "./pages/Cadastro/Cadastro.jsx";
import Index from "./pages/Index/Index.jsx";
import Login from "./pages/Login/Login.jsx";
import ListagemChefs from "./pages/ListagemChefs/ListagemChefs.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                {/*Adicionar as rotas aqui abaixo */}
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cria-chef" element={<CriaChef />} />
                <Route path="/meus-chefes" element={<ListagemChefs />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
