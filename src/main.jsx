import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css'
import Index from "./pages/Index/Index.jsx";
import Login from "./pages/Login/Login.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                {/*Adicionar as rotas aqui abaixo */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
