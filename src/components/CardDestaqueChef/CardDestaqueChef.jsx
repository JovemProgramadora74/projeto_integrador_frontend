
import "./CardHighlightCard.css";



function ChefHighlightCard(props) {
    return (
        <section className="chef-card">
            <div className="chef-card-image-container">
            <img
                className="card-img"
                src={props.imagem}
                alt="Mesa preparada"

            />
            </div>

            <div className="chef-card-content">
                <h3 className="chef-title"> ESCOLHA DO CHEF</h3>

                <h2>Receita recomendada</h2>

                <p>
                    Um prato especial escolhido pelo chef para você.
                </p>

                <p>
                    O Chef Rafael Costa revela seus segredos para transformar legumes simples em uma
                    refeição digna de restaurante.
                </p>

                <p className="chef-nome">
                    Chef: Rafael Costa
                </p>

                <p className="chef-experiencia">
                    15 anos de experiência na gastronomia
                </p>

                <button className="botao-receita">
                    Ver receita completa <span class="arrow">→</span>
                </button>

            </div>

        </section>
    );
}

export default ChefHighlightCard;