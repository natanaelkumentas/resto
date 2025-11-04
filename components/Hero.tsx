import React from 'react'
import { FaArrowRight, FaStar } from 'react-icons/fa'

function Hero() {
  return (
    <div>
        <div>
            <div>
                <div><FaStar className='base-color'/></div>
                <div>Authentic Indonesian Cuisine</div>
            </div>
            <div className='text-black'>Delicious Food</div>
            <div className='base-color'>Delivered to You</div>
            <div>Order your favorite indonesian dishes online and enjoy fresh, delicious meals delivered right to your doorstep.</div>
            <div>
                <div><button><div>Order Now</div><FaArrowRight /> </button></div>
            </div>
        </div>
        <div></div>
    </div>
  )
}

export default Hero