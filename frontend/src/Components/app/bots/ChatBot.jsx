import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { BiSend } from 'react-icons/bi';
import { IoMdPerson } from 'react-icons/io';
import { AiFillRobot } from 'react-icons/ai';
import Typewriter from './components/TypingEffect';

export default function ChatBot() {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [Question_Suggestions, setQuestion_Suggestions] = useState([]);
  const [bot, setBot] = useState({});
  const [rows, setrows] = useState(1);

  const [dir_path, setdir_path] = useState("")
  const chatContainerRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    try {
      const data = {
        bot_id: id, // Replace with the actual bot ID
      };

      fetch(import.meta.env.VITE_API_LINK+'/get_userbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
          setdir_path(data.path)
          setBot(data)
          // Split the comma-separated text into an array
          const textArray = data.message_suggestions.split(',');
          setQuestion_Suggestions(textArray)
        })
        .catch(error => console.error(error));
        // Add the bot's initial greeting message to start the conversation
        
    }
    catch (error) {
      console.error('Error:', error);
    }

  }, [])


  useEffect(() => {
    const observer = new MutationObserver(() => {
      // Handle new line added to the paragraph
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      console.log('New line added to the paragraph');
    });

    // Scroll to the bottom of the chat container when a new message is added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }


    if (paragraphRef.current) {
        observer.observe(paragraphRef.current, { characterData: true, childList: true, subtree: true });
    }

    return () => {
        observer.disconnect();
    };

  }, [responses]);

  const getAnswerFromBot = () => {
    //Check if the bot has been initialized
    if (!dir_path) {
      console.log("Bot not initialized. Call initializeBot() first.");
      return;
    }
  
    // Fetch the answer from the backend using the stored conversation_chain
    fetch(import.meta.env.VITE_API_LINK+'/get_answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
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

  const sendMessageSuggestion = (suggestion) => {
    
    // Set the selected suggestion as the new message
    setMessage(suggestion);
      // Set the selected suggestion as the new message
      setMessage(suggestion);
    // Send the suggestion to the bot and handle the response
    getAnswerFromBot();

    // Update the questions state after receiving the response
    setQuestions((prevQuestions) => [...prevQuestions, message]);

    // Clear the message input
    setMessage('');
  };

  

  const sendMessage = () => {
    if (message.trim() === '') return; // Ignore empty messages

    // Send message and get response (response for demonstration)
    getAnswerFromBot();
    setQuestions((prevQuestions) => [...prevQuestions, message]);
    setMessage('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
      sendMessage();
    }
    else if (event.key === 'Enter' && event.shiftKey) {
      if(rows < 4){
        setrows(rows+1)
        setlines(lines+1)
      }
    }
    else if(event.key == 'Backspace'){
      setrows(event.target.value.split('\n').length)
    }
  };

  return (
    <div className='w-screen h-screen bg-lighterblue'>
      <div className="container flex flex-col gap-5">
        <div className="py-5 h-[10%]">
          <h1 className='text-[30px] font-bold pl-1 text-primary text-center'>{bot.name}</h1>
          <h1 className='text-[20px] font-normale pl-1 text-primary text-center'>{bot.description}</h1>
        </div>
        <div className="h-[80%] rounded-lg bg-lightblue border-2 p-4 flex flex-col">
          {/*dir_path */}
          <div className='h-[580px] flex flex-col gap-3'>
            <div className="w-full h-[90%] flex overflow-scroll overflow-x-hidden" ref={chatContainerRef}>
              <div className="w-11/12 mx-auto mt-5 flex flex-col gap-3">
                {/*message template */}
                {/*previous questions and responses */}
                <div className="w-9/12 flex gap-5">
                    <div id="avatar" className="h-fit p-3 bg-slate-800 text-white text-xl rounded-md">
                      <AiFillRobot />
                    </div>
                    <div id="message" className="text-l bg-slate-500 text-white p-2 rounded-md">
                      <Typewriter text={bot.first_message} delay={50} />
                    </div>
                </div>
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
                        <Typewriter text={responses[index]} delay={50} reference={paragraphRef}/>
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
                      <Typewriter text={responses[responses.length - 1]} delay={50} />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={`h-[${rows==1 ? '1' : rows==4 ? '3' : '2'}0%] flex gap-3`}>
              <div className="w-[90%] mb-auto"><textarea rows={rows} className='p-3 rounded-md w-full leading-normal' onKeyDown={handleKeyPress} value={message} onChange={(e) => {setMessage(e.target.value)}} type="text" placeholder='type you question here ...' /></div>
              <div className="w-[10%] mb-auto"><button onClick={sendMessage} className='bg-secondary p-3 rounded-md text-white font-bold w-full'>Send</button></div>
            </div>
          </div>
          {/*message suggestions */}
          <div className="w-full h-fit">
            <div className="flex my-auto py-4 gap-3">
              {Question_Suggestions.map((suggestion, index) => (
                <button onClick={(e) => sendMessageSuggestion(suggestion)} value={suggestion} key={index} className="bg-primary px-4 py-1 text-white rounded-full shadow-sm">
                  {suggestion}
                </button>
              ))}
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
