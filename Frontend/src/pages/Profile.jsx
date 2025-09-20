import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../config/Context";
import api from "../axios/axios";
import PromptCard from "../components/PromptCard";
import { LogOut, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import Comments from "../components/Comments";
import Popup from "../components/Popup";
import {toast} from 'react-toastify'
const ProfilePage = () => {
  const { user } = useContext(MyContext);
  const [posts, setPosts] = React.useState([]);
  const [isPublic, setIsPublic] = React.useState(true);
  const [prompts, setPrompts] = React.useState([]);
  const [showComments, setShowComments] = useState(false);
  const [idForComments, setIdForComments] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showDeletePromptModal, setShowDeletePromptModal] = useState(false);
  const [promptToDelete, setPromptToDelete] = useState(null);

  const fetchedPrompt = async () => {
    try {
      const res = await api.get("/prompt/get-all");
      setPosts(res.data.prompts);
    } catch (error) {
      toast.error("Something went wrong when fetching prompts");
    }
  };
  const handleDelete = async () => {
    setPrompts((prevPrompts) =>
      prevPrompts.filter((p) => p._id !== promptToDelete)
    );
    await api.delete(`prompt/delete/${promptToDelete}`);
    toast.success("Prompt deleted successfully");
    setShowDeletePromptModal(false);
  };
  useEffect(() => {
    document.title = "Profile | Prompt Vault";

    fetchedPrompt();

    return () => {
      document.title = "Prompt Vault";
    };
  }, []);

  const handleLogout = async () => {
    try {
      toast.success("Logged out successfully");
      await api.post("/user/logout");
      localStorage.removeItem("token");
      window.location.href = "/auth";
    } catch (error) {
      toast.error("Something went wrong when logging out");
    }
  };

  useEffect(() => {
    if (isPublic) {
      const publicPosts = posts.filter((post) => post.isPublic);
      setPrompts(publicPosts);
    } else {
      const privatePosts = posts.filter((post) => !post.isPublic);
      setPrompts(privatePosts);
    }
  }, [isPublic, posts]);

  return (
    <div className="relative bg-[#0A0A0A] text-white flex justify-center p-4">
        {showDeletePromptModal && (
          <Popup>
            <div className="bg-[#121212] px-10 py-5 rounded-2xl ">
              <div className="flex flex-col items-center justify-between gap-4">
                <div>
                  <h1 className="md:text-3xl text-lg font-bold text-white italic leading-5">
                    Are you sure? Want to delete?
                  </h1>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowDeletePromptModal(false)}
                    className="px-4 py-2 rounded-md bg-green-500 text-black font-medium hover:bg-green-400 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete()}
                    className="px-4 py-2 rounded-md bg-red-500 text-black font-medium hover:bg-red-400 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </Popup>
        )}

        <div
          className={`absolute bottom-0 w-full ${
            showComments ? "h-[90vh]" : "h-0"
          } overflow-hidden transition-all duration-300 flex flex-col items-center bg-[#121212] text-white`}
        >
          {idForComments && (
            <Comments
              setShowComments={setShowComments}
              promptId={idForComments}
            />
          )}
        </div>
      <div style={{ scrollbarWidth: "none" }} className="w-full md:h-[90vh] h-[76vh] max-w-3xl bg-[#121212] rounded-2xl shadow-lg overflow-x-hidden overflow-y-scroll ">
        <div className="relative">
          <div
            onClick={handleLogout}
            className="absolute top-4 right-3 w-11 h-11 flex items-center justify-center 
             bg-[#0A0A0A] border border-green-600 text-green-400 rounded-full 
             cursor-pointer hover:bg-green-600/20 hover:text-green-300 
             hover:shadow-[0_0_10px_rgba(34,197,94,0.8)] 
             transition-all duration-200"
          >
            <LogOut size={20} />
          </div>
          <div className="h-32 bg-gradient-to-r from-green-600 to-green-500"></div>
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-[#0A0A0A] w-24 h-24 rounded-full flex items-center justify-center">
            {user?.avatar === "" ? (
              <h1 className="text-5xl uppercase">{user.username.charAt(0)}</h1>
            ) : (
              <img
                src={user?.avatar}
                alt="avatar"
                className=" border-4 border-gray-800 shadow-lg object-cover"
              />
            )}
          </div>
        </div>

        {/* Username + Bio */}
        <div className="mt-16 text-center px-4 flex flex-col items-center gap-2">
          <h2 className="text-xl font-bold tracking-wide">{user.username}</h2>
          <p className="text-gray-400 text-sm">{user.bio}</p>
          <Link
            to="/profile-edit"
            className="flex items-center gap-1 rounded-lg bg-green-600 px-4 py-2 text-white font-medium shadow-md 
                 hover:bg-green-700 hover:shadow-lg active:scale-95 transition-all duration-200"
          >
            <Pencil size={15} />
            Edit
          </Link>
        </div>

        {/* Posts Header */}
        <div className="mt-6 px-4 flex w-full items-center gap-2">
          <button
            onClick={() => setIsPublic(true)}
            className={` ${
              isPublic ? "bg-green-600 text-black" : ""
            } border-green-500 border-1  flex-1 font-semibold py-2 px-4 rounded-xl text-center shadow-md`}
          >
            Public
          </button>
          <button
            onClick={() => setIsPublic(false)}
            className={` ${
              !isPublic ? "bg-green-600 text-black" : ""
            } border-green-500 border-1 font-semibold flex-1 py-2 px-4 rounded-xl text-center shadow-md`}
          >
            Private
          </button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 mt-5 p-5">
          {prompts.map((prompt, idx) => (
            <PromptCard
              key={idx}
              prompt={prompt}
              setPrompts={setPrompts}
              setShowComments={setShowComments}
              setIdForComments={setIdForComments}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
              setPromptForDeletion={setPromptToDelete}
              setShowDeletePromptModal={setShowDeletePromptModal}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
