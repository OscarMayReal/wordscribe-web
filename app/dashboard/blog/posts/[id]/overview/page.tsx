
"use client"
import { usePostInfo, useUserById, setPostPublic } from "@/lib/blog"
import { useOrganization, useAuth } from "@clerk/nextjs"
import { EyeIcon, EyeOffIcon, LinkIcon } from "lucide-react"
import { useState, useEffect, useContext } from "react"
import { PostsPageContext } from "@/app/dashboard/blog/posts/layout"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DeletePostButton } from "@/components/dashboard/posts/editor/delete-post-button"
import { PostSaveArea } from "@/components/dashboard/posts/editor/post-save-area"
import { EditorJSEditor } from "@/components/dashboard/posts/editor/editorjs-editor"
import { PostActionButton } from "@/components/dashboard/posts/editor/post-action-button"

export default function PostOverviewPage({ params }: { params: { id: string } }) {
    const organization = useOrganization()
    const postInfo = usePostInfo(organization.organization?.slug || "", params.id)
    const author = useUserById(postInfo.info.writer || "")
    const [title, setTitle] = useState("")
    const postscontext = useContext(PostsPageContext)
    const { getToken, isLoaded } = useAuth()
    const [reloadPostDiffFunction, setReloadPostDiffFunction] = useState(() => {})
    useEffect(() => {
        setTitle(postInfo.info.title)
    }, [postInfo.info])
    if (!postInfo.loaded || !author.loaded) {
        return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}><h1>Loading...</h1></div>
    }
    return (
        <div style={{ maxHeight: "100%", width: "100%", display: "flex", flexDirection: "column", minHeight: "100%" }}>
            <div style={{ padding: "20px", borderBottom: "1px solid var(--border)" }}>
                <input className="text-2xl font-medium" style={{outline: "none", border: "none", width: "100%"}} placeholder="Title" value={title} onChange={(e) => {setTitle(e.target.value)}} />
                <div style={{ color: "#666666" }}>{new Date(postInfo.info.createdAt).toLocaleDateString()} • Created By {author.info.name?.firstName + " " + author.info.name?.lastName}</div>
                <div style={{display: "flex", marginTop: "20px", flexDirection: "row", gap: "10px", alignItems: "center"}}>
                    {postInfo.info.public && <PostActionButton onClick={() => {window.open(window.location.protocol + "//" + organization.organization?.slug + "." + window.location.hostname + ":" + window.location.port + "/post/" + params.id)}} Icon={LinkIcon} text="View Post" />}
                    <DeletePostButton postId={params.id} />
                    <PostActionButton onClick={async () => {
                        try {
                            const postId = Array.isArray(params.id) ? params.id[0] : params.id;
                            await setPostPublic(
                                organization.organization?.slug || "", 
                                postId, 
                                !postInfo.info.public, 
                                async () => {
                                    const token = await getToken();
                                    if (!token) throw new Error("No authentication token available");
                                    return token;
                                }
                            );
                            postscontext.reloadPosts();
                            postInfo.reload();
                        } catch (error) {
                            console.error("Error updating post visibility:", error);
                        }
                    }} Icon={postInfo.info.public ? EyeIcon : EyeOffIcon} text={postInfo.info.public ? "Public" : "Private"} />
                    <PostSaveArea setSavePostDiffFunction={setReloadPostDiffFunction} reloadPost={postInfo.reload} />
                </div>
            </div>
            <EditorJSEditor content={postInfo.info.draftContent} reloadPostDiffFunction={() => {reloadPostDiffFunction()}} id={params.id} />
        </div>
    )
}

// This file has been refactored to use separate component files.
// The extracted components are now located in:
// - @/components/dashboard/posts/editor/delete-post-button
// - @/components/dashboard/posts/editor/post-action-button
// - @/components/dashboard/posts/editor/post-save-area
// - @/components/dashboard/posts/editor/editorjs-editor
