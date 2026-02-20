"use client";

import Link from "next/link";

export function BentoGridPromotions() {
    return (
        <section className="py-2 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-4 gap-2">

                    {/* Large Item (Top Left - 2x2) */}
                    <div className="col-span-2 row-span-2 bg-pink-100 rounded-xl p-3 relative overflow-hidden group min-h-[160px] cursor-pointer hover:shadow-lg transition-shadow duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-pink-50 opacity-100 group-hover:scale-105 transition-transform duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-0"></div>
                        <div className="relative z-10 w-3/4">
                            <p className="text-pink-900/90 font-bold tracking-widest text-[6px] md:text-[8px] mb-1 uppercase">Artisan Collection</p>
                            <h3 className="text-xs md:text-lg font-semibold text-pink-950 tracking-tight mb-3 leading-tight drop-shadow-sm">Premium<br />Wrapping Paper</h3>
                            <Link href="/shop" className="inline-block bg-white/90 backdrop-blur-sm text-pink-900 px-3 py-1 rounded-full text-[6px] md:text-[8px] font-bold uppercase tracking-wide hover:bg-white transition-all duration-300 shadow-sm">Shop Now</Link>
                        </div>
                        <div className="absolute right-2 bottom-2 text-4xl opacity-20">🎁</div>
                    </div>

                    {/* Top Middle (1x1) */}
                    <div className="col-span-1 bg-indigo-300 rounded-xl p-2 relative overflow-hidden group min-h-[75px] cursor-pointer hover:shadow-md transition-shadow duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-indigo-100 group-hover:scale-105 transition-transform duration-300"></div>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-0"></div>
                        <div className="relative z-10">
                            <span className="text-indigo-900/90 font-bold text-[6px] uppercase tracking-widest block mb-0.5">New</span>
                            <h3 className="text-[8px] md:text-xs font-semibold text-indigo-950 leading-tight w-full drop-shadow-sm">Ribbons</h3>
                        </div>
                        <div className="absolute right-1 bottom-1 text-2xl opacity-20">🎀</div>
                    </div>

                    {/* Right Tall (Far Right - 1x2) */}
                    <div className="col-span-1 row-span-2 bg-neutral-300 rounded-xl p-3 relative overflow-hidden flex flex-col group min-h-[160px] cursor-pointer hover:shadow-lg transition-shadow duration-300">
                        <div className="absolute inset-0 bg-gradient-to-b from-orange-100 to-yellow-50 group-hover:scale-105 transition-transform duration-300"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/5 z-0"></div>
                        <div className="relative z-10 text-center">
                            <p className="text-orange-900/90 font-bold text-[6px] uppercase tracking-widest mb-1">Offer</p>
                            <h3 className="text-[8px] md:text-sm font-semibold text-orange-950 tracking-tight leading-tight mb-2 drop-shadow-sm">Bundle <br />Save 25%</h3>
                            <Link href="/shop" className="inline-block bg-white/90 backdrop-blur-sm text-orange-900 px-2 py-0.5 rounded-full text-[6px] font-bold uppercase hover:bg-white shadow-sm">Shop</Link>
                        </div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-3xl opacity-20">🏷️</div>
                    </div>

                    {/* Bottom Middle (1x1 - under Top Middle) */}
                    <div className="col-span-1 bg-neutral-300 rounded-xl p-2 relative overflow-hidden group min-h-[75px] cursor-pointer hover:shadow-md transition-shadow duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-emerald-50 group-hover:scale-105 transition-transform duration-300"></div>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-0"></div>
                        <div className="relative z-10">
                            <p className="text-teal-900/90 font-bold text-[6px] uppercase tracking-widest mb-0.5">Eco</p>
                            <h3 className="text-[8px] md:text-xs font-semibold text-teal-950 leading-tight drop-shadow-sm">Recycled</h3>
                        </div>
                        <div className="absolute right-1 bottom-1 text-2xl opacity-20">♻️</div>
                    </div>
                </div>

            </div>
        </section>
    );
}
