import "./Login.css"

function Login() {

    return (
        <section className="section-login">
            <div className="login">
                <h1 className="login-titulo">Bem-vindo de volta</h1>
                <p className="login-subtitulo">Acesse sua conta para salvar receitas e acessar conteúdos exclusivos.</p>
                <form>
                    <div className="login-form-grupo">
                        <label htmlFor="email">E-mail</label>
                        <input id="email" type="email" placeholder="seu@email.com"/>
                    </div>
                    <div className="login-form-grupo">
                        <label htmlFor="senha">Senha</label>
                        <input id="senha" type="password" placeholder="********"/>
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
    )
}

export default Login