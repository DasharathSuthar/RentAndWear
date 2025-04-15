import Footer from "../Components/Footer";
import Header from "../Components/Header";
import IconCard from "../Components/IconCard";
import MemberCard from "../Components/MemberCard";
import PageTitle from "../Components/PageTitle";
import SectionTitle from "../Components/SectionTitle";
import imgsb from "../assets/img/sb.png";
import team2 from "../assets/img/team-2.jpg";
import team4 from "../assets/img/team-4.jpg";
import team5 from "../assets/img/team-5.jpg";
import team6 from "../assets/img/team-6.jpg";
import vec from "../assets/img/vec-2.png";

export default function About() {
    return (
        <>
            <Header />
            <PageTitle title="About Us" text="Who we are & our mission" />

            {/* About Section */}
            <section className="about-section py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="about-img flex justify-center">
                            <img src={imgsb} alt="Our Story" className="w-full max-w-md rounded-lg shadow-lg" />
                        </div>
                        <div className="about-text">
                            <div className="story-wrap">
                                <h2 className="font-bold text-3xl text-red-600 mb-3">Our Story</h2>
                                <p className="italic text-lg text-black mb-2">
                                    <b>Cost-effective:</b> Renting clothes can be more affordable than buying new ones. You can wear the latest fashion without spending a lot.
                                </p>
                                <p className="italic text-lg text-black mb-2">
                                    <b>Eco-friendly:</b> Renting clothes reduces waste, helping to minimize fashion’s impact on the environment.
                                </p>
                                <p className="italic text-lg text-black mb-2">
                                    <b>Variety:</b> Get access to a wide range of styles and brands for any occasion.
                                </p>
                                <p className="italic text-lg text-black">
                                    <b>Convenience:</b> No need to store or maintain clothes—just rent and return!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet Our Team */}
            <section className="team-section py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <SectionTitle title="Meet Our Team" text="Professional & Dedicated Team" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        <MemberCard img={team2} name="Dasharath Suthar" role="Designer" />
                        <MemberCard img={team4} name="Dasharath Suthar" role="Designer" />
                        <MemberCard img={team5} name="Dasharath Suthar" role="Designer" />
                        <MemberCard img={team6} name="Dasharath Suthar" role="Designer" />
                    </div>
                </div>
            </section>

            {/* Our Mission & Work Process */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <SectionTitle title="Our Mission & Work Process" text="Professional & Dedicated Team" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="icon-cards space-y-6">
                            <IconCard 
                                title="Fully Secure & 24x7 Dedicated Support" 
                                icon={<i className="fa-solid fa-lock"></i>} 
                                text="We provide strong security and round-the-clock support for all our customers."
                            />
                            <IconCard 
                                title="Manage Your Social & Business Accounts" 
                                icon={<i className="fa-brands fa-x-twitter"></i>} 
                                text="We help manage and optimize your online presence effortlessly."
                            />
                            <IconCard 
                                title="Efficient Workflow & Process Management" 
                                icon={<i className="fa-solid fa-layer-group"></i>} 
                                text="Streamline your business operations with our effective solutions."
                            />
                        </div>
                        <div className="flex justify-center">
                            <img src={vec} alt="Work Process" className="w-full max-w-md" />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
