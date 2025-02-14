import { useState, useEffect } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorageHelper";
import { FiTrash, FiPlus, FiEdit, FiSearch, FiCheck, FiSun, FiMoon, FiXCircle, FiAlertTriangle } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { getDefaultTheme, applyTheme } from "../utils/themeHelper";
import Sidebar from "../components/Sidebar";


const Crud = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(getFromLocalStorage("data", ["Agus", "Budi", "Citra"]));
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);

  const [newName, setNewName] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [showAddModal, setShowAddModal] = useState(false);
  const toggleAddModal = () => setShowAddModal(!showAddModal);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const itemsPerPage = 5;

  const [theme, setTheme] = useState(() => {
    return getFromLocalStorage("theme") || getDefaultTheme();
  });


  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (currentPage > 1) params.page = currentPage;
    setSearchParams(params);
  }, [search, currentPage, setSearchParams]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(newTheme);
    saveToLocalStorage("theme", newTheme);
  };


  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const tambah = () => {
    if (!newName.trim()) return;
    const newData = [...data, newName.trim()];
    setData(newData);
    saveToLocalStorage("data", newData);
    setNewName("");
    showToast("Berhasil menambah data!", "success"); // Tambahkan toast sukses
  };

  const konfirmasiHapus = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000); // Notifikasi hilang setelah 3 detik
  };

  const hapus = () => {
    if (deleteIndex === null) return;
    const newData = data.filter((_, i) => i !== deleteIndex);
    setData(newData);
    saveToLocalStorage("data", newData);
    setShowDeleteModal(false);
    showToast("Berhasil menghapus data!", "success");
  };


  const mulaiEdit = (index) => {
    setEditIndex(index);
    setEditValue(data[index]);
  };

  const simpanEdit = (index) => {
    if (!editValue.trim()) return;
    const newData = [...data];
    newData[index] = editValue.trim();
    setData(newData);
    saveToLocalStorage("data", newData);
    setEditIndex(null);
    showToast("Berhasil mengedit data!", "success"); // Tambahkan toast sukses
  };

  return (
    <div className={`flex-1 min-h-screen ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      {/* Sidebar */}
      <Sidebar />
      
     
      <div className="flex-1 p-6 ml-0 md:ml-60">
        {toast.show && (
          <div className={`fixed bottom-20 right-5 px-4 py-2 rounded-lg shadow-lg text-white transition-transform duration-300 ${toast.type === "success" ? "bg-green-600" : "bg-red-600"} ${toast.show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            {toast.message}
          </div>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`fixed bottom-6 right-6 bg-gray-100  ${theme === "dark" ? "bg-gray-700 text-white" : "text-gray-900"} 
              p-3 rounded-full shadow-xl flex items-center gap-2 transition-all duration-300 hover:scale-110`}
        >
          {theme === "light" ? <FiSun /> : theme === "dark" ? <FiMoon /> : <FiSun className="text-yellow-500" />}
          {theme === "light" ? "Light" : theme === "dark" ? "Dark" : "System"}
        </button>

        <h1 className="text-3xl font-bold text-blue-600 mb-6">
                    Tabel Data Nama
                </h1>
        <div className="flex items-center justify-between mb-6">
          {/* Search Input */}
          <div className="relative w-1/3">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 text-lg" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama..."
              className={`border p-3 w-full rounded-lg pl-10 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                }`}
            />
          </div>
          {/* Button Tambah */}
          <button
            onClick={toggleAddModal}
            className="bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <FiPlus /> Tambah
          </button>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div
              className={`p-6 rounded-lg shadow-lg w-full max-w-md ${theme === "dark"
                ? "bg-gray-900 text-white border-gray-700"
                : "bg-white text-gray-900"
                }`}
            >
              <h2 className="text-lg font-bold mb-4">Tambah Nama</h2>

              {/* Input Nama */}
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className={`border p-2 w-full rounded-lg mb-2 ${theme === "dark"
                  ? "bg-gray-800 text-white border-gray-700"
                  : "bg-white text-gray-900"
                  }`}
                placeholder="Masukkan nama"
                required
              />

              {/* Pesan Validasi */}
              {newName.trim() === "" && (
                <p className="text-red-500 text-sm mb-3">Nama Wajib diisi!</p>
              )}

              {/* Tombol Aksi */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={toggleAddModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    if (newName.trim() !== "") {
                      tambah();
                      toggleAddModal();
                    }
                  }}
                  className={`px-4 py-2 rounded-lg ${newName.trim() === ""
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  disabled={newName.trim() === ""}
                >
                  Tambah
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className={`overflow-hidden rounded-lg shadow-lg border ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white text-left whitespace-nowrap">
                  <th className="p-4">#</th>
                  <th className="p-4">Nama</th>
                  <th className="p-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b hover:bg-gray-100 ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
                    >
                      {/* Kolom Nomor */}
                      <td className="p-4">{index + 1}</td>

                      {/* Kolom Nama */}
                      <td className="p-4">
                        {editIndex === index ? (
                          <input
                            className={`border p-2 rounded-lg w-full ${theme === "dark" ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
                              }`}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                          />
                        ) : (
                          item
                        )}
                      </td>

                      {/* Kolom Aksi */}
                      <td className="p-4 flex gap-2 whitespace-nowrap">
                        {editIndex === index ? (
                          <button
                            onClick={() => simpanEdit(index)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
                          >
                            <FiCheck /> Simpan
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => mulaiEdit(index)}
                              className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-600"
                            >
                              <FiEdit /> Edit
                            </button>
                            <button
                              onClick={() => konfirmasiHapus(index)}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600"
                            >
                              <FiTrash /> Hapus
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center p-4 text-gray-500">
                      Tidak ada data tersedia.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>


        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded bg-gray-200 
      ${theme === "dark" ? "bg-gray-700 text-white" : ""} disabled:opacity-50`}
          >
            Prev
          </button>
          <span className="px-4 py-2">{currentPage} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded bg-gray-200 
      ${theme === "dark" ? "bg-gray-700 text-white" : ""} disabled:opacity-50`}
          >
            Next
          </button>
        </div>

        {/* Modal Konfirmasi Hapus */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className={`p-6 rounded-lg shadow-lg w-85
      ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>

              {/* Judul & Ikon Peringatan */}
              <div className="flex justify-center mb-5">
                <FiAlertTriangle className="text-red-500 text-8xl" />
              </div>
              <p className="text-2xl text-center ">Konfirmasi Penghapusan</p>

              <p className={`mt-3 text-sm leading-relaxed text-center ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}>
                Anda yakin ingin menghapus item ini? Tindakan ini tidak dapat dibatalkan.
              </p>

              <div className="flex gap-2 mt-4 justify-end">
                <button
                  onClick={hapus}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600">
                  <FiTrash className="text-lg" /> Ya, Hapus
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-600">
                  <FiXCircle className="text-lg" /> Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
     
    </div>
  );
};

export default Crud;
