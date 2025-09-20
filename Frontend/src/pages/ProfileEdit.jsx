import { useState, useContext, useEffect } from "react";
import { MyContext } from "../config/Context";
import api from "../axios/axios";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

export default function ProfileEdit() {
  const {user, setUser} = useContext(MyContext);
  const [form, setForm] = useState({
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    bio: "",
    avatar: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setForm({ ...form, avatar: URL.createObjectURL(files[0]) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.patch("/user/update", form);
    setUser(res.data.user);
    toast.success("Profile updated successfully");
    navigate("/profile");
  };

  useEffect(() => {
    setForm(
      {
        username: user.username,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
      }
    );
  }, [])


  return (
    <div className="bg-[#0A0A0A] flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#121212] rounded-xl shadow-lg p-6 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-green-400 text-center">
          Edit Profile
        </h2>

        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <img
              src={form.avatar || "https://via.placeholder.com/100"}
              alt="avatar preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-green-400"
            />
            <label className="absolute bottom-0 right-0 bg-green-500 text-xs text-white px-2 py-1 rounded cursor-pointer hover:bg-green-600 transition">
              Upload
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

  
        <div>
          <label className="block text-sm text-gray-300 mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Password</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPasswordpassword}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>


        <div>
          <label className="block text-sm text-gray-300 mb-1">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
        </div>

  
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-green-500 text-white font-semibold 
                     hover:bg-green-600 transition duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
