import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("")

    const delayPara = (index, next) => {
        setTimeout(() => {
            setResultData(p => p + next)
        }, 75*index)
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSend = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        let res;

        if(prompt !== undefined)
        {
            res = await run(prompt)
            setRecentPrompt(prompt);
        }
        else
        {
            setPrevPrompt(p => [...p, input])
            setRecentPrompt(input)
            res = await run(input)
        }

        let responseArray = res.split("**")
        let newArray = "";
        for(let i=0; i< responseArray.length; i++)
        {
            if(i === 0 || i%2 !== 1)
            {
                newArray += responseArray[i];
            }
            else
            {
                newArray += "<b>" + responseArray[i] + "</b>"
            }
        }

        let neww = newArray.split("*").join("</br>")
        let newResponseArray = neww.split(" ");

        for(let i=0; i < newResponseArray.length; i++)
        {
            const next = newResponseArray[i];
            delayPara(i,next + " ");
        }

        // setResultData(neww)
        setLoading(false)
        setInput("")
    }

    const ContextValue = {
        prevPrompt,
        setPrevPrompt,
        onSend,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
    }

    return(
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;
