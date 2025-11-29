"use client";

import React from "react";
import { LuCrown } from "react-icons/lu";
import { LiaMedalSolid } from "react-icons/lia";
import { FaCheck } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { RiVipCrown2Fill } from "react-icons/ri";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* HERO */}
      <section className="bg-linear-to-br from-orange-50 to-red-50 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow mb-6">
            <LuCrown className="text-base" />
            <span className="text-sm">Join Our Exclusive Membership</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Unlock Exclusive Benefits
          </h1>

          <p className="text-gray-600 text-lg">
            Become a member and enjoy amazing discounts, free delivery, and
            priority service. Choose the plan that suits your needs and start
            saving on every order!
          </p>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="px-4 py-14 md:py-20 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-semibold mb-3">Why Become a Member?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our membership program is designed to give you the best value and
            experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LiaMedalSolid className="text-base text-4xl" />
            </div>
            <h3 className="font-semibold mb-2">Save More Money</h3>
            <p className="text-sm text-gray-600">
              Enjoy up to 15% discount on all menu items with our premium plans
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaRegStar className="text-base text-3xl" />
            </div>
            <h3 className="font-semibold mb-2">Priority Service</h3>
            <p className="text-sm text-gray-600">
              Get faster order processing and dedicated customer support
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <RiVipCrown2Fill className="text-base text-3xl" />
            </div>
            <h3 className="font-semibold mb-2">Exclusive Perks</h3>
            <p className="text-sm text-gray-600">
              Access to special events, new menu previews, and birthday rewards
            </p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="px-4 py-10 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-3">Choose Your Plan</h2>
          <p className="text-gray-600">
            Select the membership tier that works best for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* SILVER */}
          <div className="bg-white rounded-2xl shadow p-8 relative">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-1">Silver</h3>

              <div className="flex items-end justify-center gap-1">
                <span className="text-4xl text-base font-bold">Rp 49K</span>
                <span className="text-gray-500 mb-2">/month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex gap-3">
                <div className="bg-green-100 w-5 h-5 rounded-full flex items-center justify-center">
                  <FaCheck className="text-green-600 text-xs" />
                </div>
                <span className="text-sm">5% discount on all orders</span>
              </li>

              <li className="flex gap-3">
                <div className="bg-green-100 w-5 h-5 rounded-full flex items-center justify-center">
                  <FaCheck className="text-green-600 text-xs" />
                </div>
                <span className="text-sm">
                  Free delivery for orders above Rp 75,000
                </span>
              </li>

              <li className="flex gap-3">
                <div className="bg-green-100 w-5 h-5 rounded-full flex items-center justify-center">
                  <FaCheck className="text-green-600 text-xs" />
                </div>
                <span className="text-sm">Priority customer support</span>
              </li>
            </ul>

            <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition">
              Buy Silver Plan
            </button>
          </div>

          {/* GOLD - Most Popular */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-[#FF7A00] scale-105 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF7A00] text-white px-4 py-1 rounded-full text-sm shadow">
              Most Popular
            </div>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-1">Gold</h3>

              <div className="flex items-end justify-center gap-1">
                <span className="text-4xl text-base font-bold">Rp 79K</span>
                <span className="text-gray-500 mb-2">/month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex gap-3">
                <div className="bg-green-100 w-5 h-5 rounded-full flex items-center justify-center">
                  <FaCheck className="text-green-600 text-xs" />
                </div>
                <span className="text-sm">10% discount on all orders</span>
              </li>

              <li className="flex gap-3">
                <div className="bg-green-100 w-5 h-5 rounded-full flex items-center justify-center">
                  <FaCheck className="text-green-600 text-xs" />
                </div>
                <span className="text-sm">
                  Free delivery for orders above Rp 50,000
                </span>
              </li>

              <li className="flex gap-3">
                <div className="bg-green-100 w-5 h-5 rounded-full flex items-center justify-center">
                  <FaCheck className="text-green-600 text-xs" />
                </div>
                <span className="text-sm">VIP customer support</span>
              </li>
            </ul>

            <button className="w-full bg-base text-white py-3 rounded-lg hover:bg-[#FF5722] transition">
              Buy Gold Plan
            </button>
          </div>

          {/* PLATINUM */}
          <div className="bg-white rounded-2xl shadow p-8 relative">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-1">Platinum</h3>

              <div className="flex items-end justify-center gap-1">
                <span className="text-4xl text-base font-bold">Rp 99K</span>
                <span className="text-gray-500 mb-2">/month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex gap-3">
                <div className="bg-green-100 w-5 h-5 rounded-full flex items-center justify-center">
                  <FaCheck className="text-green-600 text-xs" />
                </div>
                <span className="text-sm">15% discount on all orders</span>
              </li>

              <li className="flex gap-3">
                <div className="bg-green-100 w-5 h-5 rounded-full flex items-center justify-center">
                  <FaCheck className="text-green-600 text-xs" />
                </div>
                <span className="text-sm">Unlimited free delivery</span>
              </li>

              <li className="flex gap-3">
                <div className="bg-green-100 w-5 h-5 rounded-full flex items-center justify-center">
                  <FaCheck className="text-green-600 text-xs" />
                </div>
                <span className="text-sm">Exclusive monthly gifts</span>
              </li>
            </ul>

            <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition">
              Buy Platinum Plan
            </button>
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="px-4 py-20 max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-2xl p-10 text-center">
          <h3 className="text-xl font-semibold mb-3">Need Help Choosing?</h3>
          <p className="text-gray-600 mb-6">
            Contact our support team and well help you find the perfect
            membership plan for your needs.
          </p>
          <button className="px-6 py-3 border border-base text-base rounded-lg hover:bg-base hover:text-white transition">
            Contact Support
          </button>
        </div>
      </section>
    </div>
  );
}
