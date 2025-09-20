import { Rocket, Sparkles, Stars, Tags } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axios/axios.js";
import { toast } from "react-toastify";

const EditPrompt = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await api.get(`/prompt/get/${id}`);
        const data = res.data.prompt;
        setTitle(data.title || "");
        setContent(data.content || "");
        setTags(data.tags || "");
        setIsPublic(!!data.isPublic);
        setSelectedCategory(data.category || "");
        setCategories(Array.isArray(data.category) ? data.category : []);
      } catch (err) {
        toast.error("Failed to fetch prompt.");
      }
    };

    if (id) fetchPrompt();
  }, [id]);

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !tags || !categories.length) {
      toast.warn("Please fill all the fields.");
      return;
    }

    const formData = { title, content, tags, category:categories, isPublic };

    try {
      const res = await api.put(`/prompt/update/${id}`, formData); 
      toast.success("Prompt updated successfully");
      navigate("/")
    } catch (err) {
      toast.error("Failed to update prompt.");
    }
  };

  const handleTagGeneration = async () => {
    if (!content.trim()) return;
    try {
      const res = await api.get(`/ai/genrate-tag/?prompt=${content}`);
      setTags(res.data?.tags || "");
    } catch (error) {
     toast.error("Something went wrong when generating tags.");
    }
  };

  const handleContentImprove = async () => {
    if (!content.trim()) return;
    try {
      const res = await api.get(`/ai/improve-prompt/?prompt=${content}`);
      setContent(res.data?.improvedPrompt || content);
    } catch (error) {
      toast.error("Something went wrong when improving prompt.");
    }
  };


  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-[#121212] border border-gray-700 rounded-2xl shadow-xl md:p-10 p-4 md:space-y-5 space-y-2 text-gray-100"
      >
        
        <div className="text-center">
          <h1 className="md:text-3xl text-xl font-bold md:font-extrabold text-white tracking-tight">
            Edit Prompt
          </h1>
          <p className="text-gray-400 text-xs md:text-sm">Let&apos;s edit your prompt 🚀</p>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-lg font-semibold text-green-500">Title</h2>
          <input
            id="title"
            type="text"
            maxLength={25}
            placeholder="Enter title (max 25 chars)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0A0A0A] border border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none text-sm"
          />
        </div>

        {/* Content */}
        <div>
          <h2 className="text-lg font-semibold text-green-500">Content</h2>
          <textarea
            id="content"
            rows="6"
            placeholder="Write your prompt here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0A0A0A] border border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none text-sm resize-none"
          ></textarea>
        </div>

        {/* Tags */}
        <div>
          <h2 className="text-lg font-semibold text-green-500 flex items-center gap-2">
            Tags <Tags />
          </h2>
          <div className="flex gap-3 py-2 px-2 bg-[#0A0A0A] border-gray-700 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none text-sm">
            <input
              id="tags"
              type="text"
              placeholder="Enter tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="flex-1 px-2 outline-none"
            />
            <button
              type="button"
              onClick={handleTagGeneration}
              className="flex items-center gap-2 px-2 aspect-square bg-green-600 text-sm font-medium rounded-full hover:bg-green-700 active:scale-95 transition"
            >
              <Stars />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold text-green-500">Categories</h2>
          <div className="flex gap-3">
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-[#0A0A0A] border border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none text-sm"
            >
              <option value="">Select category</option>
              <option value="tech">Technology</option>
              <option value="life">Lifestyle</option>
              <option value="education">Education</option>
              <option value="news">News</option>
            </select>
            <button
              type="button"
              onClick={() => {
                if (selectedCategory && !categories.includes(selectedCategory)) {
                  setCategories([...categories, selectedCategory]);
                  setSelectedCategory("");
                }
              }}
              className="px-5 py-3 bg-green-600 text-sm font-medium rounded-lg hover:bg-green-700 active:scale-95 transition"
            >
              Add
            </button>
          </div>

          {/* Show selected categories */}
          <div className="flex flex-wrap gap-2 mt-2">
            {categories?.map((cat, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 text-sm bg-green-700 text-white rounded-full flex items-center gap-2"
              >
                {cat}
                <button
                  type="button"
                  onClick={() =>
                    setCategories(categories.filter((c) => c !== cat))
                  }
                  className="ml-1 text-xs text-red-300 hover:text-red-400"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Public/Private */}
        <div>
          <h2 className="text-lg font-semibold text-green-500">Visibility</h2>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsPublic(true)}
              className={`flex-1 px-5 py-3 rounded-lg border text-sm font-medium transition ${
                isPublic
                  ? "bg-green-600 border-green-500 text-white shadow-md"
                  : "bg-[#0A0A0A] border-gray-700 text-gray-300 hover:bg-[#121212]"
              }`}
            >
              🌍 Public
            </button>
            <button
              type="button"
              onClick={() => setIsPublic(false)}
              className={`flex-1 px-5 py-3 rounded-lg border text-sm font-medium transition ${
                !isPublic
                  ? "bg-red-600 border-red-500 text-white shadow-md"
                  : "bg-[#0A0A0A] border-gray-700 text-gray-300 hover:bg-[#121212]"
              }`}
            >
              🔒 Private
            </button>
          </div>
        </div>

        {/* AI Improve */}
        <button
          type="button"
          onClick={handleContentImprove}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 border border-green-600 hover:bg-green-500 text-sm font-medium rounded-lg active:scale-95 transition"
        >
          <Sparkles size={18} /> Improve Content with AI
        </button>

        {/* Submit */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-green-600 text-sm font-medium rounded-lg hover:bg-green-700 active:scale-95 transition"
        >
          <Rocket /> Update Prompt
        </button>
      </form>
    </div>
  );
};

export default EditPrompt;
