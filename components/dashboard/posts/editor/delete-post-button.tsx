import { useState, useContext } from "react";
import { useOrganization } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Trash2Icon } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PostActionButton } from "./post-action-button";
import { PostsPageContext } from "@/app/dashboard/blog/posts/layout";
import { deletePost } from "@/lib/blog";

interface DeletePostButtonProps {
  postId: string;
}

export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const organization = useOrganization();
  const router = useRouter();
  const { getToken } = useAuth();
  const postsContext = useContext(PostsPageContext);

  const handleDelete = async () => {
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
      postsContext.reloadPosts();
      setDialogOpen(false);
      router.replace("/dashboard/blog/posts");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <PostActionButton onClick={() => {}} Icon={Trash2Icon} text="Delete" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleDelete} variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function useAuth(): { getToken: () => Promise<string | null> } {
  // This is a placeholder. In a real implementation, you would use the actual auth hook.
  // For example: return useAuth() from @clerk/nextjs
  return {
    getToken: async () => {
      // Implement token retrieval logic here
      return null;
    },
  };
}
