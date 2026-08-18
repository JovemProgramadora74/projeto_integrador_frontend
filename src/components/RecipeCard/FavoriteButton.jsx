import './FavoriteButton.css'
import {Heart} from "lucide-react";
import {useCallback, useState} from "react";

function FavoriteButton({isFavorite = false, receitaId}) {
    const [favorito, setFavorito] = useState(isFavorite);

    const handleFavoritar = useCallback(async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://senac47278/receitas/${receitaId}/favoritar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({receita_id: receitaId})
            });

            if (response.status === 401) {
                alert('Você precisa estar logado para favoritar!');
                return;
            }

            if (response.status === 200) {
                setFavorito(!favorito);
            }
        } catch (erro) {
            console.error('Erro na requisição:', erro);
        }
    }, [favorito]);

    return (<button className="favorite"
                    onClick={handleFavoritar}>
        <Heart size={24} fill={favorito ? 'red' : 'white'} strokeWidth={0}/>
    </button>);
}


export default FavoriteButton;