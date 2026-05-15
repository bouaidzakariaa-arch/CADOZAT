// app/references/page.tsx
// Server Component — pas de "use client" ici
// Copiez dans : app/references/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import ReferencesClient from "./ReferencesClient";

export const metadata: Metadata = {
  title: "Nos Références — CADOZAT",
  description:
    "Découvrez les entreprises et institutions qui nous font confiance. CADOZAT, concessionnaire officiel Isuzu & Karry au Maroc.",
};

export default function ReferencesPage() {
  return <ReferencesClient />;
}