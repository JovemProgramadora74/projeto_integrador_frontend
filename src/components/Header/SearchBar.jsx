import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

export default function SearchBar() {
    const [termoBusca, setTermoBusca] = useState('');
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();

        if (!termoBusca.trim()) return;

        navigate(`/receitas?busca=${encodeURIComponent(termoBusca.trim())}`);
    };

    return (
        <form className="search-bar-container" onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Buscar receita..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="search-input"
            />
            <button type="submit" className="search-button" aria-label="Buscar">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </button>
        </form>
    );
}