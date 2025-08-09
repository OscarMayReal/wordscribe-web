import { HeaderWithAd, PostCard } from "../../page";

export default async function AuthorPage({ params }: { params: { subdomain: string, author: string } }) {
    const [blogInfo, posts, author] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${params.subdomain}/info`).then(res => res.json() as Promise<any>),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${params.subdomain}/author/${params.author}/posts`).then(res => res.json() as Promise<any>),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/${params.author}/publicinfo`).then(res => res.json() as Promise<any>)
    ])
    console.log(blogInfo)
    console.log(posts)
    console.log(author)
    return (
        <div>
            <HeaderWithAd blogInfo={blogInfo} page="author" />
            <AuthorInfoArea author={author} blogInfo={blogInfo} />
            <div>
                {posts.map((post: any) => (
                    <PostCard post={post} key={post.id} />
                ))}
            </div>
        </div>
    )
}

export function AuthorInfoArea({ author, blogInfo }: { author: any, blogInfo: any }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: "40px", marginBottom: "40px" }}>
            <img src={author.imageUrl} style={{ width: "65px", height: "65px", borderRadius: "15px", border: "1px solid var(--border)" }} />
            <h1 className="font-figtree font-medium text-4xl">{author.name.firstName + " " + author.name.lastName}</h1>
            <span>Posts for {blogInfo.name}</span>
        </div>
    )
}