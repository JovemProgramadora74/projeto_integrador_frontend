import {useNavigate} from 'react-router-dom';
import NutritionalBar from './NutritionalBar';
import {Clock, Gauge} from "lucide-react";
import {useEffect, useState} from "react";
import {fetchApi} from "../../servicos/api.js";

function HeroRecipeCard() {
    const navigate = useNavigate();
    const [receitaDestaque, setReceitaDestaque] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        async function carregaReceita() {
            try {
                // Ajuste a rota caso sua API use um endpoint específico para destaque, ex: "/receitas/destaque"
                const dados = await fetchApi("/receitas/destaque", {
                    signal: controller.signal,
                });

                if (dados !== null) {
                    // Se o endpoint retornar uma lista, pegamos o primeiro item. Se retornar o objeto direto, mantemos.
                    const receita = Array.isArray(dados) ? dados[0] : dados;
                    setReceitaDestaque(receita);
                } else {
                    throw new Error("Formato de resposta inválido.");
                }
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error(err.message);
                }
            } finally {
                setLoading(false);
            }
        }

        carregaReceita();

        return () => controller.abort();
    }, []);

    if (loading) {
        return <div className="hero-recipe-card loading">Carregando receita em destaque...</div>;
    }

    if (!receitaDestaque) {
        return null; // Ou uma mensagem informando que não há receita em destaque
    }

    return (
        <div className="hero-recipe-card">
            <img
                src={receitaDestaque.imagemUrl}
                alt={receitaDestaque.titulo}
            />

            <div className="card-info">
                <div className="card-info-items">
                    <div className="item-info">
                        <p className="item-titulo">{receitaDestaque.titulo}</p>
                        <div className="info">
                            <div className="tempo">
                                <Clock className="main-icons"/>
                                <p className="item-subtitulo">{receitaDestaque.tempoPreparoMinutos}min</p>
                            </div>
                            <div className="dificuldade">
                                <Gauge className="main-icons"/>
                                <p className="item-subtitulo">{receitaDestaque.dificuldade}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <NutritionalBar label="Proteína" value={receitaDestaque.macros?.proteinaPorcentagem || 0} color="#A14A2C"/>
                <NutritionalBar label="Carboidratos" value={receitaDestaque.macros?.carboidratosPorcentagem || 0} color="#D4A373"/>
                <NutritionalBar label="Gorduras" value={receitaDestaque.macros?.gordurasPorcentagem || 0} color="#606C38"/>

                <button
                    className="btn-card-info"
                    onClick={() => navigate(`/receitas/${receitaDestaque.id}`)}
                >
                    Ver receita
                </button>
            </div>
        </div>
    );
}

export default HeroRecipeCard;