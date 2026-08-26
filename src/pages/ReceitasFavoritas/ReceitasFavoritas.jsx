import "./ReceitasFavoritas.css";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import {useEffect, useState} from "react";
import {fetchApi} from "../../servicos/api.js";
import ReceitaGrid from "../../components/ReceitaGrid/ReceitaGrid.jsx";

function ReceitasFavoritas() {
    const [receitas, setReceitas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function carregaStatusBackend() {
            const token = localStorage.getItem("token");

            try {
                const dados = await fetchApi("/receitas/favoritas", {
                    signal: controller.signal,
                    headers: {
                        ...(token && {'Authorization': `Bearer ${token}`})
                    }
                });

                const listaReceitas = Array.isArray(dados) ? dados : (dados?.receitas || []);
                setReceitas(listaReceitas);

            } catch (err) {
                if (err.name !== "AbortError") {
                    if (err.status >= 400 && err.status < 500) {
                        setErro(err.message || "Requisição inválida ou sessão expirada.");
                    } else {
                        setErro("Ocorreu uma falha no servidor. Tente novamente mais tarde.");
                    }
                }
            } finally {
                if (!controller.signal.aborted) {
                    setCarregando(false);
                }
            }
        }

        carregaStatusBackend();

        return () => controller.abort();
    }, []);

    return (
        <>
            <Header/>

            <main className="container receitas-favoritas">
                <h1>Receitas Favoritas</h1>

                <ReceitaGrid
                    receitas={receitas}
                    carregando={carregando}
                    erro={erro}
                    mensagemVazio={"Você ainda não curtiu nenhuma receita"}
                />
            </main>
            <Footer/>
        </>
    );
}

export default ReceitasFavoritas;