import { FiStar } from "react-icons/fi";
import Image from "next/image";

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating?: number;
    reviews?: number;
    isPopular?: boolean;
}

interface FoodCardProps {
    item: MenuItem;
    onViewDetails: (id: number) => void;
}

export function FoodCard({ item, onViewDetails }: FoodCardProps) {

    
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer group flex flex-col">
            {/* IMAGE */}
            
            <div className="relative aspect-4/3 overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {item.isPopular && (
                    <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-lg">
                        Popular
                    </span>
                )}
            </div>

            {/* CONTENT */}
            <div className="p-4 flex-1">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="line-clamp-1 text-lg font-medium">{item.name}</h3>
                    <p className="text-orange-500 font-semibold whitespace-nowrap ml-2">
                        Rp {item.price.toLocaleString("id-ID")}
                    </p>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {item.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 text-sm text-gray-700">
                    <FiStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span>{item.rating ?? "4.5"}</span>
                    <span className="text-gray-500">
                        ({item.reviews ?? 120} reviews)
                    </span>
                </div>
            </div>

            {/* FOOTER BUTTON */}
            <div className="p-4 pt-0">
                <button
                    onClick={() => onViewDetails(item.id)}
                    className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}
