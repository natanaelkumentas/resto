"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FiStar } from "react-icons/fi";

interface MenuItem {
    id: number;
    menu_name: string;
    menu_description: string;
    menu_price: number;
    menu_category: string;
    menu_stock: number;
    menu_image_url: string;
    menu_available: boolean;
}
export default function FoodDetailPage() {

    const params = useParams();
    const id = params.id as string;
    const [item, setItem] = useState<MenuItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            setError("No ID provided");
            return;
        }

        const fetchData = async () => {
            try {
                const res = await fetch(`/api/menu/${id}`);
                const data = await res.json();

                if (!res.ok) {
                    setError(data.error || `HTTP ${res.status}`);
                    setLoading(false);
                    return;
                }

                if (data && data.menu_id) {
                    setItem({
                        id: data.menu_id,
                        menu_name: data.menu_name,
                        menu_description: data.menu_description,
                        menu_price: Number(data.menu_price),
                        menu_category: data.menu_category,
                        menu_stock: data.menu_stock,
                        menu_image_url: data.menu_image_url,
                        menu_available: data.menu_available,
                    });
                } else {
                    setError("Menu item not found or invalid data");
                }
            } catch (err) {
                setError(`Fetch error: ${err}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <p className="text-center p-10 text-gray-500">loading...</p>;    }

    if (error) {
        return <p className="text-center p-10 text-red-500">Error: {error}</p>;
    }

    if (!item) {
        return <p className="text-center p-10 text-gray-500">No item data</p>;
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
                {/* IMAGE */}
                <div>
                    <div className="relative rounded-2xl overflow-hidden shadow-xl mb-4">
                        {item.menu_image_url ? (
                            <Image
                                src={item.menu_image_url}
                                alt={item.menu_name || "Food item"}
                                width={600}
                                height={600}
                                className="w-full aspect-square object-cover"
                            />
                        ) : (
                            <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">No Image</span>
                            </div>
                        )}

                        {item.menu_available && (
                            <span className="absolute top-4 left-4 bg-[#FF7A00] text-white px-4 py-2 rounded-lg">
                                Available
                            </span>
                        )}
                    </div>
                </div>

                {/* DETAILS */}
                <div className="space-y-6">
                    <div>
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h1 className="text-3xl md:text-4xl mb-2">
                                    {item.menu_name}
                                </h1>

                                {/* RATING (contoh statis, nanti bisa ambil dari table ratings) */}
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <FiStar
                                                key={i}
                                                className={`w-5 h-5 ${i < 4
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-lg">4.5</span>
                                    <span className="text-gray-500">(120 reviews)</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsFavorite(!isFavorite)}
                                className={`border p-2 rounded-xl ${isFavorite ? "text-red-500" : ""
                                    }`}
                            >
                            </button>
                        </div>

                        <p className="text-3xl text-[#FF7A00]">
                            Rp {Number(item.menu_price ?? 0).toLocaleString("id-ID")}
                        </p>
                    </div>

                    <hr className="border-gray-200" />

                    <div>
                        <h3 className="mb-3 font-semibold">Description</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {item.menu_description}
                        </p>
                    </div>

                    <hr className="border-gray-200" />

                    <div>
                        <h3 className="mb-3 font-semibold">Category</h3>
                        <p className="text-gray-700">{item.menu_category}</p>
                    </div>

                    <hr className="border-gray-200" />

                    <div>
                        <h3 className="mb-3 font-semibold">Stock</h3>
                        <p className="text-gray-700">{item.menu_stock}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
