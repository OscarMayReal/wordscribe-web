"use client"
import { Header } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { CreateListDialog } from "@/components/createlist";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function DashboardPage() {
    const { getToken } = useAuth()
    return (
        <div className="pageshell">
            <Header />
            <Button onClick={async () => {
                const token = await getToken()
                const res = await fetch(API_URL + "/v1/lists", {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
                const data = await res.json()
                console.log(data)
            }}>Test</Button>
            <CreateListDialog />
        </div>
    )
}