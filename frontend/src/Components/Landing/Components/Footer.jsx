import React from 'react'
import {AiFillInstagram, AiFillYoutube, AiFillTwitterCircle} from 'react-icons/ai'

export default function Footer() {
    return (
        <div className='lg:container px-10 py-3'>
            <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 gap-5">
                <div className="aidvi">
                    <div className='my-auto'>
                        <p className='text-[30px] font-bold text-primary'>✨aidvi</p>
                        <p className='text-[18px] mt-3'>
                            Create and share your custom AI assistant trained on your specific data, driving meaningful and profitable interactions with your team members and customers.
                        </p>
                    </div>
                </div>
                <div className="navigation">
                    <div className='my-auto'>
                        <p className='text-[20px] font-bold text-primary'>Navigation</p>
                        <ul className='text-[18px] flex flex-col gap-3 mt-3'>
                            <li>
                                <a href="#">Benefits</a>
                            </li>
                            <li><a href="#">How it works</a></li>
                            <li><a href="#">Testimonials</a></li>
                            <li><a href="#">Pricing</a></li>
                        </ul>
                    </div>
                </div>
                <div className="lastpub">
                    <div className='my-auto'>
                        <p className='text-[20px] font-bold text-primary'>Last public bots</p>
                        <ul className='text-[18px] flex flex-col gap-3 mt-3'>
                            <li>
                                <a href="#">GITEX Africa guide</a>
                            </li>
                            <li><a href="#">HS-code Morocco</a></li>
                            <li><a href="#">Connect Institute bot</a></li>
                            <li><a href="#">Altcode aidvisor</a></li>
                        </ul>
                    </div>
                </div>
                <div className="social">
                    <div className='my-auto'>
                        <p className='text-[20px] font-bold text-primary'>Socials</p>
                        <ul className='text-[18px] flex flex-col gap-3 mt-3'>
                            <li className='text-4xl'>
                                <a href="#"><AiFillInstagram /> </a>
                            </li>
                            <li className='text-4xl'><a href="#"><AiFillYoutube /></a></li>
                            <li className='text-4xl'><a href="#"> <AiFillTwitterCircle /> </a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-full my-20">
                Built with ❤️ by <a href="https://altcode.ma/" className='text-secondary'>Altcode Solutions</a>
            </div>
        </div>
    )
}
