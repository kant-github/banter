import Dashboard from "@/components/dashboard/Dashboard";
import DashNav from "@/components/dashboard/DashNav";

export default function () {
    return (
        <div className="h-screen">
            <DashNav />
            <Dashboard />
        </div>
    )
}