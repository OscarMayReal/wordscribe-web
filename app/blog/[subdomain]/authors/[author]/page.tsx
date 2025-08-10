import { HeaderWithAd, PostCard } from "@/components/blog";

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


function AuthorInfoArea({ author, blogInfo }: { author: any, blogInfo: any }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: "40px", marginBottom: "40px" }}>
            <img src={author.imageUrl} style={{ width: "65px", height: "65px", borderRadius: "15px", border: "1px solid var(--border)" }} />
            <h1 className="font-figtree font-medium text-4xl">{author.name.firstName + " " + author.name.lastName}</h1>
            <span>Posts for {blogInfo.name}</span>
        </div>
    )
}