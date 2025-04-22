import { useNavigate } from "react-router-dom";

export default function Confirmation() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-300 px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center border border-red-600">
                <div className="flex justify-center mb-4">
                    <div className="bg-red-100 p-3 rounded-full">
                        <svg
                            className="w-10 h-10 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-red-600 mb-2">Booking Successful!</h2>
                <p className="text-gray-700 mb-6">
                    Thank you for booking with us. Your reservation has been confirmed.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="bg-red-600 hover:bg-black text-white font-medium py-2 px-6 rounded-md transition duration-300"
                >
                    Homepage
                </button>
                <button
                    onClick={() => navigate("/orderconfirmation")}
                    className="bg-black ml-3 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
                >
                    Your Orders
                </button>
            </div>
        </div>
    );
}
