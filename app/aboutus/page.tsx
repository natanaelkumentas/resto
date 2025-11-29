"use client";

import { 
  FaTruck, 
  FaAward, 
  FaDollarSign, 
  FaHeart, 
  FaUsers, 
  FaBullseye 
} from "react-icons/fa";
import Image from "next/image";
import Navbar from "@/components/Navbar";

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps = {}) {
  const features = [
    {
      icon: <FaTruck className="w-8 h-8 text-orange-500" />,
      title: 'Fast Delivery',
      description: 'We guarantee delivery within 30-45 minutes to keep your food fresh and hot.',
    },
    {
      icon: <FaAward className="w-8 h-8 text-orange-500" />,
      title: 'Quality Food',
      description: 'Only the finest ingredients and authentic Indonesian recipes in every dish.',
    },
    {
      icon: <FaDollarSign className="w-8 h-8 text-orange-500" />,
      title: 'Affordable Price',
      description: 'Delicious food at reasonable prices with special discounts for members.',
    },
  ];

  const values = [
    {
      icon: <FaHeart className="w-6 h-6 text-orange-500" />,
      title: 'Customer First',
      description: 'We prioritize customer satisfaction in everything we do.',
    },
    {
      icon: <FaUsers className="w-6 h-6 text-orange-500" />,
      title: 'Community',
      description: 'Building connections through shared love of great food.',
    },
    {
      icon: <FaBullseye className="w-6 h-6 text-orange-500" />,
      title: 'Excellence',
      description: 'Committed to delivering the best quality and service.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-linear-to-br from-orange-50 to-red-50 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl mb-4 font-bold">
            About Rumah Makan Online
          </h1>
          <p className="text-gray-600 text-lg">
            Bringing authentic Indonesian flavors to your home with convenience and care
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 2020, Rumah Makan Online started with a simple mission: 
                delivering authentic Indonesian cuisine fresh to your doorstep.
              </p>
              <p>
                From a small family kitchen, we have grown into an online restaurant 
                trusted by thousands across Jakarta.
              </p>
              <p>
                Every dish is prepared with love using the finest ingredients by experienced chefs.
              </p>
            </div>
          </div>
          <div className="rounded-2xl relative overflow-hidden shadow-xl">
            <Image
              src="/image/img1.jpg"
              alt="Restaurant"
              width={600}
              height={600}
              className="w-full aspect-square object-cover"
            />
          </div>
        </div>


        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-linear-to-br from-orange-500 to-orange-600 text-white rounded-xl p-8 shadow-md">
            <h3 className="text-2xl mb-3 font-semibold">Our Mission</h3>
            <p className="text-white/90">
              To provide delicious, authentic Indonesian food with exceptional service,
              while supporting local communities and sustainability.
            </p>
          </div>

          <div className="bg-linear-to-br from-gray-900 to-gray-800 text-white rounded-xl p-8 shadow-md">
            <h3 className="text-2xl mb-3 font-semibold">Our Vision</h3>
            <p className="text-white/90">
              To become Indonesias most trusted online food service known for quality,
              authenticity, and innovation.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold mb-2">Why Choose Us</h2>
            <p className="text-gray-600">We stand out with our commitment to excellence</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((item, index) => (
              <div key={index} className="bg-white shadow rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold mb-2">Meet Our Team</h2>
            <p className="text-gray-600">
              Dedicated professionals passionate about great food
            </p> 
          </div>
          <div className="max-w-3xl mx-auto overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/image/img1.jpg"
              alt="Restaurant"
              width={600}
              height={600}
              className="w-full aspect-square object-cover"
              />
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold mb-2">Our Values</h2>
            <p className="text-gray-600">Principles that guide our service</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-linear-to-br from-orange-500 to-orange-600 text-white py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Ready to Experience Authentic Indonesian Flavors?
        </h2>
        <p className="text-white/90 mb-8 max-w-xl mx-auto">
          Join thousands of satisfied customers and order your favorite dishes today.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => onNavigate?.('menu')}
            className="px-6 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100"
          >
            Order Now
          </button>

          <button
            onClick={() => onNavigate?.('menu')}
            className="px-6 py-3 border border-white/50 rounded-lg text-white hover:bg-white/20"
          >
            View Menu
          </button>
        </div>
      </section>
    </div>
  );
}
