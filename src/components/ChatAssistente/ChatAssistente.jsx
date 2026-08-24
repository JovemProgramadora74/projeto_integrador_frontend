import "./ChatAssistente.css";
import { Sparkles, X, ArrowRight } from "lucide-react";

function ChatAssistente({ onFechar }) {
    return (
        <div className="chat-assistente">
            <div className="chat-assistente-header">
                <div className="chat-assistente-titulo">
          <span className="chat-assistente-icone">
            <Sparkles size={18} />
          </span>
                    <div>
                        <h2>Assistente Pitada</h2>
                        <p>IA culinária · Online</p>
                    </div>
                </div>
                <button className="chat-assistente-fechar" onClick={onFechar}>
                    <X size={18} />
                </button>
            </div>

            <div className="chat-assistente-mensagens">
                <div className="chat-assistente-mensagem">
          <span className="chat-assistente-icone chat-assistente-icone-mensagem">
            <Sparkles size={14} />
          </span>
                    <p className="chat-assistente-balao">
                        Olá! Sou o Assistente Pitada 👨‍🍳 Precisa de ajuda com alguma receita?
                    </p>
                </div>
            </div>

            <div className="chat-assistente-rodape">
                <input type="text" placeholder="Pergunte algo culinário..." />
                <button className="chat-assistente-enviar" disabled>
                    <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
}

export default ChatAssistente;
