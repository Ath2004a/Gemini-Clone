import { useContext, useState } from "react";
import assets from "../../assets/assets";
import { Context } from "../../context/context";
import './side.css'

function Sidebar() 
{
    const [extended, setExtended] = useState(false);
    const {onSend, prevPrompt, setRecentPrompt, newChat} = useContext(Context);

    async function loadPrompt(prompt) {
        setRecentPrompt(prompt)
        await onSend(prompt)
    } 

    return(
        <div className="h-screen hidden sm:inline-flex flex-col justify-between bg-[#f0f4f9] p-[25px_15px]">
            <div>
                <img onClick={() => {
                    setExtended(p => !p);
                }}className="w-5 ml-3 cursor-pointer block" src={assets.menu_icon} alt="" />

                <div onClick={() => newChat()} className="inline-flex gap-2 rounded-full border p-[10px_15px] mt-12 items-center bg-[#e6eaf1] text-gray-500 text-sm cursor-pointer">
                    <img className="w-4" src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null }
                </div>

                {extended ? <div className="flex flex-col">
                    <p className="mt-8">Recent</p>
                    {prevPrompt.map((item, index) => {
                        return(
                            <div key={index} onClick={() => loadPrompt(item)} className="appear flex gap-2 rounded-full border-0 p-2.5 text-sm mt-2 items-center text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
                                <img className="w-5" src={assets.message_icon} alt="" />
                                <p>{item.slice(0, 18)}...</p>
                            </div>
                        )
                    })}
                </div> : null }
            </div>

            <div className="flex flex-col">
                <div className="flex gap-2 rounded-full p-2.5 text-sm mt-2 items-center text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
                    <img className="w-5" src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="flex gap-2 rounded-full p-2.5 text-sm mt-2 items-center text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
                    <img className="w-5" src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="flex gap-2 rounded-full  p-2.5 text-sm mt-2 items-center text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
                    <img className="w-5" src={assets.setting_icon} alt="" />
                    {extended ? <p>Setting</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;