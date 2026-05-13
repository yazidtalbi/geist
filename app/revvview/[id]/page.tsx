import { Metadata } from "next";
import DeepDiveClient from "./DeepDiveClient";
import { createClient } from "../../lib/supabase-server";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const supabase = await createClient();
    const { data: review } = await supabase
      .from('reviews')
      .select('product_id')
      .eq('id', id)
      .single();

    if (!review) return { title: "Review Not Found — Revvview" };

    const { data: product } = await supabase
      .from('products')
      .select('name')
      .eq('id', review.product_id)
      .single();

    if (!product) return { title: "Review — Revvview" };

    return {
      title: `Deep Dive: ${product.name} — Revvview`,
      description: `Comprehensive design and logic audit report for ${product.name}.`,
    };
  } catch (e) {
    return {
      title: "Audit Report — Revvview",
    };
  }
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <DeepDiveClient params={params} />;
}
