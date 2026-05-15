// app/references/page.tsx
// Remplace ou crée ce fichier dans : app/references/page.tsx
"use client";

import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Nos Références — CADOZAT",
  description:
    "Découvrez les entreprises et institutions qui nous font confiance. CADOZAT, concessionnaire officiel Isuzu & Karry au Maroc.",
};

// ─── Liste des clients ────────────────────────────────────────────────────────
const CLIENTS = [
  {
    nom: "ACWA Power",
    logo: "/images/clients/acwa-life.jpg",
    site: "https://www.acwapower.com/",
    secteur: "Énergie",
  },
  {
    nom: "Coca-Cola Maroc",
    logo: "/images/clients/coca-cola.png",
    site: "https://www.coca-cola.com/ma/fr",
    secteur: "Agroalimentaire",
  },
  {
    nom: "COPAG",
    logo: "/images/clients/Copag.png",
    site: "https://copag.ma/fr",
    secteur: "Agroalimentaire",
  },
  {
    nom: "HBS Maroc",
    logo: "/images/clients/HBS.png",
    site: "https://www.hsbmaroc.com/",
    secteur: "Services",
  },
  {
    nom: "HDS",
    logo: "/images/clients/HDS.png",
    site: null,
    secteur: "Services",
  },
  {
    nom: "M2EA",
    logo: "/images/clients/m2ea.png",
    site: null,
    secteur: "Industrie",
  },
  {
    nom: "Oulmes",
    logo: "/images/clients/oulmes.png",
    site: "https://www.oulmes.ma/",
    secteur: "Agroalimentaire",
  },
  {
    nom: "Rafii",
    logo: "/images/clients/Rafii.jpg",
    site: "https://ma.linkedin.com/company/rafii",
    secteur: "Industrie",
  },
  {
    nom: "Souss Gaz",
    logo: "/images/clients/soussiya-gaz.png",
    site: "https://soussgaz.com/",
    secteur: "Énergie",
  },
];

