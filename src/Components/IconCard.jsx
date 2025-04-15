export default function IconCard({ title, icon, text }) {
    return (
        <>
            <div className="card mb-5">
                <div className="card-body p-4 bg-white shadow-lg rounded-lg flex items-start">
                    <div className="card-icon text-red-600 text-5xl mr-5">
                        {icon}
                    </div>
                    <div className="card-text">
                        <h1 className="text-black font-semibold text-xl mb-2">{title}</h1>
                        <p className="text-base text-gray-700">{text}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
