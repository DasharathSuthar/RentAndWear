import axios from "axios";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import IconCard from "../Components/IconCard";
import PageTitle from "../Components/PageTitle";
import { useState } from "react";

export default function Contact() {
    const URL = "http://localhost:8080/Contact/";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(URL,formData);
            const data = await response.data;
            alert(data.message);
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            alert("Failed to submit request");
        }
    };

    return (
        <>
            <Header></Header>
            <PageTitle title={"Contact Us"} text={"lists of our all popular agencies"}></PageTitle>
            <section className="contact-us py-16">
                <div className="container">
                    <div className="grid grid-cols-3 mx-2 px-2">
                        <form className="col-span-2" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 mb-2">
                                <div className="mr-1" >
                                    <label className="text-black" htmlFor="name">Name</label>
                                    <br />
                                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                                        className="outline-none text-black bg-gray-300 px-2 py-2 rounded-md w-full border border-red-600" />
                                </div>
                                <div>
                                    <label className="text-black" htmlFor="email">Email</label>
                                    <br />
                                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                                        className="outline-none text-black bg-gray-300 px-2 py-2 rounded-md w-full border border-red-600" />
                                </div>
                            </div>
                            <div className="mb-2">
                                <label className="text-black" htmlFor="subject">Subject</label>
                                <br />
                                <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                                    className="outline-none text-black bg-gray-300 px-2 py-2 rounded-md w-full border border-red-600" />
                            </div>
                            <div className="mb-2">
                                <label className="text-black" htmlFor="message">Message</label>
                                <br />
                                <textarea name="message" rows={6} value={formData.message} onChange={handleChange}
                                    className="outline-none text-black bg-gray-300 px-2 py-2 rounded-md w-full border border-red-600"></textarea>
                            </div>
                            <div>
                                <button type="submit"
                                    className="px-4 py-2 rounded-md text-center border text-red-600 bg-gray-300 border-red-600 hover:bg-red-600 hover:text-white duration-100">
                                    Submit Request
                                </button>
                            </div>
                        </form>
                        <div className="contact-info px-3 mx-2">
                            <h2 className="font-bold text-3xl mb-3 text-[#2D3954]">Get In Touch</h2>
                            <p className="text-[#2D3954] text-lg">"Contact us for any queries or feedback. We would love to hear from you!"</p>

                            <IconCard icon={<i class="fa-solid fa-home "></i>} title={"Reach Us"} text={"A-402 ,City ,Modasa"}></IconCard>

                            <IconCard icon={<i class="fa-solid fa-envelope "></i>} title={"Drop a Mail"} text={"support@rentandwear.com  rentandwear@gmail.com"}></IconCard>

                            <IconCard icon={<i class="fa-solid fa-mobile "></i>} title={"Call Us"} text={"+91 9773088547"}></IconCard>
                        </div>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </>
    );
}
