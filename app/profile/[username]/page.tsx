import { Metadata } from "next";
import DynamicProfilePage from "./ProfileClient";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `${username} — Profile`,
  };
}

export default function Page({ params }: { params: Promise<{ username: string }> }) {
  return <DynamicProfilePage params={params} />;
}
