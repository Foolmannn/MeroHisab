import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MdMic, MdMicOff } from "react-icons/md";

export default function VoiceFloatingButton() {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if browser supports Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false; // Stops after one phrase
      recognitionRef.current.interimResults = false; // Only final results
      recognitionRef.current.lang = "en-US"; // You can change this to 'ne-NP' for Nepali later!

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence;
        
        // Save to a variable and log
        const capturedTransaction = transcript;
        console.log("Captured Voice Entry:", capturedTransaction);
        console.log("Confidence Score:", (confidence * 100).toFixed(2) + "%");
        
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.error("Browser does not support Web Speech API");
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <motion.div
        drag
        dragMomentum={false}
        className="absolute pointer-events-auto flex items-center justify-center"
        style={{ bottom: "2rem", right: "2rem" }}
      >
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={toggleListening}
          className={`
            relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center 
            transition-all duration-300 text-white
            ${isListening ? "bg-red-500 scale-110" : "bg-emerald-500 hover:bg-emerald-600"}
          `}
        >
          {isListening && (
            <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></span>
          )}

          {isListening ? (
            <MdMic className="w-8 h-8 animate-pulse" />
          ) : (
            <MdMic className="w-8 h-8" />
          )}
        </button>
      </motion.div>
    </div>
  );
}