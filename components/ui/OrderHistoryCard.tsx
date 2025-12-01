
"use client"

import { FaStar } from "react-icons/fa"

interface Order {
    id: string
    date: string
    status: "Completed" | "Processing"
    items: { name: string; price: number }[]
    delivery: string
    total: number
}

const orders: Order[] = [
    {
        id: "ORD-001",
        date: "2025-10-30",
        status: "Completed",
        items: [
            { name: "Nasi Goreng Spesial", price: 70000 },
            { name: "Es Kopi Susu", price: 15000 },
        ],
        delivery: "COD",
        total: 85000,
    },
    {
        id: "ORD-002",
        date: "2025-10-31",
        status: "Processing",
        items: [
            { name: "Ayam Bakar", price: 40000 },
            { name: "Es Jeruk Segar", price: 24000 },
        ],
        delivery: "QRIS",
        total: 64000,
    },
]


function OrderHistoryCard() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Order History</h2>

            {orders.map((order) => (
                <div
                    key={order.id}
                    className="bg-white border border-slate-200  rounded-lg p-6"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="font-semibold text-lg">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div
                            className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${order.status === "Completed" ? "bg-green-500" : "bg-blue-500"
                                }`}
                        >
                            {order.status}
                        </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-3 py-4 border-y border-slate-200 dark:border-slate-800">
                        {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <span className="text-sm text-foreground">{item.name}</span>
                                <span className="text-sm font-semibold">Rp {item.price.toLocaleString("id-ID")}</span>
                            </div>
                        ))}
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Delivery · {order.delivery}</span>
                        </div>
                    </div>

                    {/* Total and Rate Button */}
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-orange-500 font-bold">Total: Rp {order.total.toLocaleString("id-ID")}</p>
                        <button className="flex items-center gap-2 text-foreground hover:text-orange-500 transition py-2">
                            <FaStar size={18} />
                            Rate Order
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OrderHistoryCard