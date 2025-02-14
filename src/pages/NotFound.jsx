import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <button onClick={() => navigate("/")} className="mt-4 bg-blue-500 text-white p-2 rounded">Kembali ke Dashboard</button>
    </div>
  );
};

export default NotFound;
