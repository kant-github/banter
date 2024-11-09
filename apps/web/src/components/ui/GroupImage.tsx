import { iconMappings } from "./PhotoUploadIcon";
export default function ({ groupImage, groupTitle }: { groupImage: string; groupTitle: string }) {
    const icon = groupImage && iconMappings[groupImage as keyof typeof iconMappings];
    return (
        <div>
            {icon ? (
                <span className="text-3xl text-green-600">{icon}</span>
            ) : (
                <span className="bg-red-500 dark:text-zinc-800 px-3 py-2 rounded-full">
                    {groupTitle ? groupTitle[0] : "?"}
                </span>
            )}
        </div>
    )
}