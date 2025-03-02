import React from 'react'

const ToolsPage = () => {
  const tools = [
    {
      id: 1,
      name: "Automatically Sign-In",
      nameAlt: "Login Lifesaver",
      description: "All CUNY-authorized sites love to kick you out after a few minutes of inactivity. Annoying? We've got your back! Our tool will automatically log you back in, saving you from the endless login loop of doom.",
      icon: "🔑",
      link: "https://chromewebstore.google.com/detail/auto-login-cunyfirst-exte/ejoonlpcdjbffhjdmilkmfmikndihlbj?authuser=0&hl=en"
    },
    {
      id: 2,
      name: "DegreeWorks Helper",
      nameAlt: "Course Selection Sidekick",
      description: "Tired of juggling multiple tabs between CUNYFirst Schedule Builder and DegreeWorks? Problem solved! We've integrated what you need into one place. Now you can see required courses directly in Schedule Builder, with clear indicators for prerequisites you haven't met yet. One-click access to all course details - no more tab jungle!",
      note: "Note: This extension is being developed as a toolkit. Currently, it only includes the DegreeWorks Helper feature (Auto-Login has been separated). In the future, we plan to release new features as standalone tools.",
      icon: "📚",
      link: "https://chromewebstore.google.com/detail/better-baruch/hbhppighkhlcjdbijfgehnjklhepmcmb?authuser=0&hl=en"
    },
    {
      id: 3,
      name: "Rally Nexus",
      nameAlt: "Club Connection",
      description: "Easily access all club information directly from your phone! Our mobile app provides a clean, convenient way to browse student organizations, view descriptions, and find contact details without the hassle.",
      icon: "👨‍🏫",
      link: "https://github.com/Cytrogen/BetterBaruchRN"
    }
  ]

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center">Our Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map(tool => (
          <div key={tool.id} className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-colors shadow-lg">
            <div className="flex items-start mb-4">
              <div className="text-4xl mr-4">{tool.icon}</div>
              <div>
                <h3 className="text-xl font-bold">{tool.name}</h3>
                <h4 className="text-lg text-blue-400">{tool.nameAlt}</h4>
              </div>
            </div>
            <p className="text-gray-300">{tool.description}</p>
            {tool.note && (
              <div className="mt-3 p-2 bg-slate-700 rounded text-gray-300 text-sm italic">
                {tool.note}
              </div>
            )}
            <a href={tool.link} className="mt-4 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition-colors inline-block">
              Get it
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ToolsPage;