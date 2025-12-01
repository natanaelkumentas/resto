import React from 'react'
import { FaCheck } from 'react-icons/fa'


function MembershipCard() {

    const benefits = ["10% off on all orders", "Free delivery above Rp 50,000", "Priority support"]
    return (
        <div className="bg-orange-500 text-white rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2 font-bold text-lg">
                <FaCheck size={20} />
                Membership Benefits
            </div>

            <div className="space-y-3">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <FaCheck size={18} className="shrink-0" />
                        <span className="text-sm">{benefit}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MembershipCard