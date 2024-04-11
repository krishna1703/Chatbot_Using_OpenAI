"use client"

import React, { useState } from 'react';
import Image from "next/image";

import TTSButton from "./TTSButton";
import imgprofile from "../../../public/profileimg.jpg";
import imgchtbot from "../../../public/chatbot.png";


const Chatpage = ({ message }) => {

    const [showPlayBtn, setShowPlayBtn] = useState(false);
    const [ttstoggle, setTtstoggle] = useState(true);
    return (
        <>
            <div className={`flex gap-2  border-black drop-shadow-lg items-start mb-4 mt-4 mx-4 
            ${message.role === "user" ?
                    "w-[45%] ml-auto justify-end " :
                    "w-[45%] mr-auto"}`} onMouseEnter={() => setShowPlayBtn(true)}
                onMouseLeave={() => setShowPlayBtn(false)} >

                <div className=" mt-auto max-w-[10%]  rounded-full" >

                    {message.role === "user" ? (
                        <div>
                            <Image
                                src={imgprofile}
                                width={30}

                                alt="profile-img"
                                className="rounded-full"
                            />

                        </div>
                    ) : (


                        <div className="flex flex-col items-center cursor-pointer  justify-center gap-2" >

                            {!showPlayBtn ?
                                <Image
                                    src={imgchtbot}
                                    width={30}


                                    alt="chatbot-img"
                                    className="rounded-full"
                                />
                                :
                                <TTSButton ttstoggle={ttstoggle} setTtstoggle={setTtstoggle} Message={message} />
                            }
                        </div>
                    )}
                </div>
                <div
                    className={
                        message.role === "user"
                            ? "max-w-[92%] bg-green-100 rounded-l-lg rounded-tr-lg text-black font-medium  text-sm p-2"
                            : "max-w-[92%] bg-white  border-2 border-gray-300 rounded-tl-lg rounded-r-lg text-sm text-black font-medium p-2 "
                    }
                >
                    {message.content}
                </div>
            </div>
        </>
    )
}

export default Chatpage;