const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export class ApiError extends Error {
    constructor(message, status, data = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

export async function fetchApi(endpoint, options = {}) {
    const url = new URL(endpoint, BASE_URL).toString();

    const fetchOptions = {
        ...options, headers: {
            'Accept': 'application/json', ...(options.headers || {})
        }
    };

    try {
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            let errorMessage = `HTTP Error: ${response.status} ${response.statusText}`;
            let errorData = null;

            try {
                const text = await response.text();
                if (text) {
                    errorData = JSON.parse(text);
                    errorMessage = errorData.mensagem || errorData.message || errorMessage;
                }
            } catch (_) {
                // Falha silenciosa no parse, mantém a mensagem padrão
            }

            throw new ApiError(errorMessage, response.status, errorData);
        }

        if (response.status === 204) {
            return {};
        }

        const text = await response.text();
        return text ? JSON.parse(text) : {};
    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error(`[API Error] ${endpoint}:`, error);
        }
        throw error;
    }
}