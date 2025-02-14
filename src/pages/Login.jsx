import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const Login = ({ onLogin }) => { // Ambil handleLogin dari props
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Panggil handleLogin dari App.js
    onLogin(username, password);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg w-11/12 sm:w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Input */}
          <div className="relative">
            <FiUser className="absolute left-4 top-3 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition outline-none"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FiLock className="absolute left-4 top-3 text-gray-400 text-lg" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-10 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
