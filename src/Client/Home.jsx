import Header from "../Components/Header";
import Banner from "../Components/Banner";
import Footer from "../Components/Footer";
import ItemCard from "../Components/ItemCard";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Home() {
    const URL = "http://localhost:8080";
    const [maleData, setMaleData] = useState([])
    const [femaleData, setFemaleData] = useState([])

    function MaleWearData() {
        axios
            .get(`${URL}/MaleWear/`)
            .then((response) => {
                if (response.status === 200) {
                    var data = response.data.List;
                    setMaleData(data);
                }

            })
            .catch((err) => {
                console.error(err);
            });
    }
    function FemaleWearData() {
        axios
            .get(`${URL}/FemaleWear/`)
            .then((response) => {
                if (response.status === 200) {
                    var data = response.data.List;
                    setFemaleData(data);
                }

            })
            .catch((err) => {
                console.error(err);
            });
    }
    useEffect(() => {
        MaleWearData();
        FemaleWearData();
    }, []);



    return (
        <>
            <Header />
            <Banner />

            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    {/* Section Heading */}
                    <div className="text-center mb-10">
                        <h2 className="font-bold text-4xl text-red-600">Explore Good Clothes</h2>
                        <p className="text-black mt-2 text-lg">Every day is a fashion show, and the world is your runway.</p>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {maleData.slice(0, 3).map((item, index) => (
                            <ItemCard
                                key={index}
                                title={item.title}
                                itemImg={item.image}
                                price={item.price}
                                category={item.category}
                                subcategory={item.subcategory}
                                size={item.size}
                                description={item.description}
                                status={item.status}
                            />
                        ))}
                        {femaleData.slice(0, 3).map((item, index) => (
                            <ItemCard
                                key={index}
                                title={item.title}
                                itemImg={item.image}
                                price={item.price}
                                category={item.category}
                                subcategory={item.subcategory}
                                size={item.size}
                                description={item.description}
                                status={item.status}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
