
import Footer from "@/component/layout/Footer";
import { Navbar } from "@/component/layout/Navbar";
import Image from "next/image";
import { title } from "process";

export default function AboutPage() {
    const Picture = [
        {
            title: "Nature Blog about",
            description: "Our Nature section is dedicated to celebrating the beauty and wonders of the natural world. From breathtaking landscapes and scenic trails to fascinating wildlife and environmental stories, we aim to inspire readers to explore, appreciate, and protect nature. Through stunning visuals and engaging content, we bring the outdoors closer to you, making every visit a journey into the heart of our planet.",
            image: '/nature.jpg'
        },
        {
            title: "Sport Blog about",
            description: "Our Nature section is dedicated to celebrating the beauty and wonders of the natural world. From breathtaking landscapes and scenic trails to fascinating wildlife and environmental stories, we aim to inspire readers to explore, appreciate, and protect nature. Through stunning visuals and engaging content, we bring the outdoors closer to you, making every visit a journey into the heart of our planet.",
            image: '/sport.jpg'
        },
        {
            title: "Food Blog about",
            description: "Our Nature section is dedicated to celebrating the beauty and wonders of the natural world. From breathtaking landscapes and scenic trails to fascinating wildlife and environmental stories, we aim to inspire readers to explore, appreciate, and protect nature. Through stunning visuals and engaging content, we bring the outdoors closer to you, making every visit a journey into the heart of our planet.",
            image: '/food.jpg'
        }
    ]
    return (
        <div className="">
            <Navbar />
            <section className="">
                <div className="bg-white min-h-screen">
                    <div className="py-25 min-h- font-bold text-black">
                        <h1 className="flex justify-center text-4xl pb-2">About Us</h1>
                        <p className="text-center">We share inspiring stories and insights from the worlds of sports, nature, and food.</p>
                    </div>
                    <div className="bg-black py-25">
                        {Picture.map((img, index) => (
                            <div key={img.title} className="mx-50 text-white">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="mt-4">
                                        <h1 className="flex py-5">{img.title}</h1>
                                        <p>{img.description}</p>
                                    </div>
                                    <div className="mt-4">
                                        <Image
                                        className=" rounded-md w-full"
                                        src={img.image} alt={""} width={100} height={100}/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />

        </div>
    )
}