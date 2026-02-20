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
        <section className="bg-primary pt-2 pb-10 rounded-b-[40px] shadow-lg relative z-40 -mt-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex overflow-x-auto pb-4 md:flex-wrap md:justify-center gap-6 md:gap-14 snap-x scrollbar-hide">
                    {categories.map((cat, index) => (
                        <div key={index} className="group cursor-pointer flex flex-col items-center flex-shrink-0 snap-center">
                            <div className="relative w-16 h-16 md:w-24 md:h-24 mb-3 flex items-center justify-center">
                                {/* Animated Background Blobs - Light Tints for Contrast */}
                                <div className={`absolute inset-0 rounded-full bg-white/20 animate-blob`} style={{ animationDuration: `${3 + index}s` }}></div>
                                <div className={`absolute inset-0 rounded-full bg-secondary/30 animate-blob animation-delay-2000`} style={{ animationDuration: `${4 + index}s` }}></div>

                                {/* Icon Container */}
                                <div className="relative w-12 h-12 md:w-16 md:h-16 bg-white rounded-[35%] rotate-12 group-hover:rotate-0 transition-all duration-500 flex items-center justify-center shadow-md group-hover:scale-110 z-10">
                                    <cat.icon className="w-6 h-6 md:w-8 md:h-8 text-primary -rotate-12 group-hover:rotate-0 transition-transform duration-500" strokeWidth={1.5} />
                                </div>
                            </div>
                            <h3 className="font-extrabold text-center text-white text-xs md:text-sm tracking-wide group-hover:scale-105 transition-transform whitespace-nowrap drop-shadow-sm">
                                {cat.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
