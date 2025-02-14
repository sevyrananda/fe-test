import { useState } from "react";

// eslint-disable-next-line react/prop-types
const EditProfile = ({ user, onUpdate }) => {
  // eslint-disable-next-line react/prop-types
  const [name, setName] = useState(user.name || "Admin");

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify({ ...user, name }));
    onUpdate(name);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Edit Profile</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border mt-2"
      />
      <button onClick={handleSave} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Save
      </button>
    </div>
  );
};

export default EditProfile;
