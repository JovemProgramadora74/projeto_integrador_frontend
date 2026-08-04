import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css'
import ListagemChefs from "./pages/ListagemChefs/ListagemChefs.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                {/*Adicionar as rotas aqui abaixo */}
                <Route path="/meus-chefes" element={<ListagemChefs />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
