import { useContext, useEffect, useState } from "react";
import { MyContext } from "../config/Context";
import api from "../axios/axios.js";
import { Ellipsis } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const PromptCard = ({
  prompt,
  setPrompts,
  setShowComments,
  setIdForComments,
  activeMenu,
  setActiveMenu,
  setPromptForDeletion,
  setShowDeletePromptModal,
}) => {
  const { user, setUser } = useContext(MyContext);
  const menuRef = useRef(null);
  const [showFull, setShowFull] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLike = async (promptId) => {
    setPrompts((prevPrompts) =>
      prevPrompts.map((prompt) => {
        if (prompt._id === promptId) {
          const alreadyLiked = prompt.likes.includes(user._id);
          return {
            ...prompt,
            likes: alreadyLiked
              ? prompt.likes.filter((id) => id !== user._id)
              : [...prompt.likes, user._id],
          };
        }
        return prompt;
      })
    );

    try {
      await api.post(`community/prompts/${promptId}/like`);
    } catch (error) {
      // Agar error aaya toh rollback kar do
      setPrompts((prevPrompts) =>
        prevPrompts.map((prompt) => {
          if (prompt._id === promptId) {
            const alreadyLiked = prompt.likes.includes(user._id);
            return {
              ...prompt,
              likes: alreadyLiked
                ? prompt.likes.filter((id) => id !== user._id)
                : [...prompt.likes, user._id],
            };
          }
          return prompt;
        })
      );

      toast.error("Something went wrong when liking prompt");
    }
  };

  const handleSave = async (promptId) => {
    setUser((prevUser) => ({
      ...prevUser,
      savedPrompts: prevUser.savedPrompts.includes(promptId)
        ? prevUser.savedPrompts.filter((id) => id !== promptId)
        : [...prevUser.savedPrompts, promptId],
    }));

    try {
      await api.post(`community/prompts/${promptId}/save`);
    } catch (error) {
      setUser((prevUser) => ({
        ...prevUser,
        savedPrompts: prevUser.savedPrompts.includes(promptId)
          ? prevUser.savedPrompts.filter((id) => id !== promptId)
          : [...prevUser.savedPrompts, promptId],
      }));
      toast.error("Something went wrong when saving prompt");
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Writing: "bg-purple-900/30 text-purple-300 border-purple-700",
      Creative: "bg-pink-900/30 text-pink-300 border-pink-700",
      Development: "bg-blue-900/30 text-blue-300 border-blue-700",
      Programming: "bg-indigo-900/30 text-indigo-300 border-indigo-700",
      Business: "bg-green-900/30 text-green-300 border-green-700",
      Strategy: "bg-emerald-900/30 text-emerald-300 border-emerald-700",
      Analytics: "bg-orange-900/30 text-orange-300 border-orange-700",
      "Data Science": "bg-red-900/30 text-red-300 border-red-700",
      Education: "bg-yellow-900/30 text-yellow-300 border-yellow-700",
      Languages: "bg-teal-900/30 text-teal-300 border-teal-700",
      Design: "bg-violet-900/30 text-violet-300 border-violet-700",
      "User Experience": "bg-cyan-900/30 text-cyan-300 border-cyan-700",
    };
    return colors[category] || "bg-gray-700/30 text-gray-300 border-gray-600";
  };

  const getTimeInAgo = (time) => {
    const seconds = Math.floor((Date.now() - new Date(time)) / 1000);

    const intervals = [
      { label: "day", secs: 86400 },
      { label: "hour", secs: 3600 },
      { label: "minute", secs: 60 },
      { label: "second", secs: 1 },
    ];

    for (const { label, secs } of intervals) {
      const value = Math.floor(seconds / secs);
      if (value >= 1) {
        return `${value} ${label}${value > 1 ? "s" : ""} ago`;
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (activeMenu === prompt._id) {
      const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
          setActiveMenu(null);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);

      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [activeMenu, prompt._id, setActiveMenu]);

  return (
    <div
      key={prompt._id}
      className="bg-[#121212] rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg hover:shadow-black/20 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-200">
            {prompt.title}
          </h3>
          <p className="text-sm text-gray-400">
            by <span className="text-green-500">{prompt.owner?.username}</span>{" "}
            • {getTimeInAgo(prompt.createdAt)}
          </p>
        </div>
        {user?._id === prompt.owner?._id && (
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setActiveMenu(prompt._id)}
              className="text-white"
            >
              <Ellipsis />
            </button>
            {prompt._id === activeMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-gray-700 text-white z-10 rounded-md shadow-lg">
                <ul>
                  <li
                    className="px-4 py-2 active:bg-gray-600 cursor-pointer"
                    onClick={() => {
                      setShowDeletePromptModal(true);
                      setPromptForDeletion(prompt._id);
                    }}
                  >
                    Delete
                  </li>
                  <Link
                    to={`/edit-prompt/${prompt._id}`}
                    className="px-4 block py-2 active:bg-gray-600 cursor-pointer"
                    onClick={() => handleEdit(prompt._id)}
                  >
                    Edit
                  </Link>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mb-4">
        <p className="text-gray-300 text-sm leading-relaxed">
          {showFull ? prompt.content : prompt.content.slice(0, 100)}
          {prompt.content.length > 100 && !showFull && "..."}
        </p>
        <div className="flex items-center justify-between">
          {prompt.content.length > 100 && (
            <button
              onClick={() => setShowFull(!showFull)}
              className="text-xs text-blue-400 hover:underline mt-1"
            >
              {showFull ? "Show Less" : "Show More"}
            </button>
          )}

          <button
            onClick={handleCopy}
            className="text-xs ml-auto text-gray-400 hover:text-green-400 flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 
           2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {prompt.category.map((cat, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
              cat
            )}`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {prompt.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-700 text-gray-300 rounded-md text-xs hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <div className="flex items-center gap-4">
          {/* Like */}
          <button
            onClick={() => handleLike(prompt._id)}
            className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors duration-200 group/like"
          >
            <svg
              className={`w-5 h-5 transition-all duration-200 ${
                prompt.likes.includes(user._id)
                  ? "text-red-500 fill-current"
                  : "group-hover/like:scale-110"
              }`}
              fill={prompt.likes.includes(user._id) ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-sm font-medium">{prompt.likes.length}</span>
          </button>

          {/* Comments */}
          <button
            onClick={() => {
              setShowComments((prev) => !prev);
              setIdForComments(prompt._id);
            }}
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 group/comment"
          >
            <svg
              className="w-5 h-5 group-hover/comment:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-sm font-medium">{prompt.comments}</span>
          </button>
        </div>

        {/* Save */}
        <button
          onClick={() => handleSave(prompt._id)}
          className={`p-2 rounded-lg transition-all duration-200 ${
            user.savedPrompts.includes(prompt._id)
              ? "text-green-500 bg-green-500/10"
              : "text-gray-400 hover:text-green-500 hover:bg-green-500/10"
          }`}
        >
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${
              user.savedPrompts.includes(prompt._id)
                ? "fill-current"
                : "hover:scale-110"
            }`}
            fill={
              user.savedPrompts.includes(prompt._id) ? "currentColor" : "none"
            }
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PromptCard;
