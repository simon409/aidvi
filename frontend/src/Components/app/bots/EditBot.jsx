import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom/cjs/react-router-dom'
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { BsPlus } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { FileUploader } from "react-drag-drop-files"


export default function EditBot() {
    const {id} = useParams()
    const [opennavmob, setopennavmob] = useState(false);
    const [success, setsuccess] = useState(false);
    const [openmessage, setopenmessage] = useState(false);
    const [botname, setbotname] = useState('');
    const [botdescription, setbotdescription] = useState('');
    const [botfirstmessage, setbotfirstmessage] = useState('');
    const [files, setFiles] = useState([]);
    const fileTypes = ["PDF", "DOCX", "CSV"];
    const [questions, setQuestions] = useState('');

    const handleQuestionaeraChange = (event) => {
        setQuestions(event.target.value);
    };

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
      fetch(import.meta.env.VITE_API_LINK+'/create_bot', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
        .then((response) => {
          if(response.status == 200){
            setsuccess(true)
            setopenmessage(true)
          }
          else{
            setopenmessage(true)
          }
        })
        
  };

  return (
    <div className='flex w-screen h-screen'>
      {
        openmessage && (
          <div className="absolute w-screen h-screen z-50">
            <div className="w-full h-full backdrop-blur-sm flex">
              <div className="bg-white shadow-md rounded-lg relative m-auto h-[400px] w-[600px] p-4 flex flex-col">
                <lord-icon
                    src={success ? "https://cdn.lordicon.com/jutxlfvp.json" : "https://cdn.lordicon.com/vyukcgvf.json"}
                    trigger="loop"
                    delay="2000"
                    colors="outline:#121331,primary:#3a3347,secondary:#ffc738"
                    style={{
                      width: '250px', // Adjust the width as needed
                      height: '250px',
                      margin: 'auto',
                    }}
                    >
                </lord-icon>
                <p className='font-bold text-2xl text-center'>{success ? `Your bot "${botname}" created succefully 🎉` : "Oops, looks like you reached the limits of your plan"}</p>
                <div className="flex flex-col mt-4 gap-2 justify-around">
                  <a href='/app/bots' className='bg-secondary text-white px-4 py-2 rounded-md'>Return to bots page</a>
                  <button className='bg-secondary text-white px-4 py-2 rounded-md'>{success ? "Or sync your bot now" : "Or check our plans!"}</button>
                </div>
              </div>
            </div>
          </div>
        )
      }
      <div className={`lg:w-[20%] w-[300px] lg:relative fixed z-40 h-full bg-lightblue ${opennavmob ? 'lg:-translate-x-0 -translate-x-0' : 'lg:-translate-x-0 -translate-x-full'} transition-all ease-in-out duration-200`}>
        <SideBar />
      </div>
      <div className={`fixed flex w-screen z-30 h-full ${opennavmob ? 'lg:-translate-x-full -translate-x-0' : 'lg:-translate-x-full -translate-x-full'} transition-all ease-in-out duration-200 delay-200`}>
        <div className={`w-full h-full absolute bg-lightblue ${opennavmob ? 'opacity-80' : 'opacity-0'}`}></div>
        <button onClick={() => setopennavmob(false)} className='ml-auto mb-auto text-2xl z-10 p-4 text-primary font-bold' style={{ opacity: 1 }}>
          <AiOutlineClose />
        </button>
      </div>
      <div className="lg:w-[80%] w-full h-full bg-lighterblue flex flex-col text-primary">
        <div className="h-[7%]"><Header setopennavmob={setopennavmob} opennavmob={opennavmob} /></div>
        <div className="h-[93%]">
          <div className="lg:container w-full flex flex-col px-5">
            <h3 className='flex w-[450px] justify-between'><a href='/app/bots'>Bots</a> <p className='inline'>{'>'}</p> <p className='inline'>Editbot ('{id}')</p></h3>
            <h2 className='text-3xl font-bold'>Edit bot</h2>
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
