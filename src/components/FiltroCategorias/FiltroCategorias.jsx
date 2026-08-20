import "./FiltroCategorias.css"
import ItemCategoria from "../ItemCategoria/ItemCategoria.jsx";
import {
    WheatOff,
    MilkOff, Leaf, Dumbbell, Wheat, Scale, Vegan, Milk
} from "lucide-react";

const Categorias = [
    {label: "Contém Glúten", icon: <Wheat/>},
    {label: "Low Carb", icon: <Scale/>},
    {label: "Sem Lactose", icon: <MilkOff/>},
    {label: "Sem Glúten", icon: <WheatOff/>},
    {label: "Vegano", icon: <Vegan/>},
    {label: "Alto Teor Proteico", icon: <Dumbbell/>},
    {label: "Vegetariano", icon: <Leaf/>},
    {label: "Contém Lactose", icon: <Milk/>},
];

function FiltroCategorias({categoriaSelecionada, onSelecionarCategoria}) {

    return (
        <div className="categorias-header">
            <h2>Encontre receitas para <br/> o seu estilo de dieta</h2>

            <div className="categorias-lista">
                {Categorias.map((cat) => (
                    <ItemCategoria
                        key={cat.label}
                        label={cat.label}
                        icon={cat.icon}
                        ativo={categoriaSelecionada === cat.label}
                        onClick={() => onSelecionarCategoria(cat.label)}
                    />
                ))}
            </div>
        </div>
    )
}

export default FiltroCategorias;