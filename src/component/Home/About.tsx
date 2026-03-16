"use client"
import { useEffect, useState } from "react";

interface Category {
    _id: string;
    category: string;
    description: string;
}

export function About() {
    const [category, setCategory] = useState<Category[]>([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const respo = await fetch("/api/mainId")
        const data = await respo.json();
        console.log(data.data);
        setCategory(data.data)
    }

    // const about = [
    //     {
    //         title: "Sports",
    //         description: "Stay updated with the latest match results, player highlights, and exciting stories from the world of sports.",
    //     },
    //     {
    //         title: "Nature",
    //         description: "Explore breathtaking landscapes, wildlife adventures, and insightful environmental stories that showcase the beauty of our planet.",
    //     },
    //     {

    //         title: "Food",
    //         description: "Enjoy delicious recipes, street food experiences, restaurant reviews, and culinary tips to satisfy every food lover."
    //     }
    // ]
    return (
        <section id="category" className="bg-white text-black py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl text-black sm:text-4xl mb-4 font-bold ">About Us</h2>
                    <p className="text-lg text-black max-w-2xl w-auto text-center mx-auto">Welcome to our blog, your ultimate destination for everything related to sports, nature, and food. Our mission is to inspire, inform, and entertain readers by bringing together diverse stories in one place.</p>
                </div>

                <div className="flex gap-4">
                    {category.map((service, index) => (

                        <div key={index} className="group relative p-8 rounded-2xl border">
                            <h3 className="text-xl font-semibold mb-3">{service.category}</h3>
                            <p className="text-gray-700 mb-6">{service.description}</p>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}