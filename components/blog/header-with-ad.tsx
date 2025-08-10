import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageAd } from "@/components/blog/page-ad";

interface BlogInfo {
  plan: string;
  imageUrl: string;
  name: string;
}

interface HeaderWithAdProps {
  blogInfo: BlogInfo;
  page: string;
}

export function HeaderWithAd({ blogInfo, page }: HeaderWithAdProps) {
  return (
    <>
      <div className="sticky-headerad">
        {blogInfo.plan !== "blog_pro" && <PageAd />}
        <header style={{
          display: "flex",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: "white",
          borderBottom: "1px solid #e2e8f0",
        }}>
          <Link 
            href="/" 
            style={{ 
              display: "flex", 
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img 
              className="blog-logo" 
              src={blogInfo.imageUrl} 
              alt={blogInfo.name}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <h1 className="blog-name" style={{ margin: 0, fontSize: "1.25rem" }}>
              {blogInfo.name}
            </h1>
          </Link>
          <div style={{ flexGrow: 1 }}></div>
          <Link href="/authors" legacyBehavior>
            <Button variant={page === "authors" ? "default" : "ghost"} size="sm">
              Authors
            </Button>
          </Link>
          <div style={{ width: "5px" }} />
          <Link href="/" legacyBehavior>
            <Button variant={page === "home" ? "default" : "ghost"} size="sm">
              Home
            </Button>
          </Link>
          <div style={{ width: "15px" }} />
        </header>
      </div>
      <div style={{ height: blogInfo.plan !== "blog_pro" ? "100px" : "60px" }}></div>
    </>
  );
}
