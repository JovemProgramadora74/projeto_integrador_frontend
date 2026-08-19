import './FavoriteButton.css';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { fetchApi } from '../../servicos/api.js';

function FavoriteButton({ isFavorite = false, receitaId }) {
    const [favorito, setFavorito] = useState(isFavorite);

    async function handleFavoritar() {
        const token = localStorage.getItem('token');

        try {
            await fetchApi(`/receitas/${receitaId}/favoritar`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setFavorito(prev => !prev);
        } catch (erro) {
            if (erro.status === 401) {
                alert('Você precisa estar logado para favoritar!');
                return;
            }

            console.error('Erro ao favoritar receita:', erro);
        }
    }

    return (
        <button
            className="favorite"
            onClick={handleFavoritar}
            aria-label={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
            <Heart
                size={24}
                fill={favorito ? 'red' : 'white'}
                strokeWidth={0}
            />
        </button>
    );
}

export default FavoriteButton;