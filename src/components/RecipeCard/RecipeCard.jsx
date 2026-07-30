import "./RecipeCard.css";
import Badge from './Badge'
import FavoriteButton from "./FavoriteButton.jsx";
import BarraMacro from "./BarraMacro.jsx";

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
                <span className="icone"><svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960"
                                             width="15px" fill="#964B00"><path
                    d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm-99.5 291.5Q275-137 226-186t-77.5-114.5Q120-366 120-440t28.5-139.5Q177-645 226-694t114.5-77.5Q406-800 480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80q-74 0-139.5-28.5ZM678-242q82-82 82-198t-82-198q-82-82-198-82t-198 82q-82 82-82 198t82 198q82 82 198 82t198-82ZM480-440Z"/></svg></span>
                    <p>40 minutos</p>
                </div>

                <div className="dificuldade">
                    <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px"
                         fill="#964B00">
                        <path
                            d="M520-600v-80h120v-160h80v160h120v80H520Zm120 480v-400h80v400h-80Zm-400 0v-160H120v-80h320v80H320v160h-80Zm0-320v-400h80v400h-80Z"/>
                    </svg>
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