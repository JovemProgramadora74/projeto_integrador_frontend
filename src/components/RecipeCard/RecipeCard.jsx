import "./RecipeCard.css";
import Badge from './Badge'
import FavoriteButton from "./FavoriteButton.jsx";
import BarraMacro from "./BarraMacro.jsx";
import { Clock, Gauge } from "lucide-react";

function RecipeCard() {
    return (
        <div className="recipe-card">
            <Badge etiqueta="Sem Glúten"/>
            <FavoriteButton />

            <div className="imagem-container">
                <img src="https://www.receitasnestle.com.br/sites/default/files/srh_recipes/6cf1bb7359f2dca08445c83ff58bf3bf.jpg"
                     alt="Receita"/>
            </div>

            <div className="card-info">
                <h2>Bolo de Chocolate com Cobertura de Brigadeiro</h2>

                <div className="tempo">
                    <Clock size={15} color="#964B00" />
                    <p>40 minutos</p>
                </div>

                <div className="dificuldade">
                    <Gauge size={15} color="#964B00" />
                    <p>Fácil</p>
                </div>

                <div className="grupo-macro">
                    <BarraMacro title="Proteína"
                                porcentagem="5" cor="#808000"/>
                    <BarraMacro title="Carb."
                                porcentagem="54" cor="#964B00"/>
                    <BarraMacro title="Gord."
                                porcentagem="15" cor="#B1481B"/>
                </div>
            </div>
        </div>
    );
}

export default RecipeCard;