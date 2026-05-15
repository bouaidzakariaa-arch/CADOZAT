// app/avis-clients/page.tsx
// 1. Créer le dossier : app/avis-clients/
// 2. Copier ce fichier dedans en le nommant : page.tsx

import type { Metadata } from "next";
import AvisClients from "@/components/AvisClients";

export const metadata: Metadata = {
  title: "Avis Clients — CADOZAT",
  description:
    "Lisez les avis de nos clients sur CADOZAT, concessionnaire officiel Isuzu & Karry au Maroc. Agences à Ouarzazate, Agadir et Tinghir.",
};

export default function AvisClientsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f7f6f3", paddingTop: "2rem", paddingBottom: "4rem" }}>
      <AvisClients />
    </main>
  );
}