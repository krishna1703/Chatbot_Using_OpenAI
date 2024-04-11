"use client"

import React, { useState } from 'react';

const TextToSpeech = () => {
  const [textToSpeak, setTextToSpeak] = useState('');

  const speakText = () => {

    // Check if the browser supports the Web Speech API
    if ('speechSynthesis' in window) {
      // Create a new SpeechSynthesisUtterance object
      const utterance = new SpeechSynthesisUtterance();

      // Set the text to be spoken
      utterance.text = textToSpeak;

      // Use the speechSynthesis object to speak the utterance
      speechSynthesis.speak(utterance);

    } else {
      alert('Text-to-speech not supported in this browser.');
    }
  };

  return (
    <div >
      <h1>Text-to-Speech Example</h1>

      <textarea
        value={textToSpeak}
        onChange={(e) => setTextToSpeak(e.target.value)}
        rows="4"
        cols="50"
        placeholder="Enter text to speak..."
      />
      <br />
      <button className='bg-black text-white' onClick={speakText}>Speak</button>
    </div>
  );
};

export default TextToSpeech;
