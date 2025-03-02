import React from 'react';
import BearcatModel from '../components/BearcatModel';

const HomePage = ({ setActiveTab }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">BetterBaruch</h1>
        <h2 className="text-2xl md:text-3xl text-blue-400 mb-6">Enhancing Your Baruch Experience</h2>
        <div className="space-y-6">
          <p className="text-xl">Are you a Baruch student?</p>
          <p className="text-xl">Tired of wrestling with CUNY and Baruch's websites that seem designed by confused hamsters?</p>
          <p className="text-xl">Don't worry! We're here to help!</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={() => setActiveTab('tools')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors"
          >
            Get Tools
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className="border border-blue-500 text-blue-400 hover:bg-blue-900 px-6 py-3 rounded-md transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <BearcatModel />
      </div>
    </div>
  )
}

export default HomePage