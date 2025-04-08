import { useContext } from "react";
import assets from "../../assets/assets";
import { Context } from "../../context/context";
import './main.css'

function Main() {
  const { onSend, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  return (
    <div className="flex-1 min-h-screen">
      <div className="flex justify-between items-center text-2xl p-5 text-[#585858]">
        <p>Gemini</p>
        <img className="w-10 h-10 rounded-full" src={assets.user_icon} alt="" />
      </div>

      <div className="max-w-4xl m-auto">
        {!showResult ? (
          <>
            {/* Greeting */}
            <div className="mt-[90px] text-5xl">
              <p>
                <span className="bg-gradient-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent font-semibold">
                  Hello, Atharv
                </span>
              </p>
            </div>

            <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-[15px]">
              <div className="h-48 p-4 bg-[#f0f4f9] relative rounded-xl cursor-pointer hover:bg-[#dfe4ea]">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img className="w-5 absolute bottom-3 right-3" src={assets.compass_icon} alt="" />
              </div>
              <div className="h-48 p-4 bg-[#f0f4f9] relative rounded-xl cursor-pointer hover:bg-[#dfe4ea]">
                <p>Embracing creativity in everyday life can transform ordinary moments into extraordinary memories</p>
                <img className="w-5 absolute bottom-3 right-3" src={assets.bulb_icon} alt="" />
              </div>
              <div className="h-48 p-4 bg-[#f0f4f9] relative rounded-xl cursor-pointer hover:bg-[#dfe4ea]">
                <p>A thoughtful message has the power to brighten someone's entire day</p>
                <img className="w-5 absolute bottom-3 right-3" src={assets.message_icon} alt="" />
              </div>
              <div className="h-48 p-4 bg-[#f0f4f9] relative rounded-xl cursor-pointer hover:bg-[#dfe4ea]">
                <p>Debugging code is like solving a puzzle—it requires patience and creativity.</p>
                <img className="w-5 absolute bottom-3 right-3" src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="py-0 px-[5%] max-h-[70vh] overflow-y-scroll">
            <div className="my-10 flex items-center gap-4">
              <img className="rounded-full w-10" src={assets.user_icon} alt="" />
              <p className="text-lg font-light leading-relaxed">{recentPrompt}</p>
            </div>

            <div className="flex items-start gap-5">
              <img className="rounded-full w-10" src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader w-full flex flex-col gap-2.5">
                  <hr className="rounded border-0 h-5 bg-[length:800px_50px]" />
                  <hr className="rounded border-0 h-5 bg-[length:800px_50px]" />
                  <hr className="rounded border-0 h-5 bg-[length:800px_50px]" />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="absolute bottom-0 w-full max-w-4xl p-5 max-sm:p-[10px] m-auto">
          <div className="flex items-center justify-between gap-5 rounded-full border bg-[#f0f4f9] px-5 py-2 max-sm:px-[10px] max-sm:py-[5px]">
            <input
              className="flex-1 text-base outline-none bg-transparent max-sm:flex-none max-sm:w-[150px]"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter prompt here"
            />
            <div className="flex gap-2 max-sm:gap-[5px]">
              <img className="w-5 h-5 cursor-pointer max-sm:w-5" src={assets.gallery_icon} />
              <img className="w-5 h-5 cursor-pointer max-sm:w-5" src={assets.mic_icon} />
              <img className="w-5 h-5 cursor-pointer max-sm:w-5" onClick={() => onSend()} src={assets.send_icon} />
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500 font-light">
            Gemini may display inaccurate info, including about people, so double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
