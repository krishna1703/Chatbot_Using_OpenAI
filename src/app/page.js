import Image from "next/image";
import Link from "next/link";
import React from "react";
import img1 from "../../public/chatbotpage.jpg"; 


const Homepage = () => {
  return (
    <>
 
      <section className="flex justify-around w-auto  place-items-center m-auto  bg-slate-200 h-screen">
        <div className="w-1/3">
          <h1 className="font-semibold mb-2  text-teal-500 text-2xl">
            Dyotis Chatbot{" "}
          </h1>

          <p className="font-normal text-sm text-gray-500">
            Dyotis Chatbot is an intelligent virtual assistant designed to
            streamline communication, offering natural language understanding
            and personalized responses for a seamless user experience.
          </p>
          <br></br>
          <Link
            href="../chatbot"
            className="bg-blue-500 text-white p-2 w-auto rounded-sm hover:bg-blue-700 hover:p-2.5"
          >
            let's Explore
          </Link>
        </div>
        <div>
          <Image
            src={img1}
            alt="img1"
            height="400"
            width="auto"
            className="rounded-md"
            priority
          />
        </div>
      </section>
  
    </>
  );
};

export default Homepage;
