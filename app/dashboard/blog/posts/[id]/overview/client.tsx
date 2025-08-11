"use client"
import { savePostDraft, usePostInfo, useUserById, setPostPublic, publishDraftChanges, deletePost } from "@/lib/blog"
import { useAuth, useOrganization } from "@clerk/nextjs"
import { EyeIcon, EyeOffIcon, LinkIcon, Trash2Icon } from "lucide-react"
import { useCallback, useState, useEffect, useRef } from "react"
import EditorJS from "@editorjs/editorjs"
import Header from "@editorjs/header"
import Embed from "@editorjs/embed"
import Alert from "editorjs-alert"
import EditorjsList from "@editorjs/list"
import { useContext } from "react"
import { PostsPageContext } from "@/app/dashboard/blog/posts/layout"
import { SaveIcon } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function PostOverviewClientPage({ params }: { params: { id: string } }) {
    const organization = useOrganization()
    const postInfo = usePostInfo(organization.organization?.slug || "", params.id)
    const author = useUserById(postInfo.info.writer || "")
    const [title, setTitle] = useState("")
    const postscontext = useContext(PostsPageContext)
    const { getToken, isLoaded } = useAuth()
    const [reloadPostDiffFunction, setReloadPostDiffFunction] = useState<() => void>(() => () => {})
    useEffect(() => {
        setTitle(postInfo.info.title || "")
    }, [postInfo.info])
    if (!postInfo.loaded || !author.loaded) {
        return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}><h1>Loading...</h1></div>
    }
    return (
        <div style={{ maxHeight: "100%", width: "100%", display: "flex", flexDirection: "column", minHeight: "100%" }}>
            <div style={{ padding: "20px", borderBottom: "1px solid var(--border)" }}>
                <input className="text-2xl font-medium" style={{outline: "none", border: "none", width: "100%"}} placeholder="Title" value={title} onChange={(e) => {setTitle(e.target.value)}} />
                <div style={{ color: "#666666" }}>{postInfo.info.createdAt && new Date(postInfo.info.createdAt).toLocaleDateString()} • Created By {author.info.name?.firstName + " " + author.info.name?.lastName}</div>
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

function DeletePostButton({postId}: {postId: string}) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const organization = useOrganization()
    const router = useRouter()
    const {getToken: getClerkToken, isLoaded} = useAuth();
    const getToken = useCallback(async (): Promise<string> => {
        const token = await getClerkToken();
        if (!token) {
            throw new Error("No authentication token available");
        }
        return token;
    }, [getClerkToken]);
    const postscontext = useContext(PostsPageContext)
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
                <PostActionButton onClick={() => {}} Icon={Trash2Icon} text="Delete" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Post</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this post?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={async () => {
                        try {
                            if (!postId) {
                                console.error("No post ID available");
                                return;
                            }
                            await deletePost(
                                organization.organization?.slug || "",
                                postId,
                                getToken
                            );
                            postscontext.reloadPosts();
                            setDialogOpen(false)
                            router.replace("/dashboard/blog/posts")
                        } catch (error) {
                            console.error("Error deleting post:", error);
                        }
                    }}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function PostActionButton({onClick, Icon, text}: {onClick: () => void, Icon: React.JSX.ElementType, text: string}) {
    return (
        <div className="postactionbutton" onClick={onClick}>
            <Icon size={20} />
            <div>{text}</div>
        </div>
    )
}

function PostSaveArea({ setSavePostDiffFunction, reloadPost }: { setSavePostDiffFunction: (func: () => void) => void, reloadPost: () => void }) {
    const params = useParams()
    const organization = useOrganization()
    const {getToken: getClerkToken, isLoaded} = useAuth();
    const getToken = useCallback(async (): Promise<string> => {
        const token = await getClerkToken();
        if (!token) {
            throw new Error("No authentication token available");
        }
        return token;
    }, [getClerkToken]);
    const [needsPublish, setNeedsPublish] = useState(false)
    const getPostSaveDiffFunction = useCallback(async () => {
        if (!organization.organization?.slug || !params.id) {
            return;
        }
        try {
            const token = await getToken();
            if (!token) {
                console.error("No token available");
                return;
            }
            const postId = Array.isArray(params.id) ? params.id[0] : params.id;
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${organization.organization.slug}/posts/${postId}/needspublish`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            console.log(data)
            setNeedsPublish(!!data.needsPublish);
        } catch (error) {
            console.error("Error checking publish status:", error);
        }
    }, [organization.organization?.slug, params.id, getToken]);

    useEffect(() => {
        setSavePostDiffFunction(() => getPostSaveDiffFunction)
    }, [getPostSaveDiffFunction, setSavePostDiffFunction])

    useEffect(() => {
        getPostSaveDiffFunction()
    }, [getPostSaveDiffFunction])
    if (needsPublish) {
        return (
            <PostActionButton onClick={async () => {
                if (!organization.organization?.slug || !params.id) {
                    console.error("Missing organization slug or post ID");
                    return;
                }
                try {
                    const postId = Array.isArray(params.id) ? params.id[0] : params.id;
                    const token = await getToken();
                    if (!token) {
                        console.error("No token available");
                        return;
                    }
                    await publishDraftChanges(organization.organization.slug, postId, getToken);
                    reloadPost();
                } catch (error) {
                    console.error("Error publishing changes:", error);
                }
            }} Icon={SaveIcon} text="Publish Changes" />
        )
    }
    return null
}

function EditorJSEditor({ content, reloadPostDiffFunction, id }: { content: any, reloadPostDiffFunction: () => void, id: string }) {
    const organization = useOrganization()
    const elementRef = useRef<HTMLDivElement>(null)
    const editorRef = useRef<EditorJS | null>(null)
    const { getToken: getClerkToken, isLoaded } = useAuth()
    const getToken = useCallback(async (): Promise<string> => {
        const token = await getClerkToken();
        if (!token) {
            throw new Error("No authentication token available");
        }
        return token;
    }, [getClerkToken]);
    useEffect(() => {
        if (editorRef.current === null) {
            editorRef.current = initEditorJS({ content, holder: elementRef.current!, getToken: getToken, blogslug: organization.organization?.slug!, postid: id, reloadPostDiffFunction })
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
