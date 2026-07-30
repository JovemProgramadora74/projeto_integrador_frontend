import './FavoriteButton.css'
import { Heart } from "lucide-react";

function FavoriteButton({isFavorite = false}) {
    return (
        <button className="favorite" style={{color: isFavorite ? 'red' : 'white' }}>
            <Heart size={24} fill={isFavorite ? 'red' : 'none'} />
        </button>
    );
}

export default FavoriteButton;