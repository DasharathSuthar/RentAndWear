import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import PageTitle from "../Components/PageTitle";

export default function SingleProduct() {
    const location = useLocation();
    const navigate = useNavigate();

    const { title, itemImg, price, category, subcategory, sizes, description, status } = location.state || {};

    const [cart, setCart] = useState([]);
    const [selectedSize, setSelectedSize] = useState(sizes ? sizes[0] : "");

    const isAuthenticated = () => localStorage.getItem("user") !== null;

    // Fetch cart from backend on mount
    useEffect(() => {
        const fetchCart = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user?.id) return;

            try {
                const res = await axios.get(`http://localhost:8080/cart/${user.id}`);
                setCart(res.data.length > 0 ? res.data[0].items : []);
            } catch (err) {
                console.error("Error fetching cart:", err);
            }
        };

        fetchCart();
    }, []);

    // Function to add item to cart using Axios
    const addToCart = async () => {
        if (!isAuthenticated()) {
            navigate("/login");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.id; // ✅ Corrected here

        const newItem = {
            title,
            itemImg,
            price,
            category,
            subcategory,
            size: selectedSize,
            description,
            status
        };

        try {
            await axios.post("http://localhost:8080/cart/save", {
                userId,
                items: [newItem]
            });

            // ✅ Update local cart state
            setCart(prev => [...prev, newItem]);

            // ✅ Trigger storage event to notify Header component
            window.dispatchEvent(new Event("storage"));

            alert("Item added to cart!");
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add item to cart.");
        }
    };

    // Function to handle rent now
    const buyNow = () => {
        if (!isAuthenticated()) {
            navigate("/login");
            return;
        }

        const newItem = { title, itemImg, price, category, subcategory, size: selectedSize, description, status };

        const isAlreadyInCart = cart.some(item => item.title === newItem.title && item.size === newItem.size);
        const updatedItems = isAlreadyInCart ? [...cart] : [...cart, newItem];

        navigate("/checkout", { state: { items: updatedItems } });
    };

    return (
        <>
            <Header />
            <PageTitle title={"Product Detail"} />

            <div className="container my-4 p-4 bg-black text-white rounded-md shadow-md border border-red-500">
                <h2 className="text-xl font-semibold text-red-500">🛒 Cart Summary</h2>
                <p>You have <strong>{cart.length}</strong> item(s) in your cart.</p>
                {cart.length > 0 && (
                    <button
                        onClick={() => navigate("/cart")}
                        className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        View Cart
                    </button>
                )}
            </div>

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
                                <p><strong>Description:</strong> {description}</p>

                                <div className="mt-3">
                                    <label htmlFor="size" className="block font-semibold">Select Size:</label>
                                    <select
                                        id="size"
                                        value={selectedSize}
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                        className="mt-1 p-2 rounded text-black"
                                    >
                                        {sizes && sizes.map((sizeOption, idx) => (
                                            <option key={idx} value={sizeOption}>{sizeOption}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

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
