import React, { useContext } from 'react'
import { useState, useRef, useEffect } from 'react'
import avatar from '../assets/avatar.png'
import text from '../assets/text.png'
import run from '../config/gemini'
import send from '../assets/send.png'
import gemini from '../assets/gemini.png'
import speech from '../assets/speech.png'

import { MyContext } from '../context/Context'

const Main = () => {
    const [question, setQuestion] = useState('')
    const { response, setResponse } = useContext(MyContext)
    const { prevQuestion,setPrevQuestion } = useContext(MyContext)
    const [title,setTitle] = useState('')

    const [showResult, setShowResult] = useState(false)
    const [loading,setLoading] = useState(false)
    const boxArray = [
        "Suggest beautiful places to see on an upcoming road trip",
        "Briefly summarize this concept: urban planning",
        "Brainstorm team bonding activities for our work retreat",
        "Tell me about React js and React native"
    ]
    const ref = useRef()
    console.log(prevQuestion)

    // Scroll to the bottom of the textarea whenever the response changes
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight
        }
    }, [response])

    const handleContent = function (content, setResponse) {
        setLoading(true)
        setShowResult(true)
        setPrevQuestion(prev => {
            const newQuestion = content.length > 15 ? content.slice(0, 15)+ '...' : content;  // Truncate to 10 characters
            const updatedQuestions = [newQuestion, ...prev];  // Add the new question at the start
            return updatedQuestions.slice(0, 3);  // Keep only the last 3 questions
        });
        run(content, setResponse).finally(function(){setLoading(false)})
        setTitle(content)
        setQuestion('');

    }

    const handleButton = function (question, setResponse) {
        setLoading(true)
        setShowResult(true)
        run(question, setResponse).finally(function(){setLoading(false)})
        setPrevQuestion(prev => {
            const newQuestion = question.length > 15 ? question.slice(0, 15) + '...': question;  // Truncate to 10 characters
            const updatedQuestions = [newQuestion, ...prev];  // Add the new question at the start
            return updatedQuestions.slice(0, 3);  // Keep only the last 3 questions
        });        
        setTitle(question)
        setQuestion('');
    }

    const handleSpeech = function () {
        const a = new SpeechSynthesisUtterance(response)
        window.speechSynthesis.speak(a)
    }
    return (
        <div className='w-full px-5'>
            <div className='flex justify-between items-center my-3'>
                <p className='font-semibold text-gray-500 text-xl'>Gemini AI</p>
                <img src={avatar} alt="avatar" className='rounded-[120px] w-[60px] ' />
            </div>
            {showResult ? (
                <>
                    <div className='w-[75%] lg:w-[67%] m-auto h-[73%] flex flex-col mt-[50px] gap-[30px] relative'>
                        <div className='flex relative items-center'>
                            <img src={avatar} alt="avatar" className='w-[40px] rounded-[50px] absolute left-[-60px]' />
                            {title}
                        </div>
                        <div className='relative'>
                            <img src={gemini} alt="icon" className='w-[10%] md:w-[7%] lg:w-[5%] absolute left-[-60px]' />
                            {!loading ? (
                                <textarea ref={ref} className='text-gray-700 mt-2 w-full h-[450px] bg-gray-100 resize-none' value={response}/>

                            ) : ('Loading ')}

                        </div>

                        <div className='absolute top-[100%] w-full'>
                            <div className='flex items-center relative'>
                                <input type="text" placeholder='Enter a prompt here' className='border-2 px-5 py-3 bg-gray-200 w-full rounded-[30px]' value={question} onChange={function (e) { setQuestion(e.target.value) }} />
                                <img src={send} alt="send" className='w-[30px] h-[30px] absolute right-5' onClick={() => { handleButton(question, setResponse) }} />
                                <img src={speech} onClick={handleSpeech} alt="speech" className='w-[30px] h-[30px] absolute right-[55px]'/>
                            </div>
                        </div>
                    </div>
                </>

            ) : (
                <>
                    <div className='w-[80%] lg:w-[67%] m-auto h-[70%] flex flex-col mt-[70px] gap-[100px] relative'>
                        <h1 className='text-4xl md:text-5xl font-semibold text-gray-400'>How can i help you today</h1>
                        <div className='md:flex hidden gap-3'>
                            {boxArray.map((content, index) => (
                                <div key={index} onClick={() => handleContent(content, setResponse)} className='w-[200px] relative h-[200px] p-4 bg-gray-200 rounded-[10px] hover:bg-gray-300'>
                                    <p >{content}</p>
                                    <img src={text} alt="text" className='absolute top-[80%] right-[10%] w-[30px]' />
                                </div>
                            ))}
                        </div>
                        <div className='absolute top-[100%] w-full'>
                            <div className='flex items-center relative'>
                                <input type="text" placeholder='Enter a prompt here' className='border-2 px-5 py-3 bg-gray-200 w-full rounded-[30px]' value={question} onChange={function (e) { setQuestion(e.target.value) }} />
                                <img src={send} alt="send" className='w-[30px] h-[30px] absolute right-5'
                                    onClick={() => { handleButton(question, setResponse) }} />
                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}

export default Main
