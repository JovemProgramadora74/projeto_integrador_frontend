import { useNavigate } from "react-router-dom";
import "./CardDestaqueChef.css";
import { Leaf } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchApi } from "../../servicos/api.js";

function ChefDestaqueCard() {
    const navigate = useNavigate();
    const [receitaDestaque, setReceitaDestaque] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        async function carregaReceita() {
            try {
                const dados = await fetchApi("/receitas/escolhida", {
                    signal: controller.signal,
                });

                if (dados !== null) {
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

    const handleVerReceita = () => {
        if (receitaDestaque?.id) {
            navigate(`/receitas/${receitaDestaque.id}`);
        }
    };

    if (loading) {
        return <div className="chef-destaque-card loading">Carregando escolha do chef...</div>;
    }

    if (!receitaDestaque) {
        return null;
    }

    return (
        <section className="chef-destaque-card">
            <div className="chef-destaque-card-image-container">
                <img
                    className="chef-destaque-card-img"
                    src={receitaDestaque.imagemUrl}
                    alt={receitaDestaque.titulo}
                />
            </div>

            <div className="chef-destaque-card-content">
                <div className="chef-destaque-card-badge-text">
                    <Leaf size={16} />
                    <h3 className="chef-destaque-card-badge-text">ESCOLHA DO CHEF</h3>
                </div>

                <h2 className="chef-destaque-subtitulo">{receitaDestaque.titulo}</h2>

                <p>
                    Um prato especial escolhido pelo chef para você.
                </p>

                <p className="chef-destaque-nome">
                    Chef: Rafael Costa
                </p>

                <p className="chef-destaque-experiencia">
                    15 anos de experiência na gastronomia
                </p>

                <button
                    className="chef-destaque-botao-receita"
                    onClick={handleVerReceita}
                >
                    Ver receita completa <span className="arrow">→</span>
                </button>
            </div>
        </section>
    );
}

export default ChefDestaqueCard;