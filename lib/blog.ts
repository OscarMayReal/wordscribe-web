"use client"
import { useState } from "react"
import { useAuth } from "@clerk/nextjs"

export function useBlogInfo(subdomain: string) {
    const reload = () => {
        setBlogInfo({loaded: false, info: {}, reload})
    }
    var [blogInfo, setBlogInfo] = useState({loaded: false, info: {}, reload})
    if (!blogInfo.loaded) {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/v1/blog/" + subdomain + "/info").then(res => res.json()).then(data => {
            setBlogInfo({loaded: true, info: data, reload})
        })
    }
    
    return blogInfo
}

export function useBlogPosts(subdomain: string) {
    const { getToken, isLoaded } = useAuth()
    const reload = () => {
        setBlogInfo({loaded: false, posts: [], reload})
    }
    var [blogInfo, setBlogInfo] = useState({loaded: false, posts: [], reload})
    if (!blogInfo.loaded && isLoaded) {
        getToken().then(token => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/v1/blog/" + subdomain + "/posts", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then(res => res.json()).then(data => {
                setBlogInfo({loaded: true, posts: data, reload})
            })
        })
    }
    
    return blogInfo
}

export function usePostInfo(subdomain: string, id: string) {
    const { getToken, isLoaded } = useAuth()
    const reload = () => {
        setPostInfo({loaded: false, info: {}, reload})
    }
    var [postInfo, setPostInfo] = useState({loaded: false, info: {}, reload})
    if (!postInfo.loaded && isLoaded) {
        getToken().then(token => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/v1/blog/" + subdomain + "/posts/" + id + "/info", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then(res => res.json()).then(data => {
                setPostInfo({loaded: true, info: data, reload})
            })
        })
    }
    
    return postInfo
}

export function getUserById(id: string) {
    const res = fetch(process.env.NEXT_PUBLIC_API_URL + "/v1/user/" + id + "/publicinfo").then(res => res.json()).then(data => {
        return data
    })
    return res
}

export function useUserById(id: string) {
    const reload = () => {
        setUser({loaded: false, info: {}, reload})
    }
    var [user, setUser] = useState({loaded: false, info: {}, reload})
    if (!user.loaded) {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/v1/user/" + id + "/publicinfo").then(res => res.json()).then(data => {
            setUser({loaded: true, info: data, reload})
        })
    }
    return user
}

export const savePostDraft = async (blogslug: string, postid: string, content: any, getToken: () => Promise<string>) => {
    getToken().then(async (token) => {
        console.log("Saving draft");
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/v1/blog/" + blogslug + "/posts/" + postid, {
            method: "PUT",
            redirect: "follow",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({draftContent: content}),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
    })
}

export const setPostPublic = async (blogslug: string, postid: string, isPublic: boolean, getToken: () => Promise<string>) => {
    getToken().then(async (token) => {
        console.log("Setting post public");
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/v1/blog/" + blogslug + "/posts/" + postid, {
            method: "PUT",
            redirect: "follow",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({public: isPublic}),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
    })
}

export const publishPostDraft = async (blogslug: string, postid: string, content: any, getToken: () => Promise<string>) => {
    getToken().then(async (token) => {
        console.log("Publishing post draft");
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/v1/blog/" + blogslug + "/posts/" + postid, {
            method: "PUT",
            redirect: "follow",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({content: content}),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
    })
}

export const publishDraftChanges = async (blogslug: string, postid: string, getToken: () => Promise<string>) => {
    getToken().then(async (token) => {
        console.log("Publishing draft");
        await fetch(process.env.EXPO_PUBLIC_API_URL + "/v1/blog/" + blogslug + "/posts/" + postid + "/publish", {
            method: "POST",
            redirect: "follow",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
    })
}
