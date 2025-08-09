"use client"
import { useState } from "react"

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
    const reload = () => {
        setBlogInfo({loaded: false, posts: [], reload})
    }
    var [blogInfo, setBlogInfo] = useState({loaded: false, posts: [], reload})
    if (!blogInfo.loaded) {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/v1/blog/" + subdomain + "/posts").then(res => res.json()).then(data => {
            setBlogInfo({loaded: true, posts: data, reload})
        })
    }
    
    return blogInfo
}
export function getUserById(id: string) {
    const res = fetch(process.env.NEXT_PUBLIC_API_URL + "/v1/users/" + id + "/publicinfo").then(res => res.json()).then(data => {
        return data
    })
    return res
}