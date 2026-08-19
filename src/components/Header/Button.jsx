import './Button.css';

export default function Button({ text, onClick }) {
    return (
        <button className="btn-publicar" onClick={onClick}>
            {text}
        </button>
    );
}