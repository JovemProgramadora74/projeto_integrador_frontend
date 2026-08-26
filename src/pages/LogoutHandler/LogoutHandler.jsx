import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function LogoutHandler() {
    const navigate = useNavigate();

    useEffect(() => {
        async function executeLogout() {
            localStorage.removeItem("token");
            navigate("/", { replace: true });
        }

        executeLogout();
    }, [navigate]);

    return null; // Não renderiza nada antes do redirecionamento
}