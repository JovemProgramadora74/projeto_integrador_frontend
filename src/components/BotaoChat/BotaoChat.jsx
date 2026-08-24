import { useRef, useState } from "react";
import "./BotaoChat.css";
import { MessagesSquare, X } from "lucide-react";
import ChatAssistente from "../ChatAssistente/ChatAssistente.jsx";

function BotaoChat() {
    const [chatAberto, setChatAberto] = useState(false);
    const [feedbackEnvio, setFeedbackEnvio] = useState(null);
    const badgeTimeoutRef = useRef(null);
    const cliqueTimeoutRef = useRef(null);

    async function enviarAlerta() {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch('http://senac47278/alerta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                     ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify({
                    evento: 'alerta',
                    origem: 'BotaoChat',
                    timestamp: new Date().toISOString(),
                }),
            });

            clearTimeout(badgeTimeoutRef.current);

            if (response.ok) {
                setFeedbackEnvio('sucesso');
            } else {
                setFeedbackEnvio('erro');
            }
        } catch (error) {
            console.error('Erro ao enviar alerta:', error);
            setFeedbackEnvio('erro');
        } finally {
            badgeTimeoutRef.current = setTimeout(() => setFeedbackEnvio(null), 3000);
        }
    }

    const alternarChat = () => {
        clearTimeout(cliqueTimeoutRef.current);
        cliqueTimeoutRef.current = setTimeout(() => {
            setChatAberto((aberto) => !aberto);
        }, 250);
    };

    const dispararAlertaDuploClique = () => {
        clearTimeout(cliqueTimeoutRef.current);
        clearTimeout(badgeTimeoutRef.current);
        enviarAlerta();
    };

    return (
        <>
            {chatAberto && (
                <ChatAssistente onFechar={() => setChatAberto(false)} />
            )}
            {feedbackEnvio === 'sucesso' && (
                <span className="badge-feedback sucesso">Formulário enviado</span>
            )}
            {feedbackEnvio === 'erro' && (
                <span className="badge-feedback erro">Erro ao enviar alerta. Tente novamente.</span>
            )}
            <button
                className="botao-chat"
                onClick={alternarChat}
                onDoubleClick={dispararAlertaDuploClique}
            >
                {chatAberto ? <X /> : <MessagesSquare />}
            </button>
        </>
    );
}

export default BotaoChat;