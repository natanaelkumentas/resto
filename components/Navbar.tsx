import Link from 'next/link'
import React from 'react'
import { IoPersonOutline } from 'react-icons/io5'
import { LuShoppingCart } from 'react-icons/lu'

function Navbar() {
  return (
    <div className='flex justify-between bg-white text-black h-17.5 items-center shadow'>
    <div className='mx-20 text-[#FF7A00] text-xl font-semibold'>Logo</div>
    <div className='space-x-10'>
        <Link href="">Home</Link>
        <Link href="">Menu</Link>
        <Link href="">Membership</Link>
        <Link href="">About</Link>
        <Link href="">Contact</Link>
    </div>
    <div className='flex space-x-5 mx-20 items-center'>
        <div className='relative h-10 w-10 flex'> 
            <div className=' absolute top-1 z-10 left-5 w-5 justify-center flex rounded-full h-5 bg-[#ff7A00] text-white text-[10px] items-center'>1</div>
            <LuShoppingCart  
            className=' absolute top-3 left-2'
            />
        </div>
        <div className='flex space-x-2.5 items-center'><IoPersonOutline /> <div>Profile</div></div>
    </div>
    </div>
  )
}

export default Navbar