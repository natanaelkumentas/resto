"use client"

import { CartItem } from "@/components/Cartitem"
import { OrderSummary } from "@/components/Ordersummary"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import Navbar from "@/components/Navbar"

export default function ShoppingCartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, totalItems } = useCart()

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(Number(id), quantity)
  }

  const handleRemove = (id: string) => {
    removeFromCart(Number(id))
  }

  const deliveryFee = subtotal >= 50000 ? 0 : 10000
  const freeDeliveryThreshold = 50000

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.length > 0 ? (
              items.map((item) => (
                <CartItem
                  key={item.id}
                  id={String(item.id)}
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
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Link href="/menu" className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                  Browse Menu
                </Link>
              </div>
            )}

            {items.length > 0 && (
              <Link href="/menu" className="inline-block text-orange-500 font-semibold hover:underline">
                ← Continue Shopping
              </Link>
            )}
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <div>
              <OrderSummary
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                freeDeliveryThreshold={freeDeliveryThreshold}
                itemCount={totalItems}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

