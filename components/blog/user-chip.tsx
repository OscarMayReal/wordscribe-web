interface UserChipProps {
    userinfo: {
        imageUrl: string;
        name: {
            firstName: string;
            lastName: string;
        };
        username: string;
    };
}

export function UserChip({ userinfo }: UserChipProps) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img 
                src={userinfo.imageUrl} 
                alt={`${userinfo.name.firstName} ${userinfo.name.lastName}`}
                style={{ 
                    width: "45px", 
                    height: "45px", 
                    borderRadius: "999px", 
                    border: "1px solid var(--border)" 
                }} 
            />
            <div>
                <div style={{ color: "var(--foreground)", fontWeight: "500" }}>
                    {`${userinfo.name.firstName} ${userinfo.name.lastName}`}
                </div>
                <div style={{ color: "#666666" }}>@{userinfo.username}</div>
            </div>
        </div>
    );
}
