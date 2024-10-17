import Dashboard from "@/components/dashboard/Dashboard";
import DashNav from "@/components/dashboard/DashNav";
import Footer from "@/components/footer/Footer";
import { authOption } from "app/api/auth/[...nextauth]/options";
import { fetchGroups } from "fetch/fetchGroups";
import { getServerSession } from "next-auth";

export default async function () {
    const session = await getServerSession(authOption);
    const groups = await fetchGroups(session?.user?.token || null);
    return (
        <div>
            <DashNav groups={groups} />
            <Dashboard groups={groups.slice(0, 6)} session={session} />
            <Footer />
        </div>
    )
}