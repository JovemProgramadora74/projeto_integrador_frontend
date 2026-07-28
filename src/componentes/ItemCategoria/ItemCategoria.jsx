import "./ItemCategoria.css";

function ItemCategoria({label, icon}) {
    return (
        <div
            className="item-categoria">
            <span>{icon}</span>
            <p>{label}</p>
        </div>
    );
}

export default ItemCategoria;