import { Package, ShieldCheck, Palette, PencilRuler } from "lucide-react";

export function ServiceFeatures() {
    const features = [
        {
            icon: Package,
            title: "Premium Quality",
            description: "Thick, durable papers"
        },
        {
            icon: PencilRuler,
            title: "Bespoke Design",
            description: "Tailored to your needs"
        },
        {
            icon: ShieldCheck,
            title: "Eco-Friendly",
            description: "100% Recyclable"
        },
        {
            icon: Palette,
            title: "Theme Customization",
            description: "Match any occasion"
        },
    ];


    return (
        <section className="py-4 border-t border-pink-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 lg:gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex flex-row items-center text-left gap-3 cursor-default">
                            <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
                                <feature.icon className="w-3.5 h-3.5 text-pink-500" strokeWidth={2} />
                            </div>
                            <div>
                                <h3 className="font-bold text-neutral-900 text-[10px] uppercase tracking-wider">{feature.title}</h3>
                                <p className="text-[9px] text-gray-500 leading-tight mt-0.5">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
