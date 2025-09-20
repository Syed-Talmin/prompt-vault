import { MoveUp, Search } from "lucide-react";
import { useEffect, useState, useRef, useContext } from "react";
import api from "../axios/axios.js";
import PromptCard from "../components/PromptCard.jsx";
import Comments from "../components/Comments.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import Popup from "../components/Popup.jsx";
import { toast } from "react-toastify";

const PromptsHomePage = () => {
  const [prompts, setPrompts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("popularity");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [idForComments, setIdForComments] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showDeletePromptModal, setShowDeletePromptModal] = useState(false);
  const [promptToDelete, setPromptToDelete] = useState(null);

  const scrollRef = useRef(null);

  const handleSearchAndSort = () => {
    fetchPrompts();
  };

  const scrollToTop = () => {
    document.getElementById("scrollableDiv")?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  async function fetchPrompts(reset = false) {
    try {
      const res = await api.get(
        `community/prompts/?search=${searchQuery}&sort=${sortOption}&page=${reset ? 1 : page}`
      );

      if (reset) {
        setPrompts(res.data.data);
      } else {
        setPrompts((prev) => [...prev, ...res.data.data]);
      }

      if (res.data.data.length === 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      toast.error("Something went wrong when fetching prompts");
    }
  }
  useEffect(() => {
    setPage(1);
    setPrompts([]);
    setHasMore(true);
    fetchPrompts(true);
  }, [searchQuery, sortOption]);

  const handleDelete = async () => {
    setPrompts((prevPrompts) =>
      prevPrompts.filter((p) => p._id !== promptToDelete)
    );
    await api.delete(`prompt/delete/${promptToDelete}`);
    toast.success("Prompt deleted successfully");
    setShowDeletePromptModal(false);
  };

  return (
    <div className="bg-[#0A0A0A]  max-w-5xl mx-auto">
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

      <div className="flex w-full max-w-7xl mx-auto gap-5 flex-row md:items-center justify-between bg-[#0A0A0A] px-4 py-4 rounded-xl border mb-6">
        {/* Search Input */}
        <div className="flex-1 flex items-center justify-center w-full md:w-80 rounded-lg border border-gray-700 bg-[#121212] text-white focus:ring-2 focus:ring-green-400">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            placeholder="Search prompts..."
            className="focus:outline-none w-full px-4 py-2"
          />
          <button
            onClick={handleSearchAndSort}
            className="w-7 h-7 aspect-square items-center flex justify-center bg-green-500 hover:bg-green-400 transition-all duration-200 rounded-full"
          >
            <Search size={15} />
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="md:px-4 capitalize px-2 py-2 h-full text-xs rounded-lg border border-gray-700 bg-[#121212] text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="popularity">Popular</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div
        id="scrollableDiv"
        style={{ height: "69vh", overflow: "auto" }}
        className="max-w-7xl mx-auto px-4 [scrollbar-width:none] [-ms-overflow-style:none] 
            [&::-webkit-scrollbar]:hidden"
      >
        <InfiniteScroll
          ref={scrollRef}
          dataLength={prompts.length}
          next={fetchPrompts}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 scroll"
          scrollableTarget="scrollableDiv"
          endMessage={
            <p
              style={{ justifySelf: "center", alignSelf: "center" }}
              className="text-white grid place-content-center "
            >
              No more products
            </p>
          }
        >
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt._id}
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
        </InfiniteScroll>

        <button
          onClick={scrollToTop}
          className="fixed md:bottom-10 bottom-25 md:right-10 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-black font-medium hover:bg-green-400 transition-all duration-200 transform hover:scale-[1.02]"
        >
          <MoveUp />
        </button>
      </div>
    </div>
  );
};

export default PromptsHomePage;
