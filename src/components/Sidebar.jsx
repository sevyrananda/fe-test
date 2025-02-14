import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaTachometerAlt, FaDatabase } from "react-icons/fa";

const Sidebar = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Button untuk membuka sidebar di mobile (di luar sidebar) */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-3 text-white bg-blue-600 fixed top-1 left-4 z-50 rounded-lg md:hidden"
                >
                    <FaBars size={24} />
                </button>
            )}

            {/* Overlay untuk mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transform ${isOpen ? "translate-x-0" : "-translate-x-64"
                    } md:translate-x-0 md:w-60 transition-transform duration-300 ease-in-out z-50`}
            >
                {/* Header Sidebar */}
                <div className="flex items-center justify-between p-5 text-lg font-bold border-b border-gray-600">
                    <span></span>
                    {/* Tombol X (Close) di dalam sidebar, hanya di mobile */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="md:hidden text-white"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Menu Navigasi */}
                <nav className="mt-4">
                    <ul>
                        <li className="p-4 flex items-center gap-2 hover:bg-gray-700">
                            <FaTachometerAlt />
                            <Link to="/" onClick={() => setIsOpen(false)}>Dashboard</Link>
                        </li>
                        <li className="p-4 flex items-center gap-2 hover:bg-gray-700">
                            <FaDatabase />
                            <Link to="/crud" onClick={() => setIsOpen(false)}>CRUD</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
