import "../../styles.css"
import { BlogInfo, Post } from "@/lib/types";
import edjsHTML from 'editorjs-html';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HeaderWithAd } from "@/components/headerwithad";
function getUserById(id: string) {
    const res = fetch(process.env.NEXT_PUBLIC_API_URL + "/v1/user/" + id + "/publicinfo").then(res => res.json()).then(data => {
        return data
    })
    return res
}

var exampleList = {"id":"dXitOGrLsR","data":{"meta":{},"items":[{"meta":{},"items":[],"content":"Is"},{"meta":{},"items":[],"content":"A"},{"meta":{},"items":[],"content":"List"}],"style":"unordered"},"type":"List"}

function listRenderer(list: any) {
    if (list.data.style === "unordered") {
        return '<ul class="list"> ' + list.data.items.map((item: any) => '<li> • ' + item.content + '</li>').join('') + '</ul>'
    }
    return '<ol class="list"> ' + list.data.items.map((item: any) => '<li> ' + item.content + '</li>').join('') + '</ol>'
}

function alertRenderer(alert: any) {
    return '<div class="alert"> ' + alert.data.message + '</div>'
}

const plugins = {
    List: listRenderer,
    alert: alertRenderer
}

export default async function PostPage({
    params,
}: {
    params: Promise<{ subdomain: string; id: string }>;
}) {
    const paramsVar = await params
    const { subdomain, id } = paramsVar;
    const edjsParser = edjsHTML(plugins);
    
    // Fetch blog info and post in parallel
    const [blogInfo, post] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${subdomain}/info`).then(res => res.json() as Promise<BlogInfo>),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${subdomain}/posts/${id}/info`).then(res => res.json() as Promise<Post>)
    ]);
    console.log(post)
    const author = await getUserById(post.writer)
    if (post.action === "show404blogpage") {
        notFound()
    }
    return (
        <div>
            <HeaderWithAd blogInfo={blogInfo} page="post" />
            <div className="max-w-4xl mx-auto p-4 z-50">
                <div className="mt-5">{new Date(post.createdAt).toLocaleDateString()}</div>
                <h1 className="text-4xl font-bold mb-5 mt-2">{post.title}</h1>
                <UserChip userinfo={author} />
                <div className="prose max-w-none flex flex-col gap-3 mt-5" dangerouslySetInnerHTML={{ __html: edjsParser.parse(post.content) }} />
            </div>
        </div>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ subdomain: string, id: string }> }) {
    const paramsVar = await params
    const blogInfo = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${paramsVar.subdomain}/info`).then(res => res.json() as Promise<any>)
    const post = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${paramsVar.subdomain}/posts/${paramsVar.id}/info`).then(res => res.json() as Promise<any>)
    return {
        title: post.title + " - " + blogInfo.name + " - WordScribe",
        description: post.title + " - " + blogInfo.name + " - WordScribe",
    }
}


function UserChip({ userinfo }: { userinfo: any }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src={userinfo.imageUrl} style={{ width: "45px", height: "45px", borderRadius: "999px", border: "1px solid var(--border)" }} />
            <div>
                <div style={{ color: "var(--foreground)", fontWeight: "500" }}>{userinfo.name.firstName + " " + userinfo.name.lastName}</div>
                <div style={{ color: "#666666" }}>@{userinfo.username}</div>
            </div>
        </div>
    )
}