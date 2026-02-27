"use client";

import Link from "next/link";
import { ShoppingBag, Gem, Candy, Sparkles, MoreHorizontal } from "lucide-react";

export function CategoryGrid() {
    const categories = [
        { name: "Gift Hampers", icon: ShoppingBag, value: "Gift Hampers" },
        { name: "Ring Plate Deco", icon: Gem, value: "Engagement Ring Plate Deco" },
        { name: "Choco Hampers", icon: Candy, value: "Chocolate Hampers" },
        { name: "Custom Gifts", icon: Sparkles, value: "Customized Gifts" },
        { name: "Others", icon: MoreHorizontal, value: "Others" },
    ];

    return (
        <section className="bg-primary pt-2 pb-10 rounded-b-[40px] shadow-lg relative z-40 -mt-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-5 md:flex md:flex-wrap md:justify-center gap-2 md:gap-14">
                    {categories.map((cat, index) => (
                        <Link
                            key={index}
                            href={cat.value ? `/shop?category=${encodeURIComponent(cat.value)}` : "/shop"}
                            className="group cursor-pointer flex flex-col items-center min-w-0"
                        >
                            <div className="relative w-12 h-12 md:w-20 md:h-20 mb-1 md:mb-2 flex items-center justify-center">
                                {/* Animated Background Blobs - Light Tints for Contrast */}
                                <div className={`absolute inset-0 rounded-full bg-white/20 animate-blob`} style={{ animationDuration: `${3 + index}s` }}></div>
                                <div className={`absolute inset-0 rounded-full bg-secondary/30 animate-blob animation-delay-2000`} style={{ animationDuration: `${4 + index}s` }}></div>

                                {/* Icon Container */}
                                <div className="relative w-9 h-9 md:w-14 md:h-14 bg-white rounded-[35%] rotate-12 group-hover:rotate-0 transition-all duration-500 flex items-center justify-center shadow-md group-hover:scale-110 z-10">
                                    <cat.icon className="w-5 h-5 md:w-7 md:h-7 text-primary -rotate-12 group-hover:rotate-0 transition-transform duration-500" strokeWidth={1.5} />
                                </div>
                            </div>
                            <h3 className="font-extrabold text-center text-white text-[9px] md:text-[12px] tracking-tighter md:tracking-tight group-hover:scale-105 transition-transform truncate w-full px-0.5 drop-shadow-sm">
                                {cat.name}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
