import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import { BsPlus } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { FileUploader } from "react-drag-drop-files"

export default function NewBots() {
  const [opennavmob, setopennavmob] = useState(false);
  const [botname, setbotname] = useState('')
  const [botdescription, setbotdescription] = useState('')
  const [botfirstmessage, setbotfirstmessage] = useState('')
  const [botLinks, setbotLinks] = useState('')
  const [files, setFiles] = useState([]);
  const fileTypes = ["PDF", "DOCX", "CSV"];
  const [questions, setQuestions] = useState('');

  const handleQuestionaeraChange = (event) => {
    setQuestions(event.target.value);
  };

  const questionArray = questions.split(',').map((question) => question.trim());

  const handleChange = (selectedFiles) => {
    // Append the selectedFiles to the existing files state
    setFiles([...files, ...selectedFiles]);
  };

  const handleDelete = (index) => {
    // Create a copy of the files array and remove the file at the specified index
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const HandelSubmit = () => {
      // Prepare the data for sending it to the backend as a JSON object
      const data = {
        botname: botname,
        botdescription: botdescription,
        botfirstmessage: botfirstmessage,
        questions: questions,
        files: files, // Not sure if you want to send the files to the backend as well, adjust accordingly
        // Add any other data you need to send to the backend
      };

      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append('files[]', file);
      });

      // Add the other data to the FormData
      formData.append('botname', botname);
      formData.append('botdescription', botdescription);
      formData.append('botfirstmessage', botfirstmessage);
      formData.append('questions', questions);
    
      // Send a POST request to the backend API to create the bot
      fetch('http://localhost:5000/create_bot', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the backend if needed
          console.log(data); // For example, you can show a success message or redirect to a new page
        })
        .catch((error) => {
          // Handle errors if the request fails
          console.error('Error:', error);
        });
  };

  return (
    <div className='flex w-screen h-screen'>
      <div className={`lg:w-[20%] w-[300px] lg:relative fixed z-50 h-full bg-lightblue ${opennavmob ? 'lg:-translate-x-0 -translate-x-0' : 'lg:-translate-x-0 -translate-x-full'} transition-all ease-in-out duration-200`}>
        <SideBar />
      </div>
      <div className={`fixed flex w-screen z-40 h-full ${opennavmob ? 'lg:-translate-x-full -translate-x-0' : 'lg:-translate-x-full -translate-x-full'} transition-all ease-in-out duration-200 delay-200`}>
        <div className={`w-full h-full absolute bg-lightblue ${opennavmob ? 'opacity-80' : 'opacity-0'}`}></div>
        <button onClick={() => setopennavmob(false)} className='ml-auto mb-auto text-2xl z-10 p-4 text-primary font-bold' style={{ opacity: 1 }}>
          <AiOutlineClose />
        </button>
      </div>
      <div className="lg:w-[80%] w-full h-full bg-lighterblue flex flex-col text-primary">
        <div className="h-[7%]"><Header setopennavmob={setopennavmob} opennavmob={opennavmob} /></div>
        <div className="h-[93%]">
          <div className="lg:container w-full flex flex-col px-5">
            <h3 className='flex w-[130px] justify-between'><p>Bots</p> <p>{'>'}</p> <p>New bot</p></h3>
            <h2 className='text-3xl font-bold'>New bot</h2>
            <div className="mt-10 w-[500px] flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <p>Bot name</p>
                <input type="text" value={botname} onChange={(e)=>setbotname(e.target.value)} className="bg-white border-gray-200 text-gray-900 lg:text-[20px] text-[15px] rounded-lg block w-full pl-5 p-2.5 outline-none dark:focus:ring-blue-500 dark:focus:border-blue-500 border-2 transition-all delay-75" />
                <p>Bot Description</p>
                <textarea type="text" rows={3} value={botdescription} onChange={(e)=>setbotdescription(e.target.value)} className="bg-white border-gray-200 text-gray-900 lg:text-[20px] text-[15px] rounded-lg block w-full pl-5 p-2.5 outline-none dark:focus:ring-blue-500 dark:focus:border-blue-500 border-2 transition-all delay-75" />
                <p>First message</p>
                <input type="text" placeholder='Hello, how may i help you?' value={botfirstmessage} onChange={(e)=>setbotfirstmessage(e.target.value)} className="bg-white border-gray-200 text-gray-900 lg:text-[20px] text-[15px] rounded-lg block w-full pl-5 p-2.5 outline-none dark:focus:ring-blue-500 dark:focus:border-blue-500 border-2 transition-all delay-75" />
                <p>Questions suggestions (separated by comma)</p>
                <textarea type="text" onChange={handleQuestionaeraChange} value={questions} rows={2} className="bg-white border-gray-200 text-gray-900 lg:text-[20px] text-[15px] rounded-lg block w-full pl-5 p-2.5 outline-none dark:focus:ring-blue-500 dark:focus:border-blue-500 border-2 transition-all delay-75" />
              </div>
              <div className="w-[500px]">
                <p className='mb-2'>Upload you files for bot training</p>
                <FileUploader handleChange={handleChange} name="file" types={fileTypes} multiple />
                <div className="w-full mt-5 grid grid-cols-2 gap-3">
                  {files.map((file, index) => (
                    <div key={index} className="w-full bg-lightblue px-3 py-1 border-2 rounded-md flex justify-between">
                      <span>{file.name}</span>
                      <button className='text-red-500' onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[500px] flex mt-5">
              <button onClick={HandelSubmit} className='ml-auto px-4 py-2 text-white font-bold md:py-1 rounded-md text-[15px] bg-secondary'>Create bot</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
