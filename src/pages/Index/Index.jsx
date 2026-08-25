import './Index.css'
import Header from "../../components/Header/Header.jsx";
import HeroSection from "../../components/Hero/HeroSection.jsx";
import FiltroCategorias from "../../components/FiltroCategorias/FiltroCategorias.jsx";
import RecipeCard from "../../components/RecipeCard/RecipeCard.jsx";
import ChefDestaqueCard from "../../components/CardDestaqueChef/CardDestaqueChef.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { useEffect, useState } from "react";
import { fetchApi } from "../../servicos/api.js";

function Index() {
    const [receitas, setReceitas] = useState([]);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");

    const receitasFiltradas = categoriaSelecionada === "Todas"
        ? receitas
        : receitas.filter((receita) => receita.tagRestricao === categoriaSelecionada);

    useEffect(() => {
        const controller = new AbortController();

        async function carregaReceita() {
            const token = localStorage.getItem("token");
            try {
                const dados = await fetchApi("/receitas", {
                    signal: controller.signal, headers: {
                        'Content-Type': 'application/json',
                        ...(token && {'Authorization': `Bearer ${token}`})
                    },
                });

                if (Array.isArray(dados)) {
                    console.log(dados);
                    setReceitas(dados);
                    setCarregando(false);
                } else {
                    throw new Error("Formato de resposta inválido.");
                }
            } catch (err) {
                if (err.name !== "AbortError") {
                    setErro("Não foi possível carregar as receitas");
                    setCarregando(false);
                }
            }
        }

        carregaReceita();

        return () => controller.abort();
    }, []);

    return (
        <>
            <Header/>
            <HeroSection/>
            <FiltroCategorias categoriaSelecionada={categoriaSelecionada}
                              onSelecionarCategoria={setCategoriaSelecionada}/>

            <div className="container">
                <div className="highlights-header">
                    <h2>Receitas em destaque</h2>
                    <a className="link" href="/categorias">Ver todos →</a>
                </div>

                {carregando && (
                    <div className="spinner-container">
                        <div className="spinner" role="status">
                            <span className="sr-only">Carregando receitas...</span>
                        </div>
                    </div>
                )}

                {erro && !carregando && <p className="mensagem-erro">{erro}</p>}

                {!carregando && !erro && (
                    <div className="grid">
                        {receitasFiltradas.length > 0 ? (
                            receitasFiltradas.map((receita) => (
                                <RecipeCard
                                    key={receita.id}
                                    titulo={receita.titulo}
                                    tagRestricao={receita.tagRestricao}
                                    tempo={receita.tempoPreparoMinutos}
                                    imagem={receita.imagemUrl}
                                    dificuldade={receita.dificuldade}
                                    carb={receita.macros?.carboidratosPorcentagem}
                                    gord={receita.macros?.gordurasPorcentagem}
                                    prot={receita.macros?.proteinaPorcentagem}
                                    link={`/receitas/${receita.id}`} receitaId={receita.id} isFavorite={receita.curtido}
                                />
                            ))
                        ) : (
                            <p>Nenhuma receita encontrada para essa categoria.</p>
                        )}
                    </div>
                )}
            </div>

            <ChefDestaqueCard
                imagem="https://socialbauru.com.br/wp-content/uploads/2024/05/premioimpera2019-principal-marchante-1024x683-1.jpg"
            />
            <Footer/>
        </>
    );
}

export default Index;