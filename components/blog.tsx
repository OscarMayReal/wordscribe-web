import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TextIcon } from "lucide-react"
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
            <Link href={process.env.NEXT_PUBLIC_SITE_URL}>
                <Button size="sm" variant="ghost">Create Your Own</Button>
            </Link>
        </div>
    )
}