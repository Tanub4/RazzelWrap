"use client";

import { useEffect, useState } from "react";
import { ProductSlider } from "./ProductSlider";
import { Product } from "@/types/product";

import { apiClient } from "@/lib/api-client";

export function NewArrivals() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                // Use the API client which handles mock data fallback
                const products = await apiClient.getProducts();
                setProducts(products);
            } catch (e) {
                console.error("Failed to fetch products", e);
            }
        }
        fetchProducts();
    }, []);

    if (products.length === 0) return null;

    return (
        <ProductSlider
            title="New Arrivals"
            products={products}
            viewAllLink="/shop"
        />
    );
}
