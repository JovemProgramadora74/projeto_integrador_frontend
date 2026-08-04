import "./Cadastro.css";
function Cadastro() {

    return (
        <div className="cadastro">
            <h1 className="cadastro-titulo">Bem-vindo ao cadastro</h1>
            <p className="cadastro-subtitulo"> Cadastre-se para salvar receitas e acessar conteúdos exclusivos.</p>

            <form>
                <div className="cadastro-form-grupo">
                    <label htmlFor="nome">Nome</label>
                    <input id="nome" type="text" placeholder="Ex: João"/>
                </div>

                <div className="cadastro-form-grupo">
                    <label htmlFor="usuario">Usuário</label>
                    <input id="usuario" type="text" placeholder="Ex: joão_123"/>
                </div>

                <div className="cadastro-form-grupo">
                    <label htmlFor="email">E-mail</label>
                    <input id="email" type="email" placeholder="seu@email.com"/>
                </div>

                <div className="cadastro-form-grupo">
                    <label htmlFor="senha">Senha</label>
                    <input id="senha" type="password" placeholder="********"/>
                </div>

                <div className="cadastro-form-grupo">
                    <label htmlFor="confirmar-senha">Confirmar Senha</label>
                    <input id="confirmar-senha" type="password" placeholder="********"/>
                </div>

                <div className="cadastro-container">
                    <label className="custom-checkbox">
                        <input type="checkbox" id="lembrar" name="lembrar"/>
                        <span className="label-text">Lembrar de mim</span>
                    </label>
                </div>

                <button type="submit" className="btn-cadastrar">
                    Cadastrar
                </button>

                <p className="fazer-login">
                    Já tem uma conta? <a href="#" className="link">Login</a>
                </p>
            </form>
        </div>
    );
}
export default Cadastro;