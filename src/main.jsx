import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css'
import Cadastro from "./pages/Cadastro/Cadastro.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                {/*Adicionar as rotas aqui abaixo */}
                <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
