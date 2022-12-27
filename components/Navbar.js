import Link from 'next/link'
import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import Image from 'next/image'
import Breadcrumb from './Breadcrumb'
import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useSelector } from 'react-redux';

const Navbar = () => {


  
  // Selecting cart from global state
  const cart = useSelector((state) => state.cart);

  // Getting the count of items
  const getItemsCount = () => {
    return cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
  };


    const [active, setActive] = useState(false);

    const supabaseClient = useSupabaseClient()
    const user = useUser()
    const [data, setData] = useState()
  
    useEffect(() => {
      async function loadData() {
        const { data } = await supabaseClient.from('test').select('*')
        setData(data)
      }
      // Only run query once user is logged in.
      if (user) loadData()
    }, [user])
  


    const handleClick = () => {
      setActive(!active);
    };
  



    if (!user)
    return (
      <>

                <nav className="flex items-center flex-wrap bg-gray-900 p-5 pl-5 pr-5">
                <Link href="/">
                  <Image src="/logo.jpeg" className="rounded-full cursor-pointer " width="50" height="50"/>
                </Link>
                        
                <button
                  className=" inline-flex p-3 hover:bg-gray-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none"
                  onClick={handleClick}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
                <div
                  className={`${
                    active ? "" : "hidden"
                  }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
                >
                  <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
                  


                  <Link href="   inho" className="lg:inline-flex lg:w-auto w-full px-3 text-white py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-600 hover:text-white">
                        <div className="mr-10 cursor-pointer">         
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-cart"
                                className="w-4 text-white" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512">
                                <path fill="#fff"
                                    d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z">
                                </path>
                            </svg>

                            <span className="text-white bg-red-700 absolute rounded-full text-xs -mt-2.5 ml-2 py-0 px-1.5">{getItemsCount()}</span>
                        </div>
                    </Link>

                    <Link href="/sobre">
                      <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-600 hover:text-white">
                        Sobre
                      </a>
                    </Link>

                    <Link href="/login">
                      <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded border-solid text-white font-bold items-center justify-center hover:bg-gray-600 hover:text-white">
                        Entrar
                      </a>
                    </Link>

                  </div>
                </div>
                </nav>

            </>
    )



    return (
            <>

                <nav className="flex items-center flex-wrap bg-gray-900 p-5 pl-5 pr-5">
                <Link href="/">
                  <Image src="/logo.jpeg" className="rounded-full cursor-pointer " width="50" height="50"/>
                </Link>
                        
                <button
                  className=" inline-flex p-3 hover:bg-gray-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none"
                  onClick={handleClick}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
                <div
                  className={`${
                    active ? "" : "hidden"
                  }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
                >
                  <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto justify-between">
                  


                  <Link href="/carrinho" className="lg:inline-flex lg:w-auto w-full px-3 text-white py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-600 hover:text-white">
                        <div className="mr-10 cursor-pointer">         
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-cart"
                                className="w-4 text-white" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512">
                                <path fill="#fff"
                                    d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z">
                                </path>
                            </svg>

                            <span className="text-white bg-red-700 absolute rounded-full text-xs -mt-2.5 ml-2 py-0 px-1.5">{getItemsCount()}</span>
                        </div>
                    </Link>

                    <Link href="/sobre">
                      <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-600 hover:text-white">
                        Sobre
                      </a>
                    </Link>

                      <a onClick={() => supabaseClient.auth.signOut()} className="cursor-pointer   lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-600 hover:text-white">
                        Sair
                      </a>
                    
                  
                    <Link href="/perfil" className="cursor-pointer lg:inline-flex lg:w-auto w-full px-3 text-white py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-600 hover:text-white">
                      <Image src={user.user_metadata.avatar_url} className="rounded-full cursor-pointer" width="30" height="30"/>
                    </Link>
                  
                  </div>
                </div>
                </nav>

            </>
    )
}

export default Navbar