import { ChevronDown, SendHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../axios/axios";
import { toast } from "react-toastify";


const Comments = ({setShowComments, promptId}) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const fetchComments = async (id) => {
    try {
     const res = await api.get(`/community/prompts/${id}/comments`)
     setComments(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault();
    
    try {
      const res = await api.post(`/community/prompts/${promptId}/comments`, {content:comment});
      setComments((prevComments) => [...prevComments, res.data]);
      
    } catch (error) {
      toast.error("Something went wrong when adding comment");
    }finally{
      setComment('');
    }
  }


  useEffect(() => {
    fetchComments(promptId)
  },[promptId])

  return (
      <div className="w-full z-99 p-2 flex flex-col items-center bg-[#121212] text-white ">
        <button onClick={() => setShowComments(false)} className="scrolldown w-full flex items-center justify-center bg-gray-700 m-2 mb-6">
            <ChevronDown />
        </button>
        <div className="w-full flex flex-col gap-4 h-[70vh] overflow-y-auto">

          {
            comments.length === 0 && <p className="text-center">No comments</p>
          }{
          comments.map((comment) => (
            <div key={comment._id} className="w-full px-5 py-2 bg-[#0A0A0A] rounded-2xl pb-4">
              <h3 className="text-xs text-green-500 font-semibold capitalize">
                {comment.owner.username}
              </h3>
              <p>
                {comment.content}
              </p>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddComment} className="w-full flex px-4 py-3 bg-gray-700 rounded-xl">
            <input onChange={(e) => setComment(e.target.value)} value={comment} className="w-full bg-transparent outline-none text-md" type="text" placeholder="Enter your comment" />
            <button type="submit" className="bg-green-500 text-white p-2 rounded-full hover:bg-green-400 transition-all duration-200 transform hover:scale-[1.1]"><SendHorizontal /></button>
        </form>
      </div>
  );
};

export default Comments;
