const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function createList(listName: string, getToken: () => Promise<string>) {
    const token = await getToken()
    const res = await fetch(API_URL + "/v1/lists", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: listName
        })
    })
    
    if (!res.ok) {
        throw new Error("Failed to create list")
    }
    
    return await res.json()
}
