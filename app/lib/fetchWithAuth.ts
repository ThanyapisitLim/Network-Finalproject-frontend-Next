import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Prevent multiple simultaneous refresh calls
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
    try {
        const response = await fetch(`${API_URL}/refresh-token`, {
            method: "POST",
            credentials: "include", // sends the HttpOnly refreshToken cookie
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
            },
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        const newToken = data.accessToken;

        // Store the new access token in the cookie
        Cookies.set("token", newToken, { expires: 7 });

        return newToken;
    } catch (error) {
        console.error("Failed to refresh token:", error);
        return null;
    }
}

/**
 * A fetch wrapper that automatically handles expired access tokens.
 * 
 * Usage:
 *   const data = await fetchWithAuth("/get-user");
 *   const data = await fetchWithAuth("/some-endpoint", { method: "POST", body: ... });
 */
export async function fetchWithAuth(
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> {
    const token = Cookies.get("token");

    // Build the request with auth header
    const buildRequest = (accessToken?: string): RequestInit => ({
        ...options,
        credentials: "include" as RequestCredentials,
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            ...options.headers,
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
    });

    // First attempt
    let response = await fetch(`${API_URL}${endpoint}`, buildRequest(token));

    // If 401 with "Token expired", try to refresh
    if (response.status === 401) {
        const errorData = await response.json().catch(() => null);

        if (errorData?.error === "Token expired") {
            // Deduplicate concurrent refresh calls
            if (!isRefreshing) {
                isRefreshing = true;
                refreshPromise = refreshAccessToken().finally(() => {
                    isRefreshing = false;
                    refreshPromise = null;
                });
            }

            const newToken = await refreshPromise;

            if (newToken) {
                // Retry the original request with the new token
                response = await fetch(
                    `${API_URL}${endpoint}`,
                    buildRequest(newToken)
                );
            } else {
                // Refresh failed — clear token and redirect to login
                Cookies.remove("token");
                if (typeof window !== "undefined") {
                    window.location.href = "/login";
                }
            }
        }
    }

    return response;
}
