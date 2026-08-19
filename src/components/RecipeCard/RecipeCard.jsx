import "./RecipeCard.css";
import Badge from './Badge'
import FavoriteButton from "./FavoriteButton.jsx";
import BarraMacro from "./BarraMacro.jsx";
import { Clock, Gauge } from "lucide-react";

function RecipeCard({titulo, imagem, tagRestricao, tempo, dificuldade, prot, carb, gord, link, key}) {
    return (
        <div className="recipe-card">
            <Badge etiqueta={tagRestricao}/>
            <FavoriteButton receitaId={key} titulo={titulo} />

            <div className="imagem-container">
                <img src= {imagem}

                     alt= {titulo}/>

            </div>

            <div className="card-info">
                <a href={link} className="recipe-card-titulo">{titulo}</a>

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
                                porcentagem={prot} cor="#808000"/>
                    <BarraMacro title="Carboidrato"
                                porcentagem={carb} cor="#964B00"/>
                    <BarraMacro title="Gordura"
                                porcentagem={gord} cor="#B1481B"/>
                </div>
            </div>
        </div>
    );
}

export default RecipeCard;