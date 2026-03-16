import { Apple, TreePalm, Volleyball } from "lucide-react"
import Link from "next/link"

export default function BlogCards() {
    const Category = [
        {
            title: "Nature Category",
            description: "Explore the beauty of the natural world, from stunning landscapes to wildlife and environmental stories that inspire and educate.",
            icon: TreePalm,
            text: "text-blue-700",
            name: "Learn More",
        },
        {
            title: "Sport Category",
            description: "Stay updated with the latest matches, player highlights, and exciting sports stories that keep fans informed and engaged.",
            icon: Volleyball,
            text: "text-blue-700",
            name: "Learn More",
        },
        {
            title: "Food Category",
            description: "Discover delicious recipes, food stories, and culinary experiences that delight your taste buds and inspire your cooking adventures.",
            icon: Apple,
            text: "text-blue-700",
            name: "Learn More",
        },
    ]

    return (
        <section id="category" className="bg text-white py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl text-white sm:text-4xl mb-4 font-bold ">Our Key Blog</h2>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">We offer diverse content across sports, nature, and food to inform and inspire our audience.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Category.map((service, index) => (

                        <Link href={`/dashboard`} key={index} className="group relative p-8 rounded-2xl glass border border-white/10 bg-black hover:bg-white/10">
                            <div className={`inline-flex rounded-xl p-3 border border-white mb-6`}><service.icon className={`h-6 w-6 ${service.text}`} /></div>
                            <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-700">{service.title}</h3>
                            <p className="text-zinc-400 mb-6">{service.description}</p>
                            <span className="text-sm font-medium text-primary flex items-center group-hover:text-blue-700 ">
                                {service.name}<span className="ml-1 group-hover:translate-x-1">→</span>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )

}