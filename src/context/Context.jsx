import { useState } from "react";
import { createContext } from "react";

export const MyContext = createContext()

export const ContextProvider = function({children}){
    const [response,setResponse] = useState('')
    const [prevQuestion,setPrevQuestion] = useState([])
    console.log(response)
    return(
    <MyContext.Provider value={{response,setResponse,prevQuestion,setPrevQuestion}}>
        {children}
    </MyContext.Provider>
)}