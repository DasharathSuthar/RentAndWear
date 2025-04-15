import { Link } from "react-router-dom";
import { HomeIcon, ClipboardListIcon, ShoppingBagIcon,CogIcon,AdjustmentsIcon   } from "@heroicons/react/outline";
import { FaPhoneAlt } from "react-icons/fa";


const AdminSidebar = () => {
  return (
    <div className="h-auto w-64 bg-blue-600 text-white p-5">
      <h2 className="text-lg font-bold mb-6">RENT & WEAR</h2>
      <ul>
        <li className="mb-2">
          <Link to="/admin/dashboard" className="flex items-center space-x-2 p-2 hover:bg-blue-500 rounded">
            <HomeIcon className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/bookings" className="flex items-center space-x-2 p-2 hover:bg-blue-500 rounded">
            <ClipboardListIcon className="w-5 h-5" />
            <span>Booking List</span>
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/menrentproduct" className="flex items-center space-x-2 p-2 hover:bg-blue-500 rounded">
            <ShoppingBagIcon className="w-5 h-5" />
            <span>Men Rent Product</span>
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/womenrentproduct" className="flex items-center space-x-2 p-2 hover:bg-blue-500 rounded">
            <ShoppingBagIcon className="w-5 h-5" />
            <span>Women Rent Product</span>
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/category" className="flex items-center space-x-2 p-2 hover:bg-blue-500 rounded">
            <CogIcon className="w-5 h-5" />
            <span>Category List</span>
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/subcategory" className="flex items-center space-x-2 p-2 hover:bg-blue-500 rounded">
            <AdjustmentsIcon  className="w-5 h-5" />
            <span>SubCategory List</span>
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/adminContact" className="flex items-center space-x-2 p-2 hover:bg-blue-500 rounded">
            <FaPhoneAlt  className="w-5 h-5" />
            <span>Contact List</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
