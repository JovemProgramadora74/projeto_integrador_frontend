import { useNavigate } from 'react-router-dom';

function HeroText() {
    const navigate = useNavigate();

    return (
        <div className="hero-text">
            <h1 className="titulo">
                Receitas que <br/> nutrem seu corpo <br/> e sua rotina
            </h1>
            <p className="descricao">
                Práticas, saudáveis e deliciosas para <br/> cada estilo de vida.
            </p>
            <button
                className="btn-explorar"
                onClick={() => navigate('/categorias')}
            >
                Explorar receitas →
            </button>
        </div>
    );
}

export default HeroText;