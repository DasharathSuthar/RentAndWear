export default function SectionTitle({ title, text }) {
    return (
        <>
            <div className="team-title mb-8 text-center">
                <h1 className="text-red-600 font-bold capitalize text-5xl mb-2">{title}</h1>
                <p className="text-black capitalize text-xl">{text}</p>
            </div>
        </>
    );
}
