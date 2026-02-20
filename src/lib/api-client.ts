import { MOCK_PRODUCTS } from "./mock-products";
import { Product } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const USE_MOCK = true; // Force mock data for static export

export const apiClient = {
    getProducts: async (): Promise<Product[]> => {
        if (USE_MOCK) {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 500));
            return MOCK_PRODUCTS;
        }

        try {
            const res = await fetch(`${API_URL}/products`);
            if (!res.ok) throw new Error('Failed to fetch products');
            const data = await res.json();
            return data.reverse().map((p: Product & { _id?: string }) => ({
                ...p,
                id: p._id || p.id,
                regularPrice: p.price,
                discountPercentage: p.salePrice ? Math.round(((p.price - p.salePrice) / p.price) * 100) : 0
            }));
        } catch (error) {
            console.warn("API unavailable, using mock data", error);
            return MOCK_PRODUCTS;
        }
    },

    getProduct: async (id: string): Promise<Product | null> => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return MOCK_PRODUCTS.find(p => p.id === id) || null;
        }
        try {
            const res = await fetch(`${API_URL}/products/${id}`);
            if (!res.ok) return null;
            const data = await res.json();
            // Normalize data
            return {
                ...data,
                id: data._id,
                regularPrice: data.price,
                discountPercentage: data.salePrice ? Math.round(((data.price - data.salePrice) / data.price) * 100) : 0,
                inStock: data.stock > 0
            };
        } catch (error) {
            console.warn("API unavailable, using mock data", error);
            return MOCK_PRODUCTS.find(p => p.id === id) || null;
        }
    },

    searchProducts: async (query: string): Promise<Product[]> => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 300));
            const lowerQuery = query.toLowerCase();
            return MOCK_PRODUCTS.filter(p =>
                p.name.toLowerCase().includes(lowerQuery) ||
                p.description.toLowerCase().includes(lowerQuery)
            ).slice(0, 5);
        }
        try {
            const res = await fetch(`${API_URL}/products?keyword=${query}`);
            if (!res.ok) throw new Error('Failed to fetch suggestions');
            const data = await res.json();
            return data.map((p: any) => ({ ...p, id: p._id }));
        } catch (error) {
            console.warn("API unavailable, using mock data", error);
            const lowerQuery = query.toLowerCase();
            return MOCK_PRODUCTS.filter(p =>
                p.name.toLowerCase().includes(lowerQuery) ||
                p.description.toLowerCase().includes(lowerQuery)
            ).slice(0, 5);
        }
    },

    getOrders: async (userId: string): Promise<any[]> => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return [
                {
                    _id: "order_1",
                    totalAmount: 2050,
                    status: "Delivered",
                    paymentMethod: "UPI",
                    createdAt: new Date().toISOString(),
                    items: [
                        {
                            _id: "item_1",
                            product: MOCK_PRODUCTS[0],
                            quantity: 1,
                            price: 1200
                        },
                        {
                            _id: "item_2",
                            product: MOCK_PRODUCTS[1],
                            quantity: 1,
                            price: 850
                        }
                    ]
                }
            ];
        }
        try {
            const res = await fetch(`${API_URL}/orders/myorders/${userId}`);
            if (!res.ok) throw new Error('Failed to fetch orders');
            return await res.json();
        } catch (error) {
            console.warn("API unavailable, using mock orders", error);
            return [];
        }
    },

    createOrder: async (orderData: any): Promise<{ success: boolean; orderId?: string; error?: string }> => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 800));
            return { success: true, orderId: "mock_order_" + Date.now() };
        }
        try {
            const res = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            const data = await res.json();
            if (res.ok) {
                return { success: true, orderId: data._id || data.orderId };
            }
            return { success: false, error: data.message || "Failed to place order" };
        } catch (error) {
            console.warn("API unavailable, using mock order", error);
            return { success: true, orderId: "mock_order_" + Date.now() };
        }
    }
};
