import { MOCK_PRODUCTS } from "@/lib/mock-products";
import { ProductDetails } from "@/components/features/shop/ProductDetails";

export async function generateStaticParams() {
    return MOCK_PRODUCTS.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ProductDetails id={id} />;
}
