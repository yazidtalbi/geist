import { Metadata } from "next";
import SubmitProductClient from "./SubmitProductClient";

export const metadata: Metadata = {
  title: "Launch Your Product — Revvview",
  description: "Submit your digital product for a high-fidelity design and logic audit by the Revvview community.",
};

export default function Page() {
  return <SubmitProductClient />;
}
