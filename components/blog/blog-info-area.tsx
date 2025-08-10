import { BlogInfo } from "@/lib/types"

interface BlogInfoAreaProps {
    blogInfo: {
        imageUrl: string;
        name: string;
    };
}

export function BlogInfoArea({ blogInfo }: BlogInfoAreaProps) {
    return (
        <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            gap: "10px", 
            marginTop: "40px", 
            marginBottom: "40px" 
        }}>
            <img 
                src={blogInfo.imageUrl} 
                alt={blogInfo.name}
                style={{ 
                    width: "65px", 
                    height: "65px", 
                    borderRadius: "15px", 
                    border: "1px solid var(--border)" 
                }} 
            />
            <h1 className="font-figtree font-medium text-4xl">
                {blogInfo.name}
            </h1>
        </div>
    )
}
