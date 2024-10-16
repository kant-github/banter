import Dashboard from "@/components/dashboard/Dashboard";
import DashNav from "@/components/dashboard/DashNav";
import Footer from "@/components/footer/Footer";
import { authOption } from "app/api/auth/[...nextauth]/options";
import { fetchGroups } from "fetch/fetchGroups";
import { getServerSession } from "next-auth";
import { GiJigsawPiece } from "react-icons/gi";

export default async function () {
    const session = await getServerSession(authOption);
    const groups = await fetchGroups(session?.user?.token || null);
    return (
        <div>
            <DashNav groups={groups} />
            <div className="m-10">
                <GiJigsawPiece
                    size={825}
                    className="transition-transform transform group-hover:-translate-x-[2px] text-[#f2a633] dark:text-[#f2a633]"
                />
            </div>
            <Dashboard groups={groups.slice(0, 6)} session={session} />
            <Footer />
        </div>
    )
}