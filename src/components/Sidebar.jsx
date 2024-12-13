import React from 'react'
import menu from '../assets/menu.png'
import plus from '../assets/plus.png'
import text from '../assets/text.png'
import help from '../assets/help.png'
import activity from '../assets/activity.png'
import settings from '../assets/settings.png'
import { useState } from 'react'
import { useContext } from 'react'
import { MyContext } from '../context/Context'

const Sidebar = () => {
    const [extended, setExtended] = useState(true)
    const { prevQuestion, setPrevQuestion } = useContext(MyContext)
    const handleExtend = function () {
        setExtended(!extended)
    }
    return (
        <div className={`hidden bg-gray-200 relative overflow-hidden lg:block  ${extended ? 'lg:w-[200px]' : 'lg:w-[75px]'}`}>
            <div className={`${extended ? 'w-[20%] mx-5 my-5' : 'w-[50%] mx-5 my-5'} `}>
                {extended ? (
                    <img src={menu} onClick={handleExtend} alt="menu" className='w-[80%]' />

                ) : (
                    <i onClick={handleExtend} className="fa-solid fa-xmark text-2xl"></i>
                )}
            </div>
            <div className='flex start-center px-4 py-2 gap-3 mb-5 mx-3 rounded-[20px] bg-gray-300'>
                <img src={plus} alt="plus" className={`${extended ? 'w-[12%]' : 'w-full'} font-bold`} />
                {extended ? <p className='md:hidden lg:block'>New Chat</p> : null}
            </div>
            {extended ? (
                <>
                    <div className='px-3 mt-10'>
                        <p className='text-lg font-semibold'>Recent</p>
                    </div>
                    <div className='mx-3 py-1 px-2 my-4 flex  gap-1 '>
                        <p className='text-gray-700 flex flex-col gap-3 text-[14px]'>{prevQuestion.map((q) =>
                            <div className='flex gap-1 hover:bg-gray-300 rounded-[20px] px-1 py-1'>
                                <img src={text} alt="plus" className='w-[13%] font-bold' />
                                {q}
                            </div>)}
                        </p>
                    </div>
                </>
            ) : null}

            <div className='absolute mx-6 gap-3 flex flex-col items-center top-[82%] text-gray-700'>
                <div className={`flex w-full ${extended ? 'gap-2' : 'gap-1'}`}>
                    <img src={help} alt="help" className={` ${extended ? 'w-[18%]' : 'w-full'} `} />
                    <p className='text-md font-medium'>{extended ? 'Help' : null}</p>
                </div>
                <div className={`flex w-full ${extended ? 'gap-2' : 'gap-1'}`}>
                    <img src={activity} alt="activity" className={` ${extended ? 'w-[18%]' : 'w-full'} `} />
                    <p className='text-md font-medium'>{extended ? 'Activity' : null}</p>
                </div>
                <div className={`flex w-full ${extended ? 'gap-2' : 'gap-1'}`}>
                    <img src={settings} alt="settings" className={` ${extended ? 'w-[18%]' : 'w-full'} `} />
                    <p className='text-md font-medium'>{extended ? 'Settings' : null}</p>
                </div>
            </div>

        </div>
    )
}

export default Sidebar
