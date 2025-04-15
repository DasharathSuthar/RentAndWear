import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import PageTitle from "../Components/PageTitle";

export default function SingleProduct() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Extract product details from location state
    const { title, itemImg, price, category, subcategory, size, description, status } = location.state || {};

    const [cart, setCart] = useState([]);

    // Check if user is logged in
    const isAuthenticated = () => {
        return localStorage.getItem("user") !== null;
    };

    // Load cart from localStorage when the component mounts
    useEffect(() => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(existingCart);
    }, []);

    // Function to add item to cart
    const addToCart = () => {
        if (!isAuthenticated()) {
            navigate("/login"); // Redirect to login page if not logged in
            return;
        }

        const newItem = { title, itemImg, price, category, subcategory, size, description, status };
        const updatedCart = [...cart, newItem];

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        alert("Item added to cart!");
    };

    // Function to rent now (redirects to checkout with cart + current product)
    const buyNow = () => {
        if (!isAuthenticated()) {
            navigate("/login"); // Redirect to login page if not logged in
            return;
        }

        const newItem = { title, itemImg, price, category, subcategory, size, description, status };

        // Check if the current product is already in the cart
        const isAlreadyInCart = cart.some(item => item.title === newItem.title);

        // Combine cart items + current product (if not already in cart)
        const updatedItems = isAlreadyInCart ? [...cart] : [...cart, newItem];

        // Navigate to checkout with combined items
        navigate("/checkout", { state: { items: updatedItems } });
    };

    return (
        <>
            <Header />
            <PageTitle title={"Product Detail"} />

            {/* Cart Details Section */}
            <div className="container my-4 p-4 bg-black text-white rounded-md shadow-md border border-red-500">
                <h2 className="text-xl font-semibold text-red-500">🛒 Cart Summary</h2>
                <p>You have <strong>{cart.length}</strong> items in your cart.</p>
                {cart.length > 0 && (
                    <button
                        onClick={() => navigate("/cart")}
                        className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        View Cart
                    </button>
                )}
            </div>

            {/* Product Details Section */}
            <section className="single-product py-16 bg-gray-200 text-white">
                <div className="container mx-auto px-4">
                    <div className="bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col md:flex-row border border-red-500">
                        <div className="w-full md:w-1/2 flex justify-center">
                            <img src={itemImg} alt={title} className="rounded-lg shadow-md w-full md:w-3/4 border border-red-500" />
                        </div>

                        <div className="w-full md:w-1/2 px-6">
                            <h2 className="text-2xl font-semibold text-red-500">{title}</h2>
                            <p className="text-lg font-bold mt-2">₹{price} / Day</p>

                            <div className="mt-4">
                                <p><strong>Category:</strong> {category}</p>
                                <p><strong>Subcategory:</strong> {subcategory}</p>
                                <p><strong>Size:</strong> {size}</p>
                                <p><strong>Description:</strong> {description}</p>
                            </div>

                            {/* Buttons for Cart & Rent Now */}
                            <div className="flex justify-start space-x-4 my-6">
                                <button
                                    onClick={addToCart}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Add to Cart 🛒
                                </button>
                                <button
                                    onClick={buyNow}
                                    className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 border border-red-500"
                                >
                                    Rent Now 🛍️
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
