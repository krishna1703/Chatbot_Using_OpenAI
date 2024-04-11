"use client"

import React from 'react'

import { IoPlayCircleOutline } from "react-icons/io5";
import { FaRegCirclePause } from "react-icons/fa6";

const TTSButton = ({Message ,ttstoggle , setTtstoggle}) => {


    
  //   start tts
  const speakText = (Message) => {
    if ('speechSynthesis' in window){
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = Message.content;
  
      console.log('Text to speak:', Message.content);
  
      setTtstoggle(true);
  
      speechSynthesis.speak(utterance);

    } else {
      alert('Text-to-speech not supported .');
    }
  };

    return (
        <>
            <div onClick={() => setTtstoggle(!ttstoggle)}>
                {ttstoggle ?
                    (<div className="p-1 bg-stone-700 cursor-pointer text-white text-lg rounded-full" onClick={() => speakText(Message)} >

                        <IoPlayCircleOutline width={30} />

                    
                    </div>)
                    :
                   (<div className="p-1 bg-stone-700 cursor-pointer text-white text-lg rounded-full"   >

                        <FaRegCirclePause width={30} />


                    </div>)   
                }
            </div>
        </>
    )
}

export default TTSButton; 