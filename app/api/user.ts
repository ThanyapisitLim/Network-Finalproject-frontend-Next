import Cookies from 'js-cookie'
const token = Cookies.get('token')

export async function getUser() {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    const res = data.json()
    return res
}