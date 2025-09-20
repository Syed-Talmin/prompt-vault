import { useState } from "react";
import api from '../axios/axios.js'
import { useContext } from "react";
import { MyContext } from "../config/Context.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AuthPage = () => {

  const navigate = useNavigate()
 const {user, setUser} = useContext(MyContext)

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email:"",
    password:""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const res = await api.post('user/login',{
          email: formData.email,
          password: formData.password
        })
        if (res.status === 200) {
          setUser(res.data.user)
          localStorage.setItem('token', res.data.token)
          navigate('/')
        }
        toast.success(res.data.message)
      } catch (error) {
        toast.error('Something went wrong when logging in')
      }
    }else{
      try {
        const res = await api.post('user/register',{
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
        if (res.status === 201) {
          setUser(res.data.user)
          localStorage.setItem('token', res.data.token)
          navigate('/')
        }
        toast.success(res.data.message)
      } catch (error) {
        toast.error('Something went wrong when registering')
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center p-4">
      <div className="w-full max-w-7xl mx-auto flex items-center gap-3">
            <div>
              <h1 className="md:text-3xl text-lg font-bold text-white italic md:leading-7 leading-5">PROMPT <br /> <span className='text-green-400 '>VAULT</span></h1>
            </div>
      </div>
      <div className="w-full mt-10 max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{isLogin ? "Welcome Back" : "Create an Account"}</h1>
          <p className="text-gray-400">{isLogin ? "Login to your account" : "Join us today and get started"}</p>
        </div>

        <div className="bg-[#0A0A0A] rounded-2xl p-8 shadow-2xl border border-gray-800">
          <div className="space-y-6">
            {/* Username Field */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e)=>{setFormData({...formData,username:e.target.value})}}
                  name="username"
                  className="w-full px-4 py-3 bg-[#121212] border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your username"
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2"
              >
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e)=>{setFormData({...formData,email:e.target.value})}}
                name="email"
                className="w-full px-4 py-3 bg-[#121212] border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-2"
              >
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => {setFormData({...formData,password:e.target.value})}}
                name="password"
                className="w-full px-4 py-3 bg-[#121212] border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              type="button"
              className="w-full bg-green-500 text-black font-semibold py-3 px-4 rounded-xl hover:bg-green-400 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/25"
            >
              {isLogin ? "Log In" : "Create Account"}
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              {isLogin ? "Don't have an account?  " : "Already have an account?  "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-green-500 hover:text-green-400 font-medium transition-colors duration-200">
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            By creating an account, you agree to our{" "}
            <button className="text-green-500 hover:text-green-400 transition-colors duration-200">
              Terms of Service
            </button>{" "}
            and{" "}
            <button className="text-green-500 hover:text-green-400 transition-colors duration-200">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
