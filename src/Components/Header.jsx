import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import axios from "axios";
import menAvtar from "../assets/img/men-avatar.gif";
import womenAvtar from "../assets/img/female.gif";

export default function Header() {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        checkLoginStatus();
        fetchCartCount();

        // Listen for login/logout changes
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleStorageChange = () => {
        checkLoginStatus();
        fetchCartCount();
    };

    const checkLoginStatus = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setIsLoggedIn(true);
            setUsername(user.username); // Make sure `username` is in user object
        } else {
            setIsLoggedIn(false);
            setUsername("");
        }
    };

    const fetchCartCount = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.id) return;

        try {
            const response = await axios.get(`http://localhost:8080/cart/${user.id}`);
            const allItems = response.data.flatMap(cart => cart.items);
            setCartCount(allItems.length);
        } catch (error) {
            console.error("Failed to fetch cart count:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        alert("Logged out successfully!");
        setIsLoggedIn(false);
        setUsername("");
        setCartCount(0);
        navigate("/");
        window.dispatchEvent(new Event("storage")); // Notify other tabs/components
    };

    return (
        <header className="py-4 border-b fixed w-full z-20 bg-white shadow-md">
            <div className="container flex justify-between items-center">
                {/* Logo */}
                <div className="font-bold text-2xl text-black">
                    <Link to="/">
                        <h1 className="uppercase">
                            <span className="text-red-600">Rent</span> &amp; <span className="text-black">Wear</span>
                        </h1>
                    </Link>
                </div>

                {/* Navigation */}
                <nav>
                    <ul className="flex space-x-6 items-center">
                        <li><Link className="text-red-600 hover:text-black transition" to="/">Home</Link></li>
                        <li><Link className="text-red-600 hover:text-black transition" to="/About">About</Link></li>
                        <li><Link className="text-red-600 hover:text-black transition" to="/Contact">Contact</Link></li>

                        {/* Category Dropdown */}
                        <li className="relative group">
                            <span className="text-red-600 hover:text-black transition cursor-pointer py-2">Category</span>
                            <ul className="hidden group-hover:block absolute top-7 -left-10 bg-white border shadow-lg rounded-md w-48">
                                <li><Link to="/MaleWear" className="flex items-center p-2 hover:bg-gray-100">
                                    <img src={menAvtar} className="size-8 mr-2" alt="Male Wear" /> Male Wears
                                </Link></li>
                                <li><Link to="/FemaleWear" className="flex items-center p-2 hover:bg-gray-100">
                                    <img src={womenAvtar} className="size-8 mr-2" alt="Female Wear" /> Female Wears
                                </Link></li>
                            </ul>
                        </li>

                        {/* Orders & Cart */}
                        <li><Link className="text-red-600 hover:text-black transition" to="/orderconfirmation">Orders</Link></li>
                        <li className="relative">
                            <Link to="/cart">
                                <ShoppingCartIcon className="h-7 w-7 text-red-600 hover:text-black transition" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Auth Buttons */}
                <div>
                    <ul className="flex space-x-4 items-center">
                        {isLoggedIn ? (
                            <>
                                <li className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-full shadow-sm">
                                    <span className="text-sm font-semibold text-gray-800">Welcome {username}</span>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        className="border border-black text-black px-4 py-2 rounded-md hover:bg-red-600 hover:text-white transition"
                                        to="/SignUpForm"
                                    >
                                        Sign Up
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="border border-black bg-black text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                        to="/Login"
                                    >
                                        Log In
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
}
