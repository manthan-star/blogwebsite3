import { About } from "@/component/Home/About";
import BlogCards from "@/component/Home/Blog";
import Hero from "@/component/Home/Hero";
import Footer from "@/component/layout/Footer";
import { Navbar } from "@/component/layout/Navbar";

export default function UserPage(){
    return(
        <div className="">
            <Navbar />
            <Hero />
            <BlogCards />
            <About />
            <Footer/>
        </div>
    )
}