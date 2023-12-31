import React, { useState, useEffect } from 'react'
import Micro from '../../assets/microsoft.svg'
import Decor from '../../assets/decor.jpg'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function Register() {
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [AddressP, setAddressP] = useState('')
    const [Mail, setMail] = useState('')
    const [Pass, setPass] = useState('')
    const History = useHistory()

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [isValid, setIsValid] = useState(false);
    const [isFilled, setFilled] = useState(false);

    

    const handleEmailInputChange = (event) => {
        const inputValue = event.target.value;
        setMail(inputValue);
        setIsValid(emailRegex.test(inputValue));
    };

    useEffect(() => {
        setFilled( isValid && Mail.length != 0 && Pass.length > 8 && lastName.length != 0 && firstName.length != 0 && AddressP.length != 0)
    }, [firstName, Mail, Pass, lastName, AddressP])
    


    const HandelSignUp = () => {
    
        const payload = {
            firstName: firstName,
            lastName : lastName,
            address : AddressP,
            email : Mail,
            password : Pass,
        };
    
        fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then((response) => response.status == 200 ? History.push('/app/bots') : null)
      };

    return (
        <div className='w-screen h-screen flex'>
            <div className="lg:w-1/2 w-full h-full flex flex-col">
                <div className='lg:mt-4 lg:ml-4 lg:relative absolute top-2 left-1/2 -translate-x-1/2'>
                    <a href="/" className='text-[30px] font-normal text-primary'>✨aidvi</a>
                </div>
                <div className="flex m-auto lg:w-[516px] w-3/4 text-center">
                    <div id="form">
                        {/*header */}
                        <div className="lg:mb-16 mb-8">
                            <h2 className='lg:text-[40px] text-[30px] font-bold text-primary'>Create your account</h2>
                            <p className='lg:text-[20px] text-[14px] font-normal text-subtitles lg:px-5'>Ignite your conversations with our dynamic chatbot, making every interaction extraordinary.</p>
                        </div>

                        {/*form */}
                        <div className="flex flex-col">
                            <div className="flex gap-2">
                                <div className="w-1/2">
                                    <div class="relative w-full">
                                        <input type="text" value={firstName} onChange={(e) => setfirstName(e.target.value)} className="bg-gray-50 border-gray-300 text-gray-900 lg:text-[20px] text-[15px] rounded-lg block w-full pl-5 p-2.5 outline-none dark:focus:ring-blue-500 dark:focus:border-blue-500 border-2 transition-all delay-75" placeholder="First name" required />
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <div class="relative w-full">
                                        <input type="text" value={lastName} onChange={(e) => setlastName(e.target.value)} className="bg-gray-50 border-gray-300 text-gray-900 lg:text-[20px] text-[15px] rounded-lg block w-full pl-5 p-2.5 outline-none dark:focus:ring-blue-500 dark:focus:border-blue-500 border-2 transition-all delay-75" placeholder="Last name" required />
                                    </div>
                                </div>
                            </div>
                            <div class="relative w-full mt-[20px]">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                                    <div className='bg-white rounded-md w-fit h-fit p-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 60 60" fill="none">
                                            <path d="M55 55H5" stroke="#1C274C" stroke-width="3.75" stroke-linecap="round" />
                                            <path d="M5 27.5L15.1574 19.3742M55 27.5L34.6852 11.2483C31.946 9.05697 28.054 9.05697 25.3148 11.2483L23.3599 12.8121" stroke="#1C274C" stroke-width="3.75" stroke-linecap="round" />
                                            <path d="M38.75 13.75V8.75C38.75 8.05965 39.3097 7.5 40 7.5H46.25C46.9403 7.5 47.5 8.05965 47.5 8.75V21.25" stroke="#1C274C" stroke-width="3.75" stroke-linecap="round" />
                                            <path d="M10 55V23.75" stroke="#1C274C" stroke-width="3.75" stroke-linecap="round" />
                                            <path d="M50 23.75V33.75M50 55V43.75" stroke="#1C274C" stroke-width="3.75" stroke-linecap="round" />
                                            <path d="M37.5 55V42.5C37.5 38.9645 37.5 37.1967 36.4018 36.0982C35.3033 35 33.5355 35 30 35C26.4645 35 24.6967 35 23.5983 36.0982M22.5 55V42.5" stroke="#1C274C" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M35 23.75C35 26.5115 32.7615 28.75 30 28.75C27.2385 28.75 25 26.5115 25 23.75C25 20.9886 27.2385 18.75 30 18.75C32.7615 18.75 35 20.9886 35 23.75Z" stroke="#1C274C" stroke-width="3.75" />
                                        </svg>
                                    </div>
                                </div>
                                <input type="text" value={AddressP} onChange={(e) => setAddressP(e.target.value)} autoComplete="off" autoCapitalize="none" className="bg-gray-50 border-gray-300 text-gray-900 lg:text-[20px] text-[15px] rounded-lg block w-full pl-14 p-2.5 outline-none dark:focus:ring-blue-500 dark:focus:border-blue-500 border-2 transition-all delay-75" placeholder="State/City, Country" required />
                            </div>
                            <div class="relative w-full mt-[20px]">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                                    <div className='bg-white rounded-md w-fit h-fit p-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 27 20" fill="none">
                                            <path d="M23.5358 3.64952L13.5 11.5912L3.46416 3.64952M2.28008 1.02065C1.94058 1.02065 1.61499 1.16566 1.37493 1.42378C1.13487 1.6819 1 2.03198 1 2.39702V17.957C1 18.322 1.13487 18.6721 1.37493 18.9302C1.61499 19.1883 1.94058 19.3333 2.28008 19.3333H24.7199C25.0594 19.3333 25.385 19.1883 25.6251 18.9302C25.8651 18.6721 26 18.322 26 17.957V2.37638C26 2.01134 25.8651 1.66125 25.6251 1.40313C25.385 1.14501 25.0594 1 24.7199 1H2.28008V1.02065Z" stroke="#111D57" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <input type="email" value={Mail} onChange={(e) => handleEmailInputChange(e)} autoComplete="off" autoCapitalize="none" className={` bg-gray-50 border-2 border-gray-300 text-gray-900 lg:text-[20px] text-[15px] rounded-lg block w-full pl-14 p-2.5 transition-all delay-75 ${isValid ? 'focus:ring-blue-500 focus:border-blue-500 focus:bg-blue-50' : 'focus:ring-red-500 focus:border-red-500 focus:bg-red-50'} outline-none`} placeholder="you@example.com" required />
                            </div>

                            <div class="relative w-full mt-[20px]">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                                    <div className='bg-white rounded-md w-fit h-fit p-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 21" fill="none">
                                            <path d="M15.2567 9.14667H3.03667C1.91185 9.14667 1 10.0585 1 11.1833V17.2933C1 18.4182 1.91185 19.33 3.03667 19.33H15.2567C16.3815 19.33 17.2933 18.4182 17.2933 17.2933V11.1833C17.2933 10.0585 16.3815 9.14667 15.2567 9.14667Z" stroke="#111D57" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M13.7292 9.14667V6.09167C13.7292 3.24033 13.22 1 9.14668 1C5.07335 1 4.56418 3.24033 4.56418 6.09167V9.14667" stroke="#111D57" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <input type="password" value={Pass} onChange={(e) => setPass(e.target.value)} autoComplete="off" autoCapitalize="none" className="bg-gray-50 border-gray-300 text-gray-900 lg:text-[20px] text-[15px] rounded-lg block w-full pl-14 p-2.5 outline-none dark:focus:ring-blue-500 dark:focus:border-blue-500 border-2 transition-all delay-75" placeholder="password  (8 characters min)" required />
                            </div>
                        </div>
                        {/*button login */}
                        <div className='w-full mt-[20px]'>
                            <button onClick={() => HandelSignUp()} className={`w-full text-white font-bold py-2 md:py-1 rounded-md text-[20px] ${isFilled ? 'bg-secondary' : 'bg-gray-400'}`} disabled={!isFilled}>Sign up</button>
                        </div>

                        {/*google and microsoft */}
                        <div>
                            <hr className='bg-primary mt-8 md:mt-5 h-[2px]' />
                            <p className='relative transform -translate-y-1/2 -translate-x-1/2 left-1/2 pb-1 bg-white text-center w-fit px-2'>or</p>
                        </div>
                        {/*button login */}
                        <div className='w-full lg:mt-5 mt-1 flex gap-5'>
                            <button className='bg-input flex w-full text-primary font-bold py-2 rounded-md text-[20px]'>
                                <div className='flex m-auto gap-3'>
                                    <div className='w-6 my-auto'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 326667 333333" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z" fill="#4285f4" /><path d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z" fill="#34a853" /><path d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z" fill="#fbbc04" /><path d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z" fill="#ea4335" /></svg>
                                    </div>
                                    Google
                                </div>
                            </button>
                            <button className='bg-input flex w-full text-primary font-bold py-2 rounded-md text-[20px]'>
                                <div className='flex m-auto gap-3'>
                                    <div className='w-6 my-auto'>
                                        <img src={Micro} alt="" />
                                    </div>
                                    Microsoft
                                </div>
                            </button>
                        </div>
                        <div className="lg:mt-[46px] mt-[20px]">
                            <p className='text-primary font-semibold'>Already a member? <Link to="/login" className='text-secondary'>Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/2 h-full p-10 hidden lg:block">
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    {/* SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 920 997" fill="none">
                        <defs>
                            <pattern id="pattern0" width="100%" height="100%" patternUnits="userSpaceOnUse">
                                <image xlinkHref={Decor} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
                            </pattern>
                        </defs>
                        <path d="M890 -4.39392e-05C906.568 -4.39004e-05 920 13.4314 920 30V967C920 983.568 906.568 997 890 997H30C13.4314 997 -3.05176e-05 983.568 -3.05176e-05 967V103.648C-3.05176e-05 85.2 16.6112 71.0759 35.0461 70.3836C50.5997 69.7995 67.8653 66.9539 79 58.5C88.3992 51.3637 94.6147 37.8682 98.5541 25.6363C103.174 11.2898 115.777 -4.575e-05 130.849 -4.57147e-05L890 -4.39392e-05Z" fill="url(#pattern0)" />
                        <path d="M890 -4.39392e-05C906.568 -4.39004e-05 920 13.4314 920 30V967C920 983.568 906.568 997 890 997H30C13.4314 997 -3.05176e-05 983.568 -3.05176e-05 967V103.648C-3.05176e-05 85.2 16.6112 71.0759 35.0461 70.3836C50.5997 69.7995 67.8653 66.9539 79 58.5C88.3992 51.3637 94.6147 37.8682 98.5541 25.6363C103.174 11.2898 115.777 -4.575e-05 130.849 -4.57147e-05L890 -4.39392e-05Z" fill="black" fillOpacity="0.3" />
                    </svg>

                    {/* Content */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                        <div className='text-center w-fit '>
                            <h1 className='text-white text-7xl'>✨aidvi</h1>
                            <p className='text-[19px] mt-3'>Unlock the power of seamless communication and limitless knowledge with our mesmerizing chatbot, your digital companion for endless possibilities.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
