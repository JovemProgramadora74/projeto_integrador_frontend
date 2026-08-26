import { useNavigate } from 'react-router-dom';
import NutritionalBar from './NutritionalBar';
import {Clock, Gauge} from "lucide-react";

function HeroRecipeCard() {
    const navigate = useNavigate();

    return (
        <div className="hero-recipe-card">
            <img
                src="https://chefcristinahaaland.com.br/wp-content/uploads/2020/12/chefcristinahaaland-Salada-Caesar-com-frango.jpg"
                alt="Salada"
            />

            <div className="card-info">
                <div className="card-info-items">
                    <div className="item-info">
                        <p className="item-titulo">Salada Caesar</p>
                        <div className="info">
                            <div className="tempo">
                                <Clock className="main-icons" />
                                <p className="item-subtitulo">25min</p>
                            </div>
                            <div className="dificuldade">
                                <Gauge className="main-icons" />
                                <p className="item-subtitulo">Fácil</p>
                            </div>
                        </div>
                    </div>
                </div>

                <NutritionalBar label="Proteína" value={42} color="#A14A2C"/>
                <NutritionalBar label="Carboidratos" value={38} color="#D4A373"/>
                <NutritionalBar label="Gorduras" value={20} color="#606C38"/>


                <button
                    className="btn-card-info"
                    onClick={() => navigate('/receitas/1')}
                >
                    Ver receita
                </button>
            </div>
        </div>
    );
}

export default HeroRecipeCard;