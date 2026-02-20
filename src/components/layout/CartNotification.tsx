"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

export function CartNotification() {
    const { totalItems, totalAmount, toggleCart } = useCart();
    const pathname = usePathname();

    // Hide on checkout pages
    if (pathname.startsWith('/checkout')) {
        return null;
    }

    if (totalItems === 0) return null;

    return (
        <div className="fixed bottom-20 left-0 right-0 z-50 px-4 md:bottom-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[50%]">
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-3 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-between animate-in slide-in-from-bottom-2 fade-in">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm">
                        <ShoppingBag className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-white/90 uppercase tracking-wide">Your Cart</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xs font-bold text-white/90">{totalItems} Items •</span>
                            <span className="text-lg font-black leading-none text-white">₹{totalAmount.toFixed(0)}</span>
                        </div>
                    </div>
                </div>

                <button onClick={toggleCart} className="flex items-center gap-2 font-bold text-sm bg-white text-primary px-4 py-2 rounded-lg hover:bg-white/90 transition-colors shadow-md shadow-black/10">
                    View Cart
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
