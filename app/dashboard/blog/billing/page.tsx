"use client"
import { useBlogInfo } from "@/lib/blog";
import { SignedIn, useOrganization } from "@clerk/nextjs";
import { ZapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { default as dynamicImport } from "next/dynamic";

const PricingTable = dynamicImport(() => import("@clerk/nextjs").then(mod => mod.PricingTable), { ssr: false })
const OrganizationSwitcher = dynamicImport(() => import('@clerk/nextjs').then(mod => mod.OrganizationSwitcher), { ssr: false })
const SubscriptionDetailsButton = dynamicImport(() => import('@clerk/nextjs/experimental').then(mod => mod.SubscriptionDetailsButton), { ssr: false })
const Header = dynamicImport(() => import("@/components/header").then(mod => mod.Header), { ssr: false })

export const dynamic = 'force-dynamic'

export default function BillingPage() {
    const organization = useOrganization()
    const blogInfo = useBlogInfo(organization.organization?.slug || "")
    useEffect(() => {
        if (organization.organization?.slug) {
            blogInfo.reload()
        }
    }, [organization.organization?.slug || ""])
    return (
        <>
            <Header name="Billing" />
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
                <div style={{ fontSize: "20px", display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
                    <OrganizationSwitcher hidePersonal />
                    {blogInfo.info.plan == "blog_pro" ? <ProBadge /> : ""}
                    <div style={{flexGrow: 1}} />
                    <SubscriptionDetailsButton for="organization">
                        <Button variant="outline">Manage Subscription</Button>
                    </SubscriptionDetailsButton>
                </div>
                <PricingTable appearance={{ theme: "simple" }} forOrganizations />
            </div>
        </>
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