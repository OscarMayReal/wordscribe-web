"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { createList } from "@/lib/lists"

export function CreateListDialog() {
    const { getToken, isLoaded } = useAuth()
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
                <Input 
                    placeholder="List Name" 
                    value={listName} 
                    onChange={(e) => setListName(e.target.value)} 
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button onClick={async () => {
                            await createList(listName, getToken)
                            setListName("") // Reset the input field
                        }}>
                            Create
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
