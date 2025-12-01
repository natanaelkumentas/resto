"use client"

interface OrderSummaryProps {
  subtotal: number
  deliveryFee: number
  freeDeliveryThreshold: number
}

export function OrderSummary({ subtotal, deliveryFee, freeDeliveryThreshold }: OrderSummaryProps) {
  const total = subtotal + deliveryFee
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal)

  return (
    <div className="rounded-lg border border-border bg-white p-6">
      <h2 className="mb-6 text-xl font-bold text-foreground">Order Summary</h2>

      <div className="space-y-4 border-b border-border pb-4">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Subtotal (1 items)</span>
          <span className="font-medium text-foreground">Rp {subtotal.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Delivery Fee</span>
          <span className="font-medium text-foreground">Rp {deliveryFee.toLocaleString("id-ID")}</span>
        </div>
        {remainingForFreeDelivery > 0 && (
          <p className="text-xs text-muted-foreground">
            Add Rp {remainingForFreeDelivery.toLocaleString("id-ID")} more for free delivery
          </p>
        )}
      </div>

      <div className="my-6 flex justify-between">
        <span className="font-bold text-foreground">Total</span>
        <span className="text-2xl font-bold text-[#FF8C00]">Rp {total.toLocaleString("id-ID")}</span>
      </div>

      <button className="w-full rounded-lg bg-[#FF8C00] py-3 font-semibold text-white hover:bg-[#E67E00] transition-colors flex items-center justify-center gap-2">
        Proceed to Checkout
        <span>→</span>
      </button>

      <div className="mt-6 rounded-lg bg-orange-50 p-4">
        <p className="text-sm text-foreground">
          <span className="mr-1">🎉</span>
          <strong>Members save more!</strong> Join our membership program to get exclusive discounts on every order.
        </p>
      </div>
    </div>
  )
}
