import NutritionalBar from "./NutritionalBar";

 function HeroRecipeCard() {
    return (

        <div className="recipe-card">
            <h2 className="recipe-title"></h2>

            <NutritionalBar nome="Proteinas" porcentagem={35}/>
            <NutritionalBar nome="Carboidratos" porcentagem={43}/>
            <NutritionalBar nome="Gorduras" porcentagem={83}/>
        </div>
    );
}

export default HeroRecipeCard;
