import React from 'react'

const CartList = ({ data }) => {
  const { name, image, quantity, price } = data

  return (
    <>
    <ul className="py-6 border-b space-y-6 px-8">
    
    {
    
    data.map(item => 
        <li className="grid grid-cols-6 gap-2 border-b-1">
        <div className="col-span-1 self-center">
            <img src={`https://dmrufagccpgeyzmftmwj.supabase.co/storage/v1/object/public/arquivos/${item.img_url}`} alt="Product" className="rounded w-full"/>
        </div>
        <div className="flex flex-col col-span-3 pt-2">
            <span className="text-gray-600 text-md font-semi-bold">{item.title}</span>
        </div>
        <div className="col-span-2 pt-3">
            <div className="flex items-center space-x-2 text-sm justify-between">
                <span className="text-gray-400">{item.quantity} x {item.price}</span>
                <span className="text-indigo-400 font-semibold inline-block">{(item.price * item.quantity).toLocaleString('en-US', {  style: 'currency',  currency: 'BRL',})}</span>
            </div>
        </div>
    </li>
    )
    
    
    }
                
    
</ul>

</>
  )
}

export default CartList