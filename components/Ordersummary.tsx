"use client"

import Link from "next/link"

interface OrderSummaryProps {
  subtotal: number
  deliveryFee: number
  freeDeliveryThreshold: number
  itemCount?: number
}

export function OrderSummary({ subtotal, deliveryFee, freeDeliveryThreshold, itemCount = 1 }: OrderSummaryProps) {
  const total = subtotal + deliveryFee
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal)

  return (
    <div className="rounded-lg border border-border bg-white p-6 sticky top-4">
      <h2 className="mb-6 text-xl font-bold text-foreground">Order Summary</h2>

      <div className="space-y-4 border-b border-border pb-4">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Subtotal ({itemCount} items)</span>
          <span className="font-medium text-foreground">Rp {subtotal.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Delivery Fee</span>
          <span className={`font-medium ${deliveryFee === 0 ? "text-green-600" : "text-foreground"}`}>
            {deliveryFee === 0 ? "FREE" : `Rp ${deliveryFee.toLocaleString("id-ID")}`}
          </span>
        </div>
        {remainingForFreeDelivery > 0 && (
          <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded-lg">
            🚚 Add Rp {remainingForFreeDelivery.toLocaleString("id-ID")} more for free delivery
          </p>
        )}
      </div>

      <div className="my-6 flex justify-between">
        <span className="font-bold text-foreground">Total</span>
        <span className="text-2xl font-bold text-orange-500">Rp {total.toLocaleString("id-ID")}</span>
      </div>

      <Link
        href="/checkout"
        className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
      >
        Proceed to Checkout
        <span>→</span>
      </Link>

      <div className="mt-6 rounded-lg bg-orange-50 p-4">
        <p className="text-sm text-foreground">
          <span className="mr-1">🎉</span>
          <strong>Members save more!</strong> Join our membership program to get exclusive discounts on every order.
        </p>
      </div>
    </div>
  )
}

