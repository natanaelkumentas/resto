"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { FiCheckCircle, FiClock, FiMapPin, FiPhone, FiCreditCard, FiHome, FiFileText } from "react-icons/fi"
import Navbar from "@/components/Navbar"

interface Order {
    order_id: string
    customer_name: string
    customer_phone: string
    customer_address: string
    customer_city: string
    customer_notes: string
    payment_method: string
    subtotal: number
    delivery_fee: number
    total: number
    status: string
    created_at: string
}

interface OrderItem {
    item_id: string
    menu_name: string
    quantity: number
    price: number
}

function OrderSuccessContent() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get("orderId")

    const [order, setOrder] = useState<Order | null>(null)
    const [orderItems, setOrderItems] = useState<OrderItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!orderId) {
            setLoading(false)
            return
        }

        const fetchOrder = async () => {
            try {
                // Fetch order details
                const { data: orderData, error: orderError } = await supabase
                    .from("orders")
                    .select("*")
                    .eq("order_id", orderId)
                    .single()

                if (orderError) throw orderError
                setOrder(orderData)

                // Fetch order items
                const { data: itemsData, error: itemsError } = await supabase
                    .from("order_items")
                    .select("*")
                    .eq("order_id", orderId)

                if (itemsError) throw itemsError
                setOrderItems(itemsData || [])

            } catch (error) {
                console.error("Error fetching order:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchOrder()
    }, [orderId])

    const getPaymentMethodLabel = (method: string) => {
        switch (method) {
            case "cod": return "Cash on Delivery"
            case "qris": return "QRIS"
            case "transfer": return "Bank Transfer"
            default: return method
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("id-ID", {
            dateStyle: "full",
            timeStyle: "short",
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
            </div>
        )
    }

    if (!orderId || !order) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="max-w-2xl mx-auto px-4 py-20 text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
                    <p className="text-gray-500 mb-6">We couldn&apos;t find your order. Please check your order ID.</p>
                    <Link
                        href="/menu"
                        className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                    >
                        Back to Menu
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-12">
                {/* Success Header */}
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiCheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
                    <p className="text-gray-500">Thank you for your order. We&apos;ve received it and will start preparing soon.</p>
                </div>

                {/* Order Reference */}
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8 text-center">
                    <p className="text-sm text-orange-600 mb-2">Order Reference</p>
                    <p className="text-2xl font-bold font-mono tracking-wider">{order.order_id.slice(0, 8).toUpperCase()}</p>
                    <p className="text-sm text-gray-500 mt-2">
                        <FiClock className="inline mr-1" />
                        {formatDate(order.created_at)}
                    </p>
                </div>

                {/* Order Details */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                    {/* Delivery Info */}
                    <div className="p-6 border-b">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <FiMapPin className="text-orange-500" />
                            Delivery Information
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Name</p>
                                <p className="font-medium">{order.customer_name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Phone</p>
                                <p className="font-medium flex items-center gap-1">
                                    <FiPhone className="w-4 h-4" />
                                    {order.customer_phone}
                                </p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-gray-500">Address</p>
                                <p className="font-medium">{order.customer_address}, {order.customer_city}</p>
                            </div>
                            {order.customer_notes && (
                                <div className="md:col-span-2">
                                    <p className="text-gray-500">Notes</p>
                                    <p className="font-medium">{order.customer_notes}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="p-6 border-b bg-gray-50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FiCreditCard className="text-orange-500" />
                                <span className="font-semibold">Payment Method</span>
                            </div>
                            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                                {getPaymentMethodLabel(order.payment_method)}
                            </span>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6 border-b">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <FiFileText className="text-orange-500" />
                            Order Items
                        </h2>
                        <div className="space-y-3">
                            {orderItems.map((item) => (
                                <div key={item.item_id} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{item.menu_name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Total */}
                    <div className="p-6 bg-gray-50">
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal</span>
                                <span>Rp {order.subtotal.toLocaleString("id-ID")}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Delivery Fee</span>
                                <span className={order.delivery_fee === 0 ? "text-green-600" : ""}>
                                    {order.delivery_fee === 0 ? "FREE" : `Rp ${order.delivery_fee.toLocaleString("id-ID")}`}
                                </span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-3 border-t">
                                <span>Total</span>
                                <span className="text-orange-500">Rp {order.total.toLocaleString("id-ID")}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Timeline */}
                <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                    <h2 className="text-lg font-bold mb-4">Order Status</h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                <FiCheckCircle className="text-white w-5 h-5" />
                            </div>
                            <span className="font-medium text-green-600">Order Placed</span>
                        </div>
                        <div className="flex-1 h-1 bg-gray-200 rounded"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <FiClock className="text-gray-400 w-5 h-5" />
                            </div>
                            <span className="text-gray-400">Preparing</span>
                        </div>
                        <div className="flex-1 h-1 bg-gray-200 rounded"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <FiMapPin className="text-gray-400 w-5 h-5" />
                            </div>
                            <span className="text-gray-400">Delivered</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/menu"
                        className="flex-1 bg-orange-500 text-white py-4 rounded-xl font-semibold text-center hover:bg-orange-600 transition flex items-center justify-center gap-2"
                    >
                        <FiHome className="w-5 h-5" />
                        Continue Shopping
                    </Link>
                    <Link
                        href="/profile"
                        className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold text-center hover:bg-gray-200 transition flex items-center justify-center gap-2"
                    >
                        <FiFileText className="w-5 h-5" />
                        View Order History
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default function OrderSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
            </div>
        }>
            <OrderSuccessContent />
        </Suspense>
    )
}
