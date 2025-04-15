import React from "react";

export default function AdminFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white text-center py-4">
            <p className="text-sm">&copy; {currentYear} Rent and Wear Admin Panel. All rights reserved.</p>
        </footer>
    );
}
