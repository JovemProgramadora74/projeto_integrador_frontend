import "./CardDestaqueChef.css";
import {Leaf} from "lucide-react";

function ChefDestaqueCard(props) {
    return (
        <section className="chef-destaque-card">
            <div className="chef-destaque-card-image-container">
            <img
                className="chef-destaque-card-img"
                src={props.imagem}
                alt="Mesa preparada"

            />
            </div>

            <div className="chef-destaque-card-content">
                <div className="chef-destaque-card-badge-text">
                    <Leaf size={16} />
                    <h3 className="chef-destaque-card-badge-text">ESCOLHA DO CHEF</h3>
                </div>

                <h2 className="chef-destaque-subtitulo">Receita recomendada</h2>

                <p>
                    Um prato especial escolhido pelo chef para você.
                </p>

                <p>
                    O Chef Rafael Costa revela seus segredos para transformar legumes simples em uma
                    refeição digna de restaurante.
                </p>

                <p className="chef-destaque-nome">
                    Chef: Rafael Costa
                </p>

                <p className="chef-destaque-experiencia">
                    15 anos de experiência na gastronomia
                </p>

                <button className="chef-destaque-botao-receita">
                    Ver receita completa <span className="arrow">→</span>
                </button>

            </div>

        </section>
    );
}

export default ChefDestaqueCard;