import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdOutlinePayment } from "react-icons/md";
import { IoStarOutline } from "react-icons/io5";

function Fitur() {
  return (
    <section className="w-full flex flex-col md:flex-row md:justify-center md:items-start gap-5 md:px-50 px-5 my-10">

      {/* CARD 1 */}
      <div className="flex flex-col items-center text-center gap-3 shadow border border-black/10 px-5 py-7 rounded-2xl w-full">
        <CiDeliveryTruck className="bg-base/10 text-base text-7xl rounded-xl p-2" />
        <h1 className="font-semibold text-lg">Fast Delivery</h1>
        <p className="text-sm text-gray-600">
          Get your food delivered in 30 minutes or less
        </p>
      </div>

      {/* CARD 2 */}
      <div className="flex flex-col items-center text-center gap-3 shadow border border-black/10 px-5 py-7 rounded-2xl w-full">
        <MdOutlinePayment className="bg-base/10 text-base text-7xl rounded-xl p-2" />
        <h1 className="font-semibold text-lg">Easy Payment</h1>
        <p className="text-sm text-gray-600">
          Pay with COD, QRIS, or bank transfer
        </p>
      </div>

      {/* CARD 3 */}
      <div className="flex flex-col items-center text-center gap-3 shadow border border-black/10 px-5 md: py-7 rounded-2xl w-full">
        <IoStarOutline className="bg-base/10 text-base text-7xl rounded-xl p-2" />
        <h1 className="font-semibold text-lg">Quality Food</h1>
        <p className="text-sm text-gray-600">
          Fresh ingredients and authentic recipes
        </p>
      </div>

    </section>
  );
}

export default Fitur;
