import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  // Step 1: Verify user info (email + mobile)
  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/User/ForgotPasswordVerify", {
        email,
        mobile,
      });
      alert(response.data.message);
      setIsVerified(true); // Move to password reset form
    } catch (error) {
      alert(error.response?.data?.message || "Verification failed.");
    }
  };

  // Step 2: Update new password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/User/ResetPassword", {
        email,
        newPassword,
      });
      alert(response.data.message);
      navigate("/Login");
    } catch (error) {
      alert(error.response?.data?.message || "Password reset failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>

      {!isVerified ? (
        <form
          onSubmit={handleVerify}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        >
          <div className="mb-4">
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              className="border p-2 w-full rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Mobile Number</label>
            <input
              type="text"
              className="border p-2 w-full rounded"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Verify
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleResetPassword}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        >
          <div className="mb-4">
            <label className="block mb-2 font-medium">New Password</label>
            <input
              type="password"
              className="border p-2 w-full rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Change Password
          </button>
        </form>
      )}
    </div>
  );
}
