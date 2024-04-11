"use client";

import { IoMicOutline } from "react-icons/io5";

import React, { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ImMic } from "react-icons/im";

// import Voiceanimate from "./Voiceanimate";

const Voicepage = ({ SetPrompt }) => {
  
  const [voiceanimation, setVoiceanimation] = useState(false);

  const handleUpload = async (audioFile) => {
    const apiUrl = "https://api.openai.com/v1/audio/transcriptions";
    const token = process.env.NEXT_PUBLIC_OPENAI_KEY;
    const modelName = "whisper-1";

    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("model", modelName);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transcription");
      }

      const data = await response.json();

      SetPrompt(data.text);

      //   whsiper model convert speach to text
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const voicestart = () => {

    setVoiceanimation(true)

    setTimeout(() => {
      setVoiceanimation(false);
    }, 6000);


    let mediaRecorder;
    let chunks = [];

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        // Handle stop event
        mediaRecorder.onstop = () => {
          // Create a Blob from the recorded chunks
          const blob = new Blob(chunks, { type: "audio/wav" });

          const audioFile = new File([blob], "recorded_audio.wav", {
            type: "audio/wav",
          });

          handleUpload(audioFile);

          chunks = [];
        };

        mediaRecorder.start();
        setTimeout(() => {
          mediaRecorder.stop();
        }, 6000);
      })
      .catch((err) => {
        console.error("Error accessing microphone:", err);
      });

  
  
  };

  return (
    <div className="relative  flex ">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div 
              onClick={() =>  setVoiceanimation(!voiceanimation)}
              
            >
              {voiceanimation ? (
                <>
                <p className="absolute -my-12  -ml-5 animate-pulse  text-green-500 font-medium text-lg "> Listening...  </p>
               <div className="p-2 bg-green-600 text-white animate-ping text-base rounded-full">
                <IoMicOutline />
                </div>
                </>
              ) : (

              <div className="p-2 bg-gray-400 text-black text-base  rounded-full" onClick={voicestart}>
                <ImMic/>
                </div>
              )}
            </div>
          </TooltipTrigger>

          <TooltipContent>
            <p className="bg-black p-2 m-4  rounded-sm text-xs text-white">
              Voice Recording..
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Voicepage;
