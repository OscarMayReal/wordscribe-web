import { UserIcon } from "lucide-react"
import { HeaderWithAd } from "../page"

export default async function AuthorsPage({ params }: { params: { subdomain: string } }) {
    const [blogInfo, authors] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${params.subdomain}/info`).then(res => res.json() as Promise<any>),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${params.subdomain}/authors`).then(res => res.json() as Promise<any>)
    ])
    console.log(blogInfo)
    console.log(authors)
    return (
        <div>
            <HeaderWithAd blogInfo={blogInfo} page="authors" />
            <h1 className="text-4xl font-medium mb-8 mt-8" style={{ textAlign: "center" }}>Authors</h1>
            <div>
                {authors.map((author: any) => (
                    <UserCard user={author} key={author.id} />
                ))}
            </div>
        </div>
    )
}

export function UserCard({ user }: { user: any }) {
    return (
        <a href={`/authors/${user.id}`} style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "10px",
        }}>
            <UserIcon size={20} />
            <h2>{user.name.firstName + " " + user.name.lastName}</h2>
            <span> • </span>
            <p>@{user.username}</p>
        </a>
    )
}