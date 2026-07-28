 function HeroText() {
    return (

        <section className="hero">
            <heroText/>

            <div className="hero-image">
                <img
                    src={"https://www.dzoom.org.es/wp-content/uploads/2019/04/fotografia-de-comida-platos7-810x540.jpg"}
                    alt={"Receita saudavel"}
                />
                <heroRecipeCard />
            </div>
        </section>
    );
}

export default HeroText;