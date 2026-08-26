import {useNavigate} from 'react-router-dom';
import Logo from './Logo';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';
import Button from './Button';
import './Header.css';
import {useState} from "react";

export default function Header() {
    const navigate = useNavigate();
    const [isAuthenticated] = useState(!!localStorage.getItem('token'));

    return (
        <header className="header-bg">
            <div className="header-content">
                <div style={{cursor: 'pointer'}} onClick={() => navigate('/')}>
                    <Logo/>
                </div>

                <NavLinks/>

                <div className="header-right-actions">
                    <SearchBar/>
                    <Button
                        text="Publicar Receita"
                        onClick={() => navigate('/cria-chef')}
                    />
                    <a href={isAuthenticated ? '/logout' : '/login'} className='meu-perfil'>
                        {isAuthenticated ?
                            "Sair" :
                            "Entrar"
                        }
                    </a>
                </div>
            </div>
        </header>
    );
}