export default function SkeletonLoader() {
    return (
        <div className="animate-pulse w-screen h-screen">
            <div className="h-16 bg-gray-50 rounded-md w-full"></div>

            <div className="flex flex-row w-full h-full">
                <div className="w-2/12 h-full bg-gray-100 rounded-md"></div>

                <div className="flex-grow">
                    <div className="h-20 bg-gray-100 rounded-md mb-4"></div>

                    <div className="fixed top-1/2 left-1/2 h-60 w-[400px] bg-gray-100 rounded-md z-50 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
            </div>
        </div>
    );
}
