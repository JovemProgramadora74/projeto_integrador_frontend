import "./Cadastro.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchApi } from "../../servicos/api.js";
import Logo from "../../components/Header/Logo.jsx";

function Cadastrar() {
    const [nome, setNome] = useState("");
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [carregando, setCarregando] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");
    const [mensagemSucesso, setMensagemSucesso] = useState("");

    const navigate = useNavigate();

    async function quandoCriar(evento) {
        evento.preventDefault();
        setMensagemErro("");
        setMensagemSucesso("");

        if (!nome.trim() || !usuario.trim() || !email.trim() || !senha || !confirmarSenha) {
            setMensagemErro("Por favor, preencha todos os campos.");
            return;
        }

        if (senha.length < 6) {
            setMensagemErro("A senha precisa ter pelo menos 6 caracteres.");
            return;
        }

        if (senha !== confirmarSenha) {
            setMensagemErro("As senhas não coincidem!");
            return;
        }

        setCarregando(true);

        try {
            await fetchApi("/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome,
                    username: usuario,
                    email,
                    senha,
                }),
            });

            setMensagemSucesso("Usuário cadastrado com sucesso! Redirecionando...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (erro) {
            console.error("Erro ao realizar cadastro:", erro);

            if (erro.status >= 400 && erro.status < 500) {
                setMensagemErro(erro.message || "Dados inválidos. Verifique as informações inseridas.");
            } else {
                setMensagemErro("Não foi possível conectar ao servidor. Tente novamente mais tarde.");
            }
        } finally {
            setCarregando(false);
        }
    }

    return (

        <section className="cadastro-section">
            <Logo />
            <div className="cadastro">
                <h1 className="cadastro-titulo">Bem-vindo ao cadastro</h1>
                <p className="cadastro-subtitulo">Cadastre-se para salvar receitas e acessar conteúdos exclusivos.</p>

                {mensagemSucesso && <p className="mensagem-sucesso">{mensagemSucesso}</p>}
                {mensagemErro && <p className="mensagem-erro">{mensagemErro}</p>}

                <form onSubmit={quandoCriar}>
                    <div className="cadastro-form-grupo">
                        <label htmlFor="nome">Nome</label>
                        <input
                            id="nome"
                            type="text"
                            placeholder="Ex: João"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            disabled={carregando}
                            required
                        />
                    </div>

                    <div className="cadastro-form-grupo">
                        <label htmlFor="usuario">Usuário</label>
                        <input
                            id="usuario"
                            type="text"
                            placeholder="Ex: joao_123"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            disabled={carregando}
                            required
                        />
                    </div>

                    <div className="cadastro-form-grupo">
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={carregando}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="cadastro-form-grupo">
                        <label htmlFor="senha">Senha</label>
                        <input
                            id="senha"
                            type="password"
                            placeholder="********"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            disabled={carregando}
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <div className="cadastro-form-grupo">
                        <label htmlFor="confirmar-senha">Confirmar Senha</label>
                        <input
                            id="confirmar-senha"
                            type="password"
                            placeholder="********"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            disabled={carregando}
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn-cadastrar" disabled={carregando}>
                        {carregando ? "Cadastrando..." : "Cadastrar"}
                    </button>

                    <p className="fazer-login">
                        Já tem uma conta? <Link to="/login" className="link">Login</Link>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default Cadastrar;