import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { removeFromLocalStorage, getFromLocalStorage, saveToLocalStorage } from "../utils/localStorageHelper";
import { FaUserCircle, FaSignOutAlt, FaEdit, FaTimes } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const Navbar = ({ toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("Guest");
  const [tempName, setTempName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = getFromLocalStorage("user");
    if (userData && userData.name) {
      setName(userData.name);
    }
  }, []);

  const handleLogout = () => {
    removeFromLocalStorage("user");
    navigate("/login");
    window.location.reload();
  };

  const handleSave = () => {
    const updatedUser = { username: "user123", name: tempName };
    saveToLocalStorage("user", updatedUser);
    setName(tempName);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center relative z-50">
        {/* Tombol Hamburger di Navbar (Mobile Only) */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-700 hover:text-blue-600 transition"
        >
          
        </button>

        <h1 className="text-2xl font-bold text-blue-600">CrUD.</h1>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
          >
            <FaUserCircle className="text-2xl" />
            <span className="font-medium">{name}</span>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md">
              <button
                onClick={() => {
                  setTempName(name);
                  setIsModalOpen(true);
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                <FaEdit /> <span>Edit Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 w-full px-4 py-2 text-red-500 hover:bg-gray-100 transition"
              >
                <FaSignOutAlt /> <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full relative">
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl font-bold">Edit Profile</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800">
                  <FaTimes />
                </button>
              </div>
              <div className="mt-4">
                <label className="block font-medium mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full border p-2 rounded-md mb-4"
                />
                <button
                  onClick={handleSave}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Navbar;
