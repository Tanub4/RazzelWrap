"use client";

import { useEffect, useState } from "react";
import { ProductSlider } from "./ProductSlider";
import { Product } from "@/types/product";

import { apiClient } from "@/lib/api-client";

export function DealOfWeek() {
    const [deals, setDeals] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchDeals() {
            try {
                // Use API client for data
                const products = await apiClient.getProducts();

                // Simulate "Deals" by picking random or those with salePrice
                const dealProducts = products
                    .filter((p: Product & { isDeal?: boolean }) => p.isDeal || (p.discountPercentage ?? 0) > 0)
                    .map((p: Product) => ({
                        ...p,
                        // Ensure optional mapped fields are present if needed, though apiClient handles most
                    }));

                setDeals(dealProducts.slice(0, 4));
            } catch (e) {
                console.error("Failed to fetch deals", e);
            }
        }
        fetchDeals();
    }, []);

    if (deals.length === 0) return null;

    return (
        <ProductSlider
            title="Deal of the Week"
            products={deals}
        />
    );
}
