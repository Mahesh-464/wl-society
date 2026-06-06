"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */
const benefits = [
  { title: "Founder Status",       desc: "Your name is permanently listed in the WL Hall of Founders — visible on the site and across all future WL endeavors. The earliest members are never forgotten." },
  { title: "Legendary Collection", desc: "Get first access to the 11 Legendary NFT pieces and their evolving lore. Founder members receive priority access before any public release." },
  { title: "Exclusive Community",  desc: "Enter a private Society Discord with direct access to builders, creators, and explorers. No noise — only purpose-driven people selected by the Society." },
  { title: "Future Opportunities", desc: "Founders are first in line for future WL collabs, whitelist spots, project partnerships, and opportunities built inside the WL universe." },
  { title: "Shape The Society",    desc: "Influence WL's direction through community votes, feedback channels, and direct input on future phases — from Division creation to Multiverse planning." },
  { title: "Beyond A Project",     desc: "WL Society is built to outlast trends. As a Founder, you are part of a structure designed to grow into a lasting digital society — not just another drop." },
];

const legends = [
  { key: "wanderer",    name: "The Wanderer",          image: "/legends/wanderer.png",         desc: "Traveler between realities searching for the unknown.",                          symbol: "✦",  tag: "Explorer",   color: "var(--gold)" },
  { key: "archivist",  name: "The Archivist",          image: "/legends/archivist.png",        desc: "Keeper of forgotten worlds and guardian of all WL knowledge.",                  symbol: "📚", tag: "Guardian",   color: "var(--gold-light)" },
  { key: "celestial",  name: "The Celestial Witness",  image: "/legends/celestial-witness.png",desc: "Observer of galaxies, timelines and cosmic events beyond reality.",              symbol: "✶",  tag: "Observer",   color: "var(--blue-light)" },
  { key: "collector",  name: "The Collector",          image: "/legends/collector.png",        desc: "Preserver of rare artifacts gathered from countless dimensions.",                symbol: "◈",  tag: "Preserver",  color: "var(--gold)" },
  { key: "founder",    name: "The Founder",            image: "/legends/founder.png",          desc: "The visionary who began the journey that became WL Society.",                   symbol: "⬡",  tag: "Origin",     color: "var(--gold-light)" },
  { key: "last-member",name: "The Last Member",        image: "/legends/last-member.png",      desc: "The final seat of WL Society, whose identity remains unknown.",                 symbol: "?",  tag: "Unknown",    color: "var(--purple-light)", featured: true },
  { key: "oracle",     name: "The Oracle",             image: "/legends/oracle.png",           desc: "Seer of possibilities and guardian of future pathways.",                        symbol: "◎",  tag: "Seer",       color: "var(--oracle)" },
  { key: "silent-king",name: "The Silent King",        image: "/legends/silent-king.png",      desc: "A ruler whose silence shaped empires across dimensions.",                       symbol: "♛",  tag: "Sovereign",  color: "var(--gold)" },
  { key: "time-broker",name: "The Time Broker",        image: "/legends/time-broker.png",      desc: "Master of temporal pathways and keeper of forgotten timelines.",                symbol: "⧗",  tag: "Timekeeper", color: "var(--blue-light)" },
  { key: "void-keeper",name: "The Void Keeper",        image: "/legends/void-sovereign.png",   desc: "Ancient ruler of the endless void beyond creation itself.",                     symbol: "◉",  tag: "Void",       color: "var(--purple-light)" },
  { key: "judge",      name: "The Judge",              image: "/legends/judge.png",            desc: "Arbiter of balance, deciding the fate of worlds and civilizations.",            symbol: "⚖",  tag: "Arbiter",    color: "var(--crimson)" },
];

