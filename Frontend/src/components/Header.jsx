import { Upload } from 'lucide-react'
import React, { useState } from 'react'
import ExportButtons from './ExportButtons'

const Header = () => {
  const [showExport,setShowExport] = useState(false)
  return (
     <div className="bg-[#0A0A0A] border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:py-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="md:text-2xl text-lg font-bold text-white italic md:leading-5 leading-4">PROMPT <br /> <span className='text-green-400 '>VAULT</span></h1>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowExport(!showExport)} className=" p-2 rounded-full bg-green-500 text-black font-medium hover:bg-green-400 transition-all duration-200 transform hover:scale-[1.02]">
                <Upload className='md:w-6 md:h-6 w-5 h-5' />
              </button>
            </div>
          </div>
        </div>
      
        <div className={`${showExport ? 'h-15' : 'h-0'} transition-all duration-300 overflow-hidden flex justify-center md:justify-end px-4`}>
        <ExportButtons />
        </div>
    </div>
  )
}

export default Header