import './Index.css'
import Header from "../../components/Header/Header.jsx";
import HeroSection from "../../components/Hero/HeroSection.jsx";
import FiltroCategorias from "../../components/FiltroCategorias/FiltroCategorias.jsx";
import RecipeCard from "../../components/RecipeCard/RecipeCard.jsx";
import ChefDestaqueCard from "../../components/CardDestaqueChef/CardDestaqueChef.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import {useEffect, useState} from "react";

function Index() {
    const [receitas, setReceitas] = useState([])
    useEffect(() => {
        async function carregaReceita() {
           const resposta = await fetch("http://10.112.4.144/receitas");
           if(resposta.ok){
               setReceitas(await resposta.json());
           } else {
               alert ("O servidor backend está offline!")
           }
        }
        carregaReceita();
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
                    {receitas.map(receita => {
                        return <RecipeCard titulo={receita.titulo} tagRestricao={receita.tagRestricao} tempo={receita.tempoPreparoMinutos}
                                           imagem={receita.imagemUrl} dificuldade={receita.dificuldade} carb={receita.macros.carboidratosPorcentagem} gord={receita.macros.gordurasPorcentagem} prot={receita.macros.proteinaPorcentagem} link={receita.id} />
                    })}
                </div>
            </div>
            <ChefDestaqueCard
                imagem="https://socialbauru.com.br/wp-content/uploads/2024/05/premioimpera2019-principal-marchante-1024x683-1.jpg"/>
            <Footer/>
        </>
    );
}

export default Index;