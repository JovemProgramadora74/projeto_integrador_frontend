import './Index.css'
import Header from "../../components/Header/Header.jsx";
import HeroSection from "../../components/Hero/HeroSection.jsx";
import FiltroCategorias from "../../components/FiltroCategorias/FiltroCategorias.jsx";
import ChefDestaqueCard from "../../components/CardDestaqueChef/CardDestaqueChef.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import {useEffect, useState} from "react";
import {fetchApi} from "../../servicos/api.js";
import ReceitaGrid from "../../components/ReceitaGrid/ReceitaGrid.jsx";

function Index() {
    const [receitas, setReceitas] = useState([]);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");

    const receitasFiltradas = categoriaSelecionada === "Todas"
        ? receitas
        : receitas.filter((receita) => receita.tagRestricao === categoriaSelecionada);

    useEffect(() => {
        const controller = new AbortController();

        async function carregaReceita() {
            const token = localStorage.getItem("token");
            try {
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
                    setErro("Não foi possível carregar as receitas");
                    setCarregando(false);
                }
            }
        }

        carregaReceita();

        return () => controller.abort();
    }, []);

    return (
        <>
            <Header/>
            <HeroSection/>
            <FiltroCategorias categoriaSelecionada={categoriaSelecionada}
                              onSelecionarCategoria={setCategoriaSelecionada}/>

            <div className="container">
                <div className="highlights-header">
                    <h2>Receitas em destaque</h2>
                    <a className="link" href="/categorias">Ver todos →</a>
                </div>

                <ReceitaGrid
                    receitas={receitasFiltradas}
                    carregando={carregando}
                    erro={erro}
                    mensagemVazio="Nenhuma receita encontrada para essa categoria."
                />
            </div>

            <ChefDestaqueCard
                imagem="https://socialbauru.com.br/wp-content/uploads/2024/05/premioimpera2019-principal-marchante-1024x683-1.jpg"
            />
            <Footer/>
        </>
    );
}

export default Index;