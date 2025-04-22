import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ItemCard from "../Components/ItemCard";
import PageTitle from "../Components/PageTitle";
import axios from "axios";

export default function MaleWear() {
    const URL = "http://localhost:8080/MaleWear/";
    const [maleData, setMaleData] = useState([]);
    
    // Function to fetch Male Wear data
    function MaleWearData() {
        axios
            .get(URL)
            .then((response) => {
                if (response.status === 200) {
                    const data = response.data.List;
                    setMaleData(data);
                    console.log(data);
                }
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    }

    useEffect(() => {
        MaleWearData();  
    }, []);

    return (
        <>
            <Header />
            <PageTitle title={"Cloth & Shoe List "} text={"Fashion is nothing but a choice."} />
            
            <section className="cloth-list py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {(maleData || []).map((item, index) => {
                            // Ensure sizes are handled as an array
                            const sizes = Array.isArray(item.sizes) ? item.sizes : [item.size];  // Fallback to single item if sizes is not an array

                            return (
                                <div className="card px-2 my-2" key={index}>
                                    <div className="card-body rounded-lg shadow-lg text-center flex justify-start">
                                        <ItemCard
                                            key={index}
                                            title={item.title}
                                            itemImg={item.image}
                                            price={item.price}
                                            category={item.category}
                                            subcategory={item.subcategory}
                                            sizes={sizes}  // Pass sizes array
                                            description={item.description}
                                            status={item.status}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
