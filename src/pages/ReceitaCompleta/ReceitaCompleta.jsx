import './ReceitaCompleta.css';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import {Clock, Users, Gauge} from "lucide-react";

function ReceitaCompleta() {
    const {id} = useParams();
    const [receita, setReceita] = useState(null)
    const [carregando, setCarregando] = useState(true);
    useEffect(() => {
        async function carregaReceitaCompleta() {
            try {
                const resposta = await fetch(`http://senac47278.local/receitas/${id}`);
                if (resposta.ok) {
                    setReceita(await resposta.json());
                } else {
                    alert("Receita não encontrada no servidor.");
                    setReceita(false);
                }
            } catch (error) {
                console.error(error);
                console.error("Erro de conexão com o servidor backend.");
                setReceita(false);
            } finally {
                setCarregando(false);
            }
        }

        carregaReceitaCompleta();
    }, [id]);

    if (carregando) {
        return (
            <>
                <Header/>
                <div className="container"><p>Carregando receita...</p></div>
                <Footer/>
            </>
        );
    }

    if (!receita) {
        return (
            <>
                <Header/>
                <div className="container receita-nao-encontrada">
                    <p>Receita não encontrada.</p>
                </div>
                <Footer/>
            </>
        );
    }

    console.log(receita);

    return (
        <>
            <Header/>
            <div className="container receita-completa">
                <div className="receita-topo">
                    <div className="receita-info">
                        <h1>{receita.titulo}</h1>

                        <div className="receita-meta">
                            <div className="meta-item">
                                <Clock size={18} color="#A60303"/>
                                <span>{receita.tempoPreparoMinutos} minutos</span>
                            </div>
                            <div className="meta-item">
                                <Users size={18} color="#A60303"/>
                                <span>{receita.rendimento}</span>
                            </div>
                            <div className="meta-item">
                                <Gauge size={18} color="#A60303"/>
                                <span>{receita.dificuldade}</span>
                            </div>
                        </div>
                    </div>

                    <div className="receita-imagem">
                        <img src={receita.imagemUrl} alt={receita.titulo}/>
                    </div>
                </div>

                <div className="receita-corpo">
                    <section className="receita-ingredientes">
                        <h2>Ingredientes</h2>
                        <ul>
                            {receita.ingredientes.map((ingrediente, index) => (
                                <li key={index}>{ingrediente}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="receita-modo-preparo">
                        <h2>Modo de Preparo</h2>
                        <ol>
                            {receita.modoPreparo.map((passo, index) => (
                                <li key={index}>
                                    <span className="passo-numero">{index + 1}</span>
                                    <p>{passo}</p>
                                </li>
                            ))}
                        </ol>
                    </section>
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default ReceitaCompleta;