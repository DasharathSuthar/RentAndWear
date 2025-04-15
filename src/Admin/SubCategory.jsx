import { useState } from "react";

import heels from "../assets/img/high-heels.gif";
import shoe from "../assets/img/shoe.gif";
import men from "../assets/img/men.png";
import menIcon from "../assets/img/menIcon.png";
import women from "../assets/img/women.png";
import womenIcon from "../assets/img/womenIcon.jpg";

const initialData = [
  { id: 1, category: 1, name: "men's wedding wear", icon: men, status: "Active" },
  { id: 2, category: 2, name: "Women Wedding Wear", icon: women, status: "Active" },
  { id: 3, category: 1, name: "men's party wear", icon: menIcon, status: "Active" },
  { id: 4, category: 1, name: "men's Footwear wear", icon: shoe, status: "Active" },
  { id: 5, category: 2, name: "women party wear", icon: womenIcon, status: "Active" },
  { id: 6, category: 2, name: "women Footwear wear", icon: heels, status: "Active" },
];

export default function SubCategoryList() {
  const [subCategories, setSubCategories] = useState(initialData);
  const [formData, setFormData] = useState({ id: null, category: 1, name: "", icon: "", status: "Active" });
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = (id) => {
    setSubCategories(subCategories.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
  };

  const handleAdd = () => {
    setFormData({ id: null, category: 1, name: "", icon: "", status: "Active" });
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setSubCategories(
        subCategories.map((item) =>
          item.id === formData.id ? { ...formData } : item
        )
      );
    } else {
      setSubCategories([
        ...subCategories,
        { ...formData, id: Date.now(), icon: "🆕" },
      ]);
    }
    setFormData({ id: null, category: 1, name: "", icon: "", status: "Active" });
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-gray-100 h-auto">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Sub Category List</h2>

        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            placeholder="Enter subcategory name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="border p-2 rounded mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {isEditing ? "Update" : "Add"}
          </button>
        </form>

        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Sub Category</th>
              <th className="border p-2">Icon</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Edit</th>
              <th className="border p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {subCategories.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border p-2">{item.id}</td>
                <td className="border p-2">{item.category}</td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2 text-2xl">
                  <img src={item.icon} alt="icon" className="size-20" />
                </td>
                <td className="border p-2">{item.status}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}