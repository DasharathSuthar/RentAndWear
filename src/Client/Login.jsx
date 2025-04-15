import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const URL = "http://localhost:8080/User/Login";


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(URL, { email, password });

            const data = await response.data;

            if (response.status == 500) {
                throw new Error(data.message || "Login failed");
            }

            // Store user info and token
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);

            alert("Login successful! Redirecting to home page...");
            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="bg-white p-6 rounded shadow-md w-96 border-2 border-red-500">
                <h2 className="text-2xl font-bold text-center mb-4 text-black">Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" className="w-full border p-2 rounded mb-4 focus:border-red-500 focus:ring-red-500"
                        value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" className="w-full border p-2 rounded mb-4 focus:border-red-500 focus:ring-red-500"
                        value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">Login</button>
                </form>
            </div>
        </div>
    );
}
