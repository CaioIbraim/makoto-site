import Link from 'next/link'
import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useRecoilState } from 'recoil'
import { cartState } from '../atoms/cartState'
import Image from 'next/image'
import Breadcrumb from './Breadcrumb'
const Navbar = () => {

    const [cartItem] = useRecoilState(cartState)

    return (
            <>
       



       <header className="flex flex-wrap">
 <nav className="flex w-screen justify-between bg-gray-50 text-gray-600">
     <div className="w-full xl:px-12 py-6 px-5 flex space-x-12 items-center ">
         <a className="text-2xl font-bold" href="#">
             Your Logo
         </a>
         <ul className="hidden md:flex mx-auto px-5 font-semibold space-x-12">
             <li><a className="hover:text-gray-900" href="#">Home</a></li>
             <li><a className="hover:text-gray-900" href="#">Products</a></li>
             <li><a className="hover:text-gray-900" href="#">Contact Us</a></li>
         </ul>
         <div className="flex-grow border-2 py-1 px-3 lg:flex justify-between round hidden">
             <input className="flex-grow text-gray-600 focus:outline-none" type="text" placeholder="Search Product ..." />
             <span>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 hover:text-gray-600 transition duration-100 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                 </svg>
             </span>
         </div>
         <div className="hidden xl:flex items-center text-gray-600 space-x-5 items-center">
             <a className="hover:text-gray-900" href="#">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                 </svg>
             </a>
             <a className="flex items-center hover:text-gray-900" href="#">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                 </svg>
                 <span className="absolute flex ml-4 -mt-5">
                     <span className="h-3 w-3 animate-ping absolute inline-flex rounded-full bg-pink-500 opacity-75"></span>
                     <span className="h-3 w-3 relative inline-flex rounded-full bg-pink-600"></span>
                 </span>
             </a>
         </div>
     </div>
     <a className="flex xl:hidden items-center mr-6 hover:text-gray-900" href="#">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
         </svg>
         <span className="flex absolute -mt-5 ml-4">
           <span className="h-3 w-3 absolute bg-pink-500 opacity-75 inline-flex rounded-full animate-ping"></span>
           <span className="h-3 w-3 relative inline-flex rounded-full bg-pink-600"></span>
         </span>
     </a>
     <a className="xl:hidden self-center mr-12 hover:text-gray-900" href="#">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
         </svg>
     </a>
 </nav>
</header>
        </>
    )
}

export default Navbar











