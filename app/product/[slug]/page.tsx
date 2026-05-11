import { Metadata } from "next";
import ProductClient from "./ProductClient";
import { createClient } from "../../lib/supabase-server";
import { slugify } from "../../lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  if (!slug) return { title: "Product — Revvview" };

  try {
    const supabase = await createClient();
    const { data: products } = await supabase
      .from('products')
      .select('name, tagline');

    const product = products?.find(p => slugify(p.name) === slug);

    if (!product) {
      return {
        title: "Product Not Found — Revvview",
      };
    }

    return {
      title: `${product.name} — Revvview`,
      description: product.tagline,
      openGraph: {
        title: `${product.name} — Revvview`,
        description: product.tagline,
        images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Revvview" }],
      },
      twitter: {
        title: `${product.name} — Revvview`,
        description: product.tagline,
        images: ["/og.jpg"],
      }
    };
  } catch (e) {
    return {
      title: "Product — Revvview",
    };
  }
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <ProductClient params={params} />;
}
