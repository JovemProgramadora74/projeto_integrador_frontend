import {useEffect, useState} from "react";
import "./Categorias.css";
import Header from "../../components/Header/Header.jsx";
import FiltroCategorias from "../../components/FiltroCategorias/FiltroCategorias.jsx";
import RecipeCard from "../../components/RecipeCard/RecipeCard.jsx";
import Footer from "../../components/Footer/Footer.jsx";

function Categorias() {
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");

    const [receitas, setReceitas] = useState([])
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    useEffect(() => {
        async function carregarReceitas() {
            try {
                const resposta = await fetch("http://senac47278/receitas");
                if (!resposta.ok) {
                    throw new Error("O servidor backend está offline!")
                }

                setReceitas(await resposta.json());
            } catch (err) {
                console.error(err);
                setErro("Não foi possível conectar ao servidor backend.");
            } finally {
                setCarregando(false);
            }
        }

        carregarReceitas();
    }, []);

    if (carregando) return <p>Carregando receitas...</p>;
    if (erro) return <p style={{ color: 'red' }}>{erro}</p>;

    const receitasFiltradas = categoriaSelecionada === "Todas"
        ? receitas
        : receitas.filter((receita) => receita.categoria === categoriaSelecionada);

    return (
        <>
            <Header/>
            <FiltroCategorias
                categoriaSelecionada={categoriaSelecionada}
                onSelecionarCategoria={setCategoriaSelecionada}
            />
            <div className="container">
                <div className="grid">
                    {receitasFiltradas.length > 0 ? (
                        receitasFiltradas.map((receita) => (
                            <RecipeCard key={receita.id} titulo={receita.titulo} tagRestricao={receita.tagRestricao}
                                        tempo={receita.tempoPreparoMinutos} imagem={receita.imagemUrl}
                                        dificuldade={receita.dificuldade} carb={receita.macros.carboidratosPorcentagem}
                                        gord={receita.macros.gordurasPorcentagem}
                                        prot={receita.macros.proteinaPorcentagem} link={"receitas/" + receita.id}/>
                        ))
                    ) : (
                        <p>Nenhuma receita encontrada para essa categoria.</p>
                    )}
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Categorias;
