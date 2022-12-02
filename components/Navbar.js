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
            <nav className="relative
                                w-full
                                flex flex-wrap
                                items-center
                                justify-between
                                py-4
                                bg-white
                                text-gray-500
                                hover:text-gray-700
                                focus:text-gray-700
                                shadow-lg
                                navbar navbar-expand-lg navbar-light
                                ">
            <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
                <Link href="/">
                    <Image src="/logo.jpeg" className="rounded-full cursor-pointer " width="50" height="50"/>
                </Link>
                
                
                <div className="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent">
                    <a className="flex  items-center
                                    text-gray-900
                                    hover:text-gray-900
                                    focus:text-gray-900
                                    mt-2
                                    lg:mt-0
                                    mr-1" href="#">

                        <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png" alt="" width={100} height={100}  loading="lazy" />
                    </a>
                    <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
                        <li className="nav-item p-2">
                            <a className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" href="#">Dashboard</a>
                        </li>
                        <li className="nav-item p-2">
                            <a className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" href="#">Team</a>
                        </li>
                        <li className="nav-item p-2">
                            <a className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" href="#">Projects</a>
                        </li>
                    </ul>
                </div>

                <div className="flex items-center relative">
                        
                        <Link href="/cart">
                            <div className="mr-10 cursor-pointer">         
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-cart"
                                    className="w-4" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512">
                                    <path fill="currentColor"
                                        d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z">
                                    </path>
                                </svg>

                                <span className="text-white bg-red-700 absolute rounded-full text-xs -mt-2.5 ml-2 py-0 px-1.5">{cartItem.length}</span>
                            </div>
                        </Link>

                    <div className="dropdown relative">
                        <a className="dropdown-toggle flex items-center hidden-arrow" href="/perfil" id="dropdownMenuButton2" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://mdbootstrap.com/img/new/avatars/2.jpg" className="rounded-full" alt="" width="25" height="25" loading="lazy" />
                        </a>
                        <ul className=" dropdown-menu
                                        min-w-max
                                        absolute
                                        hidden
                                        bg-white
                                        text-base
                                        z-50
                                        float-left
                                        py-2
                                        list-none
                                        text-left
                                        rounded-lg
                                        shadow-lg
                                        mt-1
                                        hidden
                                        m-0
                                        bg-clip-padding
                                        border-none
                                        left-auto
                                        right-0
                                    " aria-labelledby="dropdownMenuButton2">
                            <li>
                                <a className="
        dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
        hover:bg-gray-100
      " href="#">Action</a>
                            </li>
                            <li>
                                <a className="
        dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
        hover:bg-gray-100
      " href="#">Another action</a>
                            </li>
                            <li>
                                <a className="
        dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
        hover:bg-gray-100
      " href="#">Something else here</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>


        </>
    )
}

export default Navbar