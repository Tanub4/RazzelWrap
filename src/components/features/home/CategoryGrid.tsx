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
                <div className="grid grid-cols-6 md:flex md:flex-wrap md:justify-center gap-1 md:gap-14">
                    {categories.map((cat, index) => (
                        <div key={index} className="group cursor-pointer flex flex-col items-center min-w-0">
                            <div className="relative w-10 h-10 md:w-16 md:h-16 mb-1 md:mb-2 flex items-center justify-center">
                                {/* Animated Background Blobs - Light Tints for Contrast */}
                                <div className={`absolute inset-0 rounded-full bg-white/20 animate-blob`} style={{ animationDuration: `${3 + index}s` }}></div>
                                <div className={`absolute inset-0 rounded-full bg-secondary/30 animate-blob animation-delay-2000`} style={{ animationDuration: `${4 + index}s` }}></div>

                                {/* Icon Container */}
                                <div className="relative w-8 h-8 md:w-12 md:h-12 bg-white rounded-[35%] rotate-12 group-hover:rotate-0 transition-all duration-500 flex items-center justify-center shadow-md group-hover:scale-110 z-10">
                                    <cat.icon className="w-4 h-4 md:w-6 md:h-6 text-primary -rotate-12 group-hover:rotate-0 transition-transform duration-500" strokeWidth={1.5} />
                                </div>
                            </div>
                            <h3 className="font-extrabold text-center text-white text-[8px] md:text-[11px] tracking-tighter md:tracking-tight group-hover:scale-105 transition-transform truncate w-full px-0.5 drop-shadow-sm">
                                {cat.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
