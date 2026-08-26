import "./RecipeCard.css";
import Badge from './Badge'
import FavoriteButton from "./FavoriteButton.jsx";
import BarraMacro from "./BarraMacro.jsx";
import { Clock, Gauge } from "lucide-react";

function RecipeCard({titulo, imagem, tagRestricao, tempo, dificuldade, prot, carb, gord, link, receitaId, isFavorite}) {
    return (
        <div className="recipe-card">
            <Badge etiqueta={tagRestricao}/>
            <FavoriteButton receitaId={receitaId} titulo={titulo} isFavorite={isFavorite} />

            <div className="imagem-container">
                <img src= {imagem}

                     alt= {titulo}/>

            </div>

            <div className="card-info">
                <a href={link} className="recipe-card-titulo link">{titulo}</a>

                <div className="linha">
                    <div className="tempo">
                        <Clock size={15} color="#964B00"/>
                        <p>{tempo}min</p>
                    </div>

                    <div className="dificuldade">
                        <Gauge size={15} color="#964B00"/>
                        <p>{dificuldade}</p>
                    </div>
                </div>


                <div className="grupo-macro">
                    <BarraMacro title="Proteína"
                                porcentagem={prot} cor="#A14A2C"/>
                    <BarraMacro title="Carbo"
                                porcentagem={carb} cor="#D4A373"/>
                    <BarraMacro title="Gordura"
                                porcentagem={gord} cor="#606C38"/>
                </div>
            </div>
        </div>
    );
}

export default RecipeCard;