import "./ItemCategoria.css";

function ItemCategoria({label, icon, ativo, onClick}) {
    return (
        <div
            className={`item-categoria ${ativo ? 'ativo' : ''}`}
            onClick={onClick}
        >
            <button>{icon}</button>
            <span>{label}</span>
        </div>
    );
}

export default ItemCategoria;