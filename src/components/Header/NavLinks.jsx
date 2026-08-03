import { useState } from 'react';
import './NavLinks.css';

export default function NavLinks() {
    const [activeLink, setActiveLink] = useState('Receitas');
    const links = ['Receitas', 'Categorias', 'Chefs', 'Favoritos'];

    return (
        <nav className="nav-container">
            {links.map((link) => (
                <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className={`header-nav-item ${activeLink === link ? 'active' : ''}`}
                    onClick={() => setActiveLink(link)}
                >
                    {link}
                </a>
            ))}
        </nav>
    );
}