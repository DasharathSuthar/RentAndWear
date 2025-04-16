import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { LogoutIcon } from "@heroicons/react/outline";
import userIcon from "../assets/img/profile.webp";

export default function AdminHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn"); // Clear admin session
    navigate("/AdminLogin"); // Redirect to login page
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Admin Panel</h1>
      <div className="relative">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex items-center space-x-2 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
              <span className="text-gray-600">Dasharath Suthar</span>
              <img src={userIcon} alt="Admin" className="w-8 h-8 rounded-full border border-gray-300" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            show={isOpen}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                      active ? "bg-gray-100" : ""
                    }`}
                  >
                    <LogoutIcon className="w-4 h-4 mr-2" /> Logout
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
