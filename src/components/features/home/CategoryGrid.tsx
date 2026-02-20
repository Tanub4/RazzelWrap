"use client";

import Link from "next/link";
import { Scroll, Scissors, Gift, Tag, ShoppingBag, Sparkles } from "lucide-react";

export function CategoryGrid() {
    const categories = [
        { name: "Wrapping Paper", icon: Scroll },
        { name: "Ribbons & Bows", icon: Scissors },
        { name: "Gift Boxes", icon: Gift },
        { name: "Tags & Stickers", icon: Tag },
        { name: "Gift Bags", icon: ShoppingBag },
        { name: "Accessories", icon: Sparkles },
    ];

    return (
        <section className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <h2 className="text-xl md:text-2xl font-black text-center mb-8 text-neutral-900">Shop by Category</h2>
                <div className="flex overflow-x-auto pb-4 md:flex-wrap md:justify-center gap-4 md:gap-10 snap-x scrollbar-hide">
                    {categories.map((cat, index) => (
                        <div key={index} className="group cursor-pointer flex flex-col items-center flex-shrink-0 snap-center">
                            <div className="relative w-12 h-12 md:w-20 md:h-20 mb-2 md:mb-3 flex items-center justify-center">
                                {/* Animated Background Blob - Theme Colors */}
                                <div className={`absolute inset-0 rounded-full opacity-20 bg-primary animate-blob`} style={{ animationDuration: `${3 + index}s` }}></div>
                                <div className={`absolute inset-0 rounded-full opacity-20 bg-secondary animate-blob animation-delay-2000`} style={{ animationDuration: `${4 + index}s` }}></div>

                                {/* Icon Container */}
                                <div className="relative w-10 h-10 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-primary/10 group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300 z-10">
                                    <cat.icon className="w-5 h-5 md:w-8 md:h-8 text-primary group-hover:text-primary/80 transition-colors" strokeWidth={1.5} />
                                </div>
                            </div>
                            <h3 className="font-bold text-center text-neutral-800 text-[10px] md:text-sm group-hover:text-primary transition-colors whitespace-nowrap">
                                {cat.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
