export async function checkGmail(gmail: string) {
    try {
        const data = { gmail }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/check-gmail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to check gmail");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function createUser(gmail: string, name: string) {
    try {
        const data = { gmail, name }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to create user");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function login(gmail: string) {
    try {
        const data = { gmail }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to login");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}