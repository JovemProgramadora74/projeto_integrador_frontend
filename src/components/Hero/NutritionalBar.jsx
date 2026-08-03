function NutritionalBar({label, value, color}) {
    return (
        <div className="nutritional-bar">
            <div className="macro">
                <span>{label}</span>
            </div>

            <div className="valor">
                <div className="barra-progresso">
                    <div className="progresso" style={{width: `${value}%`, background: color}}/>
                </div>
                <span>{value}%</span>
            </div>
        </div>
    )
}

export default NutritionalBar





