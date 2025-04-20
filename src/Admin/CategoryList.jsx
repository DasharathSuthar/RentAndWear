import { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/solid";
import axios from "axios";

const CategoryList = () => {
  const URL ="http://localhost:8080/categories"

  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: "", icon: "", status: "Active" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(URL);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const openModal = (category = null) => {
    setEditingCategory(category);
    setNewCategory(category || { name: "", icon: "", status: "Active" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const saveCategory = async () => {
    try {
      if (editingCategory) {
        const response = await axios.put(`${URL}/${editingCategory._id}`, newCategory);
        setCategories(categories.map(cat => cat._id === editingCategory._id ? response.data : cat));
      } else {
        const response = await axios.post(`${URL}`, newCategory);
        setCategories([...categories, response.data]);
      }
      closeModal();
    } catch (error) {
      console.error("Failed to save category:", error);
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        setCategories(categories.filter(cat => cat._id !== id));
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Category List</h1>
        <button onClick={() => openModal()} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
          <PlusCircleIcon className="w-5 h-5 mr-2" /> Add
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Category</th>
              <th className="p-2">Icon</th>
              <th className="p-2">Status</th>
              <th className="p-2">Edit</th>
              <th className="p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category,index) => (
              <tr key={index} className="border-t text-left">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{category.name}</td>
                <td className="p-2 text-2xl"><img src={category.icon} alt="icon" className="size-20" /></td>
                <td className="p-2 text-green-500">{category.status}</td>
                <td className="p-2">
                  <button onClick={() => openModal(category)} className="p-2 bg-blue-500 text-white rounded">
                    <PencilIcon className="w-5 h-5" />
                  </button>
                </td>
                <td className="p-2">
                  <button onClick={() => deleteCategory(category._id)} className="p-2 bg-red-500 text-white rounded">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">{editingCategory ? "Edit Category" : "Add Category"}</h2>
            <div className="space-y-2">
              <input type="text" name="name" placeholder="Category Name" value={newCategory.name} onChange={handleChange} className="w-full p-2 border rounded" />
              <input type="text" name="icon" placeholder="Image URL" value={newCategory.icon} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Cancel</button>
              <button onClick={saveCategory} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
