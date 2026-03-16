"use client"

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, ChevronRight, LogOut, Settings, User, ChevronUp } from 'lucide-react';
import { Category } from '../../../model';
import { companyName } from '@/constants/name';
import Image from 'next/image';

const HeaderLinks = [
    { name: 'Home', href: '/dashboard' },
    { name: 'About Us', href: '/dashboard/about' },
];

const Header = [
    { name: 'Dashboard', href: '/admin', },
    { name: 'Category', href: '/category' },
    { name: 'Blog', href: '/blog' },
    { name: 'User', href: '/users' },
    { name: 'Comment', href: '/comment' },
];

interface Category {
    _id: string;
    category: string;
}

export function Navbar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isServicesOpen, setIsServicesOpen] = React.useState(false);
    const pathname = usePathname();
    const [role, setRole] = React.useState("");
    const [category, setCategory] = React.useState<Category[]>([]);
    const [showUserDropdown, setShowUserDropdown] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement | null>(null);
    const [image, setImage] = React.useState("");
    const [username, setUsername] = React.useState("");


    React.useEffect(() => {
        const role = sessionStorage.getItem("role")
        const image = sessionStorage.getItem("image");
        const username = sessionStorage.getItem("username");
        console.log('...............', role)
        setRole(role || "");
        setUsername(username || "");
        setImage(`/userImage/${image}` || "");
    }, []);

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setShowUserDropdown(false);
            }
        };
        if (showUserDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showUserDropdown]);

    React.useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const respo = await fetch("/api/mainId")
        const data = await respo.json();
        console.log(data.data);
        setCategory(data.data)
    }

    const handleSignOut = () => {
        sessionStorage.clear()
        router.push("/login");
        setShowUserDropdown(false);

    };

    return (
        <header className="fixed top-0 border border-white/10 z-50 bg-blue-600 w-full">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-white">
                            {companyName}
                        </span>
                    </Link>
                </div>

                {role === 'user' &&
                    <nav className="hidden md:flex md:items-center md:space-x-6">
                        {HeaderLinks.map((link) => (

                            <div key={link.name}
                                className="relative group h-16 flex items-center"
                            // onMouseEnter={() => setIsServices(true)}
                            // onMouseLeave={() => setIsServices(false)}
                            >
                                <Link
                                    href={link.href}
                                    className={`flex items-center text-sm font-bold hover:text-blue-950 py-4
                                            ${pathname === link.href ? 'text-blue-950' : 'text-zinc-300'}`}
                                // onClick={() => setIsServices(false)}
                                >
                                    {link.name}


                                    {/* <ChevronDown className={`h-4 w-4 ml-1 ${isServices ? 'rotate-180' : ''}`} /> */}
                                </Link>

                            </div>
                        ))}
                        {category.map((cate) => (
                            <div key={cate.category} className='relative group h-16 flex items-center'>
                                <Link
                                    href={`/dashboard/${cate.category}`}
                                    className={`flex items-center text-sm font-bold hover:text-blue-950 py-4
                                            ${pathname === `/dashboard/${cate.category}` ? 'text-blue-950' : 'text-zinc-300'}`}
                                // onClick={() => setIsServices(false)}
                                >
                                    {cate.category}


                                    {/* <ChevronDown className={`h-4 w-4 ml-1 ${isServices ? 'rotate-180' : ''}`} /> */}
                                </Link>
                            </div>
                        ))}
                    </nav>
                }

                {(role == 'admin' || role == 'author') &&
                    <nav className="hidden md:flex md:items-center md:space-x-6">
                        {Header.map((link) => (

                            <div key={link.name}
                                className="relative group h-16 flex items-center"
                            // onMouseEnter={() => setIsServices(true)}
                            // onMouseLeave={() => setIsServices(false)}
                            >
                                <Link
                                    href={link.href}
                                    className={`flex items-center text-sm font-bold hover:text-blue-950 py-4
                                            ${pathname === link.href ? 'text-blue-950' : 'text-white'}`}
                                // onClick={() => setIsServices(false)}
                                >
                                    {link.name}
                                    {/* {Category.map((cate) => (
                                    <div key={cate.mainId}>
                                        {cate?.mainId}
                                    </div>
                                ))} */}
                                    {/* <ChevronDown className={`h-4 w-4 ml-1 ${isServices ? 'rotate-180' : ''}`} /> */}
                                </Link>

                            </div>
                        ))}
                    </nav>
                }

                <div className="flex font-bold items-center justify-end gap-2 rounded-md pr-1  px-3">
                    <div className="">
                        {/* {fileName && */}
                        <Image src={image || username.charAt(0)} alt="" className="transition-all duration-300 h-11 w-10 rounded-full" width={50} height={100} />
                        {/* } */}
                    </div>
                    <div>
                        {username &&
                            <h1 className="text-white overflow-auto w-auto text-black-600">{username.toUpperCase()}</h1>
                        }
                    </div>



                    <div ref={dropdownRef} className="relative"><button
                        onClick={() => setShowUserDropdown(!showUserDropdown)}
                        className="flex items-center gap-2 justify-center cursor-pointer "
                    >
                        {showUserDropdown ? (
                            <ChevronUp className="w-5 h-4" />
                        ) : (
                            <ChevronDown className="w-5 h-4" />
                        )}
                    </button>
                        {showUserDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                <Link
                                    href=""
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => setShowUserDropdown(false)}
                                >
                                    <User className="w-5 h-4" />
                                    My Profile
                                </Link>
                                <Link
                                    href=""
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => setShowUserDropdown(false)}
                                >
                                    <Settings className="w-5 h-4" />
                                    Settings
                                </Link>
                                <hr className="my-1 border-gray-200" />
                                <button
                                    onClick={handleSignOut}
                                    className="flex w-full items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                >
                                    <LogOut className="w-5 h-4" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header >
    );
}
