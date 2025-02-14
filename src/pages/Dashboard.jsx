import Sidebar from "../components/Sidebar";
import techImage from "../assets/image.jpg";

const Dashboard = ({ user, onLogout }) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Konten utama */}
            <main className="flex-1 p-6 md:ml-60">
                {/* Header Selamat Datang */}
                <h1 className="text-3xl font-bold text-blue-600">
                    Welcome, {user.name}!
                </h1>

                {/* Gambar & Penjelasan Website */}
                <div className="mt-6 flex flex-col md:flex-row items-center gap-6">
                    {/* Gambar */}
                    <div className="md:w-1/3 flex justify-center">
                        <img
                            src={techImage}
                            alt="Tech Image"
                            className="rounded-lg shadow-lg w-90 h-auto object-cover"
                        />
                    </div>

                    {/* Penjelasan Website */}
                    <div className="md:w-2/3 bg-white p-6 shadow-lg rounded-lg">
                        <h2 className="text-2xl font-semibold text-gray-800">Tentang Website</h2>
                        <p className="mt-2 text-gray-600">
                            Website ini adalah platform CRUD yang dibuat dengan React dan Tailwind.
                            Digunakan untuk mengelola data dengan mudah.
                        </p>

                        {/* Fitur Website */}
                        <h2 className="mt-4 text-2xl font-semibold text-gray-800">Fitur Website</h2>
                        <ul className="mt-2 text-gray-600 list-disc pl-5">
                            <li>CRUD (Create, Read, Update, Delete) data</li>
                            <li>Login dan Logout User</li>
                            <li>Pengelolaan Profil menggunakan Modal Form</li>
                            <li>Dark/Light Theme pada halaman CRUD</li>
                        </ul>
                    </div>
                </div>

                {/* Biodata Pembuat */}
                <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-800">Biodata Pembuat</h2>
                    <p className="mt-2 text-gray-600">👋 Nama: Sevyra Nanda</p>
                    <p className="mt-1 text-gray-600">💻 Developer: React & Tailwind</p>
                    <p className="mt-1 text-gray-600">📍 Lokasi: Indonesia</p>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
