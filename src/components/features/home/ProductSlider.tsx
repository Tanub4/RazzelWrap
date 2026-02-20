"use client";

import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/features/shop/ProductCard";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";

interface ProductSliderProps {
    title: string;
    products: Product[];
    viewAllLink?: string;
}

export function ProductSlider({ title, products, viewAllLink }: ProductSliderProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 300; // Approx card width + gap
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg md:text-xl font-bold text-neutral-900">{title}</h2>
                    <div className="flex items-center gap-4">
                        {viewAllLink && (
                            <Link href={viewAllLink} className="text-xs font-bold text-primary hover:text-primary/80 uppercase tracking-wide">
                                View All
                            </Link>
                        )}
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {products.map((product) => (
                        <div key={product.id} className="w-[130px] md:w-[170px] shrink-0 snap-start">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
            <style jsx global>{`
                .scrollbar-none::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}
