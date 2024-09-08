import CardHoverChatCards from "../ui/CardHoverChatCards";



export default function ({groups} : {groups:any}) {
    return (
        <div className="bg-[#37474f] py-10">
            <CardHoverChatCards  items={groups}/>
        </div>
    )
}