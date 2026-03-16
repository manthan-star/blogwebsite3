import { companyName } from "@/constants/name";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-blue-950 border-t border-white/10 text-zinc-300">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
                    <div className="">
                        <h3 className="inline-block text-white font-bold text-xl mb-4">{companyName}</h3>
                        <p className="text-zinc-400 text-sm mb-4 mr-50">Empowering businesses with cutting-edge technology solutions, engineering excellence, and digital transformation services.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-violet-800">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="#" className="hover:text-violet-800"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-violet-800"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-violet-800"><Instagram className="h-5 w-5" /></a>
                        </div>
                        
                    </div>
                    <div className="justify-end">
                        <h3 className=" mb-4 flex text-white font-semibold uppercase text-sm">Contact</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center">
                                <MapPin className="text-white h-5 w-5 mr-2" />
                                <p className="ml-2 text-zinc-400">1009 Bopal Approach, Ahmedabad,<br />
                                    Innovation City, 560102</p>
                            </li>
                            <li className="flex items-center">
                                <Phone className="text-text-white h-5 w-5 mr-2" />
                                <p className="ml-2 text-zinc-400">+91 9876543210</p>
                            </li>
                            <li className="flex items-center">
                                <Mail className="text-text-white h-5 w-5 mr-2" />
                                <p className="ml-2 text-zinc-400">hello@techecy.com</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-8 border-t border-white/10 pt-8 flex-col text-zinc-500 text-sm md:flex-row">
                    <h2 className="text-zinc-400">&copy; 2025 {companyName}. All rights reserved.</h2>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}