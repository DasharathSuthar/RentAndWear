import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import PageTitle from "../Components/PageTitle";
import axios from "axios";

export default function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { items } = location.state || {};
    console.log(items);

    // Clean price string to numeric value
    const parsePrice = (price) => Number(String(price).replace(/[^\d]/g, ""));

    // Total cart price calculation with cleaned prices
    const totalCartPrice = items?.reduce((total, item) => {
        return total + parsePrice(item.price);
    }, 0) || 0;

    // Form State
    const [formData, setFormData] = useState({
        startDate: "",
        returnDate: "",
        totalDays: 0,
        totalAmount: totalCartPrice,
        deposit: 1000,
        finalAmount: totalCartPrice - 1000
    });

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Calculate total days and update total amount
    const calculateDays = () => {
        if (formData.startDate && formData.returnDate) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.returnDate);
            const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

            if (diffDays < 1) {
                alert("Return date must be after the start date.");
                return;
            }

            const totalPrice = diffDays * totalCartPrice;

            setFormData((prev) => ({
                ...prev,
                totalDays: diffDays,
                totalAmount: totalPrice,
                finalAmount: totalPrice - prev.deposit
            }));
        }
    };

    // Handle Order Submission
    // Handle Order Submission
    const handleSubmit = async (e) => {
        const URL = "http://localhost:8080/Checkout/";

        e.preventDefault();
        if (!formData.startDate || !formData.returnDate) {
            alert("Please select both start and return dates.");
            return;
        }

        const orderId = "ORD-" + Math.floor(Math.random() * 1000000);
        const currentDate = new Date().toISOString().split("T")[0];

        const orderDetails = {
            id: orderId,
            products: items.map(item => ({
                title: item.title,
                image: item.itemImg,
                price: parsePrice(item.price),
                category: item.category,
                subcategory: item.subcategory,
                size: item.size,
                description: item.description
            })),
            totalDays: formData.totalDays,
            totalAmount: formData.totalAmount,
            deposit: formData.deposit,
            finalAmount: formData.finalAmount,
            confirm: "Generated",
            status: "Generated",
            payment: "Paid",
            bookingDate: currentDate,
            startDate: formData.startDate,  // Store start date
            returnDate: formData.returnDate,  // Store return date
        };

        // Save to database
        await axios.post(URL, orderDetails)
            .then((res) => res.data)
            .then((data) => console.log("Checkout saved:", data))
            .catch((err) => console.error("Error saving checkout:", err));

        // Redirect to order confirmation
        navigate("/orderconfirmation", { state: orderDetails });
    };


    return (
        <>
            <Header />
            <PageTitle title="Booking Form" />
            <section className="py-16 bg-gray-200 text-white">
                <div className="container p-6 bg-gray-900 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-center mb-4 text-red-500">Complete Your Booking</h2>

                    {/* Display Cart Items */}
                    {items && items.length > 0 && (
                        <div className="bg-black p-4 rounded-md shadow-md mb-4 border border-red-500">
                            <h3 className="text-lg font-semibold mb-2 text-red-500">🛒 Your Cart</h3>
                            {items.map((item, index) => (
                                <div key={index} className="flex items-start space-x-4 border-b border-gray-700 py-4">
                                    <img src={item.itemImg} alt={item.title} className="w-24 h-24 object-cover rounded-md" />
                                    <div className="flex-1">
                                        <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                                        <p className="text-gray-400 mb-1">Category: {item.category}</p>
                                        <p className="text-gray-400 mb-1">Subcategory: {item.subcategory}</p>
                                        <p className="text-gray-400 mb-1">Size: {item.size}</p>
                                        <p className="text-gray-400 mb-1">Description: {item.description}</p>
                                        <p className="text-gray-400 font-bold mt-1">Price: ₹{parsePrice(item.price)}</p>
                                    </div>
                                </div>
                            ))}
                            <h3 className="text-lg font-bold text-red-500 mt-4">Total Price: ₹{totalCartPrice}</h3>
                        </div>
                    )}

                    {/* Booking Form */}
                    <form onSubmit={handleSubmit} className="space-y-4 bg-black p-6 rounded-md shadow-md border border-gray-700">
                        <label>Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            onBlur={calculateDays}
                            className="w-full p-2 border border-gray-600 rounded-md bg-white text-black"
                            required
                        />
                        <label>Return Date</label>
                        <input
                            type="date"
                            name="returnDate"
                            value={formData.returnDate}
                            onChange={handleChange}
                            onBlur={calculateDays}
                            className="w-full p-2 border border-gray-600 rounded-md bg-white text-black"
                            required
                        />
                        <label>Total Days</label>
                        <input
                            type="text"
                            name="totalDays"
                            value={formData.totalDays}
                            readOnly
                            className="w-full p-2 border border-gray-600 rounded-md bg-white text-black"
                        />
                        <label>Total Amount</label>
                        <input
                            type="text"
                            name="totalAmount"
                            value={`₹${formData.totalAmount}`}
                            readOnly
                            className="w-full p-2 border border-gray-600 rounded-md bg-white text-black"
                        />
                        <label>Deposit</label>
                        <input
                            type="text"
                            name="deposit"
                            value={`₹${formData.deposit}`}
                            readOnly
                            className="w-full p-2 border border-gray-600 rounded-md bg-white text-black"
                        />
                        <label>Final Amount</label>
                        <input
                            type="text"
                            name="finalAmount"
                            value={`₹${formData.finalAmount}`}
                            readOnly
                            className="w-full p-2 border border-gray-600 rounded-md bg-white text-black"
                        />

                        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">
                            Confirm Booking
                        </button>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    );
}
