import "./FiltroCategorias.css"
import ItemCategoria from "../ItemCategoria/ItemCategoria";
import { LayoutGrid, UtensilsCrossed , Cake, Salad, Croissant, Coffee, Soup, FlameKindling} from "lucide-react";

const Categorias = [
    {
        label: "Todas",
        icon: <LayoutGrid />,
    },
    {
        label: "Massas",
        icon: <UtensilsCrossed /> ,
    },
    {
        label: "Sobremesa",
        icon: <Cake />,
    },
    {
        label: "Saladas",
        icon: <Salad />,
    },
    {
        label: "Pães",
        icon: <Croissant />,
    },
    {
        label: "Café da Manhã",
        icon:  <Coffee />,
    },
    {
        label: "Sopas",
        icon: <Soup />,
    },
    {
        label: "Grelhados",
        icon:  <FlameKindling />,
    },
];

function FiltroCategorias() {
    return (
        <div className="filtro-categorias">
            {Categorias.map((categoria, index) => (
                <ItemCategoria
                    key={index}
                    label={categoria.label}
                    icon={categoria.icon}
                />
            ))}
        </div>
    );
}

export default FiltroCategorias;