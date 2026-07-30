import './BarraMacro.css'

function BarraMacro({title, porcentagem = 0, cor}) {
    return (
        <div className="macro-barra">
            <p>{title}</p>

            <div className="linha-barra" >
                {/* Barra de progresso */}
                <div className="barra-fundo">
                    <div className="barra"
                         style={{ width: `${porcentagem}%`, backgroundColor: cor}}>
                             </div>
                    </div>
                {/* Barra de progresso */}
                <span className="porcentagem">{porcentagem}%</span>
            </div>
        </div>
    );
}

export default BarraMacro;
