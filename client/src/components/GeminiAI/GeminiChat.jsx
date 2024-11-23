// import React, { useState, useEffect, useRef } from 'react';

// const GeminiChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
//   const chatWindowRef = useRef(null);
//   const inputRef = useRef(null);


//   useEffect(() => {
//     const listener = event => {
//       if (event.code === "Enter" || event.code === "NumpadEnter") {
//         console.log("Enter key was pressed. Run your function.");
//         event.preventDefault();
//         handleSendMessage(inputRef.current.value);
//         inputRef.current.value = "";
//       }
//     };
//     document.addEventListener("keydown", listener);
//     return () => document.removeEventListener("keydown", listener);
    
//   }, []);

//   const handleSendMessage = (message) => {
//     if (isWaitingForResponse || !message.trim()) return;

//     const newMessages = [...messages, { sender: "user", text: message }];
//     setMessages(newMessages.slice(-6)); // Keep only the latest 6 messages
//     setIsWaitingForResponse(true);

//     // Simulate AI response
//     setTimeout(() => {
//       setMessages((prevMessages) => {
//         const updatedMessages = [
//           ...prevMessages,
//           { sender: "ai", text: "This is a simulated response." }
//         ];
//         setIsWaitingForResponse(false);
//         return updatedMessages.slice(-6); // Keep only the latest 6 messages
//       });
//     }, 1000);
//   };

//   return (
//     <div ref={chatWindowRef}>
//       <div>
//         {messages.map((message, index) => (
//           <p key={index}><b>{message.sender}:</b> {message.text}</p>
//         ))}
//       </div>
//       <input ref={inputRef} type="text" placeholder="Type a message..." />
//     </div>
//   );
// };

// export default GeminiChat;

import React, { useState, useEffect, useRef } from "react";

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const chatWindowRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const inputElement = inputRef.current;

    const handleKeyPress = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault(); // Prevent default form submission behavior
        handleSendMessage(inputRef.current.value);
        inputRef.current.value = "";
      }
    };

    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, []);

  const handleSendMessage = (message) => {
    if (isWaitingForResponse || !message.trim()) return;

    const newMessages = [...messages, { sender: "user", text: message }];
    setMessages(newMessages.slice(-6)); // Keep only the latest 6 messages
    setIsWaitingForResponse(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prevMessages) => {
        const updatedMessages = [
          ...prevMessages,
          { sender: "ai", text: "This is a simulated response." },
        ];
        setIsWaitingForResponse(false);
        return updatedMessages.slice(-6); // Keep only the latest 6 messages
      });
    }, 1000);
  };

  return (
    <div ref={chatWindowRef}>
      <div>
        {messages.map((message, index) => (
          <p key={index}>
            <b>{message.sender}:</b> {message.text}
          </p>
        ))}
      </div>
      <input ref={inputRef} type="text" placeholder="Type a message..." />
    </div>
  );
};

export default GeminiChat;
