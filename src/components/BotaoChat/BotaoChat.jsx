import "./BotaoChat.css";
import { MessagesSquare } from "lucide-react";

function BotaoChat() {
    function pegarPosicao() {
        let posicao;
        navigator.geolocation.getCurrentPosition(position => {
            posicao = position;
        })
        return posicao;
    }

    async function enviarAlerta() {
        try {
            const token = localStorage.getItem("token");
            var posicoes = pegarPosicao();

            const response = await fetch('http://senac47278.local/alerta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "latitude": posicoes.coords.latitude,
                    "longitude": posicoes.coords.longitude,
                    "precisaoGps": posicoes.coords.accuracy
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
        <button
            className="botao-chat"
            onDoubleClick={enviarAlerta}>
            <MessagesSquare/>
        </button>
    );
}

export default BotaoChat;