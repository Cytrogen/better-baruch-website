import React from 'react'

const AboutPage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">About BetterBaruch</h2>

      <div className="bg-slate-800 rounded-lg p-8 shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Introduction</h3>
        <p className="mb-4 text-lg">
          BetterBaruch (aka 2B) aims to develop tools across all platforms to help Baruch students better navigate the school's digital landscape.
        </p>
        <p className="mb-4 text-lg">
          We're a group of students who got tired of playing "Where's Waldo?" with important information on school websites, so we decided to use our tech skills to make life easier for everyone.
        </p>
      </div>

      <div className="mt-8 bg-slate-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Technical Stack</h3>
        <p className="mb-4">
          The BetterBaruch project requires several core technologies:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
          <li>JavaScript - The essential foundation for all our development</li>
          <li>React.js - Our framework of choice for building user interfaces</li>
          <li>Node.js - Powers the proxy server for our DegreeWorks Helper</li>
          <li>Tailwind CSS - Provides our styling framework</li>
          <li>Three.js - Used for 3D elements on this website</li>
        </ul>
      </div>

      <div className="mt-8 bg-slate-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
        <p className="mb-2">If you have questions, suggestions, or want to join our quest to make university websites tolerable:</p>
        <p className="text-blue-400">halloweendemon3418@gmail.com</p>
      </div>
    </div>
  )
}

export default AboutPage