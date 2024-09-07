import CardHoverChatCards from "../ui/CardHoverChatCards";


const rooms = [
    {
        title: "Room 1",
        passcode: "121212",
        created_at: "Thu Aug 22 2024"
    },
    {
        title: "Room 1",
        passcode: "121212",
        created_at: "Thu Aug 22 2024"
    },
    {
        title: "Room 1",
        passcode: "121212",
        created_at: "Thu Aug 22 2024"
    },
    {
        title: "Room 1",
        passcode: "121212",
        created_at: "Thu Aug 22 2024"
    }
]

export default function () {
    return (
        <div className="mx-20">
            <CardHoverChatCards items={rooms}/>
        </div>
    )
}