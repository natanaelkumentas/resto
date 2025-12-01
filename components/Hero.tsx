"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowRight, FaStar } from "react-icons/fa";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="w-full h-screen px-6 md:px-50 py-20 bg-base/10 flex flex-col md:flex-row items-center justify-between gap-10 ">
      {/* LEFT */}
      <div className="max-w-xl space-y-5">
        {/* BADGE */}
        <div className="flex items-center gap-2 bg-white px-4 py-1 rounded-full shadow-sm border border-gray-200 w-fit">
          <FaStar className="text-[#FF7A00]" />
          <span className="text-sm font-medium text-[#FF7A00]">
            Authentic Indonesian Cuisine
          </span>
        </div>
        
        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight">
          Delicious Food <br />
          <span className="text-[#FF7A00]">Delivered to You</span>
        </h1>

        <p className="text-gray-600 text-lg max-w-md">
          Order your favorite Indonesian dishes online and enjoy fresh, delicious meals delivered right to your doorstep.
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => router.push("/menu")}
            className="flex cursor-pointer items-center gap-2 bg-[#FF7A00] hover:bg-white text-white hover:text-[#FF7A00] border border-[#FF7A00] transition px-6 py-3 rounded-lg font-medium shadow-sm"
          >
            Order Now <FaArrowRight />
          </button>

          <button
            onClick={() => router.push("/menu")}
            className="flex items-center cursor-pointer gap-2 bg-white hover:bg-[#FF7A00] text-[#FF7A00] hover:text-white border border-[#FF7A00] transition px-6 py-3 rounded-lg font-medium shadow-sm"
          >
            View Menu
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative">
        <div className="md:w-2xl w-90 h-90 md:h-[70vh] relative rounded-3xl overflow-hidden shadow-xl">
          <Image
            src="/image/img1.jpg"
            alt="Food Bowl"
            fill
            className="object-cover"
          />
        </div>

        {/* FLOATING DELIVERY BADGE */}
        <div className="absolute -bottom-6 left-10 bg-white shadow-md px-6 py-3 rounded-2xl flex items-start gap-3 border border-gray-200">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
            🚚
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-sm">Fast Delivery</p>
            <p className="text-gray-500 text-xs">30 mins avg</p>
          </div>
        </div>
      </div>
    </section>
  );
}
