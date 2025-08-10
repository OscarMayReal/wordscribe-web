
"use client"
import { savePostDraft, usePostInfo, useUserById, setPostPublic, publishDraftChanges } from "@/lib/blog"
import { useAuth, useOrganization } from "@clerk/nextjs"
import { EyeIcon, EyeOffIcon, LinkIcon, Trash2Icon } from "lucide-react"
import EditorJS from "@editorjs/editorjs"
import { useEffect, useRef, useState } from "react"
import Header from "@editorjs/header"
import Embed from "@editorjs/embed"
import Alert from "editorjs-alert"
import EditorjsList from "@editorjs/list"
import { useContext } from "react"
import { PostsPageContext } from "@/app/dashboard/blog/posts/layout"
import { SaveIcon } from "lucide-react"
import { useParams } from "next/navigation"

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
                    <PostActionButton onClick={() => {window.open(window.location.protocol + "//" + organization.organization?.slug + "." + window.location.hostname + ":" + window.location.port + "/post/" + params.id)}} Icon={LinkIcon} text="View Post" />
                    <PostActionButton onClick={() => {postscontext.reloadPosts()}} Icon={Trash2Icon} text="Delete" />
                    <PostActionButton onClick={() => {setPostPublic(organization.organization?.slug || "", params.id, !postInfo.info.public, getToken!); postscontext.reloadPosts(); postInfo.reload()}} Icon={postInfo.info.public ? EyeIcon : EyeOffIcon} text={postInfo.info.public ? "Public" : "Private"} />
                    <PostSaveArea setSavePostDiffFunction={setReloadPostDiffFunction} reloadPost={postInfo.reload} />
                </div>
            </div>
            <EditorJSEditor content={postInfo.info.draftContent} reloadPostDiffFunction={reloadPostDiffFunction} id={params.id} />
        </div>
    )
}

export function PostActionButton({onClick, Icon, text}: {onClick: () => void, Icon: React.JSX.ElementType, text: string}) {
    return (
        <div className="postactionbutton" onClick={onClick}>
            <Icon size={20} />
            <div>{text}</div>
        </div>
    )
}

export function PostSaveArea({ setSavePostDiffFunction, reloadPost }: { setSavePostDiffFunction: (func: () => void) => void, reloadPost: () => void }) {
    const params = useParams()
    const organization = useOrganization()
    const {getToken, isLoaded} = useAuth()
    const [needsPublish, setNeedsPublish] = useState(false)
    const getPostSaveDiffFunction = () => {
        if (!isLoaded) {
            return
        }
        getToken().then((token) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${organization.organization?.slug}/posts/${params.id}/needspublish`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then(res => res.json()).then(data => {
                if (data.needsPublish) {
                    console.log("needs publish")
                    setNeedsPublish(true)
                } else {
                    console.log("does not need publish")
                    setNeedsPublish(false)
                }
            })
        })
    }
    setSavePostDiffFunction(getPostSaveDiffFunction)
    useEffect(() => {
        getPostSaveDiffFunction()
    }, [])
    if (needsPublish) {
        return (
            <PostActionButton onClick={() => {
                publishDraftChanges(organization.organization?.slug!, params.id, getToken!).then(() => {
                    reloadPost()
                })
            }} Icon={SaveIcon} text="Publish Changes" />
        )
    }
    return null
}

export function EditorJSEditor({ content, reloadPostDiffFunction, id }: { content: any, reloadPostDiffFunction: () => void, id: string }) {
    const organization = useOrganization()
    const elementRef = useRef<HTMLDivElement>(null)
    const editorRef = useRef<EditorJS | null>(null)
    const { getToken, isLoaded } = useAuth()
    useEffect(() => {
        if (editorRef.current === null) {
            editorRef.current = initEditorJS({ content, holder: elementRef.current!, getToken: getToken!, blogslug: organization.organization?.slug!, postid: id, reloadPostDiffFunction })
        }
        return () => {
            try {
                editorRef.current?.destroy()
                editorRef.current = null
            } catch (e) {
                console.log(e)
            }
        }
    }, [])
    return (
        <div style={{ padding: "20px", overflowY: "scroll", maxHeight: "100%", width: "100%" }} ref={elementRef}>
        
        </div>
    )
}

const initEditorJS = ({ content, holder, getToken, blogslug, postid, reloadPostDiffFunction }: { content: any, holder: HTMLElement, getToken: () => Promise<string>, blogslug: string, postid: string, reloadPostDiffFunction: () => void }) => {
    const editor = new EditorJS({
        holder: holder,
        data: content,
        tools: {
            header: Header,
            List: {
              class: EditorjsList,
              inlineToolbar: true,
              config: {
                defaultStyle: 'unordered'
              },
            },
            embed: {
              class: Embed,
              inlineToolbar: true,
              config: {
                services: {
                  youtube: true,
                  vimeo: true,
                  instagram: true,
                  twitter: true,
                  facebook: true,
                  tiktok: true,
                  soundcloud: true,
                  spotify: true,
                  codepen: true,
                  jsfiddle: true,
                  replit: true,
                }
              }
            },
            alert: Alert,
          },
          onChange: (api, event) => {
            editor.save().then((data) => {
                savePostDraft(blogslug, postid, data, getToken).then(() => {
                    reloadPostDiffFunction()
                })
            })
          }
    })
    return editor
}
