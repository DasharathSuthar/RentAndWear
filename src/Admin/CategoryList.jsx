import { useState } from "react";
import { PencilIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/solid";

import manAvatar from "../assets/img/men-avatar.gif"
import femaleAvatar from "../assets/img/female.gif"

const CategoryList = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Male wear", icon: manAvatar, status: "Active" },
    { id: 2, name: "Female wear", icon: femaleAvatar, status: "Active" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ id: "", name: "", icon: "", status: "Active" });

  const openModal = (category = null) => {
    setEditingCategory(category);
    setNewCategory(category || { id: "", name: "", icon: "", status: "Active" });
    setIsModalOpen(true);
  };

  const closeModal = () => {  
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const saveCategory = () => {
    if (editingCategory) {
      setCategories(categories.map(cat => (cat.id === editingCategory.id ? newCategory : cat)));
    } else {
      setNewCategory({ ...newCategory, id: categories.length + 1 });
      setCategories([...categories, { ...newCategory, id: categories.length + 1 }]);
    }
    closeModal();
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 h-screen">
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
            {categories.map((category) => (
              <tr key={category.id} className="border-t text-center">
                <td className="p-2">{category.id}</td>
                <td className="p-2">{category.name}</td>
                <td className="p-2 text-2xl"><img src={category.icon} alt="icon" className="size-20" /></td>
                <td className="p-2 text-green-500">{category.status}</td>
                <td className="p-2">
                  <button onClick={() => openModal(category)} className="p-2 bg-blue-500 text-white rounded">
                    <PencilIcon className="w-5 h-5" />
                  </button>
                </td>
                <td className="p-2">
                  <button onClick={() => deleteCategory(category.id)} className="p-2 bg-red-500 text-white rounded">
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
              <input type="text" name="icon" placeholder="Icon (Emoji)" value={newCategory.icon} onChange={handleChange} className="w-full p-2 border rounded" />
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
