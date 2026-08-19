import { useEffect, useState } from "react";
import "./Categorias.css";
import Header from "../../components/Header/Header.jsx";
import FiltroCategorias from "../../components/FiltroCategorias/FiltroCategorias.jsx";
import RecipeCard from "../../components/RecipeCard/RecipeCard.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { fetchApi } from "../../servicos/api.js";

function Categorias() {
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");
    const [receitas, setReceitas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function carregarReceitas() {
            try {
                const dados = await fetchApi("/receitas", { signal: controller.signal });

                if (Array.isArray(dados)) {
                    setReceitas(dados);
                    setCarregando(false);
                } else {
                    throw new Error("Formato de resposta inválido.");
                }
            } catch (err) {
                if (err.name !== "AbortError") {
                    setErro("Não foi possível carregar as receitas.");
                    setCarregando(false);
                }
            }
        }

        carregarReceitas();

        return () => controller.abort();
    }, []);

    const receitasFiltradas = categoriaSelecionada === "Todas"
        ? receitas
        : receitas.filter((receita) => receita.categoria === categoriaSelecionada);

    return (
        <>
            <Header />
            <FiltroCategorias
                categoriaSelecionada={categoriaSelecionada}
                onSelecionarCategoria={setCategoriaSelecionada}
            />
            <div className="container">
                <div className="grid">
                    {carregando && (
                        <div className="spinner-container">
                            <div className="spinner" role="status">
                                <span className="sr-only">Carregando receitas...</span>
                            </div>
                        </div>
                    )}

                    {erro && !carregando && <p className="mensagem-erro">{erro}</p>}

                    {!carregando && !erro && receitasFiltradas.length > 0 && (
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
                                link={`/receitas/${receita.id}`}
                            />
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Categorias;