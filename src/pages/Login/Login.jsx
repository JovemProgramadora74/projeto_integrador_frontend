import {useState} from "react";
import {useNavigate, Link} from "react-router-dom"; // Assumindo react-router-dom
import "./Login.css";
import {fetchApi} from "../../servicos/api.js";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [lembrar, setLembrar] = useState(false);

    const [carregando, setCarregando] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        setMensagemErro("");
        setCarregando(true);

        try {
            const dados = await fetchApi("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, senha, lembrar})
            });

            if (dados.token) {
                localStorage.setItem("token", dados.token);
                navigate("/"); // Redireciona para a página principal após sucesso
            } else {
                setMensagemErro("Token não retornado pelo servidor.");
            }

        } catch (erro) {
            console.error("Erro ao realizar login:", erro);

            if (erro.status === 401) {
                setMensagemErro(erro.message || "E-mail ou senha incorretos.");
            } else {
                setMensagemErro("Não foi possível conectar ao servidor.");
            }
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
                    <p className="mensagem-erro">
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
                            autoComplete="email"
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
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <div className="login-container">
                        <label className="custom-checkbox">
                            <input
                                type="checkbox"
                                id="lembrar"
                                name="lembrar"
                                checked={lembrar}
                                onChange={(e) => setLembrar(e.target.checked)}
                                disabled={carregando}
                            />
                            <span className="label-text">Lembrar de mim</span>
                        </label>

                        <Link to="/recuperar-senha" className="link">Esqueceu a senha?</Link>
                    </div>

                    <button type="submit" className="btn-entrar" disabled={carregando}>
                        {carregando ? "Entrando..." : "Entrar na conta"}
                    </button>

                    <p className="cadastrar-conta">
                        Ainda não tem uma conta? <Link to="/cadastrar" className="link">Cadastre-se</Link>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default Login;