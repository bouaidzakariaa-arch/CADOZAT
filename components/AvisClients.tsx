"use client";
// components/AvisClients.tsx
// Copier dans : components/AvisClients.tsx

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Review {
  id: string;
  name: string;
  agency: string;
  rating: number;
  text: string;
  tags: string[];
  likes: number;
  created_at: string;
}

// ─── Constantes ──────────────────────────────────────────────────────────────
const AGENCIES  = ["Ouarzazate", "Agadir", "Tinghir"] as const;
const TAGS_LIST = [
  "Accueil chaleureux",
  "SAV rapide",
  "Bon rapport qualité/prix",
  "Livraison rapide",
  "Équipe professionnelle",
  "Pièces disponibles",
  "Conseils de qualité",
];
const LIKED_KEY = "cadozat_liked_v3";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const starsStr = (n: number) =>
  "★".repeat(Math.max(0, Math.min(5, n))) +
  "☆".repeat(5 - Math.max(0, Math.min(5, n)));

const fmtDate = (str: string) => {
  const d = new Date(str);
  return isNaN(d.getTime())
    ? str
    : d.toLocaleDateString("fr-MA", { day: "numeric", month: "long", year: "numeric" });
};

const getLiked = (): string[] => {
  try { return JSON.parse(localStorage.getItem(LIKED_KEY) || "[]"); } catch { return []; }
};
const saveLiked = (ids: string[]) => {
  try { localStorage.setItem(LIKED_KEY, JSON.stringify(ids)); } catch {}
};

