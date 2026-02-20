"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingCart, User, Menu, Gift, Heart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { apiClient } from "@/lib/api-client";



export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { toggleCart, totalItems } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    // Hide search on product details page (optional refactor)
    const isSearchVisible = true;

    // Check if on product details page
    const isProductDetails = /^\/shop\/[^/]+$/.test(pathname || "");

    const searchSuggestions = [
        "Search 'gift boxes'",
        "Search 'wrapping paper'",
        "Search 'satin ribbons'",
        "Search 'wedding gifts'",
        "Search 'birthday cards'"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setSuggestionIndex((prev) => (prev + 1) % searchSuggestions.length);
                setIsFading(false);
            }, 500); // Wait for fade out to complete
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim().length > 0) {
            try {
                const matches = await apiClient.searchProducts(query);
                const displayMatches = matches.map(p => p.name).slice(0, 5);
                setSuggestions(displayMatches);
                setShowSuggestions(true);
            } catch (error) {
                console.error("Failed to fetch suggestions", error);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const [tipIndex, setTipIndex] = useState(0);
    const [isTipFading, setIsTipFading] = useState(false);

    const topBarMessages = [
        "Exclusive Handmade Gifts Collection",
        "Made with Love, Wrapped in Joy",
        "Personalized Gifts for Every Occasion",
        "Premium Gift Baskets & Hampers",
        "Unique Gift Ideas & Accessories",
        "Express Delivery Available"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTipFading(true);
            setTimeout(() => {
                setTipIndex((prev) => (prev + 1) % topBarMessages.length);
                setIsTipFading(false);
            }, 500);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/shop" },
    ];



    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            performSearch(searchQuery);
        }
    };

    const performSearch = (query: string) => {
        setShowSuggestions(false);
        setSearchQuery(query); // Update input if clicked from suggestion
        if (query.trim()) {
            router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
        } else {
            router.push('/shop');
        }
    };

    return (
        <>
            {/* Top Bar */}
            {/* Top Bar - Hidden on mobile product details */}
            <div className={`bg-primary text-white py-1.5 border-none relative z-50 ${isProductDetails ? 'hidden md:block' : ''}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative flex justify-center items-center">


                    <div className="flex items-center justify-center">
                        <span
                            className="transition-opacity duration-500 text-[10px] font-semibold tracking-wide text-center"
                            style={{ opacity: isTipFading ? 0 : 1 }}
                        >
                            {topBarMessages[tipIndex]}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className={`sticky top-0 z-50 bg-primary border-none shadow-none ${isProductDetails ? 'hidden md:block' : ''}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2">
                    <div className="flex items-center justify-between gap-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center gap-2 md:gap-4">
                                <div className="relative h-16 md:h-24 w-auto drop-shadow-sm">
                                    <Image
                                        src="/logo.png"
                                        alt="Razzel Wrap Logo"
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        className="h-full w-auto object-contain"
                                        priority
                                    />
                                </div>
                                <div className="flex flex-col leading-tight">
                                    <span className="text-xl md:text-3xl font-black tracking-tighter text-black">Razzel</span>
                                    <span className="text-xs md:text-sm font-extrabold text-black/80 uppercase tracking-widest">Wrap</span>
                                </div>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8 mx-4">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`text-sm font-bold uppercase tracking-wide transition-colors relative group ${isActive ? "text-white" : "text-white/80 hover:text-white"
                                            }`}
                                    >
                                        {link.name}
                                        <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-white transform transition-transform duration-300 origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                            }`} />
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Search Bar (Desktop) - Conditional */}
                        {isSearchVisible ? (
                            <div className="hidden lg:flex flex-1 max-w-lg relative group">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onFocus={() => { if (searchQuery.trim()) setShowSuggestions(true); }}
                                    onClick={() => { if (searchQuery.trim()) setShowSuggestions(true); }}
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to allow click
                                    // Add onKeyDown listener here
                                    onKeyDown={handleSearch}
                                    className="w-full border-none rounded-xl py-3 pl-10 pr-12 text-sm font-medium focus:outline-none shadow-lg shadow-black/5 relative z-10 bg-transparent"
                                />
                                {/* Dynamic Placeholder */}
                                {!searchQuery && (
                                    <div className="absolute left-10 top-1/2 -translate-y-1/2 text-black/40 text-sm font-medium pointer-events-none transition-opacity duration-500 z-30" style={{ opacity: isFading ? 0 : 1 }}>
                                        {searchSuggestions[suggestionIndex]}
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-white rounded-xl shadow-lg shadow-black/5 -z-0"></div>

                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 group-focus-within:text-black transition-colors duration-300 z-20" />

                                {/* Suggestions Dropdown */}
                                {showSuggestions && suggestions.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl overflow-hidden z-20 border border-gray-100">
                                        {suggestions.map((suggestion, index) => (
                                            <button
                                                key={index}
                                                onMouseDown={(e) => {
                                                    e.preventDefault(); // Prevent focus loss
                                                    performSearch(suggestion);
                                                }}
                                                className="w-full text-left px-4 py-3 text-sm hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-2 group"
                                            >
                                                <Search className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                                                <span className="font-medium text-gray-700 group-hover:text-primary">{suggestion}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="hidden lg:flex flex-1" /> // Spacer to keep alignment if needed, or just null
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <span className="hidden sm:block text-xs font-bold text-white/90 tracking-wide animate-pulse-slow">
                                hello there !
                            </span>
                            <button
                                onClick={toggleCart}
                                className="relative p-2 bg-white/20 rounded-full hover:bg-white/30 text-white transition-colors"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-white text-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Mobile Menu Trigger - Removed as requested, replaced by Bottom Nav */}
                    </div>

                    {/* Search Bar (Mobile - Below) - Conditional */}
                    {isSearchVisible && (
                        <div className="md:hidden mt-4 relative group pb-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onFocus={() => { if (searchQuery.trim()) setShowSuggestions(true); }}
                                    onClick={() => { if (searchQuery.trim()) setShowSuggestions(true); }}
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                    // Add onKeyDown listener here
                                    onKeyDown={handleSearch}
                                    className="w-full border-none rounded-xl py-3 pl-10 pr-10 text-sm font-semibold focus:outline-none shadow-lg shadow-black/5 text-neutral-800 relative z-10 bg-transparent"
                                />
                                {/* Dynamic Placeholder Mobile */}
                                {!searchQuery && (
                                    <div className="absolute left-10 top-1/2 -translate-y-1/2 text-neutral-400 text-sm font-semibold pointer-events-none transition-opacity duration-500 z-30" style={{ opacity: isFading ? 0 : 1 }}>
                                        {searchSuggestions[suggestionIndex]}
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-white rounded-xl shadow-lg shadow-black/5 -z-0"></div>

                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 z-20" />

                                {/* Suggestions Dropdown (Mobile) */}
                                {showSuggestions && suggestions.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl overflow-hidden z-20 border border-gray-100">
                                        {suggestions.map((suggestion, index) => (
                                            <button
                                                key={index}
                                                onMouseDown={(e) => {
                                                    e.preventDefault(); // Prevent focus loss
                                                    performSearch(suggestion);
                                                }}
                                                className="w-full text-left px-4 py-3 text-sm hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-2 group"
                                            >
                                                <Search className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                                                <span className="font-medium text-gray-700 group-hover:text-primary">{suggestion}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </header >
            {/* End Main Header */}
        </>
    );
}
