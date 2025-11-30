"use client";
import { useState } from "react";
import {
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaClock,
    FaWhatsapp,
    FaInstagram,
} from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Thank you for contacting us! We will get back to you soon.");
        setName("");
        setEmail("");
        setMessage("");
    };

    const contactInfo = [
        {
            icon: <FaMapMarkerAlt className="text-[#FF7A00] w-6 h-6" />,
            title: "Address",
            content: "Jl. Merdeka No. 123, Jakarta Pusat, DKI Jakarta 10110",
        },
        {
            icon: <FaPhone className="text-[#FF7A00] w-6 h-6" />,
            title: "Phone",
            content: "+62 812-3456-7890",
        },
        {
            icon: <FaEnvelope className="text-[#FF7A00] w-6 h-6" />,
            title: "Email",
            content: "info@rumahmakanonline.com",
        },
        {
            icon: <FaClock className="text-[#FF7A00] w-6 h-6" />,
            title: "Operating Hours",
            content: "Mon - Sun: 10:00 AM - 10:00 PM",
        },
    ];

    const socialMedia = [
        {
            name: "WhatsApp",
            icon: <FaWhatsapp className="w-6 h-6" />,
            handle: "+62 812-3456-7890",
            color: "bg-green-500 hover:bg-green-600",
        },
        {
            name: "Instagram",
            icon: <FaInstagram className="w-6 h-6" />,
            handle: "@rumahmakanonline",
            color: "bg-pink-500 hover:bg-pink-600",
        },
        {
            name: "Email",
            icon: <FaEnvelope className="w-6 h-6" />,
            handle: "info@rumahmakanonline.com",
            color: "bg-blue-500 hover:bg-blue-600",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            {/* HERO */}
            <section className="bg-linear-to-br from-orange-50 to-red-50 py-16">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h1 className="text-4xl md:text-5xl mb-4">Get in Touch</h1>
                    <p className="text-gray-600 text-lg">
                        {"Have questions or feedback? We’d love to hear from you."}
                    </p>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="container mx-auto px-4 py-16 max-w-6xl grid lg:grid-cols-2 gap-12">
                {/* LEFT: FORM */}
                <div>
                    <div className="bg-white rounded-2xl shadow p-8">
                        <h2 className="text-xl font-medium flex items-center gap-2 mb-6">
                            <IoSend className="text-[#FF7A00] w-5 h-5" />
                            Send Us a Message
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block mb-1 font-medium">Full Name *</label>
                                <input
                                    className="w-full border rounded-lg px-4 py-3"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Email *</label>
                                <input
                                    type="email"
                                    className="w-full border rounded-lg px-4 py-3"
                                    placeholder="your.email@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Message *</label>
                                <textarea
                                    className="w-full border rounded-lg px-4 py-3"
                                    rows={6}
                                    placeholder="Tell us what you need help with..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#FF7A00] hover:bg-[#FF5722] text-white rounded-xl h-12 transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* SOCIAL */}
                    <div className="mt-8">
                        <h3 className="mb-4 font-medium">Connect With Us</h3>
                        <div className="grid gap-4">
                            {socialMedia.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
                                >
                                    <div
                                        className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white`}
                                    >
                                        {item.icon}
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-600">{item.name}</p>
                                        <p>{item.handle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT: LOCATION + CONTACT INFO */}
                <div>
                    {/* MAP IMAGE */}
                    <div className="mb-8 rounded-2xl overflow-hidden shadow">
                        <Image
                            src="https://images.unsplash.com/photo-1755805875004-6c719f2a5e2b?auto=format&q=80&w=1080"
                            alt="Restaurant Location"
                            width={1200}
                            height={700}
                            className="w-full aspect-video object-cover"
                        />
                    </div>

                    {/* INFO LIST */}
                    <div className="space-y-4">
                        {contactInfo.map((info, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl shadow p-6 flex items-start gap-4"
                            >
                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                    {info.icon}
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600">{info.title}</p>
                                    <p className="font-medium">{info.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* QUICK NOTE */}
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 mt-8 shadow">
                        <div className="flex gap-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                <FaRegMessage className="text-[#FF7A00] w-5 h-5" />
                            </div>

                            <div>
                                <h4 className="font-medium mb-1">Quick Response</h4>
                                <p className="text-sm text-gray-700">
                                    We typically respond within 24 hours during business days.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl mb-2">Frequently Asked Questions</h2>
                    <p className="text-gray-600 mb-8">
                        {"Didn’t find what you're looking for? Contact us!"}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 text-left">
                        {faqList.map((f, i) => (
                            <div key={i} className="bg-white shadow p-6 rounded-xl">
                                <h4 className="font-medium mb-2">{f.q}</h4>
                                <p className="text-sm text-gray-600">{f.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

// FAQ LIST
const faqList = [
    {
        q: "How do I place an order?",
        a: "Browse our menu and checkout. We support COD, QRIS, or bank transfer.",
    },
    {
        q: "What is the delivery time?",
        a: "30–45 minutes. Members get priority.",
    },
    {
        q: "Is there a minimum order?",
        a: "No minimum. Delivery fee applies for orders under Rp 50.000.",
    },
    {
        q: "Can I cancel my order?",
        a: "Yes, within 5 minutes after placing your order.",
    },
];
