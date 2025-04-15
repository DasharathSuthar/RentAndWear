export default function MemberCard({ name, role, img }) {
    return (
        <>
            <div className="card px-2 my-2 grid columns-4">
                <div className="card-body rounded-md shadow-lg text-center bg-white p-5">
                    {/* Profile Image */}
                    <div className="card-img flex justify-center items-center">
                        <a href="#" className="block">
                            <img src={img} alt={name} className="w-28 h-28 rounded-full border-4 border-red-600" />
                        </a>
                    </div>

                    {/* Member Info */}
                    <div className="card-text mt-4">
                        <h1 className="text-red-600 font-bold text-2xl mb-1">{name}</h1>
                        <p className="text-black text-lg">{role}</p>

                        {/* Social Icons */}
                        <div className="social flex justify-center mt-3 space-x-3">
                            <a href="#" className="text-red-600 text-xl hover:text-black">
                                <i className="fa-brands fa-square-facebook"></i>
                            </a>
                            <a href="#" className="text-red-600 text-xl hover:text-black">
                                <i className="fa-brands fa-square-instagram"></i>
                            </a>
                            <a href="#" className="text-red-600 text-xl hover:text-black">
                                <i className="fa-brands fa-square-x-twitter"></i>
                            </a>
                            <a href="#" className="text-red-600 text-xl hover:text-black">
                                <i className="fa-brands fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
