import NutritionalBar from './NutritionalBar'

function HeroRecipeCard() {
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
                                <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960"
                                     width="15px"
                                     fill="#A14A2C">
                                    <path
                                        d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm-99.5 291.5Q275-137 226-186t-77.5-114.5Q120-366 120-440t28.5-139.5Q177-645 226-694t114.5-77.5Q406-800 480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80q-74 0-139.5-28.5ZM678-242q82-82 82-198t-82-198q-82-82-198-82t-198 82q-82 82-82 198t82 198q82 82 198 82t198-82ZM480-440Z"/>
                                </svg>
                                <p className="item-subtitulo">25min</p>
                            </div>
                            <div className="dificuldade">
                                <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960"
                                     width="15px"
                                     fill="#a14a2c">
                                    <path
                                        d="M520-600v-80h120v-160h80v160h120v80H520Zm120 480v-400h80v400h-80Zm-400 0v-160H120v-80h320v80H320v160h-80Zm0-320v-400h80v400h-80Z"/>
                                </svg>
                                <p className="item-subtitulo">Fácil</p>
                            </div>
                        </div>
                    </div>
                </div>

                <NutritionalBar label="Proteína" value={42} color="#A14A2C"/>
                <NutritionalBar label="Carboidratos" value={38} color="#D4A373"/>
                <NutritionalBar label="Gorduras" value={20} color="#606C38"/>
                <button className="btn-card-info">
                    Ver receita
                </button>
            </div>
        </div>
    )
}

export default HeroRecipeCard