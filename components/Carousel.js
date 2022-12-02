import React from 'react'
import Image from 'next/image'
const Carousel = () => {

    return (
            <>
                    <div id="carouselExampleIndicators" className="" data-bs-ride="carousel">
                        <div className="">
                            <div className="">
                            <img
                                src="/b2.jpg"
                                className="w-full h-18"
                                alt=""
                                height="50px"
                            />
                            </div>
                        </div>
                    </div>            
            </>
    )
}

export default Carousel