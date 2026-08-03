import './Button.css';

export default function Button({ text }) {
    return (
        <button type="button" className="btn-publicar">
            {text}
        </button>
    );
}
