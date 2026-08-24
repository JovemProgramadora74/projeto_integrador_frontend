import "./CriaChef.css";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { useState } from "react";
import { fetchApi } from "../../servicos/api.js";

function CriaChef() {
    const [nome, setNome] = useState("");
    const [vinculo, setVinculo] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");

    const [enviando, setEnviando] = useState(false);
    const [mensagemErro, setMensagemErro] = useState(null);
    const [mensagemSucesso, setMensagemSucesso] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);
        setMensagemErro(null);
        setMensagemSucesso(null);

        const token = localStorage.getItem("token");

        const dadosChef = {
            nome,
            vinculo,
            email,
            telefone: celular,
        };

        try {
            await fetchApi("/contato/cadastrar", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify(dadosChef)
            });

            setMensagemSucesso("Chef cadastrado com sucesso!");
            setNome("");
            setVinculo("");
            setEmail("");
            setCelular("");

        } catch (error) {
            console.error("Erro ao cadastrar chef:", error);

            if (error.status === 400) {
                setMensagemErro(error.message || "Dados inválidos. Verifique os campos.");
            } else {
                setMensagemErro("Não foi possível conectar ao servidor.");
            }
        } finally {
            setEnviando(false);
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                <form className="form-container" onSubmit={handleSubmit}>
                    <h1 className="form-titulo">Novo chef</h1>
                    <p className="form-subtitulo">Adicione as informações de um novo chef.</p>

                    {mensagemSucesso && (
                        <p className="mensagem-sucesso">{mensagemSucesso}</p>
                    )}

                    {mensagemErro && (
                        <p className="mensagem-erro">{mensagemErro}</p>
                    )}

                    <label className="form-grupo">
                        Nome
                        <input
                            type="text"
                            placeholder="Nome do chef"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </label>

                    <label className="form-grupo">
                        Vínculo
                        <input
                            type="text"
                            placeholder="Ex: Amigo, Convidado"
                            value={vinculo}
                            onChange={(e) => setVinculo(e.target.value)}
                            required
                        />
                    </label>

                    <label className="form-grupo">
                        Email
                        <input
                            type="email"
                            placeholder="chef@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    <label className="form-grupo">
                        Número de celular
                        <input
                            type="tel"
                            placeholder="(00) 00000-0000"
                            value={celular}
                            onChange={(e) => setCelular(e.target.value)}
                            required
                        />
                    </label>

                    <button
                        type="submit"
                        className="btn-cadastrar"
                        disabled={enviando}
                    >
                        {enviando ? "Cadastrando..." : "Cadastrar chef"}
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default CriaChef;