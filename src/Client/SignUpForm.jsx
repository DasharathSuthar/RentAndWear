import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
    const URL = "http://localhost:8080/User/SignUp";

    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        username: "",
        password: "",
        phone: "",
        userType: "As a Customer",
    });

    // Handle input change
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(URL, userData);
            const data = await response.data;

            if (response.status == 500) {
                throw new Error("Signup failed");
            }

            // Save user data & token in localStorage
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);

            alert("Signup successful! Redirecting to home page...");
            navigate("/Login"); // Redirect to homepage

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200">
            <div className="bg-white rounded-lg p-8 w-[500px] shadow-lg border-2 border-red-600">
                <h2 className="text-3xl font-bold text-center text-black mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" name="fullName" placeholder="Full Name" value={userData.fullName} onChange={handleChange} className="w-full border border-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                        <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} className="w-full border border-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                        <input type="text" name="username" placeholder="Username" value={userData.username} onChange={handleChange} className="w-full border border-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                        <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} className="w-full border border-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                        <input type="text" name="phone" placeholder="Phone" value={userData.phone} onChange={handleChange} className="w-full border border-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                        <input type="text" name="userType" value={userData.userType} onChange={handleChange} className="w-full border border-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
                           
                        
                    </div>
                    <button type="submit" className="w-full bg-red-600 text-white font-semibold py-2 rounded-md mt-6 hover:bg-red-700">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
