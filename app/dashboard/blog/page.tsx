import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'

export default function BlogPage() {
    redirect("/dashboard/blog/posts")
    return null
}