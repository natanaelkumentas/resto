"use client"

import { LuGift } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";


function Membershippromo() {
    const router = useRouter();
  return (
    <section className="bg-linear-to-br from-[#FF7A00] to-[#FF5722] text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* LEFT CONTENT */}
          <div>
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-4">
              <LuGift className="w-4 h-4" />
              <span className="text-sm">Special Offer</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Join Our Membership Program
            </h2>

            <p className="text-lg mb-6 text-white/90">
              Get exclusive benefits and enjoy amazing discounts on all your orders!
            </p>

            {/* Checklist */}
            <ul className="space-y-3 mb-6">
              {[
                "10% discount on all orders",
                "Free delivery for orders above Rp 50,000",
                "Priority customer support",
                "Early access to new menu items",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                    <FaCheck className="text-white text-xs" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              onClick={() => router.push("/membership")}
              className="bg-white text-base px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 active:scale-95 transition"
            >
              Join Now
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative hidden md:block">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/image/img1.jpg"
                alt="Restaurant"
                width={600}
                height={600}
                className="w-full aspect-square object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Membershippromo;
