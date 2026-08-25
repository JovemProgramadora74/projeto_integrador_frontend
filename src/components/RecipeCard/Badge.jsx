import './Badge.css'
import {
    WheatOff, MilkOff, Leaf, Dumbbell, LucideBadgeInfo, Vegan, Wheat, Milk, Scale
} from "lucide-react";

function Badge({etiqueta}) {

    function escolherIcone() {
        switch (etiqueta) {
            case "Sem Glúten":
                return <WheatOff size={16}/>
            case "Sem Lactose":
                return <MilkOff size={16}/>
            case "Vegano":
                return <Vegan  size={16}/>
            case "Alto Teor Proteico":
                return <Dumbbell size={16}/>
            case "Contém Glúten":
                return <Wheat size={16}/>
            case "Vegetariano":
                return <Leaf size={16}/>
            case "Contém Lactose":
                return <Milk size={16}/>
            case "Low Carb":
                return <Scale size={16}/>
            default:
                return <LucideBadgeInfo size={16}/>
        }
    }

    return (<span className="badge">
{escolherIcone()}
            {etiqueta}
        </span>);
}

export default Badge;
