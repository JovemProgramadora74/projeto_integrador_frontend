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
            {receitas.length === 0 ? (
                <p className="mensagem-vazio">
                    Você ainda não curtiu nenhuma receita.
                </p>
            ) : (
                <div className="grid">
                    {receitas.map((receita) => (
                        <RecipeCard
                            key={receita.id}
                            dificuldade={receita.dificuldade}
                            imagem={receita.imagemUrl}
                            tagRestricao={receita.tagRestricao}
                            tempo={receita.tempoPreparoMinutos}
                            titulo={receita.titulo}
                        />
                    ))}
                </div>
            )}
        </main>

        <Footer/>
    </>);
}

export default ReceitasFavoritas;