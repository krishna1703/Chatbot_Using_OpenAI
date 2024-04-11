"use client";

import React, { useState, useEffect, } from "react";
import OpenAI from "openai";

import Voicepage from "./Voicepage";
import { IoMdSend } from "react-icons/io";
import Chatpage from "./chatpage";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

const Homepage = () => {
  const [prompt, setPrompt] = useState("");
  const [chat, setChat] = useState([]);
  const [ChatRes, setChatRes] = useState("");

  useEffect(() => {
    // Load chat history from localStorage on component mount
    const storedChat = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setChat(storedChat);
  }, []);

  useEffect(() => {
    const ChatBox = document.getElementById("chatbox");
    ChatBox.scrollTop = 10000000000;
  }, [ChatRes, prompt]);

  const saveChatToLocalStorage = (newChat) => {
    // Save chat history to localStorage
    localStorage.setItem("chatHistory", JSON.stringify(newChat));
  };

  const getResult = async () => {
    setPrompt("");

    const userMessage = {
      role: "user",
      content: `${prompt}`,
    };

    setChat((prevChat) => [...prevChat, userMessage]);

    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [...chat, userMessage],
        model: "gpt-3.5-turbo-1106",
        max_tokens: 50,
      });

      const assistantMessage = {
        role: "assistant",
        content: chatCompletion.choices[0].message.content,
      };

      const chatbotResponse = assistantMessage.content;

      setChatRes(chatbotResponse);

      setChat((prevChat) => [...prevChat, assistantMessage]);

      saveChatToLocalStorage([...chat, userMessage, assistantMessage]);
    } catch (error) {
      console.error("Error fetching chat completion:", error);
    }
    // tts openai
  };

  const Enterbutton = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      getResult();
    }
  };

  const startNewchat = () => {
    setChat([]);
    setPrompt("");
    localStorage.removeItem("chatHistory");
  };

  return (
    <>
      <main className="flex flex-col gap-10 relative m-auto  w-full h-full  place-items-center  ">
        <div className="mt-2 font-semibold flex text-black  text-2xl">
          Dyotis Chatbot 2.0
        </div>

        {/*  chathistory */}
        <div
          id="chatbox"
          className=" w-[75%] h-[75vh]  rounded-lg  border-2 border-stone-300 overflow-auto scroll-smooth  flex  gap-1 flex-col bg-gray-50"
        >
        
          { chat.map((message, index) => (
             <Chatpage key={index} message={message} /> 
          )) 
          }
        </div>

        {/*  form submit */}
        <div className="absolute w-[75%]  bottom-0  -my-20 ">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex justify-center gap-5 place-items-center"
          >
            <div className="border-2 border-gray-400 w-full gap-4 flex justify-between   bg-gray-50  rounded-lg  p-2 place-items-center">
              <input
                placeholder="Type your message.."
                className="   w-full  outline-none border-none text-md  bg-gray-50 text-black px-2 p-1 py-1 placeholder-stone-900 "
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={Enterbutton}
              />

              <Voicepage SetPrompt={setPrompt} />

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className="bg-gray-400 p-2 rounded-lg text-black"
                      onClick={(e) => getResult(e)}
                    >
                      <IoMdSend />
                    </div>

                    <TooltipContent>
                      {" "}
                      <p className="bg-black p-2 m-4  rounded-sm text-xs text-white">
                        Send messages
                      </p>
                    </TooltipContent>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div>
              <button
                onClick={startNewchat}
                className="bg-gray-400 rounded-lg  w-32 py-3.5  font-semibold text-black"
              >
                New chat
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Homepage;

// const TexttoSpeach = async () => {
//   const apiUrl = "https://api.openai.com/v1/audio/speech";
//   const token = process.env.NEXT_PUBLIC_OPENAI_KEY;
//   const modelName = "tts-1";

//   try {
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",

//       },

//       body: JSON.stringify({
//         model: modelName,
//         input: ChatRes,
//         voice: "alloy",
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch TexttoSpeach");
//     }

//     const Mp3 = await response.arrayBuffer();

//     const blob = new Blob([Mp3], { type: "audio/mp3" });

//     const audioUrl = URL.createObjectURL(blob);

//     audioRef.current.src = audioUrl;
//     audioRef.current.play();

//     // Use the audio data as needed

//   } catch (error) {
//     console.error("Error:", error.message);
//   }
// };
