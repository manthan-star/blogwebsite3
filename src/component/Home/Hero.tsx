import { ChevronRight, MoveRight } from "lucide-react";

export default function Hero() {

    return (
        <section className="pt-20 pb-32 md:pt-32 md:pb-48 bg-white text-black">
            <div className="container mx-auto text-center px-4 relative z-10">

                <h4 className="mx-auto max-w-7xl font-sans text-black sm:text-7xl font-bold mb-8">
                    Play. Explore. Taste.<br />
                </h4>
                <p className="mx-auto max-w-2xl text-lg text-black mb-12">Yeh blog sports, nature aur food par based hai jahan aapko milenge exciting match updates, khoobsurat natural views aur tasty food stories. Har post simple, interesting aur informative hai, jo aapko padhne ke saath enjoy karne ka experience deta hai.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a href="#category" className="bg-blue-800  text-white inline-flex items-center justify-center min-w-[160px]whitespace-nowrap font-medium px-8 rounded-full h-12 text-lg">
                        Explore Blog <MoveRight className="ml-2 h-4 w-4 font-bold" />
                    </a>
                </div>
            </div>
        </section>
    );
}