import Dashboard from "@/components/dashboard/Dashboard";
import DashNav from "@/components/dashboard/DashNav";
import Footer from "@/components/footer/Footer";
import { authOption, CustomSession } from "app/api/auth/[...nextauth]/options";
import { fetchGroups } from "fetch/fetchGroups";
import { fetchRecentGroup } from "fetch/fetchRecentGroups";
import { getServerSession } from "next-auth";

export default async function () {
    const session:CustomSession | null = await getServerSession(authOption);
    const groups = await fetchGroups(session?.user?.token || null);

    const recentGroups = await fetchRecentGroup(session?.user?.token || null, false);
    return (
        <div>
            <DashNav groups={groups} />
            <Dashboard recentGroups={recentGroups} groups={groups.slice(0, 6)} session={session} />
            <Footer />
        </div>
    )
}