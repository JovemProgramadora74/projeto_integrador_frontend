import {useEffect, useState} from "react";
import "./Categorias.css";
import Header from "../../components/Header/Header.jsx";
import FiltroCategorias from "../../components/FiltroCategorias/FiltroCategorias.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import {fetchApi} from "../../servicos/api.js";
import ReceitaGrid from "../../components/ReceitaGrid/ReceitaGrid.jsx";

function Categorias() {
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");
    const [receitas, setReceitas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function carregarReceitas() {
            try {
                const token = localStorage.getItem("token");

                const dados = await fetchApi("/receitas", {
                    signal: controller.signal, headers: {
                        'Content-Type': 'application/json',
                        ...(token && {'Authorization': `Bearer ${token}`})
                    },
                });

                if (Array.isArray(dados)) {
                    setReceitas(dados);
                    setCarregando(false);
                } else {
                    throw new Error("Formato de resposta inválido.");
                }
            } catch (err) {
                if (err.name !== "AbortError") {
                    setErro("Não foi possível carregar as receitas.");
                    setCarregando(false);
                }
            }
        }

        carregarReceitas();

        return () => controller.abort();
    }, []);

    const receitasFiltradas = categoriaSelecionada === "Todas"
        ? receitas
        : receitas.filter((receita) => receita.tagRestricao === categoriaSelecionada);

    return (
        <>
            <Header/>
            <FiltroCategorias
                categoriaSelecionada={categoriaSelecionada}
                onSelecionarCategoria={setCategoriaSelecionada}
            />
            <div className="container">
                <ReceitaGrid
                    receitas={receitasFiltradas}
                    carregando={carregando}
                    erro={erro}
                />
            </div>
            <Footer/>
        </>
    );
}

export default Categorias;