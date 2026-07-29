import { useState } from "react";
import "./FiltroCategorias.css"
import ItemCategoria from "../ItemCategoria/ItemCategoria";
import { LayoutGrid, UtensilsCrossed, Cake, Salad, Croissant, Coffee, Soup, FlameKindling } from "lucide-react";

const Categorias = [
    { label: "Todas", icon: <LayoutGrid /> },
    { label: "Massas", icon: <UtensilsCrossed /> },
    { label: "Sobremesa", icon: <Cake /> },
    { label: "Saladas", icon: <Salad /> },
    { label: "Pães", icon: <Croissant /> },
    { label: "Café da Manhã", icon: <Coffee /> },
    { label: "Sopas", icon: <Soup /> },
    { label: "Grelhados", icon: <FlameKindling /> },
];

function FiltroCategorias() {
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");

    return (
        <div className="categorias-header"> {/* ADICIONA ESSE DIV */}
            <h2>Encontre receitas para <br/> o seu estilo de dieta</h2>

            <div className="categorias-lista"> {/* E ESSE DIV */}
                {Categorias.map((cat) => (
                    <ItemCategoria
                        key={cat.label}
                        label={cat.label}
                        icon={cat.icon}
                        ativo={categoriaSelecionada === cat.label}
                        onClick={() => setCategoriaSelecionada(cat.label)}
                    />
                ))}
            </div>
        </div> /* FECHA AQUI */
    )
}

export default FiltroCategorias;