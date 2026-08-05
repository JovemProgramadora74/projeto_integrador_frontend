import { useState } from "react";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        try {
            const resposta = await fetch("http://10.112.4.144/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, senha })
            });

            if (!resposta.ok) {
                throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
            }

            const dados = await resposta.json();

            if (dados.token) {
                localStorage.setItem("token", dados.token);
                alert("Login realizado com sucesso!");
            } else {
                alert("Token não encontrado na resposta do servidor.");
            }

        } catch (erro) {
            console.error("Erro ao realizar login:", erro);
            alert("Não foi possível conectar ao backend ou as credenciais estão incorretas.");
        }
    };

    return (
        <section className="section-login">
            <div className="login">
                <h1 className="login-titulo">Bem-vindo de volta</h1>
                <p className="login-subtitulo">Acesse sua conta para salvar receitas e acessar conteúdos exclusivos.</p>

                <form onSubmit={handleLogin}>
                    <div className="login-form-grupo">
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            required
                        />
                    </div>

                    <div className="login-container">
                        <label className="custom-checkbox">
                            <input type="checkbox" id="lembrar" name="lembrar"/>
                            <span className="label-text">Lembrar de mim</span>
                        </label>

                        <a href="#" className="link">Esqueceu a senha?</a>
                    </div>

                    <button type="submit" className="btn-entrar">
                        Entrar na conta
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