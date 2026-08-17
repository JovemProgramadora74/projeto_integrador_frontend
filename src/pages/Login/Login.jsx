import { useState } from "react";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [carregando, setCarregando] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        setMensagemErro("");
        setCarregando(true);

        try {
            const resposta = await fetch("http:///login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, senha })
            });

            const dados = await resposta.json().catch(() => ({}));

            if (!resposta.ok) {
                throw new Error(dados.mensagem || `Erro ${resposta.status}: Credenciais incorretas ou falha no servidor.`);
            }

            if (dados.token) {
                localStorage.setItem("token", dados.token);
            } else {
                setMensagemErro("Token não encontrado na resposta do servidor.");
            }

        } catch (erro) {
            console.error("Erro ao realizar login:", erro);
            setMensagemErro(erro.message || "Não foi possível conectar ao servidor.");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <section className="section-login">
            <div className="login">
                <h1 className="login-titulo">Bem-vindo de volta</h1>
                <p className="login-subtitulo">Acesse sua conta para salvar receitas e acessar conteúdos exclusivos.</p>

                {mensagemErro && (
                    <p className="mensagem-erro" style={{ color: "#d9534f", marginBottom: "1rem", textAlign: "center" }}>
                        {mensagemErro}
                    </p>
                )}

                <form onSubmit={handleLogin}>
                    <div className="login-form-grupo">
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={carregando}
                            required
                        />
                    </div>

                    <div className="login-form-grupo">
                        <label htmlFor="senha">Senha</label>
                        <input
                            id="senha"
                            type="password"
                            placeholder="********"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            disabled={carregando}
                            required
                        />
                    </div>

                    <div className="login-container">
                        <label className="custom-checkbox">
                            <input type="checkbox" id="lembrar" name="lembrar" disabled={carregando}/>
                            <span className="label-text">Lembrar de mim</span>
                        </label>

                        <a href="#" className="link">Esqueceu a senha?</a>
                    </div>

                    <button type="submit" className="btn-entrar" disabled={carregando}>
                        {carregando ? "Entrando..." : "Entrar na conta"}
                    </button>

                    <p className="cadastrar-conta">
                        Ainda não tem uma conta? <a href="#" className="link">Cadastre-se</a>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default Login;