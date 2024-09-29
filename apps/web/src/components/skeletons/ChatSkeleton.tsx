// SkeletonLoader.tsx
export default function() {
    return (
        <div className="animate-pulse">
            <div className="flex flex-col space-y-4">
                <div className="h-12 bg-gray-300 rounded-md w-1/2"></div> {/* Skeleton for ChatNav */}
                <div className="h-48 bg-gray-200 rounded-md"></div> {/* Skeleton for ChatBase */}
                <div className="h-12 bg-gray-300 rounded-md w-3/4"></div> {/* Another placeholder */}
                <div className="h-12 bg-gray-300 rounded-md w-1/3"></div> {/* Another placeholder */}
            </div>
        </div>
    );
};

