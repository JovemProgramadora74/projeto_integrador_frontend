import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./ListagemChefs.css";
import {fetchApi} from "../../servicos/api.js";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Edit, Trash2} from "lucide-react";

export default function ListarChefs() {
    const [chefs, setChefs] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const token = localStorage.getItem("token");
    useEffect(() => {
        const controller = new AbortController();

        async function carregaChefs() {
            try {
                const dados = await fetchApi("/contato/meu", {
                    signal: controller.signal,
                    headers: {
                        ...(token && {Authorization: `Bearer ${token}`}),
                    },
                });

                const listaChefs = Array.isArray(dados) ? dados : dados?.chefs || [];
                setChefs(listaChefs);
            } catch (err) {
                if (err.name !== "AbortError") {
                    if (err.status >= 400 && err.status < 500) {
                        setErro(err.message || "Requisição inválida ou sessão expirada.");
                    } else {
                        setErro(
                            "Ocorreu uma falha no servidor. Tente novamente mais tarde.",
                        );
                    }
                }
            } finally {
                if (!controller.signal.aborted) {
                    setCarregando(false);
                }
            }
        }

        carregaChefs();

        return () => controller.abort();
    }, [token]);

    const navigate = useNavigate();

    const handleEditar = (chefeId) => {
        navigate(`/editar-chef/${chefeId}`);
    };

    const handleRemover = async (chefeId) => {
        if (!window.confirm("Tem certeza que deseja remover este chef?")) {
            return;
        }

        try {
            await fetchApi(`/contato/${chefeId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setChefs(chefs.filter((chef) => chef.id !== chefeId));
            alert("Chef removido com sucesso!");
        } catch (err) {
            if (err.status >= 400 && err.status < 500) {
                setErro(err.message || "Requisição inválida ou sessão expirada.");
            } else {
                setErro("Ocorreu uma falha no servidor. Tente novamente mais tarde.");
            }
        }
    };

    return (
        <div className="page-container">
            <Header/>

            <main className="content-container">
                <h2>Contatos de Chefs</h2>

                {carregando && (
                    <div className="spinner-container">
                        <div className="spinner" role="status">
                            <span className="sr-only">Carregando chefs...</span>
                        </div>
                    </div>
                )}

                {erro && !carregando && <p className="mensagem-erro">{erro}</p>}

                {!carregando && !erro && chefs.length === 0 && (
                    <p className="empty-state">Nenhum chef cadastrado no momento.</p>
                )}

                {!carregando && !erro && chefs.length > 0 && (
                    <div className="chefs-list">
                        {chefs.map((chef) => (
                            <div key={chef.id} className="chef-card">
                                <div className="chef-header">
                                    <h3>{chef.nome}</h3>
                                    <div className="chef-actions">
                                        <button
                                            className="btn-editar"
                                            onClick={() => handleEditar(chef.id)}
                                            aria-label={`Editar chef ${chef.nome}`}
                                            title="Editar"
                                        >
                                            <Edit size={20}/>
                                        </button>
                                        <button
                                            className="btn-remover"
                                            onClick={() => handleRemover(chef.id)}
                                            aria-label={`Remover chef ${chef.nome}`}
                                            title="Remover"
                                        >
                                            <Trash2 size={20}/>
                                        </button>
                                    </div>
                                </div>
                                <p>
                                    <strong>E-mail:</strong> {chef.email}
                                </p>
                                <p>
                                    <strong>Telefone:</strong> {chef.telefone}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer/>
        </div>
    );
}
