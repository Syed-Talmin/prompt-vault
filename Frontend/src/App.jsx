import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import CreatePrompt from "./pages/CreatePrompt";
import BottomBar from "./components/BottomBar";
import Header from "./components/Header";
import { useContext, useEffect } from "react";
import { MyContext } from "./config/Context";
import AuthWrapper from "./components/AuthWrapper";
import SavedPrompts from "./pages/SavedPrompts";
import ProfilePage from "./pages/Profile";
import api from "./axios/axios";
import ProfileEdit from "./pages/ProfileEdit";
import EditPrompt from "./pages/EditPrompt";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { user, setUser } = useContext(MyContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function isValidToken() {
      try {
        const res = await api.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.userDetails);
      } catch (error) {
        localStorage.removeItem("token");
      }
    }

    isValidToken();
  }, []);
  return (
    <div className="w-full flex flex-col md:flex-row-reverse h-screen bg-[#0a0a0a]">
      <div className="w-full flex-1 overflow-y-scroll">
        {user && <Header />}
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/"
            element={
              <AuthWrapper>
                <Home />
              </AuthWrapper>
            }
          />
          <Route
            path="/create-prompt"
            element={
              <AuthWrapper>
                <CreatePrompt />
              </AuthWrapper>
            }
          />
          <Route
            path="/saved"
            element={
              <AuthWrapper>
                <SavedPrompts />
              </AuthWrapper>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthWrapper>
                <ProfilePage />
              </AuthWrapper>
            }
          />
          <Route
            path="/profile-edit"
            element={
              <AuthWrapper>
                <ProfileEdit />
              </AuthWrapper>
            }
          />
          <Route
            path="/edit-prompt/:id"
            element={
              <AuthWrapper>
                <EditPrompt />
              </AuthWrapper>
            }
          />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {user && <BottomBar />}
    </div>
  );
};

export default App;
