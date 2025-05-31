import { useState, useEffect } from "react";
import axios from "axios";
// import img from '../../'
export default function SubCategoryList() {
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    category: "",
    name: "",
    icon: "",
    status: "Active",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchSubCategories();
    fetchCategories();
  }, []);

  const fetchSubCategories = async () => {
    const res = await axios.get("http://localhost:8080/subcategories");
    setSubCategories(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:8080/categories");
    setCategories(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/subcategories/${id}`);
    setSubCategories(subCategories.filter((item) => item._id !== id));
  };

  const handleEdit = (item) => {
    setFormData({
      id: item._id,
      category: item.category._id,
      name: item.name,
      icon: item.icon,
      status: item.status,
    });
    setIsEditing(true);
  };

  const handleAdd = () => {
    setFormData({
      id: null,
      category: "",
      name: "",
      icon: "",
      status: "Active",
    });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const res = await axios.put(`http://localhost:8080/subcategories/${formData.id}`, formData);
      setSubCategories(
        subCategories.map((item) => (item._id === res.data._id ? res.data : item))
      );
    } else {
      const res = await axios.post("http://localhost:8080/subcategories", formData);
      setSubCategories([...subCategories, res.data]);
    }
    handleAdd();
  };

  return (
    <div className="p-6 bg-gray-100 h-screen overflow-auto">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Sub Category List</h2>

        <form onSubmit={handleSubmit} className="mb-4 flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Enter subcategory name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required  
            className="border p-2 rounded flex-1 min-w-[200px]"
          />

          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="border p-2 rounded flex-1 min-w-[200px]"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="/assets/img/men.png"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="border p-2 rounded flex-1 min-w-[200px]"
          />

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {isEditing ? "Update" : "Add"}
          </button>
        </form>

        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Sub Category</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Icon</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Edit</th>
              <th className="border p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {subCategories.map((item, index) => (
              <tr key={index} className="text-center capitalize">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.category?.name}</td>
                <td className="border p-2">
                  {item.icon ? (
                    <img
                      src={item.icon.startsWith("http") ? item.icon : `${item.icon}`}
                      alt="icon"
                      className="w-20 h-20 object-contain mx-auto"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No Icon</span>
                  )}
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
                    onClick={() => handleDelete(item._id)}
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
