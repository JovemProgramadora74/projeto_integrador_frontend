import './Badge.css'
import {WheatOff} from "lucide-react";

function Badge({etiqueta}) {
    return (
        <span className="badge">
            <WheatOff size={16} />
            {etiqueta}
        </span>
    );
}

export default Badge;
