import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import PageTitle from "../Components/PageTitle";

export default function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    // Check if user is logged in
    const isAuthenticated = () => localStorage.getItem("user") !== null;

    // Fetch cart from backend on component mount
    useEffect(() => {
        const fetchCart = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user?.id) return;

            try {
                const response = await axios.get(`http://localhost:8080/cart/${user.id}`);
                const allItems = response.data.flatMap(cart => cart.items);
                setCartItems(allItems);
            } catch (err) {
                console.error("Failed to fetch cart:", err);
                alert("Failed to load cart.");
                setCartItems([]); // Clear items on error
            }
        };

        if (isAuthenticated()) {
            fetchCart();
        }
    }, []);

    // Remove item from UI and backend
    const removeItem = (index) => {
        if (window.confirm("Are you sure you want to remove this item?")) {
            const itemId = cartItems[index]._id;
            const updatedCart = cartItems.filter((_, i) => i !== index);
            setCartItems(updatedCart);

            const user = JSON.parse(localStorage.getItem("user"));
            if (user?.id) {
                axios.delete(`http://localhost:8080/cart/${user.id}/item/${itemId}`)
                    .then(() => {
                        console.log("Item removed from backend.");
                    })
                    .catch((err) => {
                        console.error("Error removing item from backend:", err);
                        // Rollback the UI state if backend fails
                        setCartItems(prevItems => [...prevItems]);
                    });
            }
        }
    };

    // Proceed to checkout
    const handleCheckout = () => {
        if (!isAuthenticated()) {
            alert("You must be logged in to proceed to checkout.");
            navigate("/login");
            return;
        }

        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.id) {
            axios.delete(`http://localhost:8080/cart/${user.id}`)  // Remove all items from the cart
                .then(() => {
                    console.log("Cart cleared from backend.");
                    // Navigate to the checkout page and pass the cart items
                    navigate("/checkout", { state: { items: cartItems } });
                    // Optionally, clear the UI cart after successful removal from backend
                    setCartItems([]);
                })
                .catch((err) => {
                    console.error("Error clearing cart from backend:", err);
                    alert("Failed to clear cart.");
                });
        }
    };

    return (
        <>
            <Header />
            <PageTitle title="Your Cart 🛒" />

            <section className="py-16 bg-gray-200 min-h-screen">
                <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
                    {cartItems.length === 0 ? (
                        <h2 className="text-2xl font-semibold text-center text-gray-500">
                            Your cart is empty 😢
                        </h2>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-black shadow-lg rounded-md flex flex-col md:flex-row justify-between items-center gap-4 border-2 border-red-600"
                                >
                                    <img
                                        src={item.itemImg}
                                        alt={item.title}
                                        className="w-24 h-24 rounded-md object-cover border-2 border-red-600"
                                    />

                                    <div className="flex-1 text-center md:text-left text-white">
                                        <h3 className="text-lg font-semibold">{item.title}</h3>
                                        <p><strong>Price:</strong> ₹{item.price} / Day</p>
                                        <p><strong>Category:</strong> {item.category}</p>
                                        <p><strong>Subcategory:</strong> {item.subcategory}</p>
                                        <p><strong>Size:</strong> {item.size}</p>
                                    </div>

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
