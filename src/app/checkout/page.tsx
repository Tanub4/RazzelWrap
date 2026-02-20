"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, PenLine, ShoppingBag, Plus, Minus, Trash2, Truck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import html2canvas from 'html2canvas';

export default function CheckoutPage() {
    const { items, totalAmount, totalItems, updateQuantity, removeFromCart } = useCart();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [address, setAddress] = useState<any>(null);

    useEffect(() => {
        setMounted(true);
        const savedAddress = localStorage.getItem('checkout_address');
        if (savedAddress) {
            try {
                setAddress(JSON.parse(savedAddress));
            } catch (e) {
                console.error("Failed to parse address", e);
            }
        }
    }, []);

    // Calculate details
    const totalMRP = items.reduce((sum, item) => sum + ((item.regularPrice || item.price) * item.quantity), 0);
    const totalDiscount = totalMRP - totalAmount;

    const handleSaveAddress = (data: any) => {
        setAddress(data);
        localStorage.setItem('checkout_address', JSON.stringify(data));
        setIsEditingAddress(false);
    };

    if (!mounted) return null;

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <Link href="/shop">
                    <Button className="bg-pink-400 text-black hover:bg-pink-500 font-bold rounded-xl">
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 md:pb-12">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center gap-4">
                    <Link href="/shop" className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </Link>
                    <h1 className="text-lg font-bold text-black">Order Summary</h1>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Address & Items */}
                <div className="md:col-span-2 space-y-6">
                    {/* Address Section */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-bold text-gray-900 border-l-4 border-pink-400 pl-3">
                                Delivery Address
                            </h2>
                            {address && (
                                <button onClick={() => setIsEditingAddress(true)} className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline">
                                    Change Address
                                </button>
                            )}
                        </div>

                        {address ? (
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <MapPin className="w-5 h-5 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-gray-900">{address.name}</span>
                                        <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                                            {address.type}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                        {address.street}, {address.city}, {address.state} - <span className="font-bold">{address.zip}</span>
                                    </p>
                                    <p className="text-sm text-gray-600 font-medium">
                                        Phone: {address.phone}
                                    </p>
                                    <div className="mt-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setIsEditingAddress(true)}
                                            className="rounded-xl h-8 text-xs font-bold border-gray-200"
                                        >
                                            Edit Address <PenLine className="w-3 h-3 ml-2" />
                                        </Button>
                                    </div>

                                    {/* Local Edit Dialog */}
                                    <Dialog open={isEditingAddress} onOpenChange={setIsEditingAddress}>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Delivery Address</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">Full Name</label>
                                                        <input
                                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                                            placeholder="John Doe"
                                                            defaultValue={address?.name || ''}
                                                            name="name"
                                                            id="addr_name"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">Phone</label>
                                                        <input
                                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                                            placeholder="9876543210"
                                                            defaultValue={address?.phone || ''}
                                                            name="phone"
                                                            id="addr_phone"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Street Address</label>
                                                    <input
                                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                                        placeholder="Flat / House No / Street"
                                                        defaultValue={address?.street || ''}
                                                        name="street"
                                                        id="addr_street"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">City</label>
                                                        <input
                                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                                            placeholder="Bengaluru"
                                                            defaultValue={address?.city || ''}
                                                            name="city"
                                                            id="addr_city"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">State</label>
                                                        <input
                                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                                            placeholder="Karnataka"
                                                            defaultValue={address?.state || ''}
                                                            name="state"
                                                            id="addr_state"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">ZIP Code</label>
                                                        <input
                                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                                            placeholder="560001"
                                                            defaultValue={address?.zip || ''}
                                                            name="zip"
                                                            id="addr_zip"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">Address Type</label>
                                                        <select
                                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                                            defaultValue={address?.type || 'Home'}
                                                            name="type"
                                                            id="addr_type"
                                                        >
                                                            <option value="Home">Home</option>
                                                            <option value="Work">Work</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end gap-3 pt-4">
                                                    <Button variant="outline" onClick={() => setIsEditingAddress(false)}>Cancel</Button>
                                                    <Button
                                                        className="bg-black text-white"
                                                        onClick={() => {
                                                            const data = {
                                                                name: (document.getElementById('addr_name') as HTMLInputElement).value,
                                                                phone: (document.getElementById('addr_phone') as HTMLInputElement).value,
                                                                street: (document.getElementById('addr_street') as HTMLInputElement).value,
                                                                city: (document.getElementById('addr_city') as HTMLInputElement).value,
                                                                state: (document.getElementById('addr_state') as HTMLInputElement).value,
                                                                zip: (document.getElementById('addr_zip') as HTMLInputElement).value,
                                                                type: (document.getElementById('addr_type') as HTMLSelectElement).value,
                                                            };
                                                            handleSaveAddress(data);
                                                        }}
                                                    >
                                                        Save Address
                                                    </Button>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-gray-500 mb-4">No address selected for delivery.</p>
                                <Button
                                    onClick={() => setIsEditingAddress(true)}
                                    className="bg-black text-white hover:bg-black/90 font-bold rounded-xl w-full sm:w-auto"
                                >
                                    Add New Address
                                </Button>
                                <Dialog open={isEditingAddress} onOpenChange={setIsEditingAddress}>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Delivery Address</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                            <div className="space-y-4 py-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">Full Name</label>
                                                        <input
                                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                                            placeholder="John Doe"
                                                            name="name"
                                                            id="new_addr_name"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">Phone</label>
                                                        <input
                                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                                            placeholder="9876543210"
                                                            name="phone"
                                                            id="new_addr_phone"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Street Address</label>
                                                    <input
                                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                                        placeholder="Flat / House No / Street"
                                                        name="street"
                                                        id="new_addr_street"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">City</label>
                                                        <input
                                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                                            placeholder="Bengaluru"
                                                            name="city"
                                                            id="new_addr_city"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">State</label>
                                                        <input
                                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                                            placeholder="Karnataka"
                                                            name="state"
                                                            id="new_addr_state"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">ZIP Code</label>
                                                        <input
                                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                                            placeholder="560001"
                                                            name="zip"
                                                            id="new_addr_zip"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">Address Type</label>
                                                        <select
                                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                                            defaultValue="Home"
                                                            name="type"
                                                            id="new_addr_type"
                                                        >
                                                            <option value="Home">Home</option>
                                                            <option value="Work">Work</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end gap-3 pt-4">
                                                    <Button variant="outline" onClick={() => setIsEditingAddress(false)}>Cancel</Button>
                                                    <Button
                                                        className="bg-black text-white"
                                                        onClick={() => {
                                                            const data = {
                                                                name: (document.getElementById('new_addr_name') as HTMLInputElement).value,
                                                                phone: (document.getElementById('new_addr_phone') as HTMLInputElement).value,
                                                                street: (document.getElementById('new_addr_street') as HTMLInputElement).value,
                                                                city: (document.getElementById('new_addr_city') as HTMLInputElement).value,
                                                                state: (document.getElementById('new_addr_state') as HTMLInputElement).value,
                                                                zip: (document.getElementById('new_addr_zip') as HTMLInputElement).value,
                                                                type: (document.getElementById('new_addr_type') as HTMLSelectElement).value,
                                                            };
                                                            handleSaveAddress(data);
                                                        }}
                                                    >
                                                        Save Address
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        )}
                    </div>

                    {/* Product List */}
                    <div id="cart-items-container" className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <h2 className="font-bold text-gray-900 border-l-4 border-pink-400 pl-3 mb-6">
                            Selected Items ({totalItems})
                        </h2>
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 border-b border-gray-50 last:border-0 pb-6 last:pb-0">
                                    <div className="relative w-24 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start gap-4">
                                            <div>
                                                <h3 className="font-bold text-sm text-gray-900 line-clamp-2 mb-1">
                                                    {item.name}
                                                </h3>
                                                <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-sm">₹{(item.salePrice || item.price).toFixed(0)}</span>
                                                    {(item.discountPercentage || 0) > 0 && (
                                                        <span className="text-xs text-gray-400 line-through">₹{(item.regularPrice || item.price).toFixed(0)}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-3">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center border border-gray-200 rounded-lg bg-white h-8">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-full flex items-center justify-center hover:bg-gray-50 text-gray-600 rounded-l-lg"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-full flex items-center justify-center hover:bg-gray-50 text-gray-600 rounded-r-lg"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {(item.discountPercentage || 0) > 0 && (
                                            <p className="text-[10px] text-green-600 font-bold mt-2">
                                                You saved ₹{(((item.regularPrice || item.price) - (item.salePrice || item.price)) * item.quantity).toFixed(0)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Price Details */}
                <div className="md:col-span-1">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="font-bold text-gray-900 border-l-4 border-pink-400 pl-3 mb-6">
                            Bill Details
                        </h2>

                        <div className="space-y-3 text-sm mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Total MRP</span>
                                <span>₹{totalMRP.toFixed(0)}</span>
                            </div>
                            <div className="flex justify-between text-green-600 font-medium">
                                <span>Discount on MRP</span>
                                <span>-₹{totalDiscount.toFixed(0)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Delivery Fee</span>
                                <span className="text-green-600 font-bold">Free</span>
                            </div>
                            <div className="h-px bg-gray-100 my-2"></div>
                            <div className="flex justify-between text-base font-black text-gray-900">
                                <span>Total Amount</span>
                                <span>₹{totalAmount.toFixed(0)}</span>
                            </div>
                        </div>

                        {totalDiscount > 0 && (
                            <div className="bg-green-50 text-green-700 text-xs font-bold p-3 rounded-xl flex items-center gap-2 mb-6">
                                <ShieldCheck className="w-4 h-4" />
                                <span>You are saving ₹{totalDiscount.toFixed(0)} on this order</span>
                            </div>
                        )}

                        <Button
                            onClick={() => {
                                if (!address) return;

                                const phoneNumber = "918861153565";

                                let message = `*Hello, I want to place an order!* 🎁\n\n`;
                                message += `*Order Details:*\n`;
                                items.forEach(item => {
                                    message += `• ${item.name} (x${item.quantity}) - ₹${((item.salePrice || item.price) * item.quantity).toFixed(0)}\n`;
                                });

                                message += `\n*Total Amount:* ₹${totalAmount.toFixed(0)}\n\n`;

                                message += `*Delivery Address:*\n`;
                                message += `${address.name}\n`;
                                message += `${address.street}\n`;
                                message += `${address.city}, ${address.state} - ${address.zip}\n`;
                                message += `Phone: ${address.phone}\n\n`;
                                message += `Type: ${address.type}`;

                                const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                                window.open(url, '_blank');
                            }}
                            disabled={!address}
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold h-12 rounded-xl text-base shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                            Order on WhatsApp
                        </Button>

                        <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-gray-400">
                            <Truck className="w-3 h-3" />
                            <span>Safe and Secure Delivery</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
