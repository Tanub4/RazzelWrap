"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { Product } from "@/types/product";
import Image from "next/image";
import { X, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ToastContextType {
    showToast: (product: Product) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toastProduct, setToastProduct] = useState<Product | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const showToast = useCallback((product: Product) => {
        setToastProduct(product);
        setIsVisible(true);

        // Auto hide after 3 seconds
        setTimeout(() => {
            setIsVisible(false);
        }, 3000);
    }, []);

    const hideToast = () => setIsVisible(false);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <AnimatePresence>
                {isVisible && toastProduct && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-white rounded-xl shadow-2xl border border-pink-100 p-4 flex items-center gap-4 min-w-[320px] md:min-w-[400px]"
                    >
                        <div className="relative w-12 h-12 bg-pink-50 rounded-lg overflow-hidden shrink-0 border border-pink-100">
                            <Image
                                src={toastProduct.image}
                                alt={toastProduct.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-gray-900 truncate">{toastProduct.name}</h4>
                            <p className="text-xs text-pink-500 font-medium flex items-center gap-1">
                                <Check className="w-3 h-3" /> Added to cart
                            </p>
                        </div>
                        <button
                            onClick={hideToast}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
