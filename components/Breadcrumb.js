import React from 'react'
import { useRecoilState } from 'recoil';
import { cartState } from "../atoms/cartState"
import toast from 'react-hot-toast';

const Breadcrumb = () => {


    return (
        <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
            <nav className="bg-grey-light rounded-md w-full" aria-label="breadcrumb">
            <ol className="list-reset flex">
                <li><a href="#" className="text-gray-500 hover:text-gray-600">Home</a></li>
                <li><span className="text-gray-500 mx-2">/</span></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-600">Library</a></li>
                <li><span className="text-gray-500 mx-2">/</span></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-600">Data</a></li>
            </ol>
            </nav>
        </div>
        </nav>
    )
}

export default Breadcrumb