import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import PageTitle from "../Components/PageTitle";
import axios from "axios";

export default function OrderConfirmation() {
    const navigate = useNavigate();
    const URL = "http://localhost:8080/Order/";  // Assuming this is correct endpoint for fetching orders

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);  // For handling loading state
    const [error, setError] = useState(null); // For handling errors

    function fetchOrders() {
        setLoading(true);
        axios.get(URL)
            .then((response) => {
                console.log(response.data);

                if (response.status === 200) {
                    const fetchedOrders = response.data.orders;
                    if (fetchedOrders && fetchedOrders.length > 0) {
                        setOrders(fetchedOrders);
                    } else {
                        setError("No confirmed orders found.");
                    }
                }
            })
            .catch((err) => {
                console.error("Error fetching orders:", err);
                setError("Failed to fetch orders. Please try again.");
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-10 text-white">
                <h2 className="text-2xl font-semibold text-red-500">Loading orders...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-10 text-white">
                <h2 className="text-2xl font-semibold text-red-500">{error}</h2>
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Go to Home
                </button>
            </div>
        );
    }

    return (
        <>
            <Header />
            <PageTitle title="Order Confirmations 🎉" />

            <section className="py-16 bg-gray-200 text-white">
                <div className="container p-6 bg-gray-900 rounded-lg shadow-md text-center">
                    <h2 className="text-2xl font-semibold text-red-500">Thank you for your bookings!</h2>
                    <p className="text-gray-300 my-4">Here are your confirmed orders.</p>

                    {orders.map((order, orderIndex) => (
                        <div key={orderIndex} className="p-4 bg-black shadow-md rounded-md mt-8 border border-red-500">
                            <h3 className="text-lg font-medium">Order ID: <span className="text-red-500">{order._id}</span></h3>
                            <p className="text-gray-300">Booking Date: {order.bookingDate}</p>

                            <h4 className="text-lg font-semibold mt-4 text-red-500">Ordered Items</h4>
                            {order.products.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-center p-4 border-b border-gray-700">
                                    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
                                    <div className="ml-4 text-left">
                                        <h3 className="text-lg font-semibold">{item.title}</h3>
                                        <p className="text-gray-400">Category: {item.category}</p>
                                        <p className="text-gray-400">Subcategory: {item.subcategory}</p>
                                        <p className="text-gray-400">Size: {item.size}</p>
                                        <p className="text-gray-400">Description: {item.description}</p>
                                        <p className="text-gray-400 font-bold mt-1">Price: ₹{item.price}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-4 text-left">
                                <p className="text-gray-300">Total Days: {order.totalDays}</p>
                                <p className="text-gray-300">Total Price: <span className="text-red-500">₹{order.totalAmount}</span></p>
                                <p className="text-gray-300">Deposit: <span className="text-red-500">₹{order.deposit}</span></p>
                                <p className="text-gray-300">Final Amount: <span className="text-red-500">₹{order.finalAmount}</span></p>
                                <p className="text-gray-300">Payment Status: <span className="text-green-500">{order.payment}</span></p>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={() => navigate("/")}
                        className="mt-6 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                    >
                        Back to Home 🏠
                    </button>
                </div>
            </section>

            <Footer />
        </>
    );
}
