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
