"use client";
// app/references/ReferencesClient.tsx

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Helpers animations ───────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function RevealItem({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(36px)",
      transition: `all 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ─── Icônes ───────────────────────────────────────────────────────────────────
const IcPhone = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"/>
  </svg>
);
const IcArrow = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
  </svg>
);

// ─── Données clients ──────────────────────────────────────────────────────────
const CLIENTS = [
  { nom: "ACWA Power",      logo: "/images/clients/acwa-life.jpg",    site: "https://www.acwapower.com/",            secteur: "Énergie" },
  { nom: "Coca-Cola Maroc", logo: "/images/clients/coca-cola.png",    site: "https://www.coca-cola.com/ma/fr",       secteur: "Agroalimentaire" },
  { nom: "COPAG",           logo: "/images/clients/Copag.png",        site: "https://copag.ma/fr",                   secteur: "Agroalimentaire" },
  { nom: "HBS Maroc",       logo: "/images/clients/HBS.png",          site: "https://www.hsbmaroc.com/",             secteur: "Services" },
  { nom: "M2EA",            logo: "/images/clients/m2ea.png",         site: null,                                    secteur: "Industrie" },
  { nom: "Oulmes",          logo: "/images/clients/oulmes.png",       site: "https://www.oulmes.ma/",                secteur: "Agroalimentaire" },
  { nom: "Rafii",           logo: "/images/clients/Rafii.jpg",        site: "https://ma.linkedin.com/company/rafii", secteur: "Industrie" },
  { nom: "Souss Gaz",       logo: "/images/clients/soussiya-gaz.png", site: "https://soussgaz.com/",                 secteur: "Énergie" },
];

// ─── Card client ──────────────────────────────────────────────────────────────
function ClientCard({ client, delay }: { client: typeof CLIENTS[0]; delay: number }) {
  const card = (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e5e5",
        borderRadius: 16,
        padding: "1.75rem 1rem 1.25rem",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        gap: 14,
        position: "relative" as const,
        overflow: "hidden",
        transition: "all 0.25s cubic-bezier(.16,1,.3,1)",
        cursor: client.site ? "pointer" : "default",
        height: "100%",
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
      }}
    >
      {/* Logo */}
      <div style={{ position: "relative", width: 160, height: 100, flexShrink: 0 }}>
        <Image
          src={client.logo}
          alt={`Logo ${client.nom}`}
          fill
          sizes="160px"
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Nom + secteur */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1C1C1C", marginBottom: 5 }}>
          {client.nom}
        </div>
        <span style={{
          fontSize: 11, fontWeight: 500, color: "#993C1D",
          background: "#FAECE7", padding: "2px 10px", borderRadius: 20,
        }}>
          {client.secteur}
        </span>
      </div>

      {/* Overlay hover */}
      {client.site && (
        <div className="hover-overlay" style={{
          position: "absolute", inset: 0,
          background: "rgba(204,0,0,0.92)",
          color: "#fff", fontSize: 13, fontWeight: 700,
          display: "flex", flexDirection: "column" as const,
          alignItems: "center", justifyContent: "center", gap: 8,
          opacity: 0, transition: "opacity 0.2s", borderRadius: 15,
        }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Visiter le site
        </div>
      )}
    </div>
  );

  return (
    <RevealItem delay={delay}>
      {client.site ? (
        <a href={client.site} target="_blank" rel="noopener noreferrer"
          style={{ textDecoration: "none", display: "block", height: "100%" }}>
          {card}
        </a>
      ) : (
        <div style={{ display: "block", height: "100%" }}>{card}</div>
      )}
    </RevealItem>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function ReferencesClient() {
  return (
    <main style={{ background: "#f8faff", minHeight: "100vh" }}>
      <style>{`
        @keyframes floatA { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-25px) scale(1.07)} }
        @keyframes floatB { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,30px) scale(1.05)} }
        @keyframes heroIn { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        .h-in-1{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.05s both}
        .h-in-2{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both}
        .h-in-3{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s both}
        .h-in-4{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both}
      `}</style>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ paddingTop: "110px", paddingBottom: 0, background: "#f8faff" }}>
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "520px", height: "520px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(204,0,0,0.07), rgba(0,87,168,0.06))", animation: "floatA 12s ease-in-out infinite", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "420px", height: "420px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(27,43,107,0.06), rgba(0,87,168,0.05))", animation: "floatB 16s ease-in-out infinite", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.5, backgroundImage: "radial-gradient(circle, rgba(0,87,168,0.07) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="relative max-w-7xl mx-auto px-6" style={{ zIndex: 1 }}>
          {/* Breadcrumb */}
          <div className="h-in-1 flex items-center gap-2 text-xs mb-10" style={{ color: "#aab" }}>
            <Link href="/" style={{ color: "#aab", textDecoration: "none" }}>Accueil</Link>
            <span>›</span>
            <span style={{ color: "#CC0000", fontWeight: 700 }}>Références</span>
          </div>

          <div className="h-in-1 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
            style={{ background: "#fff", border: "1px solid #e8e8f0", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <span className="w-2 h-2 rounded-full" style={{ background: "#CC0000" }} />
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#1B2B6B" }}>Nos références</span>
          </div>

          <div className="h-in-2 mb-5">
            <div className="text-xs font-black uppercase tracking-[0.25em] mb-3 flex items-center gap-2" style={{ color: "#CC0000" }}>
              <div style={{ width: "20px", height: "2px", background: "#CC0000", borderRadius: "2px" }} />
              Ils nous font confiance
            </div>
            <h1 style={{ fontSize: "clamp(40px,6vw,72px)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-1.5px", color: "#0f172a", margin: 0 }}>
              Nos clients,
            </h1>
            <h1 style={{ fontSize: "clamp(40px,6vw,72px)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-1.5px", margin: "0 0 1.5rem" }}>
              <span style={{ background: "linear-gradient(90deg, #CC0000 0%, #0057A8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>nos partenaires</span>
            </h1>
          </div>

          <div className="h-in-3 flex items-center gap-2 mb-6">
            <div style={{ width: "40px", height: "3px", background: "#CC0000", borderRadius: "2px" }} />
            <div style={{ width: "20px", height: "3px", background: "#0057A8", borderRadius: "2px" }} />
            <div style={{ width: "8px", height: "3px", background: "#e2e2e8", borderRadius: "2px" }} />
          </div>

          <p className="h-in-3 mb-9" style={{ color: "#64748b", fontSize: "15px", lineHeight: 1.75, maxWidth: "440px" }}>
            Des grandes entreprises aux PME régionales — CADOZAT équipe les leaders du Maroc en véhicules utilitaires Isuzu &amp; Karry depuis 1996.
          </p>

          {/* Stats */}
          <div className="h-in-4 grid grid-cols-3 gap-4 max-w-sm mb-16">
            {[
              { nb: "9+",  label: "Partenaires",        color: "#CC0000", bg: "#fff5f5" },
              { nb: "3",   label: "Agences au Maroc",   color: "#1B2B6B", bg: "#f0f3ff" },
              { nb: "25+", label: "Années d'expérience",color: "#2D6A4F", bg: "#f0fdf4" },
            ].map((s, i) => (
              <div key={i} className="p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ background: s.bg, border: `1px solid ${s.color}18` }}>
                <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.nb}</div>
                <div className="text-xs font-semibold" style={{ color: "#94a3b8" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ height: "4px", background: "linear-gradient(90deg, #CC0000 0%, #0057A8 40%, #1B2B6B 70%, #2D6A4F 100%)", borderRadius: "2px 2px 0 0", margin: "0 -24px" }} />
        </div>
      </section>

      {/* ── GRILLE CLIENTS ── */}
      <section style={{ padding: "80px 0", background: "#fff" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#0057A8" }}>Ils nous font confiance</p>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: "#0057A8" }} />
              <h2 className="text-3xl font-black text-gray-900">Nos partenaires</h2>
              <div className="h-px w-10" style={{ background: "#CC0000" }} />
            </div>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Cliquez sur un logo pour visiter le site de notre partenaire.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
            gap: 16,
          }}>
            {CLIENTS.map((client, i) => (
              <ClientCard key={client.nom} client={client} delay={(i % 4) * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA — identique à services/page.tsx ── */}
      <section style={{ padding: "80px 0", background: "#0f172a", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(204,0,0,0.12) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,87,168,0.18) 0%, transparent 60%)" }} />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 style={{ fontSize: "clamp(24px,4vw,42px)", fontWeight: 900, color: "#fff", letterSpacing: "-1px", margin: "0 0 16px" }}>
            Rejoignez nos{" "}
            <span style={{ background: "linear-gradient(90deg, #CC0000, #ff6b6b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              partenaires
            </span>{" "}
            de confiance
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px", marginBottom: "36px", maxWidth: "480px", margin: "0 auto 36px", lineHeight: 1.7 }}>
            Besoin de véhicules utilitaires fiables pour votre entreprise ? Notre équipe vous accompagne dans vos projets d'acquisition.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            <a href="tel:0524885025" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: "#CC0000", color: "#fff", fontWeight: 800, fontSize: "14px",
              padding: "14px 28px", borderRadius: "14px", textDecoration: "none",
              boxShadow: "0 12px 40px rgba(204,0,0,0.4)",
            }}>
              <IcPhone /> 0524 885 025
            </a>
            <Link href="/devis" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)",
              fontWeight: 700, fontSize: "14px", padding: "14px 28px", borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.15)", textDecoration: "none",
            }}>
              Demande de devis <IcArrow />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}