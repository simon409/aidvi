import React from 'react'

export default function Benefits() {
  return (
    <div id='benefits' className='relative lg:container mb-40 lg:mt-0 mt-20'>
        <h1 className='text-5xl font-bold text-center lg:mt-0'>Unlimited use cases</h1>
        <div id="usecases" className='mt-16'>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
            <div id="case" className='flex flex-col items-center justify-center px-8'>
              <p className="text-[60px] p-8 bg-lightblue w-fit rounded-full">💬</p>
              <p className="text-[20px] text-center">
                <b>Customized</b> advisory and assistance
              </p>
            </div>
            <div id="case" className='flex flex-col items-center justify-center px-8'>
              <p className="text-[60px] p-8 bg-lightblue w-fit rounded-full">🎟️</p>
              <p className="text-[20px] text-center">
                <b>Easy</b> event exploring and interaction
              </p>
            </div>
            <div id="case" className='flex flex-col items-center justify-center px-8'>
              <p className="text-[60px] p-8 bg-lightblue w-fit rounded-full">📚</p>
              <p className="text-[20px] text-center">
                <b>Personalized </b> knowledge sharing
              </p>
            </div>
            <div id="case" className='flex flex-col items-center justify-center px-8'>
              <p className="text-[60px] p-8 bg-lightblue w-fit rounded-full">🏋🏽‍♀️</p>
              <p className="text-[20px] text-center">
                <b>Interactive </b> training and onboarding
              </p>
            </div>
          </div>
        </div>
    </div>
  )
}
