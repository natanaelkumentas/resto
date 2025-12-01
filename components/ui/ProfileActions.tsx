"use client"

import { useRouter } from "next/navigation";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPencilAlt, FaSignOutAlt } from "react-icons/fa"

function ProfileActions() {
    const router = useRouter();
    return (
        

        <div className="space-y-4">
            {/* Profile Card */}
            <div className="bg-white  border border-slate-200  rounded-lg p-8 text-center">
                {/* Avatar */}
                <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-3xl font-bold">JD</span>
                </div>

                {/* Name */}
                <h2 className="text-2xl font-bold mb-2">John Doe</h2>

                {/* Premium Member Badge */}
                <div className="inline-block bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
                    👑 Premium Member
                </div>

                {/* Member Since */}
                <p className="text-sm text-muted-foreground mb-6">Member since January 2024</p>

                {/* Contact Info */}
                <div className="space-y-3 text-left py-4 border-t border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <FaEnvelope className="text-orange-500" />
                        <span className="text-sm text-muted-foreground">john.doe@example.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaPhone className="text-orange-500" />
                        <span className="text-sm text-muted-foreground">+62 812-3456-7890</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-orange-500" />
                        <span className="text-sm text-muted-foreground">Jl. Merdeka No. 123, Jakarta, Indonesia</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
                <button 
                onClick={() => router.push("/login")}
                className="w-full border border-slate-200 rounded-lg py-3 px-4 font-semibold text-red-500 hover:bg-red-50 transition flex items-center justify-center gap-2">
                    <FaSignOutAlt className="text-red-500" size={18} />
                    Logout
                </button>
            </div>
        </div>
    )
}

export default ProfileActions