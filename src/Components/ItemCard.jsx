import { useNavigate } from "react-router-dom";

export default function ItemCard({
    title,
    itemImg,
    price,
    category,
    subcategory,
    sizes,
    description,
    status,
}) {
    const navigate = useNavigate();

    const handleViewClick = () => {
        navigate("/SingleProduct", {
            state: { title, itemImg, price, category, subcategory, sizes, description, status },
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 flex flex-col justify-between w-80 border border-gray-200">
            {/* Image Section */}
            <div className="card-img cursor-pointer" onClick={handleViewClick}>
                <img src={itemImg} alt={title || "Product Image"} className="w-full h-72 object-cover rounded-lg" />
            </div>

            {/* Details Section */}
            <div className="mt-3">
                <h3 className="text-xl font-bold text-black capitalize">{title}</h3>
                <p className="text-gray-700 text-sm">
                    {category} - {subcategory}
                </p>
                <div className="text-gray-600 text-sm mt-1">
                    <strong>Sizes:</strong> {sizes?.join(", ")}
                </div>
                <p className="text-black font-bold mt-2">₹{price} / Day</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex flex-col items-center">
                <button
                    onClick={handleViewClick}
                    className="px-5 py-2 w-full bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}
