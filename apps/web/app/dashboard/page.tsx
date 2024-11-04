import Dashboard from "@/components/dashboard/Dashboard";
import DashNav from "@/components/dashboard/DashNav";
import Footer from "@/components/footer/Footer";
import { authOption } from "app/api/auth/[...nextauth]/options";
import { fetchGroups } from "fetch/fetchGroups";
import { fetchRecentGroup } from "fetch/fetchRecentGroups";
import { getServerSession } from "next-auth";

export default async function () {
    const session = await getServerSession(authOption);
    const groups = await fetchGroups(session?.user?.token || null);
    
    const recentGroups = await fetchRecentGroup(session?.user?.token || null);
    console.log("groups are : ",groups);
    console.log("recenet griups are : ", recentGroups);
    return (
        <div>
            <DashNav groups={groups} />
            <Dashboard recentGroups={recentGroups} groups={groups.slice(0, 6)} session={session} />
            <Footer />
        </div>
    )
}