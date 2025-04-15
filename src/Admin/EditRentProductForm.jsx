import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditRentProductForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const { productData, DBpath, path } = location.state;

    // Setup local state for the form
    const [formData, setFormData] = useState({ ...productData });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Submit updated product
    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8080/${DBpath}/${formData._id}`, formData);
            alert("Product updated successfully!");
            navigate(`/admin/${path}`);
        } catch (err) {
            console.error(err);
            alert("Failed to update product");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
                <div className="space-y-3">
                    <input
                        type="text"
                        name="title"
                        placeholder="Product Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="subcategory"
                        placeholder="Subcategory"
                        value={formData.subcategory}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="size"
                        placeholder="Size"
                        value={formData.size}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Save</button>
                </div>
            </div>
        </div>
    );
}

export default EditRentProductForm;
