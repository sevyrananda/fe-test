import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Crud from "./pages/Crud";
import Login from "./pages/Login";
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const handleLogin = (username, password) => {
    if (username === "user" && password === "123") {
      const userData = { username, name: "User" };
      setUser(userData);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser); // Perbarui state user di App.js
  };

  return (
    <Router>
      {user && <Navbar user={user} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />}
      <Routes>
        <Route path="/" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/crud" element={user ? <Crud /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
        <Route path="/edit-profile" element={user ? <EditProfile user={user} onUpdate={handleUpdateUser} /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
