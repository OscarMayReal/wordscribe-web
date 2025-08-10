import { HeaderWithAd, PostCard } from "@/components/blog";
import { AuthorInfoArea } from "@/components/blog/author-info-area";

export default async function AuthorPage({ params }: { params: Promise<{ subdomain: string, author: string }> }) {
    const paramsVar = await params
    const [blogInfo, posts, authorInfo] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${paramsVar.subdomain}/info`).then(res => res.json() as Promise<any>),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${paramsVar.subdomain}/author/${paramsVar.author}/posts`).then(res => res.json() as Promise<any>),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/${paramsVar.author}/publicinfo`).then(res => res.json() as Promise<any>)
    ])
    console.log(blogInfo)
    console.log(posts)
    console.log(authorInfo)
    return (
        <div>
            <HeaderWithAd blogInfo={blogInfo} page="author" />
            <AuthorInfoArea author={authorInfo} blogInfo={blogInfo} />
            <div>
                {posts.map((post: any) => (
                    <PostCard post={post} key={post.id} />
                ))}
            </div>
        </div>
    )
}

export async function generateMetadata({ params }: { params: Promise<{ subdomain: string, author: string }> }) {
    const paramsVar = await params
    const blogInfo = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${paramsVar.subdomain}/info`).then(res => res.json() as Promise<any>)
    const authorInfo = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/${paramsVar.author}/publicinfo`).then(res => res.json() as Promise<any>)
    return {
        title: authorInfo.name.firstName + " " + authorInfo.name.lastName + " - " + blogInfo.name + " - WordScribe",
        description: authorInfo.name.firstName + " " + authorInfo.name.lastName + " - " + blogInfo.name + " - WordScribe",
    }
}

