import React, { useEffect } from 'react'
import api from '../axios/axios';
import PromptCard from '../components/PromptCard';
const SavedPrompts = () => {
    const [prompts, setPrompts] = React.useState([]);

    const fetchedSavedPrompts = async () => {
        try {
          const res = await api.get("community/prompts/saved");
          setPrompts(res.data);
        } catch (error) {
          toast.error("Something went wrong when fetching prompts");
        }
    }

    useEffect(() => {
        document.title = "Saved Prompts | Prompt Vault";

        fetchedSavedPrompts();

        return () => {
          document.title = "Prompt Vault";
        };
      }, []);

  return (
   <div className="md:min-h-screen min-h-dvh bg-[#0A0A0A]">
     <div className='w-full h-1 p-5 mb-3'>
        <h1 className='md:text-3xl font-bold text-white uppercase opacity-80 text-2xl'>Saved Prompts</h1>
     </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
            <PromptCard key={prompt._id} prompt={prompt} setPrompts={setPrompts} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-[#121212] text-white rounded-xl hover:bg-gray-700 transition-all duration-200 border border-gray-700 hover:border-gray-600">
            Load More Prompts
          </button>
        </div>
      </div>
    </div>
  )
}

export default SavedPrompts