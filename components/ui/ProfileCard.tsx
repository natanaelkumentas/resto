import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { FaCrown } from "react-icons/fa";

interface User {
    name: string;
    email: string;
    phone: string;
    address: string;
    memberSince: string;
    isMember: boolean;
}

interface ProfileCardProps {
    user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
    const initials = user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("");

    return (
        <div className="bg-white shadow rounded-2xl p-6 text-center">
            {/* Avatar */}
            <div className="w-24 h-24 mx-auto rounded-full bg-linear-to-br from-[#FF7A00] to-[#FF5722] flex items-center justify-center text-white text-3xl font-semibold mb-4">
                {initials}
            </div>

            {/* Name */}
            <h2 className="text-xl font-semibold mb-1">{user.name}</h2>

            {/* Premium Badge */}
            {user.isMember && (
                <div className="inline-flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium mb-3">
                    <FaCrown className="w-3 h-3" />
                    Premium Member
                </div>
            )}

            {/* Member Since */}
            <p className="text-sm text-gray-600 mb-4">
                Member since {user.memberSince}
            </p>

            {/* Separator */}
            <div className="w-full h-px bg-gray-200 my-4" />

            {/* Profile Details */}
            <div className="space-y-4 text-left text-sm">
                <div className="flex items-start gap-3">
                    <AiOutlineMail className="w-5 h-5 text-[#FF7A00] mt-0.5" />
                    <span className="text-gray-600 break-all">{user.email}</span>
                </div>

                <div className="flex items-start gap-3">
                    <AiOutlinePhone className="w-5 h-5 text-[#FF7A00] mt-0.5" />
                    <span className="text-gray-600">{user.phone}</span>
                </div>

                <div className="flex items-start gap-3">
                    <GoLocation className="w-5 h-5 text-[#FF7A00] mt-0.5" />
                    <span className="text-gray-600">{user.address}</span>
                </div>
            </div>
        </div>
    );
}
