import './Index.css'
import Header from "../../components/Header/Header.jsx";
import HeroSection from "../../components/Hero/HeroSection.jsx";
import FiltroCategorias from "../../components/FiltroCategorias/FiltroCategorias.jsx";
import RecipeCard from "../../components/RecipeCard/RecipeCard.jsx";
import ChefDestaqueCard from "../../components/CardDestaqueChef/CardDestaqueChef.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import {useEffect} from "react";

function Index() {
    useEffect(() => {
        async function carregaStatusBackend() {
            const resposta = await fetch("http://10.112.4.144/status");
            if (resposta.ok) {
                alert("O servidor backend está rodando!")
            } else {
                alert("O servidor backend está offline!")
            }
        }

        carregaStatusBackend();
    }, []);

    return (
        <>
            <Header/>
            <HeroSection/>
            <FiltroCategorias/>
            <div className="container">
                <div className="highlights-header">
                    <h2>Receitas em destaque</h2>
                    <a>Ver todos →</a>
                </div>
                <div className="grid">
                    <RecipeCard/>
                    <RecipeCard/>
                    <RecipeCard/>
                    <RecipeCard/>
                    <RecipeCard/>
                    <RecipeCard/>
                    <RecipeCard/>
                    <RecipeCard/>
                </div>
            </div>
            <ChefDestaqueCard
                imagem="https://socialbauru.com.br/wp-content/uploads/2024/05/premioimpera2019-principal-marchante-1024x683-1.jpg"/>
            <Footer/>
        </>
    );
}

export default Index;