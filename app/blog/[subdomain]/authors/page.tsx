import { UserIcon } from "lucide-react"
import { HeaderWithAd } from "@/components/blog"
import { UserCard } from "@/components/blog/user-card"

export default async function AuthorsPage({ params }: { params: Promise<{ subdomain: string }> }) {
    const paramsVar = await params
    const [blogInfo, authors] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${paramsVar.subdomain}/info`).then(res => res.json() as Promise<any>),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${paramsVar.subdomain}/authors`).then(res => res.json() as Promise<any>)
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

export async function generateMetadata({ params }: { params: Promise<{ subdomain: string }> }) {
    const paramsVar = await params
    const blogInfo = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${paramsVar.subdomain}/info`).then(res => res.json() as Promise<any>)
    return {
        title: "Authors - " + blogInfo.name + " - WordScribe",
        description: "Authors - " + blogInfo.name + " - WordScribe",
    }
}

