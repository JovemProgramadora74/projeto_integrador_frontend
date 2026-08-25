import "./ReceitasFavoritas.css";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import RecipeCard from "../../components/RecipeCard/RecipeCard.jsx";
import { useEffect, useState } from "react";
import { fetchApi } from "../../servicos/api.js";
import BotaoChat from "../../components/BotaoChat/BotaoChat.jsx";

function ReceitasFavoritas() {
    const [receitas, setReceitas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function carregaStatusBackend() {
            const token = localStorage.getItem("token");

            if (token == null) {
                setCarregando(false);
                setErro("É necessário estar logado para favoritar receitas.");
                return;
            }

            try {
                const dados = await fetchApi("/receitas/favoritas", {
                    signal: controller.signal,
                    headers: {
                        ...(token && { 'Authorization': `Bearer ${token}` })
                    }
                });

                const listaReceitas = Array.isArray(dados) ? dados : (dados?.receitas || []);
                setReceitas(listaReceitas);

            } catch (err) {
                if (err.name !== "AbortError") {
                    if (err.status >= 400 && err.status < 500) {
                        setErro(err.message || "Requisição inválida ou sessão expirada.");
                    } else {
                        setErro("Ocorreu uma falha no servidor. Tente novamente mais tarde.");
                    }
                }
            } finally {
                if (!controller.signal.aborted) {
                    setCarregando(false);
                }
            }
        }

        carregaStatusBackend();

        return () => controller.abort();
    }, []);

    return (
        <>
            <Header />

            <main className="container receitas-favoritas">
                <h1>Receitas Favoritas</h1>

                {carregando && (
                    <div className="spinner-container">
                        <div className="spinner" role="status">
                            <span className="sr-only">Carregando receitas favoritas...</span>
                        </div>
                    </div>
                )}

                {erro && !carregando && (
                    <p className="mensagem-erro">{erro}</p>
                )}

                {!carregando && !erro && receitas.length === 0 && (
                    <p className="mensagem-vazio">
                        Você ainda não curtiu nenhuma receita.
                    </p>
                )}

                {!carregando && !erro && receitas.length > 0 && (
                    <div className="grid">
                        {receitas.map((receita) => (
                            <RecipeCard
                                key={receita.id}
                                receitaId={receita.id}
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
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}

export default ReceitasFavoritas;