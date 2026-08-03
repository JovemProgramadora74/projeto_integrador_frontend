import Logo from './Logo';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';
import Button from './Button';
import './Header.css';

export default function Header() {
    return (
        <header className="header-bg">
            <div className="header-content">
                <Logo />

                <NavLinks />

                <div className="header-right-actions">
                    <SearchBar />
                    <Button text="Publicar Receita" />
                </div>
            </div>
        </header>
    );
}