interface chatMssageInputProps {
    message: string;
    setMessage: (value: string) => void;
}
export default function ({ message, setMessage }: chatMssageInputProps) {
    return (
        <input
            type="text"
            name="imp"
            placeholder="Type a message..."
            value={message}
            className="flex-1 p-2 pl-4 font-light text-sm border-[1px] border-gray-500 dark:border-zinc-700 rounded-[4px] outline-none placeholder:text-black dark:bg-zinc-800 dark:text-gray-200 dark:placeholder:text-gray-200 placeholder:font-light"
            onChange={(e) => setMessage(e.target.value)}
        />
    )
}