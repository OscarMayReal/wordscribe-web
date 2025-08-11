"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./ui/dialog";
import { Input } from "./ui/input";
import { useState, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function createList(listName: string, getToken: () => Promise<string>) {
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
    const data = await res.json()
    return data
}

export function CreateListDialog() {
    const { getToken: getClerkToken, isLoaded } = useAuth()
    const getToken = useCallback(async (): Promise<string> => {
        const token = await getClerkToken();
        if (!token) {
            throw new Error("No authentication token available");
        }
        return token;
    }, [getClerkToken]);
    const [listName, setListName] = useState("")
    if (!isLoaded) {
        return null
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create List</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create List</DialogTitle>
                    <DialogDescription>
                        Create a new list to store your Bookmarks.
                    </DialogDescription>
                </DialogHeader>
                <Input placeholder="List Name" value={listName} onChange={(e) => setListName(e.target.value)} />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button onClick={async () => {
                            await createList(listName, getToken)
                            console.log(listName)
                        }}>Create</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}