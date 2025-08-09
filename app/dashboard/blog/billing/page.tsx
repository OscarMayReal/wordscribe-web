"use client"
import { useBlogInfo } from "@/lib/blog";
import { useOrganization } from "@clerk/nextjs";
import { ZapIcon } from "lucide-react";
import { PlanDetailsButton } from "@clerk/nextjs";

export default function CollaborationPage() {
    const organization = useOrganization()
    const blogInfo = useBlogInfo(organization.organization?.slug || "")
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
            <h1 style={{ fontSize: "20px", display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}><span style={{ marginRight: "5px" }}>WordScribe Blog</span> {blogInfo.info.plan == "blog_pro" ? <ProBadge /> : ""}</h1>
            <div style={{flexGrow: 1}} />
            <PlanDetailsButton />
        </div>
    )
}

function ProBadge() {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "#7C5ED5", color: "white", padding: "2px 8px", borderRadius: "5px" }}>
            <ZapIcon size={12} />
            <span style={{ fontSize: "15px" }}>Pro</span>
        </div>
    )
}