import PostOverviewClientPage from "./client";

export default async function PostOverviewPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return <PostOverviewClientPage params={resolvedParams} />;
}
