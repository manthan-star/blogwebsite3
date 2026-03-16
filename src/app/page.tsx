"use client"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react"


export default function Home() {

  const router = useRouter();

  const animationTime = 1;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!window.sessionStorage.getItem('username') && !window.sessionStorage.getItem('email') ) {
        router.push("/login");
      }else{
        router.push('/dashboard')
      }
    }, animationTime * 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#7494ec] ">
      <h1 className="inline-block justify-center items-center font-bold text-4xl animate-zoomIn">Welcome to Blog</h1>
    </div>
  )
}