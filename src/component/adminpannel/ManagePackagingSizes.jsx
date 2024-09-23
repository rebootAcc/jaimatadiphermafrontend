import React, { useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const ManagePackagingSize = ({ packagingSizes, fetchPackagingSizes }) => {
  const [loading, setLoading] = useState(false);
  const [editingPackagingSize, setEditingPackagingSize] = useState(null);
  const [editedPackagingSizeName, setEditedPackagingSizeName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [packagingSizeToDelete, setPackagingSizeToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const packagingSizesPerPage = 10;

  // Calculate the current packaging sizes to display
  const indexOfLastPackagingSize = currentPage * packagingSizesPerPage;
  const indexOfFirstPackagingSize =
    indexOfLastPackagingSize - packagingSizesPerPage;
  const currentPackagingSizes = packagingSizes.slice(
    indexOfFirstPackagingSize,
    indexOfLastPackagingSize
  );

  const totalPages = Math.ceil(packagingSizes.length / packagingSizesPerPage);

  const handleEditClick = (packagingSize) => {
    setEditingPackagingSize(packagingSize);
    setEditedPackagingSizeName(packagingSize.packagingsizeName);
  };

  const handleSaveClick = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/packagingsize/update/${
          editingPackagingSize.packagingsizeId
        }`,
        {
          packagingsizeName: editedPackagingSizeName,
        }
      );

      if (response.status === 200) {
        fetchPackagingSizes(); // Refresh packaging sizes list
        setEditingPackagingSize(null);
        setEditedPackagingSizeName("");
      }
    } catch (error) {
      console.error("Error updating packaging size:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    setEditingPackagingSize(null);
    setEditedPackagingSizeName("");
  };

  const handleDeleteClick = (packagingSize) => {
    setPackagingSizeToDelete(packagingSize);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!packagingSizeToDelete) return;

    setLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/packagingsize/delete/${
          packagingSizeToDelete.packagingsizeId
        }`
      );
      if (response.status === 200) {
        fetchPackagingSizes(); // Refresh packaging sizes list after deletion
        setShowModal(false);
        setPackagingSizeToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting packaging size:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setPackagingSizeToDelete(null);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-1 mx-1 text-lg font-medium bg-gray-200 rounded ${
            i === currentPage ? "bg-blue-500 text-white" : ""
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="lg:w-[90%] sm:w-full">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row p-4 gap-4 font-medium text-base bg-[#2AAA8A] text-white w-full border-b">
            <div className="w-[40%]">Packaging Size Name</div>
            <div className="w-[20%]">Actions</div>
          </div>
          <div className="flex flex-col h-[50vh] no-scrollbar overflow-auto">
            {currentPackagingSizes.map((packagingSize) => (
              <div
                className="flex flex-row p-4 border-b border-[#BBBBBB] gap-4 font-medium text-base w-full"
                key={packagingSize.packagingsizeId}
              >
                {editingPackagingSize &&
                editingPackagingSize.packagingsizeId ===
                  packagingSize.packagingsizeId ? (
                  <>
                    <div className="w-[40%]">
                      <input
                        type="text"
                        value={editedPackagingSizeName}
                        onChange={(e) =>
                          setEditedPackagingSizeName(e.target.value)
                        }
                        className="w-full h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[white] border text-[#FF2722] rounded-sm"
                      />
                    </div>
                    <div className="flex flex-row items-center w-[20%] font-semibold gap-5">
                      <button
                        className="text-[#5BC0DE]"
                        disabled={loading}
                        onClick={handleSaveClick}
                      >
                        {loading ? "Saving..." : <FaCheck />}
                      </button>
                      <button
                        className="text-[#D53F3A]"
                        onClick={handleCancelClick}
                      >
                        <RxCross2 />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-sm font-semibold w-[40%]">
                      {packagingSize.packagingsizeName}
                    </div>
                    <div className="flex flex-row w-[20%] items-center font-semibold gap-5">
                      <button
                        className="text-[#5BC0DE]"
                        onClick={() => handleEditClick(packagingSize)}
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="text-[#D53F3A]"
                        onClick={() => handleDeleteClick(packagingSize)}
                      >
                        <RiDeleteBin5Line />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={`px-3 py-1 mx-1 rounded text-lg font-medium ${
            currentPage === 1 ? "text-gray-500" : "text-black"
          }`}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {renderPageNumbers()}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className={`px-3 py-1 mx-1 rounded text-lg font-medium ${
            currentPage === totalPages ? "text-gray-500" : "text-black"
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this packaging size?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={closeDeleteModal}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={confirmDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePackagingSize;