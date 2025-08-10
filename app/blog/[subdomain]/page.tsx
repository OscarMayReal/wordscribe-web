import { notFound } from "next/navigation"
import "./styles.css"
import { Button } from "@/components/ui/button"
import { TextIcon } from "lucide-react"
import Link from "next/link" 
import { HeaderWithAd, PostCard } from "@/components/blog"
import { BlogInfoArea } from "@/components/blog/blog-info-area"

export default async function BlogPage({ params }: { params: Promise<{ subdomain: string }> }) {
    const paramsVar = await params
    const [blogInfo, blogPosts] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${paramsVar.subdomain}/info`).then(res => res.json() as Promise<any>),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${paramsVar.subdomain}/posts`).then(res => res.json() as Promise<any>)
    ])
    console.log(blogInfo)
    console.log(blogPosts)
    if (blogInfo.action === "show404blogpage") {
        notFound()
    }
    return (
        <div className="blogpage">
            <HeaderWithAd blogInfo={blogInfo} page="home" />
            <BlogInfoArea blogInfo={blogInfo} />
            <div>
                {blogPosts.map((post: any) => (
                    <PostCard post={post} key={post.id} />
                ))}
            </div>
        </div>
    )
}



export async function generateMetadata({ params }: { params: Promise<{ subdomain: string }> }) {
    const paramsVar = await params
    const blogInfo = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${paramsVar.subdomain}/info`).then(res => res.json() as Promise<any>)
    return {
        title: blogInfo.name + " - WordScribe",
        description: blogInfo.name + " - WordScribe",
    }
}