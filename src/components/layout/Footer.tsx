import Link from "next/link";
import { Facebook, Instagram, Twitter, PawPrint, Mail, ArrowRight, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="border-t border-primary/20 pt-10 pb-24 md:pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-10">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative w-16 h-16 bg-white rounded-lg p-1 shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3 overflow-hidden">
                                <Image
                                    src="/logo.png"
                                    alt="Razzel Wrap"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                Razzel Wrap
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            Your destination for premium gift wrapping supplies. Make every gift unforgettable with our curated collection.
                        </p>
                        <div className="flex gap-3">
                            {["Facebook", "Instagram", "Twitter"].map((social, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-8 h-8 rounded-full bg-white/50 flex items-start justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md pt-2"
                                    aria-label={social}
                                >
                                    {i === 0 && <Facebook className="w-4 h-4" />}
                                    {i === 1 && <Instagram className="w-4 h-4" />}
                                    {i === 2 && <Twitter className="w-4 h-4" />}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Location & Contact */}
                    <div className="col-span-1 space-y-4">
                        <h3 className="font-bold text-neutral-900 mb-4 text-sm tracking-wide">Visit Us</h3>
                        <div className="space-y-3">
                            <div className="flex gap-3 items-start group">
                                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                <div className="space-y-1">
                                    <p className="text-gray-500 text-xs leading-relaxed">
                                        E 16/19 Ground Floor, Ranganatha Badavane, Alkola, Shimoga - 577204
                                    </p>
                                    <p className="text-[10px] text-gray-400 font-medium">
                                        Near Vidhatri Bhavan on Gopala Main Road
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 items-start group">
                                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                <div className="flex flex-col text-xs text-gray-500 space-y-1">
                                    <a href="tel:+919353033997" className="hover:text-primary transition-colors">+91 93530 33997</a>
                                    <a href="tel:+918310714092" className="hover:text-primary transition-colors">+91 83107 14092</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Google Map */}
                    <div className="col-span-1 h-full min-h-[250px] md:min-h-full rounded-lg overflow-hidden border border-primary/20 shadow-sm">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3872.430427000115!2d75.55020139999999!3d13.932958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbba921539b0217%3A0x8a41ff398a35577!2sRAZZEL%20WRAP!5e0!3m2!1sen!2sin!4v1771529179799!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: '100%' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Razzel Wrap Location"
                            className="grayscale hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                    </div>

                    {/* Shop Links */}
                    <div className="col-span-1">
                        <h3 className="font-bold text-neutral-900 mb-4 text-sm tracking-wide">Shop</h3>
                        <ul className="space-y-2.5">
                            {["Wrapping Paper", "Ribbons", "Gift Boxes", "Cards & Tags", "New Arrivals"].map((item) => (
                                <li key={item}>
                                    <Link href="/shop" className="text-gray-500 hover:text-primary hover:translate-x-1 transition-all duration-300 text-xs font-medium inline-block">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>



                    {/* Newsletter */}
                    <div className="col-span-1">
                        <h3 className="font-bold text-neutral-900 mb-4 text-sm tracking-wide">Stay Connected</h3>
                        <div className="relative mb-6 group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <input
                                suppressHydrationWarning
                                type="email"
                                placeholder="Email address"
                                className="w-full bg-white/50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                            <button
                                suppressHydrationWarning
                                className="absolute right-1 top-1 p-1.5 bg-black rounded-md text-white hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow"
                            >
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-primary/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-[10px]">
                        © 2026 Razzel Wrap. All rights reserved.
                    </p>
                    <div className="flex gap-3 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        {/* Payment Icons Placeholder */}
                        <div className="h-5 w-8 bg-gray-200 rounded"></div>
                        <div className="h-5 w-8 bg-gray-200 rounded"></div>
                        <div className="h-5 w-8 bg-gray-200 rounded"></div>
                        <div className="h-5 w-8 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
