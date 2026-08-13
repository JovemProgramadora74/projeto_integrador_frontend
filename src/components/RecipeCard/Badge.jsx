import './Badge.css'
import {
    WheatOff, MilkOff, Leaf, Beef, Dumbbell, LucideBadgeInfo
} from "lucide-react";

function Badge({etiqueta}) {

    function escolherIcone() {
        switch (etiqueta) {
            case "Sem Glúten":
                return <WheatOff size={16}/>
            case "Sem Lactose":
                return <MilkOff size={16}/>
            case "Vegano":
                return <Leaf  size={16}/>
            case "Alto Teor Proteico":
                return <Dumbbell size={16}/>
            case "Contén Glúten":
                return <Beef size={16}/>
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
