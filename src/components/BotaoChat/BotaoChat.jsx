import {useRef, useState} from "react";
import "./BotaoChat.css";
import {MessagesSquare, X} from "lucide-react";
import ChatAssistente from "../ChatAssistente/ChatAssistente.jsx";
import {fetchApi} from "../../servicos/api.js";

function BotaoChat() {
    const [chatAberto, setChatAberto] = useState(false);
    const [feedbackEnvio, setFeedbackEnvio] = useState(null);
    const badgeTimeoutRef = useRef(null);
    const cliqueTimeoutRef = useRef(null);

    async function pegarPosicao() {

        const obterPosicao = () => {
            return new Promise((resolve) => {
                if (!navigator.geolocation) {
                    return resolve({coords: {latitude: -40, longitude: -20, accuracy: 10}});
                }
                navigator.geolocation.getCurrentPosition(
                    (position) => resolve(position),
                    () => resolve({coords: {latitude: -40, longitude: -20, accuracy: 10}}),
                    {timeout: 5000}
                );
            });
        };

        return await obterPosicao();
    }

    async function enviarAlerta() {
        try {
            const token = localStorage.getItem("token");
            const posicao = await pegarPosicao();

            await fetchApi('/alerta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && {'Authorization': `Bearer ${token}`})
                },
                body: JSON.stringify({
                    latitude: posicao.coords.latitude,
                    longitude: posicao.coords.longitude,
                    precisaoGps: posicao.coords.accuracy
                }),
            });

            clearTimeout(badgeTimeoutRef.current);

            setFeedbackEnvio({tipo: 'sucesso', mensagem: 'Alerta enviado com sucesso!'});
        } catch (error) {
            console.error('Erro ao enviar alerta:', error);
            clearInterval(badgeTimeoutRef.current);
            if (error.status === 401) {
                setFeedbackEnvio({tipo: 'erro', mensagem: "Sessão expirada. Faça login novamente"});
                return;
            }
            setFeedbackEnvio({tipo: 'erro', mensagem: "Não foi possível enviar o alerta. Tente novamente."});
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
                <ChatAssistente onFechar={() => setChatAberto(false)}/>
            )}
            {feedbackEnvio && (
                <span className={`badge-feedback ${feedbackEnvio.tipo}`}>{feedbackEnvio.mensagem}</span>
            )}
            <button
                className="botao-chat"
                onClick={alternarChat}
                onDoubleClick={dispararAlertaDuploClique}
            >
                {chatAberto ? <X/> : <MessagesSquare/>}
            </button>
        </>
    );
}

export default BotaoChat;