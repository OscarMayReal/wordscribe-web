import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";
import { SaveIcon } from "lucide-react";
import { PostActionButton } from "./post-action-button";
import { publishDraftChanges } from "@/lib/blog";

interface PostSaveAreaProps {
  setSavePostDiffFunction: (func: () => void) => void;
  reloadPost: () => void;
}

export function PostSaveArea({ setSavePostDiffFunction, reloadPost }: PostSaveAreaProps) {
  const params = useParams();
  const organization = useOrganization();
  const { getToken: getClerkToken } = useAuth();
  const [needsPublish, setNeedsPublish] = useState(false);

  const getToken = useCallback(async (): Promise<string> => {
    const token = await getClerkToken();
    if (!token) {
      throw new Error("No authentication token available");
    }
    return token;
  }, [getClerkToken]);

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
      setNeedsPublish(!!data.needsPublish);
    } catch (error) {
      console.error("Error checking publish status:", error);
    }
  }, [organization.organization?.slug, params.id, getToken]);

  useEffect(() => {
    setSavePostDiffFunction(() => getPostSaveDiffFunction);
  }, [getPostSaveDiffFunction, setSavePostDiffFunction]);

  useEffect(() => {
    getPostSaveDiffFunction();
  }, [getPostSaveDiffFunction]);

  if (!needsPublish) {
    return null;
  }

  const handlePublish = async () => {
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
      await publishDraftChanges(organization.organization.slug, postId, getClerkToken);
      reloadPost();
    } catch (error) {
      console.error("Error publishing changes:", error);
    }
  };

  return (
    <PostActionButton onClick={handlePublish} Icon={SaveIcon}>
      Publish Changes
    </PostActionButton>
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
