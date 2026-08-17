import "./CriaChef.css"
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { useState } from "react";

function CriaChef() {

    const [nome, setNome] = useState("");
    const [vinculo, setVinculo] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const dadosChef = {
            nome,
            vinculo,
            email,
            celular,
        };

        try {
            const response = await fetch("http://10.112.4.144/status", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dadosChef)
            });

            if (response.status === 201) {
                alert("Chef cadastrado com sucesso!");
                setNome("");
                setVinculo("");
                setEmail("");
                setCelular("");
            } else if (response.status === 400) {
                alert("Erro: Preencha todos os campos corretamente.");
            } else {
                alert("Ocorreu um erro ao cadastrar.");
            }

        } catch (error) {
            console.error("Erro de conexão:", error);
            alert("Erro ao conectar com o servidor.");
        }
    }

    return (
        <>
            <Header/>
            <div className="container">
                <form className="form-container" onSubmit={handleSubmit}>
                    <h1 className="form-titulo"> Novo chef </h1>
                    <p className={"form-subtitulo"}> Adicione as informações de um novo chef.</p>

                    <label className={"form-grupo"}>Nome
                        <input type="text" placeholder="Nome do chef" value={nome}
                               onChange={(elemento) => setNome(elemento.target.value)}/>
                    </label>
                    <label className={"form-grupo"}>Vinculo
                        <input type="text" placeholder="Amigo" value={vinculo}
                               onChange={(elemento) => setVinculo(elemento.target.value)}/>
                    </label>
                    <label className={"form-grupo"}>Email
                        <input type="email" placeholder="chef@email.com" value={email}
                               onChange={(elemento) => setEmail(elemento.target.value)}/>
                    </label>
                    <label className={"form-grupo"}>Numero de celular
                        <input type="text" placeholder="(00) 00000-0000" value={celular}
                               onChange={(elemento) => setCelular(elemento.target.value)}/>
                    </label>

                    <button type="submit" className={"btn-cadastrar"}>Cadastrar chef</button>
                </form>
            </div>
            <Footer/>
        </>
    );
}

export default CriaChef;