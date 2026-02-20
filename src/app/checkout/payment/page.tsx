"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Wallet, Truck, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";

export default function PaymentPage() {
    const router = useRouter();
    const { totalAmount, clearCart, items } = useCart();
    const [selectedMethod, setSelectedMethod] = useState("Card"); // Default to Card, matching typical Enum
    const [processing, setProcessing] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [address, setAddress] = useState<any>(null);

    useEffect(() => {
        const savedAddress = localStorage.getItem('checkout_address');
        if (savedAddress) {
            try {
                setAddress(JSON.parse(savedAddress));
            } catch (e) {
                console.error("Failed to parse address", e);
            }
        } else {
            // Redirect if no address found
            router.push('/checkout');
        }
    }, [router]);

    const handlePayment = async () => {
        if (!address) {
            alert("Delivery address missing");
            return;
        }

        setProcessing(true);

        try {
            const orderData = {
                orderItems: items.map(item => ({
                    product: item.id,
                    quantity: item.quantity,
                    price: item.salePrice || item.price
                })),
                shippingAddress: {
                    street: address.street,
                    city: address.city,
                    state: address.state,
                    zip: address.zip
                },
                paymentMethod: selectedMethod,
                itemsPrice: totalAmount,
                shippingPrice: 0,
                totalPrice: totalAmount,
                user: { _id: 'guest_user' } // Dummy guest user
            };

            const result = await apiClient.createOrder(orderData);

            if (result.success) {
                setOrderSuccess(true);
                clearCart();
                // Clear address after successful order if desired, or keep it for future
                // localStorage.removeItem('checkout_address'); 

                // Redirect after showing success for a moment
                setTimeout(() => {
                    router.push("/");
                }, 3000);
            } else {
                alert(`Order Failed: ${result.error || 'Unknown error'}`);
            }

        } catch (error) {
            console.error("Payment Error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">Order Placed!</h1>
                <p className="text-gray-600 mb-8 max-w-md">
                    Thank you for your purchase. Your order has been confirmed and will be delivered soon.
                </p>
                <div className="w-full max-w-sm bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">Amount Paid</span>
                        <span className="font-bold">₹{totalAmount.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Payment Method</span>
                        <span className="font-bold uppercase">{selectedMethod}</span>
                    </div>
                </div>
                <Button
                    onClick={() => router.push('/')}
                    className="bg-pink-400 hover:bg-pink-500 text-black font-bold h-12 px-8 rounded-xl"
                >
                    Back to Home
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 h-16 flex items-center gap-4">
                    <Link href="/checkout" className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </Link>
                    <h1 className="text-lg font-bold text-black">Payment</h1>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
                    <div className="flex flex-col gap-1 mb-6 text-center">
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Amount to Pay</span>
                        <span className="text-4xl font-black text-gray-900">₹{totalAmount.toFixed(0)}</span>
                    </div>

                    <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Select Payment Method</h3>

                    <div className="space-y-3">
                        {/* UPI */}
                        <div
                            onClick={() => setSelectedMethod("UPI")}
                            className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedMethod === "UPI" ? "border-pink-400 bg-pink-50" : "border-gray-100 hover:border-gray-200"}`}
                        >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === "UPI" ? "border-pink-600" : "border-gray-300"}`}>
                                {selectedMethod === "UPI" && <div className="w-3 h-3 bg-pink-600 rounded-full" />}
                            </div>
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <Wallet className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="font-bold text-gray-800">UPI / Wallets</span>
                        </div>

                        {/* Card */}
                        <div
                            onClick={() => setSelectedMethod("Card")}
                            className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedMethod === "Card" ? "border-pink-400 bg-pink-50" : "border-gray-100 hover:border-gray-200"}`}
                        >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === "Card" ? "border-pink-600" : "border-gray-300"}`}>
                                {selectedMethod === "Card" && <div className="w-3 h-3 bg-pink-600 rounded-full" />}
                            </div>
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <CreditCard className="w-5 h-5 text-purple-600" />
                            </div>
                            <span className="font-bold text-gray-800">Credit / Debit Card</span>
                        </div>

                        {/* COD */}
                        <div
                            onClick={() => setSelectedMethod("Cash on Delivery")}
                            className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedMethod === "Cash on Delivery" ? "border-pink-400 bg-pink-50" : "border-gray-100 hover:border-gray-200"}`}
                        >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === "Cash on Delivery" ? "border-pink-600" : "border-gray-300"}`}>
                                {selectedMethod === "Cash on Delivery" && <div className="w-3 h-3 bg-pink-600 rounded-full" />}
                            </div>
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <Truck className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="font-bold text-gray-800">Cash on Delivery</span>
                        </div>
                    </div>
                </div>

                <Button
                    onClick={handlePayment}
                    disabled={processing}
                    className="w-full h-14 bg-black hover:bg-black/90 text-white font-bold text-lg rounded-2xl shadow-lg shadow-black/20"
                >
                    {processing ? (
                        <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing...
                        </span>
                    ) : (
                        `Pay ₹${totalAmount.toFixed(0)}`
                    )}
                </Button>
            </main>
        </div>
    );
}
