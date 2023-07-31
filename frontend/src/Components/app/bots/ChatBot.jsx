import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { BiSend } from 'react-icons/bi';
import { IoMdPerson } from 'react-icons/io';
import { AiFillRobot } from 'react-icons/ai';

export default function ChatBot() {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [dir_path, setdir_path] = useState("")
  const chatContainerRef = useRef(null);

  useEffect(() => {
    try {
      const data = {
        user_id: 'b7e6b8bac3284a369700eb29aaf51ad7', // Replace with the actual user ID
        bot_id: id, // Replace with the actual bot ID
      };

      fetch('http://localhost:5000/get_userbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
          setdir_path(data.path)
        })
        .catch(error => console.error(error));
    }
    catch (error) {
      console.error('Error:', error);
    }
  }, [])


  useEffect(() => {
    // Scroll to the bottom of the chat container when a new message is added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }

  }, [responses]);

  const getAnswerFromBot = () => {
    //Check if the bot has been initialized
    if (!dir_path) {
      console.log("Bot not initialized. Call initializeBot() first.");
      return;
    }
  
    // Fetch the answer from the backend using the stored conversation_chain
    fetch('http://localhost:5000/get_answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        directory_path: dir_path,
        question: message
      }),
    })
    .then(response => response.json())
    .then(data => {
      // Handle the bot's response here
      setResponses((prevResponses) => [...prevResponses, data.response]); 
    })
    .catch(error => console.error(error));
  };

  const sendMessage = () => {
    if (message.trim() === '') return; // Ignore empty messages

    // Send message and get response (response for demonstration)
    getAnswerFromBot();
    setQuestions((prevQuestions) => [...prevQuestions, message]);
    setMessage('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className='w-screen h-screen bg-lighterblue'>
      <div className="container flex flex-col gap-5">
        <div className="py-10 h-[10%]">
          <h1 className='text-[30px] font-bold pl-1 text-primary text-center'>✨aidvi</h1>
        </div>
        <div className="h-[80%] rounded-lg bg-lightblue border-2 p-4 flex flex-col">
          {/*dir_path */}
          <div className='h-[580px] flex flex-col gap-3'>
            <div className="w-full h-[90%] flex overflow-scroll overflow-x-hidden" ref={chatContainerRef}>
              <div className="w-11/12 mx-auto mt-5 flex flex-col gap-3">
                {/*message template */}
                {/*previous questions and responses */}
                {questions.map((question, index) => (
                  <div key={index} className="flex flex-col gap-3">
                    <div className="w-9/12 flex gap-5 relative justify-end ml-auto">
                      <div id="message" className="text-l bg-slate-500 text-white p-2 rounded-md">
                        {question}
                      </div>
                      <div id="avatar" className="h-fit p-3 bg-slate-500 text-white text-xl rounded-md">
                        <IoMdPerson />
                      </div>
                    </div>
                    <div className="w-9/12 flex gap-5">
                      <div id="avatar" className="h-fit p-3 bg-slate-800 text-white text-xl rounded-md">
                        <AiFillRobot />
                      </div>
                      <div id="message" className="text-l bg-slate-500 text-white p-2 rounded-md">
                        {responses[index]}
                      </div>
                    </div>
                  </div>
                ))}
                {/*current response */}
                {responses.length > questions.length && (
                  <div className="w-9/12 flex gap-5">
                    <div id="avatar" className="h-fit p-3 bg-slate-500 text-white text-xl rounded-md">
                      <AiFillRobot />
                    </div>
                    <div id="message" className="text-l bg-slate-500 text-white p-2 rounded-md">
                      <p>{responses[responses.length - 1]}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='h-[10%] flex gap-3'>
              <div className="w-[90%] my-auto"><input className='p-3 rounded-md w-full' onKeyDown={handleKeyPress} value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder='type you question here ...' /></div>
              <div className="w-[10%] my-auto"><button onClick={sendMessage} className='bg-secondary p-3 rounded-md text-white font-bold w-full'>Send</button></div>
            </div>
          </div>
          {/*message suggestions */}
          <div className="w-full h-fit flex gap-3">
            <div className="flex my-auto py-4">
              test
            </div>
          </div>
        </div>
        <div className="py-5 h-[10%]">
          <h1 className='text-[20px] font-bold pl-1 text-primary text-right'>powered by ✨aidvi</h1>
        </div>
      </div>
    </div>
  )
}
