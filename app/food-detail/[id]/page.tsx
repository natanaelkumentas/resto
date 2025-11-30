"use client"

import React from 'react'
import { useRouter } from "next/navigation";

export default function page() {
    const router = useRouter();

  const handleViewDetails = (id: number) => {
    router.push(`/food-detail/${id}`);
  };
  return (
    <div>page</div>
  )
}
