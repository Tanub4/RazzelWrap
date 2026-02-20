"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, ShoppingBasket, Gift, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BannerData {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    bgColor: string;
    textColor: string;
    accentColor: string;
    buttonColor: string;
    icon: React.ElementType;
    type: "standard" | "full";
}

const BANNER_DATA: BannerData[] = [
    {
        id: 1,
        title: "Gift Wrapping Essentials",
        subtitle: "Premium Paper & Ribbons",
        description: "Everything you need to wrap with love.",
        image: "/images/Banner/banner-wrapping-paper.jpg",
        bgColor: "#BC7F82", // Dusty Pink Main
        textColor: "#FFFFFF",
        accentColor: "#FFFFFF",
        buttonColor: "#BC7F82",
        icon: Gift,
        type: "full"
    },
    {
        id: 2,
        title: "Elegant Gift Boxes",
        subtitle: "For Every Occasion",
        description: "Sturdy, stylish, and sustainable.",
        image: "/images/Banner/banner-gift-boxes.jpg",
        bgColor: "#E8AFB5", // Light Dusty Pink
        textColor: "#FFFFFF",
        accentColor: "#FDF2F4",
        buttonColor: "#BC7F82",
        icon: Package,
        type: "full"
    },
    {
        id: 3,
        title: "Ribbons & Bows",
        subtitle: "The Perfect Finishing Touch",
        description: "Silk, satin, and velvet ribbons.",
        image: "/images/Banner/banner-ribbons.jpg",
        bgColor: "#FDF2F4", // Pale Pink Background
        textColor: "#FFFFFF",
        accentColor: "#FDF2F4",
        buttonColor: "#BC7F82",
        icon: ShoppingBasket,
        type: "full"
    }
];

export function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % BANNER_DATA.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);



    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % BANNER_DATA.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + BANNER_DATA.length) % BANNER_DATA.length);

    return (
        <div className="w-full px-4 sm:px-6 pt-4 pb-2 md:pt-6 max-w-7xl mx-auto">
            {/* Banner Card Container */}
            <section className="relative w-full h-[380px] md:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-xl border border-black/5 group">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={BANNER_DATA[currentSlide].id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`absolute inset-0 w-full h-full flex flex-col md:flex-row items-center md:items-center justify-center md:justify-start ${BANNER_DATA[currentSlide].type === "full"
                            ? "px-6 py-8 md:px-12 md:py-0"
                            : "px-6 md:px-20"
                            }`}
                        style={{ backgroundColor: BANNER_DATA[currentSlide].bgColor }}
                    >
                        {/* Background Image */}
                        {BANNER_DATA[currentSlide].image && (
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={BANNER_DATA[currentSlide].image}
                                    alt={BANNER_DATA[currentSlide].title}
                                    fill
                                    className="object-cover opacity-80" // Slightly transparent for 'glossy' look
                                    priority
                                />
                                {/* Overlay for text readability - dark glossy effect */}
                                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                            </div>
                        )}

                        {/* Background Icon (Fallback or decorative if no image, but we prioritize image now) */}
                        {!BANNER_DATA[currentSlide].image && BANNER_DATA[currentSlide].type === "full" && (
                            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
                                <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-10 transform translate-x-1/4 md:translate-x-10">
                                    {/* Abstract Pattern using repeated text or SVG */}
                                    <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-200 to-transparent"></div>
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:left-auto md:right-10 md:translate-x-0 opacity-10 md:opacity-20 animate-float text-black/20">
                                    {/* Dynamic Icon */}
                                    {(() => {
                                        const Icon = BANNER_DATA[currentSlide].icon;
                                        return <Icon className="w-64 h-64 md:w-96 md:h-96" strokeWidth={0.5} />;
                                    })()}
                                </div>
                            </div>
                        )}

                        {/* Text Content */}
                        <div className={`relative z-10 w-full flex flex-col items-center md:items-start text-center md:text-left space-y-4 md:space-y-6 max-w-2xl`}>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 text-white border border-white/20 shadow-sm">
                                    {BANNER_DATA[currentSlide].subtitle}
                                </span>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight drop-shadow-sm" style={{ color: BANNER_DATA[currentSlide].textColor }}>
                                    {BANNER_DATA[currentSlide].title.split(" ").slice(0, 2).join(" ")} <br className="hidden md:block" />
                                    <span style={{ color: BANNER_DATA[currentSlide].bgColor === "#BC7F82" ? "#FDF2F4" : BANNER_DATA[currentSlide].accentColor }}>
                                        With Love
                                    </span>
                                </h1>
                                <p className="text-sm md:text-lg font-medium opacity-90 max-w-xs md:max-w-md mx-auto md:mx-0 leading-relaxed" style={{ color: BANNER_DATA[currentSlide].textColor }}>
                                    {BANNER_DATA[currentSlide].description}
                                </p>
                            </motion.div>

                            <Link href="/shop">
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    className="px-6 py-3 md:px-8 md:py-4 rounded-full text-xs md:text-sm font-bold shadow-lg shadow-black/5 flex items-center gap-2 group/btn hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    style={{
                                        backgroundColor: BANNER_DATA[currentSlide].buttonColor,
                                        color: BANNER_DATA[currentSlide].buttonColor === "#FFFFFF" ? "#BC7F82" : "#FFFFFF"
                                    }}
                                    suppressHydrationWarning
                                >
                                    Shop Now
                                    <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">➜</span>
                                </motion.button>
                            </Link>
                        </div>

                        {/* Standard Image Area would go here if needed, mirroring structure above */}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons (Desktop Only, revealed on hover) */}
                <button
                    onClick={prevSlide}
                    className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/40 hover:bg-white/90 backdrop-blur-md items-center justify-center transition-all shadow-sm hover:shadow-md opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 duration-300"
                    aria-label="Previous slide"
                    suppressHydrationWarning
                >
                    <ChevronLeft className="w-5 h-5 text-black" />
                </button>
                <button
                    onClick={nextSlide}
                    className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/40 hover:bg-white/90 backdrop-blur-md items-center justify-center transition-all shadow-sm hover:shadow-md opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 duration-300"
                    aria-label="Next slide"
                    suppressHydrationWarning
                >
                    <ChevronRight className="w-5 h-5 text-black" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
                    {BANNER_DATA.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide
                                ? "w-6 bg-black/80"
                                : "w-1.5 bg-black/20 hover:bg-black/40"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                            suppressHydrationWarning
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
