"use client";

import Link from "next/link";
import { Headphones, Sparkles, Truck, Zap, ShieldCheck, Tag, Palette } from 'lucide-react';

export function FeaturedSection() {
    const features = [
        { icon: Palette, text: 'Theme Customization' },
        { icon: Sparkles, text: 'Premium Quality' },
        { icon: Truck, text: 'Express Delivery' },
        { icon: Zap, text: 'Custom Wrapping' },
        { icon: ShieldCheck, text: 'Eco-Friendly' },
        { icon: Tag, text: 'Best Prices' },
    ];

    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <div className="absolute inset-4 bg-primary/5 rounded-[3rem] rotate-[-6deg] scale-105 -z-10"></div>
                    <div className="relative rounded-[3rem] overflow-hidden">
                        <div className="relative bg-transparent">
                            <img src="/images/Category/dog-food.png" className="relative z-10 w-3/4 mx-auto object-cover rounded-3xl" alt="Gift Wrapping" />
                            <img src="/images/Category/toys.png" className="absolute bottom-0 right-10 z-20 w-40 h-auto object-contain drop-shadow-xl animate-float rounded-2xl" alt="Gift Box" />
                        </div>
                    </div>
                </div>
                <div className="space-y-8">
                    <span className="text-primary font-bold tracking-widest uppercase text-[10px]">Premium Wrapping Supplies</span>
                    <h2 className="text-4xl lg:text-5xl font-semibold text-neutral-900 leading-tight">
                        Make Every Gift <br /> Unforgettable
                    </h2>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                        Discover Razzel Wrap's exquisite collection of wrapping papers, ribbons, and accessories. Elevate your gifting experience with our premium, eco-friendly designs.
                    </p>
                    <div className="grid grid-cols-2 gap-6 text-sm">
                        {features.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 group cursor-pointer">
                                <item.icon className="w-5 h-5 text-slate-700 group-hover:text-primary transition-colors duration-300" />
                                <span className="font-semibold text-neutral-700 group-hover:text-primary transition-colors duration-300">{item.text}</span>
                            </div>
                        ))}
                    </div>
                    <Link
                        href="/shop"
                        className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full text-xs font-bold uppercase shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all duration-300"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>
        </section>
    );
}
