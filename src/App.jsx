import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ToolsPage from './pages/ToolsPage'
import AboutPage from './pages/AboutPage'

const App = () => {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="container mx-auto px-4 py-8 flex-grow">
        {activeTab === 'home' && <HomePage setActiveTab={setActiveTab} />}
        {activeTab === 'tools' && <ToolsPage />}
        {activeTab === 'about' && <AboutPage />}
      </main>

      <Footer />
    </div>
  )
}

export default App;
