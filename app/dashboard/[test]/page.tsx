import { Header } from "@/components/header";

export default async function DashboardPage({ params }: { params: Promise<{ test: string }> }) {
    const { test } = await params;
    return (
        <div className="pageshell">
            <Header name={test} />
        </div>
    )
}