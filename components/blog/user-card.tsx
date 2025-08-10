import { UserIcon } from "lucide-react"

interface UserCardProps {
    user: {
        id: string;
        name: {
            firstName: string;
            lastName: string;
        };
        username: string;
    };
}

export function UserCard({ user }: UserCardProps) {
    return (
        <a 
            href={`/authors/${user.id}`} 
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "10px",
            }}
        >
            <UserIcon size={20} />
            <h2>{`${user.name.firstName} ${user.name.lastName}`}</h2>
            <span> • </span>
            <p>@{user.username}</p>
        </a>
    )
}
