"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FiStar, FiMinus, FiPlus, FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";

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
    const router = useRouter();
    const id = params.id as string;
    const [item, setItem] = useState<MenuItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);

    const { addToCart } = useCart();

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

    const handleAddToCart = () => {
        if (!item) return;

        setIsAdding(true);
        addToCart({
            id: item.id,
            name: item.menu_name,
            description: item.menu_description,
            price: item.menu_price,
            image: item.menu_image_url,
        }, quantity);

        setTimeout(() => {
            setIsAdding(false);
            setQuantity(1);
        }, 1000);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const increaseQuantity = () => {
        if (item && quantity < item.menu_stock) {
            setQuantity(quantity + 1);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <p className="text-center p-10 text-red-500">Error: {error}</p>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <p className="text-center p-10 text-gray-500">No item data</p>
            </div>
        );
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
                    Back to Menu
                </button>

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
                                <span className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-lg">
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
                                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                        {item.menu_name}
                                    </h1>

                                    {/* RATING */}
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
                                        <span className="text-lg font-medium">4.5</span>
                                        <span className="text-gray-500">(120 reviews)</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className={`border p-2 rounded-xl hover:bg-gray-100 transition ${isFavorite ? "text-red-500 border-red-500" : "border-gray-300"}`}
                                >
                                    ❤️
                                </button>
                            </div>

                            <p className="text-3xl text-orange-500 font-bold">
                                Rp {Number(item.menu_price ?? 0).toLocaleString("id-ID")}
                            </p>
                        </div>

                        <hr className="border-gray-200" />

                        <div>
                            <h3 className="mb-3 font-semibold text-lg">Description</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {item.menu_description}
                            </p>
                        </div>

                        <hr className="border-gray-200" />

                        <div className="flex gap-8">
                            <div>
                                <h3 className="mb-2 font-semibold">Category</h3>
                                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm capitalize">
                                    {item.menu_category}
                                </span>
                            </div>
                            <div>
                                <h3 className="mb-2 font-semibold">Stock</h3>
                                <span className={`px-3 py-1 rounded-full text-sm ${item.menu_stock > 10
                                        ? "bg-green-100 text-green-600"
                                        : item.menu_stock > 0
                                            ? "bg-yellow-100 text-yellow-600"
                                            : "bg-red-100 text-red-600"
                                    }`}>
                                    {item.menu_stock > 0 ? `${item.menu_stock} available` : "Out of stock"}
                                </span>
                            </div>
                        </div>

                        <hr className="border-gray-200" />

                        {/* QUANTITY SELECTOR & ADD TO CART */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-lg">Quantity</span>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={decreaseQuantity}
                                        disabled={quantity <= 1}
                                        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        <FiMinus className="w-5 h-5" />
                                    </button>
                                    <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                                    <button
                                        onClick={increaseQuantity}
                                        disabled={item.menu_stock <= quantity}
                                        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        <FiPlus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-lg">
                                <span className="text-gray-600">Total Price</span>
                                <span className="text-2xl font-bold text-orange-500">
                                    Rp {(item.menu_price * quantity).toLocaleString("id-ID")}
                                </span>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={!item.menu_available || item.menu_stock <= 0 || isAdding}
                                className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition ${isAdding
                                        ? "bg-green-500 text-white"
                                        : item.menu_available && item.menu_stock > 0
                                            ? "bg-orange-500 text-white hover:bg-orange-600"
                                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                <FiShoppingCart className="w-6 h-6" />
                                {isAdding
                                    ? "Added to Cart! ✓"
                                    : item.menu_available && item.menu_stock > 0
                                        ? "Add to Cart"
                                        : "Out of Stock"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

