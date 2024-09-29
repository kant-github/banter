import Dashboard from "@/components/dashboard/Dashboard";
import DashNav from "@/components/dashboard/DashNav";
import { authOption } from "app/api/auth/[...nextauth]/options";
import { fetchGroups } from "fetch/fetchGroups";
import { getServerSession } from "next-auth";

export default async function () {
    const session = await getServerSession(authOption);
    const groups = await fetchGroups(session?.user?.token || null);
    return (
        <div className="h-screen">
            <DashNav groups={groups} />
            <Dashboard groups={groups.slice(0, 6)} session={session} />
        </div>
    )
}