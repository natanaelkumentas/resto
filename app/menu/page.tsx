"use client"

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { FiSearch } from "react-icons/fi";
import { FoodCard } from "@/components/ui/Foodcard";
import Navbar from "@/components/Navbar";

import { useRouter } from "next/navigation";


interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: "food" | "drinks" | "snacks";
}

interface MenuPageProps {
    onNavigate: (page: string, itemId?: number) => void;
}

export default function Page({ }: MenuPageProps) {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<
        "all" | "food" | "drinks" | "snacks"
    >("all");

    useEffect(() => {
        const fetchMenu = async () => {
            const { data, error } = await supabase.from("menu_items").select("*");

            if (error) {
                console.error("Supabase Fetch Error:", error);
                return;
            }

            // MAP FIELD DATABASE → FIELD YANG DIPAKAI REACT
            const mapped = data.map((item) => ({
                id: item.menu_id,
                name: item.menu_name,
                description: item.menu_description,
                price: item.menu_price,
                category: item.menu_category,
                image: item.menu_image_url,
            }));

            setItems(mapped);
        };

        fetchMenu();
    }, []);

    // FILTER MENU
    const filteredItems = items.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
            selectedCategory === "all" || item.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });
    const router = useRouter();

    const handleViewDetails = (id: number) => {
        router.push(`/food-detail/${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            {/* Header */}
            <section className="bg-linear-to-br from-orange-50 to-red-50 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl mb-4">Our Menu</h1>
                    <p className="text-gray-600 text-lg mb-6">
                        Explore our delicious Indonesian menu
                    </p>

                    {/* SEARCH BAR */}
                    <div className="max-w-xl mx-auto relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="text"
                            placeholder="Search for dishes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white py-3 pl-12 pr-4 rounded-xl shadow"
                        />
                    </div>
                </div>
            </section>

            {/* Menu Section */}
            <section className="container mx-auto px-4 py-10">

                {/* CATEGORY FILTER */}
                <div className="flex gap-3 justify-center mb-8">
                    {["all", "food", "drinks", "snacks"].map((cat) => (
                        <button
                            key={cat}
                            className={`px-4 py-2 rounded-lg text-sm capitalize ${selectedCategory === cat
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-200"
                                }`}
                            onClick={() =>
                                setSelectedCategory(cat as "all" | "food" | "drinks" | "snacks")
                            }
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* COUNT */}
                <p className="text-gray-600 mb-6">
                    Showing {filteredItems.length} items
                </p>

                {/* MENU GRID */}
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredItems.map((item) => (
                            <FoodCard
                                key={item.id}
                                item={item}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🍽️</div>
                        <h3 className="text-xl mb-2">No items found</h3>
                        <p className="text-gray-500">Try adjusting your search</p>
                    </div>
                )}
            </section>
        </div>
    );
}
