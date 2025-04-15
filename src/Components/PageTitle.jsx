export default function PageTitle({ title, text }) {
    return (
        <>
            <section className="pb-16 pt-32 bg-red-600">
                <div className="container text-center">
                    <h1 className="font-bold text-white text-5xl mb-3">{title}</h1>
                    <p className="italic capitalize text-gray-200">{text}</p>
                </div>
            </section>
        </>
    );
}
