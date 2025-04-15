import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ItemCard from "../Components/ItemCard";
import PageTitle from "../Components/PageTitle";
import axios from "axios";

export default function MaleWear() {

    const URL = "http://localhost:8080/MaleWear/";
    const [maleData, setMaleData] = useState([])
    function MaleWearData() {
        axios
            .get(URL)
            .then((response) => {
                if (response.status === 200) {
                    var data = response.data.List;
                    setMaleData(data);
                    console.log(data);
                }

            })
            .catch((err) => {
                console.error(err);
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
                <div className="container">
                    <div className="row ">
                        {(maleData || []).map((item, index) => (
                            <div className="card px-2 my-2" key={index}>
                                <div className="card-body rounded-lg shadow-lg text-center row flex-row justify-start">
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
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
