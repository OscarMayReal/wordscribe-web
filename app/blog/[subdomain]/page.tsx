import { notFound } from "next/navigation"
import "./styles.css"
import { Button } from "@/components/ui/button"
import { TextIcon } from "lucide-react"
import Link from "next/link" 

export default async function BlogPage({ params }: { params: { subdomain: string } }) {
    const [blogInfo, blogPosts] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${params.subdomain}/info`).then(res => res.json() as Promise<BlogInfo>),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${params.subdomain}/posts`).then(res => res.json() as Promise<BlogPosts>)
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

export function BlogInfoArea({ blogInfo }: { blogInfo: any }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: "40px", marginBottom: "40px" }}>
            <img src={blogInfo.imageUrl} style={{ width: "65px", height: "65px", borderRadius: "15px", border: "1px solid var(--border)" }} />
            <h1 className="font-figtree font-medium text-4xl">{blogInfo.name}</h1>
        </div>
    )
}

export function HeaderWithAd({ blogInfo, page }: { blogInfo: any, page: string }) {
    return (
        <>
            <div className="sticky-headerad">
                {blogInfo.plan !== "blog_pro" && <PageAd />}
                <header>
                    <Link style={{ display: "flex", alignItems: "center" }} href={`/`}>
                        <img className="blog-logo" src={blogInfo.imageUrl} />
                        <h1 className="blog-name">{blogInfo.name}</h1>
                    </Link>
                    <div style={{flexGrow: 1}}></div>
                    <Link href={`/authors`}>
                        <Button variant={page === "authors" ? "default" : "ghost"} size="sm">Authors</Button>
                    </Link>
                    <div style={{ width: "5px" }} />
                    <Link href={`/`}>
                        <Button variant={page === "home" ? "default" : "ghost"} size="sm">Home</Button>
                    </Link>
                    <div style={{ width: "15px" }} />
                </header>
            </div>
            <div style={{ height: blogInfo.plan !== "blog_pro" ? "100px" : "60px" }}></div>
        </>
    )
}

export function PostCard({ post }: { post: any }) {
    return (
        <a href={`/post/${post.id}`} style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "10px",
        }}>
            <TextIcon size={20} />
            <h2>{post.title}</h2>
            <span> • </span>
            <p>{new Date(post.createdAt).toLocaleDateString()}</p>
        </a>
    )
}

export function PageAd() {
    return (
        <div style={{
            height: "40px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#7C5ED5",
            color: "white",
            justifyContent: "center",
            gap: "10px",
        }}>
            <span>Powered by Wordscribe</span>
            <Button size="sm" variant="ghost">Create Your Own</Button>
        </div>
    )
}