import "./BotaoChat.css"
import { MessagesSquare} from "lucide-react";

function BotaoChat() {
    async function enviarAlerta() {
        try {
            const response = await fetch('http://10.112.4.144/alerta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    evento: 'alerta',
                    origem: 'BotaoChat',
                    timestamp: new Date().toISOString(),
                }),
            });

            if (response.ok) {
                console.log('Alerta enviado com sucesso!');
            } else {
                console.error(`Erro ao enviar alerta: status ${response.status}`);
            }
        } catch (error) {
            console.error('Erro ao enviar alerta:', error);
        }
    }

    return (
        <>
            <button
                className="botao-chat"
                onDoubleClick={enviarAlerta}>
                <MessagesSquare/>
            </button>
        </>)
}

export default BotaoChat