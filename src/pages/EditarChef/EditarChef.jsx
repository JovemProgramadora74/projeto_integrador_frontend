import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditarChef.css";
import { fetchApi } from "../../servicos/api.js";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { ArrowLeft } from "lucide-react";

export default function EditarChef() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        vinculo: "",
        telefone: "",
    });
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        async function carregaChef() {
            try {
                const listaChefs = await fetchApi("/contato/meu", {
                    headers: {
                        ...(token && {Authorization: `Bearer ${token}`}),
                    },
                });

                const chefEncontrado = listaChefs.find((item) => String(item.id) === String(id));

                if (!chefEncontrado) {
                    setErro("Chef não encontrado.");
                    setCarregando(false);
                    return;
                }

                setFormData({
                    nome: chefEncontrado.nome,
                    email: chefEncontrado.email,
                    vinculo: chefEncontrado.vinculo,
                    telefone: chefEncontrado.telefone,
                });
            } catch (err) {
                if (err.status >= 400 && err.status < 500) {
                    setErro(err.message || "Requisição inválida ou sessão expirada.");
                } else {
                    setErro("Ocorreu uma falha no servidor. Tente novamente mais tarde.");
                }
            } finally {
                setCarregando(false);
            }
        }
        carregaChef();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        setSalvando(true);

        try {
            await fetchApi(`/contato/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            alert("Chef atualizado com sucesso!");
            navigate("/meus-chefes");
        } catch (err) {
            if (err.status >= 400 && err.status < 500) {
                setErro(err.message || "Requisição inválida ou sessão expirada.");
            } else {
                setErro("Ocorreu uma falha no servidor. Tente novamente mais tarde.");
            }
        } finally {
            setSalvando(false);
        }
    };

    if (carregando) {
        return (
            <div className="page-container">
                <Header />
                <main className="content-container">
                    <div className="spinner-container">
                        <div className="spinner" role="status">
                            <span className="sr-only">Carregando chef...</span>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="page-container">
            <Header />

            <main className="content-container">
                <div className="editar-header">
                    <button
                        className="btn-voltar"
                        onClick={() => navigate("/meus-chefes")}
                        aria-label="Voltar para listagem"
                    >
                        <ArrowLeft size={20} />
                        Voltar
                    </button>
                    <h2>Editar Chef</h2>
                </div>

                {erro && <p className="mensagem-erro">{erro}</p>}

                <form onSubmit={handleSubmit} className="form-chef">
                    <div className="form-group">
                        <label htmlFor="nome">Nome:</label>
                        <input
                            id="nome"
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                            disabled={salvando}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={salvando}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefone">Telefone:</label>
                        <input
                            id="telefone"
                            type="tel"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            required
                            disabled={salvando}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-salvar" disabled={salvando}>
                            {salvando ? "Salvando..." : "Salvar"}
                        </button>
                        <button
                            type="button"
                            className="btn-cancelar"
                            onClick={() => navigate("/chefs")}
                            disabled={salvando}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </main>

            <Footer />
        </div>
    );
}
