import "./CardHighlightCard.css"
import ChefBadge from "../ChefCozinha/ChefBadge.jsx";

import ChefProfile from "../PerfilChef/PerfilChef.jsx";

function ChefHighlightCard(props) {
    return (
        <section className="chef-card">

            <div>
                <img
                    src={props.imagem}
                    alt="Mesa preparada"
                />
            </div>

            <div className="chef-card-content">
                <ChefBadge/>

                <h2>
                    Receita recomendada
                </h2>

                <p>
                    Um prato especial escolhido pelo chef para você.
                </p>

                <ChefProfile
                    avatar={props.avatar}
                    nome="Chef Rafael Costa"
                    credenciais="15 anos de experiência"
                />"


                <button>
                    Ver receita completa
                </button>

            </div>

        </section>
    );


}

export default ChefHighlightCard;