const roadmap = [
  { phase: "Phase I",           title: "Society Formation",  desc: "The founding vision is established. The world is introduced to WL Society and what it stands for.",                                                         active: true, eta: "Active Now" },
  { phase: "Phase II",          title: "Founding Members",   desc: "The earliest members are selected. The foundation is set. History begins here.",                                                                              eta: "Q3 2026" },
  { phase: "Phase III",         title: "Divisions",          desc: "The Society expands into specialized sub-groups — Art, Tech, Strategy and more — each with its own purpose and leadership within the WL universe.",          eta: "Q4 2026" },
  { phase: "Phase IV",          title: "Legendary Collection",desc: "The 11 Legendary Pieces are released. Their stories unfold across the WL universe.",                                                                         eta: "Early 2027" },
  { phase: "Phase V",           title: "Community Expansion", desc: "The Society grows. New builders, creators and explorers join the mission.",                                                                                  eta: "2027" },
  { phase: "Phase VI · Horizon",title: "WL Multiverse",      desc: "The world expands beyond anything previously imagined. The multiverse begins.",                                                                               eta: "The Horizon" },
];

const steps = [
  { num: "01", title: "Follow",  desc: "Follow WL Society on X" },
  { num: "02", title: "Support", desc: "Like & repost the pinned post" },
  { num: "03", title: "Apply",   desc: "Submit your application" },
  { num: "04", title: "Review",  desc: "Applications reviewed within 48–72 hours" },
  { num: "05", title: "Enter",   desc: "Receive your WL role & access the Society Discord" },
];

const faqs = [
  { q: "What does WL stand for?",                 a: "WL stands for Whitelist — a curated list of early members who gain priority access to everything WL Society builds. Being on the WL means you were here first." },
  { q: "Is joining WL Society free?",             a: "Yes. Applying to WL Society costs nothing. You only need to follow us on X, repost the pinned post, and submit your application. Selection is based on merit, not money." },
  { q: "How will I know if I got in?",            a: "Once your application is reviewed (within 48–72 hours), you will be contacted via X DM with your membership status and next steps to enter the Society Discord." },
  { q: "What happens to my wallet address?",      a: "Your wallet address is stored securely and used solely to identify you as a Founder for future NFT drops and Society rewards. It is never shared, sold, or used for any other purpose." },
  { q: "How many Founding Members accepted?",     a: "The number of Founding Member spots is intentionally limited. The Society values quality over quantity — not everyone who applies will be accepted." },
  { q: "What do I actually get as a member?",     a: "Access to the private Society Discord, Founder recognition on the site, priority access to the Legendary Collection, and a direct role in shaping WL Society's future through community votes and feedback." },
];

const X_PROFILE = "https://x.com/wlsociety111";
const X_POST    = "https://x.com/wlsociety111/status/2061348649389707682?s=20";

