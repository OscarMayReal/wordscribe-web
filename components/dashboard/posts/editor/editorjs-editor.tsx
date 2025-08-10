import { useEffect, useRef, useCallback } from "react";
import { useOrganization } from "@clerk/nextjs";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Embed from "@editorjs/embed";
import Alert from "editorjs-alert";
import EditorjsList from "@editorjs/list";
import { savePostDraft } from "@/lib/blog";

interface EditorJSEditorProps {
  content: any;
  reloadPostDiffFunction: () => void;
  id: string;
}

export function EditorJSEditor({ content, reloadPostDiffFunction, id }: EditorJSEditorProps) {
  const organization = useOrganization();
  const elementRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorJS | null>(null);
  const { getToken } = useAuth();

  const initEditor = useCallback(async () => {
    if (!elementRef.current) return;

    const editor = new EditorJS({
      holder: elementRef.current,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        embed: Embed,
        alert: {
          class: Alert,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+A',
        },
        list: {
          class: EditorjsList,
          inlineToolbar: true,
        },
      },
      data: content,
      autofocus: true,
      onChange: async (api) => {
        try {
          const savedData = await api.saver.save();
          const token = await getToken();
          if (!token) throw new Error("No authentication token available");
          
          await savePostDraft(
            organization.organization?.slug || "",
            id,
            savedData,
            token
          );
          
          reloadPostDiffFunction();
        } catch (error) {
          console.error("Error saving draft:", error);
        }
      },
    });

    editorRef.current = editor;

    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === 'function') {
        editorRef.current.destroy();
      }
    };
  }, [content, id, organization.organization?.slug, reloadPostDiffFunction, getToken]);

  useEffect(() => {
    if (!editorRef.current) {
      initEditor();
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [initEditor]);

  return <div ref={elementRef} style={{ flex: 1 }} />;
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
