import { Suspense } from "react";
import { ShopListing } from "@/components/features/shop/ShopListing";
import { Product } from "@/types/product";


export const metadata = {
    title: "Shop - PetShop",
    description: "Browse our collection of pet essentials.",
};

import { apiClient } from "@/lib/api-client";

export default async function ShopPage() {
    // Fetch from Backend (or Mock)
    const products = await apiClient.getProducts();

    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400"></div></div>}>
            <ShopListing products={products} />
        </Suspense>
    );
}