// ─── Composant card client ────────────────────────────────────────────────────
function ClientCard({ client }: { client: typeof CLIENTS[0] }) {
  const inner = (
    <div className="client-card">
      <div className="client-logo-wrap">
        <Image
          src={client.logo}
          alt={`Logo ${client.nom}`}
          fill
          sizes="200px"
          className="client-logo-img"
        />
      </div>
      <div className="client-info">
        <span className="client-nom">{client.nom}</span>
        <span className="client-secteur">{client.secteur}</span>
      </div>
      {client.site && (
        <div className="client-hover-overlay">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Visiter le site
        </div>
      )}
    </div>
  );

  if (client.site) {
    return (
      <a href={client.site} target="_blank" rel="noopener noreferrer" className="client-link">
        {inner}
      </a>
    );
  }
  return <div className="client-link client-no-link">{inner}</div>;
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function ReferencesPage() {
  return (
    <main className="references-page">

      {/* Hero */}
      <section className="references-hero">
        <div className="hero-inner">
          <div className="hero-badge">NOS RÉFÉRENCES</div>
          <h1 className="hero-title">
            Ils nous font <span className="hero-accent">confiance</span>
          </h1>
          <p className="hero-sub">
            Des grandes entreprises aux PME régionales — CADOZAT équipe les leaders
            du Maroc en véhicules utilitaires Isuzu &amp; Karry.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">9+</span>
              <span className="hero-stat-label">Partenaires</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num">3</span>
              <span className="hero-stat-label">Agences au Maroc</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num">25+</span>
              <span className="hero-stat-label">Années d'expérience</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grille clients */}
      <section className="references-grid-section">
        <div className="references-container">
          <p className="grid-intro">
            Cliquez sur un logo pour visiter le site de notre partenaire.
          </p>
          <div className="clients-grid">
            {CLIENTS.map((client) => (
              <ClientCard key={client.nom} client={client} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA bas de page */}
      <section className="references-cta">
        <div className="references-container">
          <div className="cta-box">
            <div className="cta-text">
              <h2 className="cta-title">Rejoignez nos partenaires</h2>
              <p className="cta-sub">
                Besoin de véhicules utilitaires fiables pour votre entreprise ?
                Notre équipe vous accompagne.
              </p>
            </div>
            <div className="cta-actions">
              <a href="/devis" className="cta-btn-primary">
                Demande de devis
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
              <a href="tel:0524885025" className="cta-btn-secondary">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                0524 885 025
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Styles */}
      <style jsx>{`
        /* ── Page ── */
        .references-page { min-height: 100vh; background: #f7f6f3; padding-top: 80px; }
        .references-container { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; }

        /* ── Hero ── */
        .references-hero {
          background: linear-gradient(135deg, #1a0000 0%, #3d0000 40%, #CC0000 100%);
          padding: 5rem 1.5rem 4rem;
          position: relative;
          overflow: hidden;
        }
        .references-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M30 0l8.66 5v10L30 20l-8.66-5V5L30 0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .hero-inner { max-width: 1100px; margin: 0 auto; position: relative; text-align: center; }
        .hero-badge {
          display: inline-block; background: rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.85); font-size: 11px; font-weight: 800;
          letter-spacing: 0.15em; padding: 5px 14px; border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.2); margin-bottom: 1.25rem;
        }
        .hero-title { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 900; color: #fff; margin-bottom: 1rem; line-height: 1.1; }
        .hero-accent { color: #ffcc00; }
        .hero-sub { font-size: 16px; color: rgba(255,255,255,0.75); max-width: 580px; margin: 0 auto 2.5rem; line-height: 1.7; }
        .hero-stats { display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap; }
        .hero-stat { text-align: center; }
        .hero-stat-num { display: block; font-size: 2rem; font-weight: 900; color: #fff; line-height: 1; }
        .hero-stat-label { display: block; font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 4px; font-weight: 500; }
        .hero-stat-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.2); }

        /* ── Grille ── */
        .references-grid-section { padding: 4rem 0; }
        .grid-intro { text-align: center; font-size: 13px; color: #888; margin-bottom: 2.5rem; }
        .clients-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }

        /* ── Card ── */
        .client-link { text-decoration: none; display: block; }
        .client-no-link { cursor: default; }
        .client-card {
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 14px;
          padding: 1.5rem 1rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          position: relative;
          overflow: hidden;
          transition: all 0.25s cubic-bezier(.16,1,.3,1);
        }
        .client-link:not(.client-no-link) .client-card:hover {
          border-color: #CC0000;
          box-shadow: 0 8px 30px rgba(204,0,0,0.12);
          transform: translateY(-4px);
        }
        .client-logo-wrap {
          position: relative;
          width: 140px;
          height: 80px;
          flex-shrink: 0;
        }
        .client-logo-img { object-fit: contain; }
        .client-info { text-align: center; }
        .client-nom { display: block; font-size: 13px; font-weight: 700; color: #1C1C1C; margin-bottom: 3px; }
        .client-secteur {
          display: inline-block; font-size: 11px; font-weight: 500;
          color: #993C1D; background: #FAECE7;
          padding: 2px 8px; border-radius: 20px;
        }
        .client-hover-overlay {
          position: absolute; inset: 0;
          background: rgba(204,0,0,0.92);
          color: #fff; font-size: 13px; font-weight: 700;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
          opacity: 0;
          transition: opacity 0.2s;
          border-radius: 13px;
        }
        .client-link:not(.client-no-link) .client-card:hover .client-hover-overlay { opacity: 1; }

        /* ── CTA ── */
        .references-cta { padding: 0 0 5rem; }
        .cta-box {
          background: #1C1C1C;
          border-radius: 20px;
          padding: 3rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .cta-title { font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 8px; }
        .cta-sub { font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.6; max-width: 460px; }
        .cta-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .cta-btn-primary {
          display: flex; align-items: center; gap: 8px;
          background: #CC0000; color: #fff;
          font-size: 14px; font-weight: 700;
          padding: 12px 24px; border-radius: 10px;
          text-decoration: none;
          transition: background 0.15s;
          white-space: nowrap;
        }
        .cta-btn-primary:hover { background: #aa0000; }
        .cta-btn-secondary {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.08); color: #fff;
          font-size: 14px; font-weight: 700;
          padding: 12px 20px; border-radius: 10px;
          text-decoration: none; border: 1px solid rgba(255,255,255,0.15);
          transition: all 0.15s;
          white-space: nowrap;
        }
        .cta-btn-secondary:hover { background: rgba(255,255,255,0.14); }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .clients-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .cta-box { text-align: center; justify-content: center; }
          .hero-stat-divider { display: none; }
        }
      `}</style>
    </main>
  );
}