// ─── Composant ───────────────────────────────────────────────────────────────
export default function AvisClients() {
  const [reviews, setReviews]       = useState<Review[]>([]);
  const [likedIds, setLikedIds]     = useState<string[]>([]);
  const [loading, setLoading]       = useState(true);
  const [filter, setFilter]         = useState("all");
  const [rating, setRating]         = useState(0);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [name, setName]             = useState("");
  const [agency, setAgency]         = useState("");
  const [text, setText]             = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState(false);
  const [error, setError]           = useState("");

  // ── Charger les avis ──
  const fetchReviews = useCallback(async () => {
    const { data, error } = await supabase
      .from("avis")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setReviews(data as Review[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLikedIds(getLiked());
    fetchReviews();

    // Écoute temps réel — un avis posté par quelqu'un d'autre apparaît instantanément
    const channel = supabase
      .channel("avis-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "avis" }, fetchReviews)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchReviews]);

  // ── Stats ──
  const total = reviews.length;
  const avg   = total ? (reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1) : null;
  const recs  = reviews.filter((r) => r.rating >= 4).length;

  // ── Filtre ──
  const filtered = reviews.filter((r) => {
    if (filter === "all") return true;
    if (filter === "5")   return r.rating === 5;
    return r.agency === filter;
  });

  // ── Soumettre ──
  const handleSubmit = async () => {
    setError("");
    if (!name.trim() || !agency || !rating || !text.trim()) {
      setError("Veuillez remplir tous les champs obligatoires (*).");
      return;
    }
    setSubmitting(true);
    const { error: err } = await supabase.from("avis").insert({
      name: name.trim(), agency, rating, text: text.trim(), tags: activeTags, likes: 0,
    });
    if (err) {
      setError("Erreur lors de la publication. Veuillez réessayer.");
    } else {
      setName(""); setAgency(""); setText(""); setRating(0); setActiveTags([]);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4500);
    }
    setSubmitting(false);
  };

  // ── Like ──
  const handleLike = async (id: string) => {
    if (likedIds.includes(id)) return;
    const updated = [...likedIds, id];
    setLikedIds(updated);
    saveLiked(updated);
    const current = reviews.find((r) => r.id === id);
    await supabase.from("avis").update({ likes: (current?.likes ?? 0) + 1 }).eq("id", id);
  };

  // ── Partager ──
  const handleShare = (r: Review) => {
    const txt = `Avis CADOZAT — Agence ${r.agency}\nNote : ${r.rating}/5\n"${r.text}"\n— ${r.name}\ncadozaat.com`;
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: "Avis CADOZAT", text: txt, url: "https://cadozaat.com" }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(txt).then(() => alert("Avis copié !"));
    }
  };

  const toggleTag = (tag: string) =>
    setActiveTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);

  // ────────────────────────────────────────────────────────────────────────────
  return (
    <div className="cz-widget">

      {/* Header */}
      <div className="cz-header">
        <span className="cz-logo-badge">CADOZAT</span>
        <div>
          <div className="cz-header-title">Avis &amp; Commentaires clients</div>
          <div className="cz-header-sub">Partagez votre expérience — visible par tous en temps réel</div>
        </div>
      </div>

      {/* Stats */}
      <div className="cz-stats">
        <div className="cz-stat">
          <div className="cz-stat-num">{loading ? "…" : total}</div>
          <div className="cz-stat-label">Avis publiés</div>
        </div>
        <div className="cz-stat">
          <div className="cz-stat-num cz-red">{loading ? "…" : avg ? `${avg} ★` : "—"}</div>
          <div className="cz-stat-label">Note moyenne</div>
        </div>
        <div className="cz-stat">
          <div className="cz-stat-num">{loading ? "…" : recs}</div>
          <div className="cz-stat-label">Recommandations</div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="cz-form-card">
        <div className="cz-form-title">
          <svg width="17" height="17" fill="none" stroke="#C0392B" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Laisser un avis
        </div>

        {success && (
          <div className="cz-success">
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
            Votre avis a été publié et est visible par tous. Merci !
          </div>
        )}
        {error && <div className="cz-error">{error}</div>}

        <div className="cz-form-row">
          <div className="cz-field">
            <label className="cz-label" htmlFor="cz-name">Votre prénom *</label>
            <input id="cz-name" className="cz-input" type="text" placeholder="ex. Mohammed"
              maxLength={40} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="cz-field">
            <label className="cz-label" htmlFor="cz-agency">Agence concernée *</label>
            <select id="cz-agency" className="cz-select" value={agency} onChange={(e) => setAgency(e.target.value)}>
              <option value="">-- Choisir --</option>
              {AGENCIES.map((a) => <option key={a}>{a}</option>)}
            </select>
          </div>
        </div>

        <div className="cz-field">
          <label className="cz-label">Note *</label>
          <div className="cz-rating-group">
            {[1, 2, 3, 4, 5].map((val) => (
              <button key={val} type="button"
                className={`cz-star-btn${rating === val ? " active" : ""}`}
                onClick={() => setRating(val)}
                aria-label={`${val} étoile${val > 1 ? "s" : ""}`}>
                {"★".repeat(val)}
              </button>
            ))}
          </div>
        </div>

        <div className="cz-field">
          <label className="cz-label">Points forts (facultatif)</label>
          <div className="cz-tags">
            {TAGS_LIST.map((tag) => (
              <button key={tag} type="button"
                className={`cz-tag-btn${activeTags.includes(tag) ? " active" : ""}`}
                onClick={() => toggleTag(tag)}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="cz-field">
          <label className="cz-label" htmlFor="cz-text">Votre commentaire *</label>
          <textarea id="cz-text" className="cz-textarea" rows={3} maxLength={600}
            placeholder="Partagez votre expérience avec CADOZAT..."
            value={text} onChange={(e) => setText(e.target.value)} />
        </div>

        <button className="cz-submit" type="button" onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Publication en cours…" : (
            <>
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              Publier mon avis
            </>
          )}
        </button>
      </div>

      {/* Filtres */}
      <div className="cz-filters">
        <span className="cz-filter-label">Filtrer :</span>
        {[
          { val: "all",        label: "Tous" },
          { val: "Ouarzazate", label: "Ouarzazate" },
          { val: "Agadir",     label: "Agadir" },
          { val: "Tinghir",    label: "Tinghir" },
          { val: "5",          label: "★★★★★ seulement" },
        ].map(({ val, label }) => (
          <button key={val} type="button"
            className={`cz-filter-btn${filter === val ? " active" : ""}`}
            onClick={() => setFilter(val)}>
            {label}
          </button>
        ))}
      </div>

      {/* Liste */}
      <div className="cz-reviews">
        {loading ? (
          <div className="cz-loading">
            <div className="cz-spinner" />Chargement des avis…
          </div>
        ) : filtered.length === 0 ? (
          <div className="cz-empty">
            <svg width="38" height="38" fill="none" stroke="#C0392B" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p>Aucun avis pour ce filtre.<br />Soyez le premier à partager votre expérience !</p>
          </div>
        ) : filtered.map((r) => (
          <article key={r.id} className="cz-review-card">
            <div className="cz-review-top">
              <div className="cz-reviewer-name">
                {r.name}<span className="cz-agency-badge">{r.agency}</span>
              </div>
              <div className="cz-review-right">
                <div className="cz-review-stars">{starsStr(r.rating)}</div>
                <div className="cz-review-date">{fmtDate(r.created_at)}</div>
              </div>
            </div>
            <p className="cz-review-body">{r.text}</p>
            {r.tags?.length > 0 && (
              <div className="cz-review-tags">
                {r.tags.map((t) => <span key={t} className="cz-review-tag">{t}</span>)}
              </div>
            )}
            <div className="cz-review-actions">
              <button type="button"
                className={`cz-like-btn${likedIds.includes(r.id) ? " liked" : ""}`}
                onClick={() => handleLike(r.id)}>
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                  <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
                Utile ({r.likes})
              </button>
              <button type="button" className="cz-share-btn" onClick={() => handleShare(r)}>
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                Partager
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Styles */}
      <style jsx>{`
        .cz-widget{max-width:800px;margin:0 auto;padding:2rem 1rem;font-family:inherit}
        .cz-header{display:flex;align-items:center;gap:14px;margin-bottom:1.75rem;padding-bottom:1.25rem;border-bottom:1px solid #e5e5e5}
        .cz-logo-badge{background:#C0392B;color:#fff;font-size:11px;font-weight:700;padding:5px 11px;border-radius:4px;letter-spacing:.07em;text-transform:uppercase;flex-shrink:0}
        .cz-header-title{font-size:18px;font-weight:600;color:#1C1C1C}
        .cz-header-sub{font-size:13px;color:#888;margin-top:2px}
        .cz-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:1.75rem}
        .cz-stat{background:#f7f6f3;border:1px solid #e5e5e5;border-radius:10px;padding:1rem;text-align:center}
        .cz-stat-num{font-size:24px;font-weight:600;color:#1C1C1C}
        .cz-red{color:#C0392B}
        .cz-stat-label{font-size:12px;color:#888;margin-top:3px}
        .cz-form-card{background:#fff;border:1px solid #e5e5e5;border-radius:14px;padding:1.5rem;margin-bottom:1.75rem;box-shadow:0 1px 4px rgba(0,0,0,.07)}
        .cz-form-title{font-size:15px;font-weight:600;color:#1C1C1C;margin-bottom:1.25rem;display:flex;align-items:center;gap:8px}
        .cz-success{background:#EAF3DE;color:#1E7E34;border-radius:6px;padding:10px 14px;font-size:13px;font-weight:500;margin-bottom:12px;display:flex;align-items:center;gap:8px}
        .cz-error{background:#FAECE7;color:#922B21;border-radius:6px;padding:10px 14px;font-size:13px;margin-bottom:12px}
        .cz-form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        @media(max-width:500px){.cz-form-row{grid-template-columns:1fr}.cz-stats{grid-template-columns:1fr}}
        .cz-field{display:flex;flex-direction:column;gap:5px;margin-bottom:12px}
        .cz-label{font-size:12px;font-weight:500;color:#888}
        .cz-input,.cz-select,.cz-textarea{width:100%;padding:9px 12px;border:1px solid #ccc;border-radius:6px;font-size:14px;font-family:inherit;color:#1C1C1C;background:#fff;outline:none;transition:border-color .15s,box-shadow .15s;box-sizing:border-box}
        .cz-input:focus,.cz-select:focus,.cz-textarea:focus{border-color:#C0392B;box-shadow:0 0 0 3px rgba(192,57,43,.10)}
        .cz-textarea{resize:vertical;min-height:90px;line-height:1.55}
        .cz-rating-group{display:flex;gap:6px;flex-wrap:wrap}
        .cz-star-btn{background:none;border:1px solid #ccc;border-radius:6px;padding:6px 12px;cursor:pointer;font-size:16px;color:#aaa;transition:all .15s;line-height:1}
        .cz-star-btn:hover,.cz-star-btn.active{background:#FAECE7;border-color:#C0392B;color:#C0392B}
        .cz-tags{display:flex;flex-wrap:wrap;gap:6px}
        .cz-tag-btn{background:none;border:1px solid #ccc;border-radius:20px;padding:5px 13px;font-size:12px;cursor:pointer;color:#888;font-family:inherit;transition:all .15s}
        .cz-tag-btn:hover,.cz-tag-btn.active{background:#FAECE7;border-color:#C0392B;color:#993C1D;font-weight:500}
        .cz-submit{width:100%;padding:11px;background:#C0392B;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:background .15s}
        .cz-submit:hover:not(:disabled){background:#922B21}
        .cz-submit:disabled{opacity:.65;cursor:not-allowed}
        .cz-filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:1rem;align-items:center}
        .cz-filter-label{font-size:12px;color:#aaa}
        .cz-filter-btn{background:#fff;border:1px solid #ccc;border-radius:20px;padding:5px 14px;font-size:12px;cursor:pointer;color:#888;font-family:inherit;transition:all .15s}
        .cz-filter-btn:hover{border-color:#C0392B;color:#C0392B}
        .cz-filter-btn.active{background:#C0392B;color:#fff;border-color:#C0392B}
        .cz-reviews{display:flex;flex-direction:column;gap:12px}
        .cz-loading{display:flex;align-items:center;justify-content:center;gap:10px;padding:2.5rem;color:#888;font-size:14px}
        .cz-spinner{width:18px;height:18px;border:2px solid #eee;border-top-color:#C0392B;border-radius:50%;animation:spin .7s linear infinite;flex-shrink:0}
        @keyframes spin{to{transform:rotate(360deg)}}
        .cz-empty{text-align:center;padding:3rem 1rem;color:#aaa;font-size:14px;background:#fff;border:1px dashed #ccc;border-radius:14px;display:flex;flex-direction:column;align-items:center;gap:.75rem}
        .cz-review-card{background:#fff;border:1px solid #e5e5e5;border-radius:14px;padding:1.25rem 1.5rem;box-shadow:0 1px 4px rgba(0,0,0,.06);transition:box-shadow .2s}
        .cz-review-card:hover{box-shadow:0 4px 12px rgba(0,0,0,.10)}
        .cz-review-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;gap:8px}
        .cz-reviewer-name{font-size:14px;font-weight:600;color:#1C1C1C;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
        .cz-agency-badge{background:#FAECE7;color:#993C1D;font-size:11px;font-weight:500;padding:2px 8px;border-radius:4px}
        .cz-review-right{text-align:right;flex-shrink:0}
        .cz-review-stars{color:#C0392B;font-size:15px}
        .cz-review-date{font-size:11px;color:#aaa;margin-top:2px}
        .cz-review-body{font-size:14px;color:#5F5E5A;line-height:1.65;margin-bottom:10px}
        .cz-review-tags{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:12px}
        .cz-review-tag{background:#f7f6f3;color:#888;font-size:11px;padding:3px 9px;border-radius:20px;border:1px solid #e5e5e5}
        .cz-review-actions{display:flex;align-items:center;gap:8px}
        .cz-like-btn{background:none;border:1px solid #ccc;border-radius:6px;padding:4px 12px;font-size:12px;font-family:inherit;cursor:pointer;color:#888;display:flex;align-items:center;gap:5px;transition:all .15s}
        .cz-like-btn:hover,.cz-like-btn.liked{color:#C0392B;border-color:#C0392B;background:#FAECE7}
        .cz-share-btn{background:none;border:1px solid #ccc;border-radius:6px;padding:4px 12px;font-size:12px;font-family:inherit;cursor:pointer;color:#888;display:flex;align-items:center;gap:5px;transition:all .15s}
        .cz-share-btn:hover{border-color:#2196F3;color:#2196F3}
      `}</style>
    </div>
  );
}