import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PageAd() {
  return (
    <div style={{
      height: "40px",
      width: "100%",
      display: "flex",
      alignItems: "center",
      backgroundColor: "#7C5ED5",
      color: "white",
      justifyContent: "center",
      gap: "10px",
    }}>
      <span>Powered by Wordscribe</span>
      <Link href={process.env.NEXT_PUBLIC_SITE_URL || "#"} legacyBehavior>
        <Button size="sm" variant="ghost" style={{ color: "white" }}>
          Create Your Own
        </Button>
      </Link>
    </div>
  );
}
