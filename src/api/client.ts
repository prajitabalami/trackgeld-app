const API_BASE_URL = "https://trackgeld-backend.fastapicloud.dev";

export class ApiError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

type RequestOptions = {
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    body?: unknown;
};

export async function apiRequest<TResponse>(
    path: string,
    { method = "GET", body }: RequestOptions = {}
): Promise<TResponse> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
        // FastAPI errors come back as either {"detail": "string"} (e.g. 409
        // conflict) or {"detail": [{"msg": "..."}]} (422 validation errors).
        const errorBody = await response.json().catch(() => null);
        const message =
            typeof errorBody?.detail === "string"
                ? errorBody.detail
                : errorBody?.detail?.[0]?.msg ?? "Something went wrong. Please try again.";
        console.log("success here")

        throw new ApiError(message, response.status);

    }

    return response.json() as Promise<TResponse>;
}