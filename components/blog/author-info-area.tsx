interface AuthorInfoAreaProps {
    author: {
        imageUrl: string;
        name: {
            firstName: string;
            lastName: string;
        };
    };
    blogInfo: {
        name: string;
    };
}

export function AuthorInfoArea({ author, blogInfo }: AuthorInfoAreaProps) {
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
                src={author.imageUrl} 
                alt={`${author.name.firstName} ${author.name.lastName}`}
                style={{ 
                    width: "65px", 
                    height: "65px", 
                    borderRadius: "15px", 
                    border: "1px solid var(--border)" 
                }} 
            />
            <h1 className="font-figtree font-medium text-4xl">
                {`${author.name.firstName} ${author.name.lastName}`}
            </h1>
            <span>Posts for {blogInfo.name}</span>
        </div>
    )
}
