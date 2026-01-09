"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { supabase } from "@/lib/supabase"
import Navbar from "@/components/Navbar"
import Image from "next/image"
import Link from "next/link"
import { FiArrowLeft, FiMapPin, FiPhone, FiUser, FiCreditCard } from "react-icons/fi"

interface FormData {
    name: string
    phone: string
    address: string
    city: string
    notes: string
    paymentMethod: "cod" | "qris" | "transfer"
}

export default function CheckoutPage() {
    const router = useRouter()
    const { items, subtotal, totalItems, clearCart } = useCart()

    const [formData, setFormData] = useState<FormData>({
        name: "",
        phone: "",
        address: "",
        city: "",
        notes: "",
        paymentMethod: "cod",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState<Partial<FormData>>({})

    const deliveryFee = subtotal >= 50000 ? 0 : 10000
    const total = subtotal + deliveryFee

    const paymentMethods = [
        { id: "cod", name: "Cash on Delivery", icon: "💵", description: "Pay when your order arrives" },
        { id: "qris", name: "QRIS", icon: "📱", description: "Scan QR code to pay" },
        { id: "transfer", name: "Bank Transfer", icon: "🏦", description: "Transfer to our bank account" },
    ]

    const validateForm = () => {
        const newErrors: Partial<FormData> = {}

        if (!formData.name.trim()) newErrors.name = "Name is required"
        if (!formData.phone.trim()) newErrors.phone = "Phone is required"
        else if (!/^[0-9]{10,13}$/.test(formData.phone.replace(/\D/g, ""))) {
            newErrors.phone = "Invalid phone number"
        }
        if (!formData.address.trim()) newErrors.address = "Address is required"
        if (!formData.city.trim()) newErrors.city = "City is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        // Clear error when user starts typing
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return
        if (items.length === 0) {
            alert("Your cart is empty!")
            return
        }

        setIsSubmitting(true)

        try {
            // Create order in database
            const { data: orderData, error: orderError } = await supabase
                .from("orders")
                .insert({
                    customer_name: formData.name,
                    customer_phone: formData.phone,
                    customer_address: formData.address,
                    customer_city: formData.city,
                    customer_notes: formData.notes,
                    payment_method: formData.paymentMethod,
                    subtotal: subtotal,
                    delivery_fee: deliveryFee,
                    total: total,
                    status: "pending",
                })
                .select()
                .single()

            if (orderError) throw orderError

            // Create order items
            const orderItems = items.map((item) => ({
                order_id: orderData.order_id,
                menu_id: item.id,
                menu_name: item.name,
                quantity: item.quantity,
                price: item.price,
            }))

            const { error: itemsError } = await supabase
                .from("order_items")
                .insert(orderItems)

            if (itemsError) throw itemsError

            // Clear cart and redirect to success page
            clearCart()
            router.push(`/order-success?orderId=${orderData.order_id}`)

        } catch (error) {
            console.error("Error creating order:", error)
            const errorMessage = error instanceof Error
                ? error.message
                : typeof error === 'object' && error !== null && 'message' in error
                    ? String((error as { message: unknown }).message)
                    : "Unknown error occurred"
            alert(`Failed to create order: ${errorMessage}\n\nPlease make sure the database tables 'orders' and 'order_items' exist.`)
        } finally {
            setIsSubmitting(false)
        }
    }

    // Redirect if cart is empty
    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="max-w-2xl mx-auto px-4 py-20 text-center">
                    <div className="text-6xl mb-4">🛒</div>
                    <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                    <p className="text-gray-500 mb-6">Add some items to your cart before checking out.</p>
                    <Link
                        href="/menu"
                        className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                    >
                        Browse Menu
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-6 transition"
                >
                    <FiArrowLeft className="w-5 h-5" />
                    Back to Cart
                </button>

                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Delivery Information */}
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <FiMapPin className="text-orange-500" />
                                    Delivery Information
                                </h2>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FiUser className="inline mr-1" /> Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition ${errors.name ? "border-red-500" : "border-gray-300"
                                                }`}
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FiPhone className="inline mr-1" /> Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="08xxxxxxxxxx"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition ${errors.phone ? "border-red-500" : "border-gray-300"
                                                }`}
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Delivery Address *
                                        </label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="Enter your complete address"
                                            rows={3}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition resize-none ${errors.address ? "border-red-500" : "border-gray-300"
                                                }`}
                                        />
                                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="Enter your city"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition ${errors.city ? "border-red-500" : "border-gray-300"
                                                }`}
                                        />
                                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Notes (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            placeholder="E.g., ring the bell twice"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <FiCreditCard className="text-orange-500" />
                                    Payment Method
                                </h2>

                                <div className="space-y-3">
                                    {paymentMethods.map((method) => (
                                        <label
                                            key={method.id}
                                            className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition ${formData.paymentMethod === method.id
                                                ? "border-orange-500 bg-orange-50"
                                                : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value={method.id}
                                                checked={formData.paymentMethod === method.id}
                                                onChange={(e) => setFormData((prev) => ({ ...prev, paymentMethod: e.target.value as FormData["paymentMethod"] }))}
                                                className="w-5 h-5 text-orange-500 focus:ring-orange-500"
                                            />
                                            <span className="text-2xl">{method.icon}</span>
                                            <div>
                                                <p className="font-semibold">{method.name}</p>
                                                <p className="text-sm text-gray-500">{method.description}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
                                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                                {/* Items */}
                                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-3">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={60}
                                                height={60}
                                                className="w-15 h-15 rounded-lg object-cover"
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                                                <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold text-sm">
                                                Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Totals */}
                                <div className="border-t pt-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Subtotal ({totalItems} items)</span>
                                        <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Delivery Fee</span>
                                        <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                                            {deliveryFee === 0 ? "FREE" : `Rp ${deliveryFee.toLocaleString("id-ID")}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                        <span>Total</span>
                                        <span className="text-orange-500">Rp {total.toLocaleString("id-ID")}</span>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full mt-6 py-4 rounded-xl font-semibold text-lg transition ${isSubmitting
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-orange-500 text-white hover:bg-orange-600"
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                            Processing...
                                        </span>
                                    ) : (
                                        "Place Order"
                                    )}
                                </button>

                                <p className="text-xs text-gray-500 text-center mt-4">
                                    By placing your order, you agree to our Terms of Service
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
