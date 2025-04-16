import { useState, useEffect } from "react";
import axios from "axios";
import { HomeIcon, ClipboardListIcon, ShoppingBagIcon, CogIcon, AdjustmentsIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    // Fetch Bookings from /Checkout/
    axios.get("http://localhost:8080/Checkout/")
      .then(response => {
        const bookings = response.data.Order;
        setTotalBookings(bookings.length);
        setPendingBookings(bookings.filter(order => order.status === "Pending").length);
      })
      .catch(err => console.error("Error fetching bookings: ", err));

    // Fetch MaleWear products
    axios.get("http://localhost:8080/MaleWear/")
      .then(response => {
        const maleWearCount = response.data.List.length;

        // Fetch FemaleWear products after MaleWear
        axios.get("http://localhost:8080/FemaleWear/")
          .then(femaleResponse => {
            const femaleWearCount = femaleResponse.data.List.length;
            // Combine total products count
            setTotalProducts(maleWearCount + femaleWearCount);
          })
          .catch(err => console.error("Error fetching female products: ", err));
      })
      .catch(err => console.error("Error fetching male products: ", err));

  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <HomeIcon className="w-10 h-10 text-blue-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Bookings</h3>
            <p className="text-gray-600 text-xl">{totalBookings}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <ShoppingBagIcon className="w-10 h-10 text-red-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-gray-600 text-xl">{totalProducts}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <ClipboardListIcon className="w-10 h-10 text-yellow-500" />
          <div>
            <h3 className="text-lg font-semibold">Pending Bookings</h3>
            <p className="text-gray-600 text-xl">{pendingBookings}</p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Link to="/admin/bookings" className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <ClipboardListIcon className="w-8 h-8 text-blue-500" />
            <span className="mt-2">Booking List</span>
          </Link>

          <Link to="/admin/menrentproduct" className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <ShoppingBagIcon className="w-8 h-8 text-green-500" />
            <span className="mt-2">MenRent Product</span>
          </Link>

          <Link to="/admin/womenrentproduct" className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <ShoppingBagIcon className="w-8 h-8 text-pink-500" />
            <span className="mt-2">WomenRent Product</span>
          </Link>

          <Link to="/admin/category" className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <CogIcon className="w-8 h-8 text-red-500" />
            <span className="mt-2">Category List</span>
          </Link>

          <Link to="/admin/subcategory" className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <AdjustmentsIcon className="w-8 h-8 text-yellow-500" />
            <span className="mt-2">SubCategory List</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
