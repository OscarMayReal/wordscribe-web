import Link from "next/link";
import { TextIcon } from "lucide-react";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    createdAt: string;
  };
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link 
      href={`/post/${post.id}`} 
      className="post-card"
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "10px",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <TextIcon size={20} />
      <h2 style={{ margin: 0 }}>{post.title}</h2>
      <span> • </span>
      <p style={{ margin: 0 }}>{new Date(post.createdAt).toLocaleDateString()}</p>
    </Link>
  );
}
