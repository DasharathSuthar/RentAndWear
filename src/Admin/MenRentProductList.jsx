import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MenRentProductList = () => {
  const URL = "http://localhost:8080/MaleWear/";
  const navigate = useNavigate();
  const [maleData, setMaleData] = useState([]);

  // Fetch data for male wear products
  async function MaleWearData() {
    await axios
      .get(URL)
      .then((response) => {
        if (response.status === 200) {
          var data = response.data.List;
          setMaleData(data);
         
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    MaleWearData();
  }, []);

  // Handle Edit
  async function handleEdit(Id) {
    await axios
      .get(URL + `${Id}`)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.ByIdData;
          navigate("/admin/editProductForm", { state: { productData: data, DBpath: "MaleWear", path: "menrentproduct" } });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Handle Delete
  async function handleDelete(Id) {
    await axios
      .delete(URL + `${Id}`)
      .then((response) => {
        if (response.status === 200) {
          alert("Product deleted successfully!");
          MaleWearData(); // Refresh the product list after deletion
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to delete product.");
      });
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Men Rent Product List</h1>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white text-left">
              <th className="p-2">No.</th>
              <th className="p-2">Product</th>
              <th className="p-2">Category</th>
              <th className="p-2">Subcategory</th>
              <th className="p-2">Size</th>
              <th className="p-2">Price</th>
              <th className="p-2">Description</th>
              <th className="p-2">Image</th>
              <th className="p-2">Edit</th>
              <th className="p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {maleData.map((product, index) => (
              <tr key={index} className="border-t text-center">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{product.title}</td>
                <td className="p-2">{product.category}</td>
                <td className="p-2">{product.subcategory}</td>
                {/* Display Sizes */}
                <td className="p-2">
                  {/* Assuming size is an array or single value */}
                  {Array.isArray(product.sizes) 
                    ? product.sizes.join(', ') // If it's an array
                    : product.sizes // If it's a single value
                  }
                </td>
                <td className="p-2">₹{product.price}</td>
                <td className="p-2">{product.description}</td>
                <td className="p-2">
                  <img src={product.image} alt={product.title} className="w-10 h-10 rounded" />
                </td>
                <td className="p-2">
                  <input
                    type="button"
                    value={"Edit"}
                    onClick={() => handleEdit(product._id)}
                    className="py-2 px-3 cursor-pointer bg-blue-500 text-white hover:bg-blue-700 border border-blue-600 rounded-md"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="button"
                    value={"Delete"}
                    onClick={() => handleDelete(product._id)}
                    className="py-2 px-3 cursor-pointer bg-red-500 text-white hover:bg-red-700 border border-red-600 rounded-md"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenRentProductList;
