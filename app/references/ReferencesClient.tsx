"use client";
// app/references/ReferencesClient.tsx
// Copiez dans : app/references/ReferencesClient.tsx

import Image from "next/image";

const CLIENTS = [
  { nom: "ACWA Power",     logo: "/images/clients/acwa-life.jpg",    site: "https://www.acwapower.com/",            secteur: "Énergie" },
  { nom: "Coca-Cola Maroc",logo: "/images/clients/coca-cola.png",    site: "https://www.coca-cola.com/ma/fr",       secteur: "Agroalimentaire" },
  { nom: "COPAG",          logo: "/images/clients/Copag.png",        site: "https://copag.ma/fr",                   secteur: "Agroalimentaire" },
  { nom: "HBS Maroc",      logo: "/images/clients/HBS.png",          site: "https://www.hsbmaroc.com/",             secteur: "Services" },
  { nom: "HDS",            logo: "/images/clients/HDS.png",          site: null,                                    secteur: "Services" },
  { nom: "M2EA",           logo: "/images/clients/m2ea.png",         site: null,                                    secteur: "Industrie" },
  { nom: "Oulmes",         logo: "/images/clients/oulmes.png",       site: "https://www.oulmes.ma/",                secteur: "Agroalimentaire" },
  { nom: "Rafii",          logo: "/images/clients/Rafii.jpg",        site: "https://ma.linkedin.com/company/rafii", secteur: "Industrie" },
  { nom: "Souss Gaz",      logo: "/images/clients/soussiya-gaz.png", site: "https://soussgaz.com/",                 secteur: "Énergie" },
];

function ClientCard({ client }: { client: typeof CLIENTS[0] }) {
  const card = (
    <div style={{
      background: "#fff",
      border: "1px solid #e5e5e5",
      borderRadius: 14,
      padding: "1.5rem 1rem 1rem",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      gap: 12,
      position: "relative" as const,
      overflow: "hidden",
      transition: "all 0.25s cubic-bezier(.16,1,.3,1)",
      cursor: client.site ? "pointer" : "default",
    }}
    onMouseEnter={e => {
      if (!client.site) return;
      const el = e.currentTarget as HTMLElement;
      el.style.borderColor = "#CC0000";
      el.style.boxShadow = "0 8px 30px rgba(204,0,0,0.12)";
      el.style.transform = "translateY(-4px)";
      const overlay = el.querySelector(".hover-overlay") as HTMLElement;
      if (overlay) overlay.style.opacity = "1";
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLElement;
      el.style.borderColor = "#e5e5e5";
      el.style.boxShadow = "none";
      el.style.transform = "translateY(0)";
      const overlay = el.querySelector(".hover-overlay") as HTMLElement;
      if (overlay) overlay.style.opacity = "0";
    }}>
      <div style={{ position: "relative", width: 140, height: 80, flexShrink: 0 }}>
        <Image src={client.logo} alt={`Logo ${client.nom}`} fill sizes="140px" style={{ objectFit: "contain" }} />
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1C1C1C", marginBottom: 4 }}>{client.nom}</div>
        <span style={{
          fontSize: 11, fontWeight: 500, color: "#993C1D",
          background: "#FAECE7", padding: "2px 8px", borderRadius: 20,
        }}>{client.secteur}</span>
      </div>
      {client.site && (
        <div className="hover-overlay" style={{
          position: "absolute", inset: 0,
          background: "rgba(204,0,0,0.92)",
          color: "#fff", fontSize: 13, fontWeight: 700,
          display: "flex", flexDirection: "column" as const,
          alignItems: "center", justifyContent: "center", gap: 8,
          opacity: 0, transition: "opacity 0.2s", borderRadius: 13,
        }}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Visiter le site
        </div>
      )}
    </div>
  );

  if (client.site) {
    return (
      <a href={client.site} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
        {card}
      </a>
    );
  }
  return <div style={{ display: "block" }}>{card}</div>;
}

export default function ReferencesClient() {
  return (
    <main style={{ minHeight: "100vh", background: "#f7f6f3", paddingTop: 80 }}>

      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #1a0000 0%, #3d0000 40%, #CC0000 100%)",
        padding: "5rem 1.5rem 4rem",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "inline-block", background: "rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.85)", fontSize: 11, fontWeight: 800,
            letterSpacing: "0.15em", padding: "5px 14px", borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.2)", marginBottom: "1.25rem",
          }}>NOS RÉFÉRENCES</div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, color: "#fff", marginBottom: "1rem", lineHeight: 1.1 }}>
            Ils nous font <span style={{ color: "#ffcc00" }}>confiance</span>
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", maxWidth: 580, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
            Des grandes entreprises aux PME régionales — CADOZAT équipe les leaders
            du Maroc en véhicules utilitaires Isuzu &amp; Karry.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", flexWrap: "wrap" as const }}>
            {[["9+", "Partenaires"], ["3", "Agences au Maroc"], ["25+", "Années d'expérience"]].map(([num, label], i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 4, fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grille */}
      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: 13, color: "#888", marginBottom: "2.5rem" }}>
            Cliquez sur un logo pour visiter le site de notre partenaire.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 16,
          }}>
            {CLIENTS.map(client => <ClientCard key={client.nom} client={client} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 1.5rem 5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            background: "#1C1C1C", borderRadius: 20, padding: "3rem 2.5rem",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: "2rem", flexWrap: "wrap" as const,
          }}>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Rejoignez nos partenaires</h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, maxWidth: 460 }}>
                Besoin de véhicules utilitaires fiables pour votre entreprise ? Notre équipe vous accompagne.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
              <a href="/devis" style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "#CC0000", color: "#fff", fontSize: 14, fontWeight: 700,
                padding: "12px 24px", borderRadius: 10, textDecoration: "none", whiteSpace: "nowrap" as const,
              }}>
                Demande de devis
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
              <a href="tel:0524885025" style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 14, fontWeight: 700,
                padding: "12px 20px", borderRadius: 10, textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.15)", whiteSpace: "nowrap" as const,
              }}>
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                0524 885 025
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}