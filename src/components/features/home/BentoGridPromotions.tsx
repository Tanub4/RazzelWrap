"use client";

import Link from "next/link";
import Image from "next/image";

export function BentoGridPromotions() {
    return (
        <section className="py-2 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-4 gap-2">

                    {/* Large Item (Top Left - 2x2) */}
                    <div className="col-span-2 row-span-2 bg-neutral-100 rounded-xl relative overflow-hidden group min-h-[160px] md:min-h-[320px] cursor-pointer hover:shadow-lg transition-shadow duration-300">
                        <Image
                            src="/images/bento_1.png"
                            alt="Premium Wrapping Paper"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20 z-10"></div>
                        <div className="relative z-20 h-full flex flex-col justify-end p-4 md:p-8">
                            <p className="text-white/90 font-bold tracking-widest text-[8px] md:text-xs mb-1 uppercase">Artisan Collection</p>
                            <h3 className="text-sm md:text-3xl font-black text-white tracking-tight mb-4 leading-tight drop-shadow-md">Premium<br />Wrapping Paper</h3>
                            <div>
                                <Link href="/shop" className="inline-block bg-white text-primary px-4 py-1.5 md:px-6 md:py-2 rounded-full text-[8px] md:text-xs font-bold uppercase tracking-wide hover:bg-primary hover:text-white transition-all duration-300 shadow-md">Shop Now</Link>
                            </div>
                        </div>
                    </div>

                    {/* Top Middle (1x1) */}
                    <div className="col-span-1 bg-neutral-100 rounded-xl relative overflow-hidden group min-h-[80px] md:min-h-[156px] cursor-pointer hover:shadow-md transition-shadow duration-300">
                        <Image
                            src="/images/bento_2.png"
                            alt="New Ribbons"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/10 z-10"></div>
                        <div className="relative z-20 p-3">
                            <span className="text-white font-bold text-[8px] md:text-xs uppercase tracking-widest block mb-0.5">New</span>
                            <h3 className="text-xs md:text-xl font-black text-white leading-tight w-full drop-shadow-md">Ribbons</h3>
                        </div>
                    </div>

                    {/* Right Tall (Far Right - 1x2) */}
                    <div className="col-span-1 row-span-2 bg-neutral-100 rounded-xl relative overflow-hidden group min-h-[160px] md:min-h-[320px] cursor-pointer hover:shadow-lg transition-shadow duration-300">
                        <Image
                            src="/images/bento_3.png"
                            alt="Bundle Offer"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20 z-10"></div>
                        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center p-3">
                            <p className="text-white/90 font-bold text-[8px] md:text-xs uppercase tracking-widest mb-1">Offer</p>
                            <h3 className="text-[10px] md:text-2xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-md">Bundle <br />Save 25%</h3>
                            <Link href="/shop" className="inline-block bg-white text-primary px-3 py-1 md:px-5 md:py-2 rounded-full text-[8px] md:text-xs font-bold uppercase hover:bg-primary hover:text-white shadow-md transition-all">Shop Link</Link>
                        </div>
                    </div>

                    {/* Bottom Middle (1x1 - under Top Middle) */}
                    <div className="col-span-1 bg-neutral-100 rounded-xl relative overflow-hidden group min-h-[80px] md:min-h-[156px] cursor-pointer hover:shadow-md transition-shadow duration-300">
                        <Image
                            src="/images/bento_4.png"
                            alt="Recycled Materials"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/10 z-10"></div>
                        <div className="relative z-20 p-3">
                            <p className="text-white font-bold text-[8px] md:text-xs uppercase tracking-widest mb-0.5">Eco</p>
                            <h3 className="text-xs md:text-xl font-black text-white leading-tight drop-shadow-md">Recycled</h3>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
