import { Link, useLocation } from 'react-router-dom';
import './NavLinks.css';

export default function NavLinks() {
    const location = useLocation();

    // Categorias incluídas com rota pendente ('#')
    const navItems = [
        { label: 'Receitas', path: '/' },
        { label: 'Categorias', path: '#' },
        { label: 'Chefs', path: '/meus-chefes' },
        { label: 'Favoritos', path: '/receitas/favoritas' },
    ];

    return (
        <nav className="nav-container">
            {navItems.map((item) => (
                <Link
                    key={item.label}
                    to={item.path}
                    className={`header-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={(e) => {
                        // Evita o comportamento padrão se a rota ainda for '#'
                        if (item.path === '#') {
                            e.preventDefault();
                        }
                    }}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}