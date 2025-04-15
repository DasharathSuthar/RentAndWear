import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <footer className="pt-16 bg-black">
                <div className="container">
                    <div className="py-9">
                        <div className="grid grid-cols-2">
                            {/* Brand & Contact */}
                            <div className="footer-widget">
                                <Link to="/">
                                    <h1 className="uppercase text-4xl font-extrabold tracking-wide">
                                        <span className="text-red-600">RENT</span> <span className="text-white">&</span> <span className="text-white">WEAR</span>
                                    </h1>
                                </Link>
                                <div className="footer-add mt-3">
                                    <p className="mb-3 text-gray-400">A-402, Apple City, Dhunai Road, Modasa, Gujarat, India.</p>
                                    <p className="mb-3 text-gray-400">+91 9773088789</p>
                                    <p className="mb-3 text-gray-400">rentandwear@gmail.com</p>
                                </div>
                            </div>

                            {/* Navigation */}
                            <div>
                                <h3 className="font-semibold text-white mb-3 text-2xl">Navigations</h3>
                                <ul>
                                    <li className="mb-2"><a href="/" className="text-gray-400 hover:text-red-600">Home</a></li>
                                    <li className="mb-2"><a href="/About" className="text-gray-400 hover:text-red-600">About</a></li>
                                    <li className="mb-2"><a href="/Contact" className="text-gray-400 hover:text-red-600">Contact</a></li>
                                    <li className="mb-2"><a href="/AdminLogin" className="text-gray-400 hover:text-red-600">Admin</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright & Social Media */}
                <div className="py-5 bg-red-900">
                    <div className="container">
                        <div className="grid grid-cols-2 text-gray-300">
                            <p>&copy; Rent &amp; Wear. Designed By Suthar Dasharath. All Rights Reserved.</p>
                            <div className="flex space-x-4 text-xl">
                                <a href="#" className="text-gray-300 hover:text-white transition"><i className="fa-brands fa-square-facebook"></i></a>
                                <a href="#" className="text-gray-300 hover:text-white transition"><i className="fa-brands fa-square-instagram"></i></a>
                                <a href="#" className="text-gray-300 hover:text-white transition"><i className="fa-brands fa-square-x-twitter"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
