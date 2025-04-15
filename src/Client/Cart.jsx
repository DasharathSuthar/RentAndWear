import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import PageTitle from "../Components/PageTitle";

export default function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    // Check if user is logged in
    const isAuthenticated = () => localStorage.getItem("user") !== null;

    // Load cart from localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    // Handle item removal
    const removeItem = (index) => {
        if (window.confirm("Are you sure you want to remove this item?")) {
            const updatedCart = cartItems.filter((_, i) => i !== index);
            setCartItems(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
    };

    // Handle checkout
    const handleCheckout = () => {
        if (!isAuthenticated()) {
            alert("You must be logged in to proceed to checkout.");
            navigate("/login"); // Redirect to login page
            return;
        }

        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        navigate("/checkout", { state: { items: cartItems } });
    };

    return (
        <>
            <Header />
            <PageTitle title="Your Cart 🛒" />

            <section className="py-16 bg-gray-200">
                <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
                    {cartItems.length === 0 ? (
                        <h2 className="text-2xl font-semibold text-center text-gray-500">
                            Your cart is empty 😢
                        </h2>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item, index) => (
                                <div key={index} className="p-4 bg-black shadow-lg rounded-md flex flex-col md:flex-row justify-between items-center gap-4 border-2 border-red-600">
                                    {/* Item Image */}
                                    <img src={item.itemImg} alt={item.title} className="w-24 h-24 rounded-md object-cover border-2 border-red-600" />

                                    {/* Item Details */}
                                    <div className="flex-1 text-center md:text-left text-white">
                                        <h3 className="text-lg font-semibold">{item.title}</h3>
                                        <p><strong>Price:</strong>₹{item.price} / Day</p>
                                        <p><strong>Category:</strong> {item.category}</p>
                                        <p><strong>Subcategory:</strong> {item.subcategory}</p>
                                        <p><strong>Size:</strong> {item.size}</p>
                                       
                                    </div>

                                    {/* Remove Button */}
                                    <button 
                                        onClick={() => removeItem(index)} 
                                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-200"
                                    >
                                        ❌ Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Checkout Button */}
                    {cartItems.length > 0 && (
                        <button 
                            onClick={handleCheckout} 
                            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 mt-4 transition duration-200"
                        >
                            Proceed to Checkout
                        </button>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}
