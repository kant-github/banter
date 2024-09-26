import { HiLightBulb } from "react-icons/hi";

export const EmptyConversation: React.FC = () => {
    return (
        <div className="flex items-center justify-center">
            <span className="flex items-center justify-center gap-2 bg-blue-200 text-gray-700 text-xs px-3 py-1.5 rounded-[4px] shadow-md">
                <HiLightBulb size={20}/>
                No messages yet, Be the first to start the conversation!
            </span>
        </div>
    );
};
