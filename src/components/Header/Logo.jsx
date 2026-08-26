import './Logo.css';
import {useNavigate} from "react-router-dom";

export default function Logo() {
    const navigate = useNavigate();

    return (
        <div className="logo-box" onClick={() => navigate('/')}>
            <svg className="logo-hat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round">
                <path
                    d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path>
                <line x1="6" y1="17" x2="18" y2="17"></line>
            </svg>
            <span className="logo-text">Pitada de Sal</span>
        </div>
    );
}