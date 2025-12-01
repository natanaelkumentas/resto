import Image from 'next/image'
import React from 'react'
import Navbar from '@/components/Navbar'
import OrderHistoryCard from '@/components/ui/OrderHistoryCard'
import MembershipCard from '@/components/ui/MembershipCard'
import ProfileActions from '@/components/ui/ProfileActions'

export default function Page() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8">My Profile</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <ProfileActions />
                        <MembershipCard />
                    </div>

                    {/* Right Column - Order History */}
                    <div className="lg:col-span-2">
                        <OrderHistoryCard />
                    </div>
                </div>
            </div>
        </main>
    )

}
