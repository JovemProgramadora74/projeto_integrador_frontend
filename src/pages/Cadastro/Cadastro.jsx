import "./Cadastro.css";
import {useState} from "react";
function Cadastro() {

    const [nome, setNome] = useState("");
    const [usuario, setUsuario] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confimarsenha, setconfirmarSenha] = useState("")

     async function quandoCriar(evento) {
        evento.preventDefault();

         if (!nome.trim()) {
             alert("Por favor, preencha o campo Nome.");
             return;
         }


         if (!usuario.trim()) {
             alert("Por favor, preencha o campo Usuário.");
             return;
         }


         if (!email.trim()) {
             alert("Por favor, preencha o campo E-mail.");
             return;
         }


         if (!email.includes("@") || !email.includes(".")) {
             alert("Por favor, informe um e-mail válido.");
             return;
         }


         if (!senha) {
             alert("Por favor, digite uma senha.");
             return;
         }

         if (senha.length < 6) {
             alert("A senha precisa ter pelo menos 6 caracteres.");
             return;
         }

         if (senha !== confimarsenha) {
             alert("As senhas não coincidem!");
             return;
         }
         try {
             const resposta = await fetch("http://senac47278/cadastrar", {
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


             if (resposta.status === 201) {
                 alert("Usuário cadastrado com sucesso!");
             } else {
                 const dados = await resposta.json();
                 alert(`Erro no cadastro! ${dados["message"]}`);
             }
         } catch (erro) {
             console.error("Erro de conexão:", erro);
             alert("Não foi possível conectar ao servidor. Verifique se o backend está rodando!");
         }
    }

    return (
        <div className="cadastro">
            <h1 className="cadastro-titulo">Bem-vindo ao cadastro</h1>
            <p className="cadastro-subtitulo"> Cadastre-se para salvar receitas e acessar conteúdos exclusivos.</p>

            <form onSubmit={quandoCriar}>
                <div className="cadastro-form-grupo">
                    <label htmlFor="nome">Nome</label>
                    <input id="nome" type="text" placeholder="Ex: João" value={nome} onChange={(elemento) => setNome(elemento.target.value)} />
                </div>

                <div className="cadastro-form-grupo">
                    <label htmlFor="usuario">Usuário</label>
                    <input id="usuario" type="text" placeholder="Ex: joão_123" value={usuario} onChange={(elemento) => setUsuario(elemento.target.value)}/>
                </div>

                <div className="cadastro-form-grupo">
                    <label htmlFor="email">E-mail</label>
                    <input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(elemento) =>setEmail(elemento.target.value)}/>
                </div>

                <div className="cadastro-form-grupo">
                    <label htmlFor="senha">Senha</label>
                    <input id="senha" type="password" placeholder="********" value={senha} onChange={(elemento) => setSenha(elemento.target.value)}/>
                </div>

                <div className="cadastro-form-grupo">
                    <label htmlFor="confirmar-senha">Confirmar Senha</label>
                    <input id="confirmar-senha" type="password" placeholder="********" value={confimarsenha} onChange={(elemento) => setconfirmarSenha(elemento.target.value)}/>
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