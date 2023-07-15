import React, { useState } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

export default function Testimonials() {
  const [testimonialStep, setTestimonialStep] = useState(0);

  const testimonials = [
    {
      id: '0',
      user: 'Sophie Sow',
      role: 'Customer Happiness Officer',
      testimonial:
        "Aidvi's assistants have optimized our customer support, leading to higher customer satisfaction and reduced response times.",
    },
    {
      id: '1',
      user: 'Samia Kamora',
      role: 'IT Business Analyst',
      testimonial:
        "Aidvi's AI wizard transformed my business analysis journey, conjuring valuable rules and bespoke requirements with magical precision.",
    },
    {
      id: '2',
      user: 'Mika Writt',
      role: 'Marketing Manager',
      testimonial:
        'Simplify event engagement. Seamlessly share workshop schedules, attendee info, and real-time updates. Enhance collaboration and deliver an interactive event experience.',
    },
  ];

  const handleNext = () => {
    if (testimonialStep === testimonials.length - 1) {
      setTestimonialStep(0);
    } else {
      setTestimonialStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (testimonialStep === 0) {
      setTestimonialStep(testimonials.length - 1);
    } else {
      setTestimonialStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <div id='testimonials' className="lg:container px-4">
      <div className="bg-gradient-to-tr from-lightblue to-lightorange flex lg:flex-row flex-col py-20">
        <div className="lg:w-1/2 lg:px-10 px-3 flex">
          <h1 className="lg:text-[48px] text-[40px] font-bold my-auto leading-10">What Aidvi users are saying</h1>
        </div>
        <div className="lg:w-1/2 flex lg:mt-0 mt-5 px-2">
          <div id="testimonials" className="lg:w-[80%] w-[90%]">
            <div className="h-[180px] overflow-y-auto">
              <p className="text-[20px]">{testimonials[testimonialStep].testimonial}</p>
            </div>
            <p className="text-[20px] font-bold mt-5">
              - {testimonials[testimonialStep].user}, {testimonials[testimonialStep].role}.
            </p>
          </div>
          <div id="buttons" className="w-[20%] flex flex-col gap-5">
            <button className="rotate-90 w-fit h-fit text-[20px] bg-white p-3 font-bold rounded-full" onClick={handleNext}>
              <MdArrowBackIosNew />
            </button>
            <button className="rotate-90 w-fit h-fit text-[20px] bg-white p-3 font-bold rounded-full" onClick={handleBack}>
              <MdArrowForwardIos />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
