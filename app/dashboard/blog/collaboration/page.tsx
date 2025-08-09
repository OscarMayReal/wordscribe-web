import { OrganizationProfile, Protect } from "@clerk/nextjs";

export default function CollaborationPage() {
    return (
        <Protect plan="blog_pro">
            <OrganizationProfile />
        </Protect>
    )
}