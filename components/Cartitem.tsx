"use client"

import Image from "next/image"
import { MdDeleteOutline, MdAdd, MdRemove } from "react-icons/md"

interface CartItemProps {
  id: string
  image: string
  name: string
  description: string
  price: number
  quantity: number
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItem({ id, image, name, description, price, quantity, onQuantityChange, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 rounded-lg border border-border bg-white p-4">
      <Image
        src={image || "/placeholder.svg"}
        alt={name}
        width={100}
        height={100}
        className="h-24 w-24 rounded-lg object-cover"
      />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onQuantityChange(id, Math.max(1, quantity - 1))}
            className="rounded border border-border p-1 hover:bg-muted"
          >
            <MdRemove className="h-4 w-4" /> a
          </button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <button
            onClick={() => onQuantityChange(id, quantity + 1)}
            className="rounded border border-border p-1 hover:bg-muted"
          >
            <MdAdd className="h-4 w-4" /> a
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <button onClick={() => onRemove(id)} className="text-red-500 hover:text-red-700">
          <MdDeleteOutline className="h-5 w-5" /> a
        </button>
        <span className="text-lg font-bold text-[#FF8C00]">Rp {(price * quantity).toLocaleString("id-ID")}</span>
      </div>
    </div>
  )
}
