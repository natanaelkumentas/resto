"use client"

import { useState } from "react"
import { CartItem } from "@/components/Cartitem"
import { OrderSummary } from "@/components/Ordersummary"
import Link from "next/link"

interface CartItemData {
  id: string
  image: string
  name: string
  description: string
  price: number
  quantity: number
}

export default function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState<CartItemData[]>([
    {
      id: "1",
      image: "/mie-goreng-ayam-stir-fried-noodles-with-chicken.jpg",
      name: "Mie Goreng Ayam",
      description: "Savory stir-fried noodles with tender chicken pieces",
      price: 30000,
      quantity: 1,
    },
  ])

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const handleRemove = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal >= 50000 ? 0 : 10000
  const freeDeliveryThreshold = 50000

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  quantity={item.quantity}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Your cart is empty</p>
                <Link href="/menu" className="text-[#FF8C00] font-semibold hover:underline">
                  Continue Shopping
                </Link>
              </div>
            )}

            {cartItems.length > 0 && (
              <Link href="/menu" className="inline-block text-[#FF8C00] font-semibold hover:underline">
                Continue Shopping
              </Link>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <OrderSummary subtotal={subtotal} deliveryFee={deliveryFee} freeDeliveryThreshold={freeDeliveryThreshold} />
          </div>
        </div>
      </main>
    </div>
  )
}
