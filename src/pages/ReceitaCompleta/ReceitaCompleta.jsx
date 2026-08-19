import './ReceitaCompleta.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { Clock, Users, Gauge } from "lucide-react";
import { fetchApi } from "../../servicos/api.js";

function ReceitaCompleta() {
    const { id } = useParams();
    const [receita, setReceita] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function carregaReceitaCompleta() {
            setCarregando(true);
            setErro(null);

            try {
                const dados = await fetchApi(`/receitas/${id}`, { signal: controller.signal });
                setReceita(dados);
            } catch (erro) {
                if (erro.name !== "AbortError") {
                    if (erro.status === 404) {
                        setErro(erro.message || "Receita não encontrada.");
                    } else {
                        setErro( "Erro ao carregar os detalhes da receita.");
                    }
                }
            } finally {
                if (!controller.signal.aborted) {
                    setCarregando(false);
                }
            }
        }

        carregaReceitaCompleta();

        return () => controller.abort();
    }, [id]);

    const ingredientes = receita?.ingredientes || [];
    const modoPreparo = receita?.modoPreparo || [];

    return (
        <>
            <Header />
            <div className="container receita-completa">
                {carregando && (
                    <div className="spinner-container">
                        <div className="spinner" role="status">
                            <span className="sr-only">Carregando detalhes da receita...</span>
                        </div>
                    </div>
                )}

                {erro && !carregando && (
                    <div className="receita-mensagem-status">
                        <p className="mensagem-erro">{erro}</p>
                    </div>
                )}

                {!carregando && !erro && receita && (
                    <>
                        <div className="receita-topo">
                            <div className="receita-info">
                                <h1>{receita.titulo}</h1>

                                <div className="receita-meta">
                                    <div className="meta-item">
                                        <Clock size={18} color="#A60303" />
                                        <span>{receita.tempoPreparoMinutos} minutos</span>
                                    </div>
                                    <div className="meta-item">
                                        <Users size={18} color="#A60303" />
                                        <span>{receita.rendimento}</span>
                                    </div>
                                    <div className="meta-item">
                                        <Gauge size={18} color="#A60303" />
                                        <span>{receita.dificuldade}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="receita-imagem">
                                <img src={receita.imagemUrl} alt={receita.titulo || "Imagem da receita"} />
                            </div>
                        </div>

                        <div className="receita-corpo">
                            <section className="receita-ingredientes">
                                <h2>Ingredientes</h2>
                                {ingredientes.length > 0 ? (
                                    <ul>
                                        {ingredientes.map((ingrediente, index) => (
                                            <li key={`${index}-${ingrediente}`}>{ingrediente}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Nenhum ingrediente listado.</p>
                                )}
                            </section>

                            <section className="receita-modo-preparo">
                                <h2>Modo de Preparo</h2>
                                {modoPreparo.length > 0 ? (
                                    <ol>
                                        {modoPreparo.map((passo, index) => (
                                            <li key={index}>
                                                <span className="passo-numero">{index + 1}</span>
                                                <p>{passo}</p>
                                            </li>
                                        ))}
                                    </ol>
                                ) : (
                                    <p>Nenhum passo de preparo informado.</p>
                                )}
                            </section>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}

export default ReceitaCompleta;