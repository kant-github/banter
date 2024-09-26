import React from "react";

const SkeletonDashboard: React.FC = () => {
    return (
        <div className="h-screen bg-gray-200 animate-pulse">
            {/* Simulate DashNav */}
            <div className="h-16 bg-gray-300 w-full mb-4"></div>
            
            {/* Simulate Dashboard Content */}
            <div className="px-12 w-full flex flex-row justify-center gap-x-40 items-center">
                <div className="w-[200px] h-[200px] bg-gray-300 rounded"></div>
                <div className="mr-36 pt-4">
                    <div className="w-[400px] h-[400px] bg-gray-300 rounded"></div>
                </div>
            </div>
            <div className="mt-8 flex justify-center">
                <div className="w-full max-w-2xl h-[250px] bg-gray-300 rounded"></div>
            </div>
        </div>
    );
};

export default SkeletonDashboard;
