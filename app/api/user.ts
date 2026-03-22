import Cookies from 'js-cookie'
const token = Cookies.get('')

export async function getUser(){
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        return data
}