import "./ReceitasFavoritas.css"
import Header from "../../components/Header/Header.jsx";
import {useEffect, useState} from "react";
import Footer from "../../components/Footer/Footer.jsx";
import RecipeCard from "../../components/RecipeCard/RecipeCard.jsx";

function ReceitasFavoritas() {
    const [receitas, setReceitas] = useState([]);

    useEffect(() => {
        async function carregaStatusBackend() {
            try {
                const resposta = await fetch("http://senac47278.local/receitas/favoritas");

                if (resposta.ok) {
                    const dados = await resposta.json();
                    console.log(dados);
                    setReceitas(dados.receitas);
                } else {
                    alert("O servidor backend esta offline!");
                }
            } catch (error) {
                console.error(error);
            }
        }

        carregaStatusBackend();
    }, []);

    return (<>
        <Header/>

        <main className="container receitas-favoritas">
            <h1>Receitas Favoritas</h1>
            <div className="grid">
            {
                receitas.map(receita => <RecipeCard titulo={receita.titulo} imagem={receita.imagemUrl}
                                                    tagRestricao={receita.tagRestricao}
                                                    tempo={receita.tempoPreparoMinutos}
                                                    dificuldade={receita.dificuldade}/>)

            }
            </div>
        </main>

        <Footer/>
    </>);
}

export default ReceitasFavoritas;