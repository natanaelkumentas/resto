import Fitur from '@/components/Fitur'
import Hero from '@/components/Hero'
import Membershippromo from '@/components/Membershippromo'
import Navbar from '@/components/Navbar'
import React from 'react'

function page() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Fitur />
      <Membershippromo />
    </div>
  )
}

export default page