/* ═══════════════════════════════════════════
   APPLICATION MODAL
═══════════════════════════════════════════ */
function ApplicationModal({ onClose }) {
  const [step, setStep]                       = useState(1);
  const [hasClickedFollow, setHasClickedFollow] = useState(false);
  const [hasClickedRepost, setHasClickedRepost] = useState(false);
  const [followed, setFollowed]               = useState(false);
  const [reposted, setReposted]               = useState(false);
  const [twitter, setTwitter]                 = useState("");
  const [wallet,  setWallet]                  = useState("");
  const [reason,  setReason]                  = useState("");
  const [twitterError, setTwitterError]       = useState("");
  const [walletError,  setWalletError]        = useState("");
  const [reasonError,  setReasonError]        = useState("");
  const [submitError,  setSubmitError]        = useState("");
  const [loading,  setLoading]                = useState(false);

  const isValidWallet  = (w) => /^0x[0-9a-fA-F]{40}$/.test(w.trim());
  const isValidTwitter = (t) => /^@?[A-Za-z0-9_]{1,15}$/.test(t.trim());

  const submitApplication = async () => {
    setSubmitError("");
    if (!followed) { setStep(1); return; }
    if (!reposted) { setStep(2); return; }
    if (!twitter.trim())        { setTwitterError("X username is required."); return; }
    if (!isValidTwitter(twitter)) { setTwitterError("Enter a valid X username (letters, numbers, underscores, max 15 chars)."); return; }
    if (!isValidWallet(wallet))  { setWalletError("Please enter a valid EVM wallet address (0x + 40 hex chars)."); return; }
    if (!reason.trim())          { setReasonError("Please tell us why you want to join WL Society."); return; }

    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("entry.1475914086", twitter);
      fd.append("entry.1832040411", wallet);
      fd.append("entry.1288369445", reason);
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSfRJsMKFJ0mR8rVEEUZ4syW4odWT7YGr8yqzxEtjxvNVauwjw/formResponse",
        { method: "POST", mode: "no-cors", body: fd }
      );
      setLoading(false);
      setStep(4);
    } catch (e) {
      console.error(e);
      setLoading(false);
      setSubmitError("Unable to submit. Please try again.");
    }
  };

  const handleOverlayClick = (e) => { if (e.target === e.currentTarget) onClose(); };

  useEffect(() => {
    if (step === 4) {
      const t = setTimeout(() => onClose(), 5000);
      return () => clearTimeout(t);
    }
  }, [step, onClose]);

  return (
    <div className="wl-modal-overlay" onClick={handleOverlayClick}>
      <div className="wl-modal">
        <button className="wl-modal-close" onClick={onClose} aria-label="Close">✕</button>

        {step < 4 && (
          <div className="wl-modal-progress">
            {[1,2,3].map(n => (
              <div key={n} className={`wl-modal-progress-dot${step >= n ? " active" : ""}${step > n ? " done" : ""}`} />
            ))}
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="wl-modal-step">
            <p className="wl-modal-eyebrow">Step 01 of 03</p>
            <h3 className="wl-modal-title">Follow WL Society</h3>
            <p className="wl-modal-body">
              You must follow <strong>@wlsociety111</strong> on X before submitting your application.
              Click below to open X, then come back and confirm.
            </p>
            <a href={X_PROFILE} target="_blank" rel="noopener noreferrer"
               className="wl-btn-primary wl-modal-action-btn"
               onClick={() => setHasClickedFollow(true)}>
              Open @wlsociety111 on X ↗
            </a>
            {!hasClickedFollow && (
              <p className="wl-modal-hint" style={{ marginBottom: "1rem" }}>↑ Click the button above to open X first</p>
            )}
            <label className={`wl-modal-check${!hasClickedFollow ? " wl-modal-check-disabled" : ""}`}>
              <input type="checkbox" checked={followed} disabled={!hasClickedFollow}
                     onChange={() => setFollowed(!followed)} />
              <span>I have followed <strong>@wlsociety111</strong></span>
            </label>
            <button className="wl-btn-primary wl-modal-next-btn" disabled={!followed} onClick={() => setStep(2)}>
              Continue →
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="wl-modal-step">
            <p className="wl-modal-eyebrow">Step 02 of 03</p>
            <h3 className="wl-modal-title">Repost The Pinned Post</h3>
            <p className="wl-modal-body">
              Repost and comment on the pinned post to show your support for WL Society.
            </p>
            <a href={X_POST} target="_blank" rel="noopener noreferrer"
               className="wl-btn-primary wl-modal-action-btn"
               onClick={() => setHasClickedRepost(true)}>
              Open Pinned Post on X ↗
            </a>
            {!hasClickedRepost && (
              <p className="wl-modal-hint" style={{ marginBottom: "1rem" }}>↑ Click the button above to open the post first</p>
            )}
            <label className={`wl-modal-check${!hasClickedRepost ? " wl-modal-check-disabled" : ""}`}>
              <input type="checkbox" checked={reposted} disabled={!hasClickedRepost}
                     onChange={() => setReposted(!reposted)} />
              <span>I have reposted and commented on the pinned post</span>
            </label>
            <div className="wl-modal-btn-row">
              <button className="wl-btn-secondary" onClick={() => setStep(1)}>← Back</button>
              <button className="wl-btn-primary" disabled={!reposted} onClick={() => setStep(3)}>Continue →</button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="wl-modal-step">
            <p className="wl-modal-eyebrow">Step 03 of 03</p>
            <h3 className="wl-modal-title">Your Details</h3>

            <p className="wl-modal-field-label">X Username</p>
            <input type="text"
              className={`wl-modal-input${twitterError ? " wl-modal-input-error" : ""}`}
              placeholder="@yourusername" value={twitter}
              onChange={(e) => { setTwitter(e.target.value); setTwitterError(""); }} />
            {twitterError && <p className="wl-modal-error">{twitterError}</p>}

            <p className="wl-modal-field-label">EVM Wallet Address</p>
            <p className="wl-modal-body" style={{ marginBottom: "0.8rem" }}>
              Enter your EVM-compatible wallet address (MetaMask, Coinbase, etc.).
              This will be your permanent identity within WL Society.
            </p>
            <input type="text"
              className={`wl-modal-input${walletError ? " wl-modal-input-error" : ""}`}
              placeholder="0x000...0000" value={wallet} spellCheck={false}
              onChange={(e) => { setWallet(e.target.value); setWalletError(""); }} />
            {walletError && <p className="wl-modal-error">{walletError}</p>}
            <p className="wl-modal-hint">Example: 0x71C7656EC7ab88b098defB751B7401B5f6d8976F</p>

            <p className="wl-modal-field-label">Why do you want to join?</p>
            <textarea
              className={`wl-modal-textarea${reasonError ? " wl-modal-input-error" : ""}`}
              placeholder="Why do you want to join WL Society?" value={reason}
              onChange={(e) => { setReason(e.target.value); setReasonError(""); }} />
            {reasonError && <p className="wl-modal-error">{reasonError}</p>}

            {submitError && <p className="wl-modal-error wl-modal-submit-error">{submitError}</p>}

            <div className="wl-modal-btn-row">
              <button className="wl-btn-secondary" onClick={() => setStep(2)}>← Back</button>
              <button className="wl-btn-primary" onClick={submitApplication} disabled={loading}>
                {loading ? "Submitting…" : "Submit Application"}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 — SUCCESS */}
        {step === 4 && (
          <div className="wl-modal-step wl-modal-success">
            <div className="wl-modal-success-icon">✦</div>
            <h3 className="wl-modal-title">Application Received</h3>
            <p className="wl-modal-body">
              Welcome, Founder. Your application has been recorded in the WL archives.
              The Society will evaluate your submission within 48–72 hours and contact you via X DM.
            </p>
            <p className="wl-modal-hint" style={{ marginTop: "1rem" }}>Returning to the Society in 5 seconds…</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function Home() {
  const [showModal,     setShowModal]     = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [openFaq,       setOpenFaq]       = useState(null);
  const [showStickyBtn, setShowStickyBtn] = useState(false);
  const [flippedCards,  setFlippedCards]  = useState(new Set());

  /* ── Starfield canvas ── */
  useEffect(() => {
    const canvas = document.getElementById("wl-stars");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let stars = [], raf;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    const init   = () => {
      stars = Array.from({ length: 280 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4,
        alpha: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.12 + 0.02,
        twinkle: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.85 ? "107,63,160" : Math.random() > 0.7 ? "58,143,255" : "232,220,180",
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.twinkle += 0.006;
        const a = s.alpha * (0.55 + 0.45 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.hue},${a})`;
        ctx.fill();
        s.y -= s.speed;
        if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width; }
      }
      raf = requestAnimationFrame(draw);
    };
    resize(); init(); draw();
    const onResize = () => { resize(); init(); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  /* ── Scroll reveal ── */
  useEffect(() => {
    const els = document.querySelectorAll(".wl-reveal");
    const io  = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("wl-visible"); }),
      { threshold: 0.08 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ── Sticky apply btn ── */
  useEffect(() => {
    const onScroll = () => setShowStickyBtn(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = (showModal || menuOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showModal, menuOpen]);

  /* ── Mobile card flip (tap to flip) ── */
  const toggleFlip = useCallback((key) => {
    setFlippedCards(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main style={{ background: "var(--void)" }}>

      {/* STARFIELD */}
      <div id="starfield"><canvas id="wl-stars" /></div>

      {/* STICKY APPLY */}
      {showStickyBtn && !showModal && (
        <button className="wl-sticky-apply" onClick={() => setShowModal(true)}>Apply Now</button>
      )}

      {/* MODAL */}
      {showModal && <ApplicationModal onClose={() => setShowModal(false)} />}

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="wl-mobile-overlay" onClick={closeMenu}>
          <nav className="wl-mobile-menu" onClick={e => e.stopPropagation()}>
            <button className="wl-mobile-menu-close" onClick={closeMenu} aria-label="Close">✕</button>
            <ul>
              {["about","benefits","legends","join","roadmap","faq"].map(id => (
                <li key={id}><a href={`#${id}`} onClick={closeMenu}>{id.charAt(0).toUpperCase()+id.slice(1)}</a></li>
              ))}
            </ul>
            <button className="wl-btn-primary"
              style={{ width:"100%", textAlign:"center", marginTop:"2rem" }}
              onClick={() => { closeMenu(); setShowModal(true); }}>
              Apply Now
            </button>
          </nav>
        </div>
      )}

      <div className="wl-content">

        {/* ── NAVBAR ── */}
        <nav className="wl-nav">
          <span className="wl-nav-logo" onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>WL</span>
          <ul className="wl-nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#benefits">Why WL</a></li>
            <li><a href="#legends">Legends</a></li>
            <li><a href="#join">Join</a></li>
            <li><a href="#roadmap">Roadmap</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
          <button className="wl-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <span /><span /><span />
          </button>
        </nav>

        {/* ── HERO ── */}
        <section className="wl-hero">
          <div className="wl-hero-orb" />
          <div className="wl-hero-ring" />
          <p className="wl-hero-eyebrow">Est. 2026 · The Beginning of an Era</p>
          <h1 className="wl-hero-title">WL SOCIETY</h1>
          <div className="wl-hero-divider" />
          <p className="wl-hero-subtitle">Not A Project. It&apos;s A Society.</p>
          <p className="wl-hero-tagline">Built on Trust. Driven by Purpose. United as One.</p>
          <p className="wl-hero-desc">
            A curated Web3 whitelist community for early builders, visionaries, and explorers.
            Limited founding spots. Apply before they&apos;re gone.
          </p>
          <div className="wl-hero-btns">
            <button className="wl-btn-primary" onClick={() => setShowModal(true)}>Apply Now</button>
            <a href={X_PROFILE} target="_blank" rel="noopener noreferrer" className="wl-btn-secondary">Follow on X</a>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="wl-section"
          style={{ background:"linear-gradient(180deg,transparent,rgba(10,7,21,0.6) 50%,transparent)" }}>
          <p className="wl-section-eyebrow wl-reveal">The Foundation</p>
          <h2 className="wl-section-title wl-reveal">What Is WL Society?</h2>
          <div className="wl-rule wl-reveal" />
          <div className="wl-about-inner wl-reveal">
            <p className="wl-about-text">
              WL stands for <strong>Whitelist</strong> — a curated list of early members who gain
              priority access to everything WL Society builds.<br /><br />
              It is a <strong>growing digital society</strong> built by people who choose
              to create rather than follow.<br /><br />
              A place where builders, visionaries and explorers unite to shape
              ideas, opportunities and future worlds.<br /><br />
              We do not wait for the future.<br />
              <strong>We build it.</strong>
            </p>
          </div>
        </section>

        {/* ── BENEFITS ── */}
        <section id="benefits" className="wl-section wl-section-surface">
          <p className="wl-section-eyebrow wl-reveal">The Privileges</p>
          <h2 className="wl-section-title wl-reveal">Why WL Society?</h2>
          <div className="wl-rule wl-reveal" />
          <p className="wl-section-desc wl-reveal">Six reasons why joining the Society changes everything.</p>
          <div className="wl-benefits-grid wl-reveal">
            {benefits.map((item, i) => (
              <div key={i} className="wl-benefit-card">
                <span className="wl-benefit-num">0{i+1}</span>
                <h3 className="wl-benefit-title">{item.title}</h3>
                <p className="wl-benefit-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── LEGENDS — FLIP CARDS ── */}
        <section id="legends" className="wl-section">
          <p className="wl-section-eyebrow wl-reveal">The Legendary Pieces</p>
          <h2 className="wl-section-title wl-reveal">11 Legendary Figures</h2>
          <div className="wl-rule wl-reveal" />
          <p className="wl-section-desc wl-reveal">
            The legendary figures whose stories shaped the WL Society universe.
            <br /><span style={{ fontSize:"0.82rem", color:"var(--gold-dim)" }}>Hover a card to reveal their story.</span>
          </p>
          <div className="wl-legends-grid wl-reveal">
            {legends.map((legend, i) => (
              <div
                key={legend.key}
                data-legend={legend.key}
                className={`wl-legend-card${legend.featured ? " wl-legend-featured" : ""}${flippedCards.has(legend.key) ? " flipped" : ""}`}
                onClick={() => toggleFlip(legend.key)}
              >
                {/* flip hint on first card */}
                {i === 0 && <span className="wl-legend-flip-hint">Hover to reveal</span>}

                <div className="wl-legend-inner">
                  {/* FRONT */}
                  <div className="wl-legend-front">
                    <Image
                      src={legend.image}
                      alt={legend.name}
                      fill
                      sizes={legend.featured ? "(max-width:768px) 100vw, 50vw" : "(max-width:768px) 50vw, 25vw"}
                      className="wl-legend-img"
                      style={{ objectFit:"cover" }}
                    />
                    <div className="wl-legend-front-overlay">
                      <div className="wl-legend-front-line" />
                      <p className="wl-legend-front-name">{legend.name}</p>
                    </div>
                  </div>

                  {/* BACK */}
                  <div className="wl-legend-back">
                    <div className="wl-legend-back-symbol" style={{ color: legend.color }}>
                      {legend.symbol}
                    </div>
                    <p className="wl-legend-back-name">{legend.name}</p>
                    <div className="wl-legend-back-divider" />
                    <p className="wl-legend-back-desc">{legend.desc}</p>
                    <span className="wl-legend-back-tag" style={{ color: legend.color, borderColor: legend.color }}>
                      {legend.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── JOIN ── */}
        <section id="join" className="wl-section wl-section-surface">
          <p className="wl-section-eyebrow wl-reveal">The Path</p>
          <h2 className="wl-section-title wl-reveal">Join The Society</h2>
          <div className="wl-rule wl-reveal" />
          <p className="wl-section-desc wl-reveal">
            The Society is still in its earliest era. Every member who joins today
            becomes part of the foundation that future generations will remember.
          </p>
          <div className="wl-steps-row wl-reveal">
            {steps.map((s, i) => (
              <div key={i} className="wl-step">
                <div className="wl-step-num">{s.num}</div>
                <p className="wl-step-title">{s.title}</p>
                <p className="wl-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="wl-reveal" style={{ display:"flex", justifyContent:"center", gap:"1.5rem", marginTop:"5rem", flexWrap:"wrap" }}>
            <a href={X_PROFILE} target="_blank" rel="noopener noreferrer" className="wl-btn-primary">Follow On X</a>
            <button className="wl-btn-secondary" onClick={() => setShowModal(true)}>Apply To WL Society</button>
          </div>
        </section>

        {/* ── ROADMAP ── */}
        <section id="roadmap" className="wl-section"
          style={{ background:"linear-gradient(180deg,transparent,rgba(107,63,160,0.08) 40%,rgba(58,143,255,0.04) 70%,transparent)" }}>
          <p className="wl-section-eyebrow wl-reveal">The Path Forward</p>
          <h2 className="wl-section-title wl-reveal">WL Roadmap</h2>
          <div className="wl-rule wl-reveal" />
          <p className="wl-section-desc wl-reveal">The journey from genesis to a lasting multiverse.</p>
          <div className="wl-roadmap-track wl-reveal">
            {roadmap.map((item, i) => (
              <div key={i} className={`wl-roadmap-item${item.active ? " wl-roadmap-active" : ""}`}>
                <div className="wl-roadmap-phase-row">
                  <p className="wl-roadmap-phase">{item.phase}</p>
                  {item.active
                    ? <span className="wl-roadmap-badge">● Active Now</span>
                    : <span className="wl-roadmap-eta">{item.eta}</span>
                  }
                </div>
                <h3 className="wl-roadmap-title">{item.title}</h3>
                <p className="wl-roadmap-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="wl-section wl-section-surface">
          <p className="wl-section-eyebrow wl-reveal">Common Questions</p>
          <h2 className="wl-section-title wl-reveal">FAQ</h2>
          <div className="wl-rule wl-reveal" />
          <div className="wl-faq-list wl-reveal">
            {faqs.map((item, i) => (
              <div key={i} className={`wl-faq-item${openFaq === i ? " wl-faq-open" : ""}`}>
                <button className="wl-faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{item.q}</span>
                  <span className="wl-faq-icon">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <p className="wl-faq-answer">{item.a}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="wl-cta">
          <p className="wl-section-eyebrow wl-reveal">The Choice Is Yours</p>
          <h2 className="wl-section-title wl-reveal" style={{ fontSize:"clamp(2.5rem,6vw,5rem)" }}>Are You Ready?</h2>
          <div className="wl-rule wl-reveal" />
          <p className="wl-cta-badge wl-reveal">Limited founding spots remaining</p>
          <p className="wl-cta-desc wl-reveal">
            This moment will not come again. The earliest era of WL Society belongs
            only to those who choose to step forward now.
          </p>
          <div className="wl-reveal" style={{ display:"flex", justifyContent:"center", gap:"1.5rem", flexWrap:"wrap" }}>
            <button className="wl-btn-primary" onClick={() => setShowModal(true)}>Claim Your Place</button>
            <a href={X_PROFILE} target="_blank" rel="noopener noreferrer" className="wl-btn-secondary">Follow On X</a>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="wl-footer">
          <div className="wl-footer-top">
            <span className="wl-footer-logo">WL SOCIETY</span>
            <ul className="wl-footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#benefits">Why WL</a></li>
              <li><a href="#legends">Legends</a></li>
              <li><a href="#join">Join</a></li>
              <li><a href="#roadmap">Roadmap</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
            <div className="wl-footer-social">
              <a href={X_PROFILE} target="_blank" rel="noopener noreferrer">Follow on X ↗</a>
            </div>
          </div>
          <div className="wl-footer-bottom">
            <p className="wl-footer-copy">© 2026 WL Society. All Rights Reserved.</p>
            <p className="wl-footer-copy">
              Questions? DM us on{" "}
              <a href={X_PROFILE} target="_blank" rel="noopener noreferrer"
                 style={{ color:"var(--gold-dim)" }}>@wlsociety111</a>
            </p>
          </div>
        </footer>

      </div>
    </main>
  );
}