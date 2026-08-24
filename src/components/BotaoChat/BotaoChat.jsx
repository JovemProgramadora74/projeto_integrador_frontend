import "./BotaoChat.css";
import { MessagesSquare } from "lucide-react";

function BotaoChat() {
    function pegarPosicao() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    async function enviarAlerta() {
        try {
            const token = localStorage.getItem("token");
            const posicao = await pegarPosicao();

            const response = await fetch('http://senac47278.local/alerta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    latitude: posicao.coords.latitude,
                    longitude: posicao.coords.longitude,
                    precisaoGps: posicao.coords.accuracy
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