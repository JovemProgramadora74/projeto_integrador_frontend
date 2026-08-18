import { useState } from 'react';
import "./CriaChef.css";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

function CriaChef() {
    const [nome, setNome] = useState('');
    const [vinculo, setVinculo] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    const handleCriarChef = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:3000/chefs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ nome, vinculo, email, telefone })
            });

            if (response.status === 201) {
                alert('Chef cadastrado com sucesso!');
                setNome('');
                setVinculo('');
                setEmail('');
                setTelefone('');
            } else if (response.status === 400) {
                alert('Erro ao cadastrar. Verifique os dados enviados.');
            }
        } catch (error) {
            console.error('Erro de conexão com a API local:', error);
        }
    };

    return (
        <>
            <Header/>
            <div className="container">
                <form onSubmit={handleCriarChef} className="form-container">
                    <h1 className="form-titulo"> Novo chef </h1>
                    <p className="form-subtitulo"> Adicione as informações de um novo chef.</p>

                    <label className="form-grupo">Nome
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Nome do chef"
                            required
                        />
                    </label>

                    <label className="form-grupo">Vinculo
                        <input
                            type="text"
                            value={vinculo}
                            onChange={(e) => setVinculo(e.target.value)}
                            placeholder="Amigo"
                            required
                        />
                    </label>

                    <label className="form-grupo">Email
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="chef@email.com"
                            required
                        />
                    </label>

                    <label className="form-grupo">Numero de celular
                        <input
                            type="text"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            placeholder="(00) 00000-0000"
                            required
                        />
                    </label>

                    <button type="submit" className="btn-cadastrar">Cadastrar chef</button>
                </form>
            </div>
            <Footer/>
        </>
    );
}

export default CriaChef;