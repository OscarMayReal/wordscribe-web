"use client"
import { useBlogInfo } from "@/lib/blog";
import { OrganizationSwitcher, PricingTable, SignedIn, useOrganization } from "@clerk/nextjs";
import { ZapIcon } from "lucide-react";
import { PlanDetailsButton, SubscriptionDetailsButton } from '@clerk/nextjs/experimental'
import { Button } from "@/components/ui/button";
import { Header } from "@/components/shell";
import { useEffect } from "react";

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