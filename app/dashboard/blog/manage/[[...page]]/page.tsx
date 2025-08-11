import { Header } from "@/components/header";
import { OrganizationProfile, OrganizationSwitcher } from "@clerk/nextjs";

export default function CollaborationPage() {
    return (
        <div className="pageshell">
            <Header name="Manage Blog" />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "20px", padding: "20px" }}>
                <OrganizationSwitcher hidePersonal />
                <OrganizationProfile appearance={{ theme: "simple" }} />
            </div>
        </div>
    )
}