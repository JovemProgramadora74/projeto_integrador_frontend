import RecipeCard from "../RecipeCard/RecipeCard.jsx";

function ReceitaGrid({ receitas, carregando, erro, mensagemVazio = "Nenhuma receita encontrada." }) {
    if (carregando) {
        return (
            <div className="spinner-container">
                <div className="spinner" role="status">
                    <span className="sr-only">Carregando receitas...</span>
                </div>
            </div>
        );
    }

    if (erro) {
        return <p className="mensagem-erro">{erro}</p>;
    }

    if (!receitas || receitas.length === 0) {
        return <p className="mensagem-vazio">{mensagemVazio}</p>;
    }

    return (
        <div className="grid">
            {receitas.map((receita) => (
                <RecipeCard
                    key={receita.id}
                    receitaId={receita.id}
                    titulo={receita.titulo}
                    tagRestricao={receita.tagRestricao}
                    tempo={receita.tempoPreparoMinutos}
                    imagem={receita.imagemUrl}
                    dificuldade={receita.dificuldade}
                    carb={receita.macros?.carboidratosPorcentagem}
                    gord={receita.macros?.gordurasPorcentagem}
                    prot={receita.macros?.proteinaPorcentagem}
                    link={`/receitas/${receita.id}`}
                    isFavorite={receita.curtido}
                />
            ))}
        </div>
    );
}

export default ReceitaGrid