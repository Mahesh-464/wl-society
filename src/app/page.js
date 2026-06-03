"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const benefits = [
  {
    title: "Founder Status",
    desc: "Become one of the earliest members of WL Society and earn permanent founder recognition across all future endeavors.",
  },
  {
    title: "Legendary Collection",
    desc: "Gain access to the evolving WL legendary lore, stories and future collections as they unfold.",
  },
  {
    title: "Exclusive Community",
    desc: "Join a curated network of builders, creators, dreamers and explorers bound by purpose.",
  },
  {
    title: "Future Opportunities",
    desc: "Access future projects, collaborations and opportunities created within the WL universe.",
  },
  {
    title: "Shape The Society",
    desc: "Help influence the direction, culture and growth of the WL universe from within.",
  },
  {
    title: "Beyond A Project",
    desc: "Become part of something designed to outlive trends and grow into a lasting society.",
  },
];

const legends = [
  {
    name: "The Archivist",
    image: "/legends/archivist.png",
    desc: "Keeper of forgotten worlds and guardian of all WL knowledge.",
  },
  {
    name: "The Celestial Witness",
    image: "/legends/celestial-witness.png",
    desc: "Observer of galaxies, timelines and cosmic events beyond reality.",
  },
  {
    name: "The Collector",
    image: "/legends/collector.png",
    desc: "Preserver of rare artifacts gathered from countless dimensions.",
  },
  {
    name: "The Founder",
    image: "/legends/founder.png",
    desc: "The visionary who began the journey that became WL Society.",
  },
  {
    name: "The Judge",
    image: "/legends/judge.png",
    desc: "Arbiter of balance, deciding the fate of worlds and civilizations.",
  },
  {
    name: "The Last Member",
    image: "/legends/last-Member.png",
    desc: "The final seat of WL Society, whose identity remains unknown.",
    featured: true,
  },
  {
    name: "The Oracle",
    image: "/legends/oracle.png",
    desc: "Seer of possibilities and guardian of future pathways.",
  },
  {
    name: "The Silent King",
    image: "/legends/silent-king.png",
    desc: "A ruler whose silence shaped empires across dimensions.",
  },
  {
    name: "The Time Broker",
    image: "/legends/time-broker.png",
    desc: "Master of temporal pathways and keeper of forgotten timelines.",
  },
  {
    name: "The Void Keeper",
    image: "/legends/void-sovereign.png",
    desc: "Ancient ruler of the endless void beyond creation itself.",
  },
  {
    name: "The Wanderer",
    image: "/legends/wanderer.png",
    desc: "Traveler between realities searching for the unknown.",
  },
];

const roadmap = [
  {
    phase: "Phase I",
    title: "Society Formation",
    desc: "The founding vision is established. The world is introduced to WL Society and what it stands for.",
  },
  {
    phase: "Phase II",
    title: "Founding Members",
    desc: "The earliest members are selected. The foundation is set. History begins here.",
  },
  {
    phase: "Phase III",
    title: "Divisions",
    desc: "The Society expands into specialized divisions, each with its own purpose within the universe.",
  },
  {
    phase: "Phase IV",
    title: "Legendary Collection",
    desc: "The 11 Legendary Pieces are released. Their stories unfold across the WL universe.",
  },
  {
    phase: "Phase V",
    title: "Community Expansion",
    desc: "The Society grows. New builders, creators and explorers join the mission.",
  },
  {
    phase: "Phase VI · The Horizon",
    title: "WL Multiverse",
    desc: "The world expands beyond anything previously imagined. The multiverse begins.",
  },
];

const steps = [
  { num: "01", title: "Follow",  desc: "Follow WL Society on X" },
  { num: "02", title: "Support", desc: "Like & repost the pinned post" },
  { num: "03", title: "Apply",   desc: "Submit your application" },
  { num: "04", title: "Review",  desc: "Society evaluation & selection" },
  { num: "05", title: "Enter",   desc: "Become a member" },
];

/* ─── X account constants ─────────────────────────────── */
const X_PROFILE   = "https://x.com/wlsociety111";
const X_POST      = "https://x.com/wlsociety111/status/2061348649389707682?s=20";

/* ─────────────────────────────────────────────────────────
   APPLICATION MODAL COMPONENT
   (self-contained so submitApplication is clearly in scope)
───────────────────────────────────────────────────────── */
function ApplicationModal({ onClose }) {
  const [step, setStep]       = useState(1); // 1 = follow, 2 = repost, 3 = wallet, 4 = success
  const [followed, setFollowed]   = useState(false);
  const [reposted, setReposted]   = useState(false);
  const [twitter, setTwitter] = useState("");
  const [reason, setReason] = useState("");
  const [twitterError, setTwitterError] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [wallet, setWallet]       = useState("");
  const [walletError, setWalletError] = useState("");
  const [loading, setLoading]     = useState(false);

  /* Validate EVM wallet: starts with 0x, exactly 42 hex chars */
  const isValidWallet = (w) => /^0x[0-9a-fA-F]{40}$/.test(w.trim());

  const handleWalletChange = (e) => {
    setWallet(e.target.value);
    if (walletError) setWalletError("");
  };

  const submitApplication = async () => {

  if (!followed) {
    setStep(1);
    return;
  }

  if (!reposted) {
    setStep(2);
    return;
  }

  if (!twitter.trim()) {
    setTwitterError("Twitter username is required.");
    return;
  }

  if (!isValidWallet(wallet)) {
    setWalletError(
      "Please enter a valid EVM wallet address."
    );
    return;
  }

  if (!reason.trim()) {
    setReasonError(
      "Please tell us why you want to join WL Society."
    );
    return;
  }

  try {

    setLoading(true);

    const formData = new FormData();

    formData.append(
      "entry.1475914086",
      twitter
    );

    formData.append(
      "entry.1832040411",
      wallet
    );

    formData.append(
      "entry.1288369445",
      reason
    );

    await fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSfRJsMKFJ0mR8rVEEUZ4syW4odWT7YGr8yqzxEtjxvNVauwjw/formResponse",
      {
        method: "POST",
        mode: "no-cors",
        body: formData,
      }
    );

    setLoading(false);
    setStep(4);

  } catch (error) {

    console.error(error);

    setLoading(false);

    alert(
      "Unable to submit application. Please try again."
    );
  }
};

  /* Close on overlay click */
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  /* After success auto-redirect after 5 s */
  useEffect(() => {
    if (step === 4) {
      const t = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [step, onClose]);

  return (
    <div className="wl-modal-overlay" onClick={handleOverlayClick}>
      <div className="wl-modal">

        {/* ── CLOSE ── */}
        <button className="wl-modal-close" onClick={onClose} aria-label="Close">✕</button>

        {/* ── PROGRESS BAR (steps 1-3) ── */}
        {step < 4 && (
          <div className="wl-modal-progress">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`wl-modal-progress-dot ${step >= n ? "active" : ""} ${step > n ? "done" : ""}`}
              />
            ))}
          </div>
        )}

        {/* ══════════════ STEP 1 — FOLLOW ══════════════ */}
        {step === 1 && (
          <div className="wl-modal-step">
            <p className="wl-modal-eyebrow">Step 01 of 03</p>
            <h3 className="wl-modal-title">Follow WL Society</h3>
            <p className="wl-modal-body">
              You must follow <strong>@wlsociety111</strong> on X before submitting
              your application. Click the button below, then confirm.
            </p>

            <a
              href={X_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="wl-btn-primary wl-modal-action-btn"
            >
              Open @wlsociety111 on X ↗
            </a>

            <label className="wl-modal-check">
              <input
                type="checkbox"
                checked={followed}
                onChange={() => setFollowed(!followed)}
              />
              <span>I have followed <strong>@wlsociety111</strong></span>
            </label>

            <button
              className="wl-btn-primary wl-modal-next-btn"
              disabled={!followed}
              onClick={() => setStep(2)}
            >
              Continue →
            </button>
          </div>
        )}

        {/* ══════════════ STEP 2 — REPOST ══════════════ */}
        {step === 2 && (
          <div className="wl-modal-step">
            <p className="wl-modal-eyebrow">Step 02 of 03</p>
            <h3 className="wl-modal-title">Repost The Pinned Post</h3>
            <p className="wl-modal-body">
              Repost and leave a comment on the pinned post to show your support
              for WL Society. This helps the community grow.
            </p>

            <a
              href={X_POST}
              target="_blank"
              rel="noopener noreferrer"
              className="wl-btn-primary wl-modal-action-btn"
            >
              Open Pinned Post on X ↗
            </a>

            <label className="wl-modal-check">
              <input
                type="checkbox"
                checked={reposted}
                onChange={() => setReposted(!reposted)}
              />
              <span>I have reposted and commented on the pinned post</span>
            </label>

            <div className="wl-modal-btn-row">
              <button className="wl-btn-secondary" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button
                className="wl-btn-primary"
                disabled={!reposted}
                onClick={() => setStep(3)}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ══════════════ STEP 3 — WALLET ══════════════ */}
        {step === 3 && (
          <div className="wl-modal-step">
            <p className="wl-modal-eyebrow">Step 03 of 03</p>
           <h3 className="wl-modal-title">Your Twitter username</h3>
            <input
  type="text"
  className="wl-modal-input"
  placeholder="@yourusername"
  value={twitter}
  onChange={(e) => {
    setTwitter(e.target.value);
    setTwitterError("");
  }}
/>

{twitterError && (
  <p className="wl-modal-error">
    {twitterError}
  </p>
)}
           <h3 className="wl-modal-title">Your EVM Wallet</h3>
            <p className="wl-modal-body">
              Enter your EVM-compatible wallet address (MetaMask, Coinbase, etc.).
              This will be your permanent identity within WL Society.
            </p>

            <input
              type="text"
              className={`wl-modal-input ${walletError ? "wl-modal-input-error" : ""}`}
              placeholder="0x000...0000"
              value={wallet}
              onChange={handleWalletChange}
              spellCheck={false}
            />
            {walletError && (
              <p className="wl-modal-error">{walletError}</p>
            )}

            <p className="wl-modal-hint">
              Example: 0x71C7656EC7ab88b098defB751B7401B5f6d8976F
            </p>

            <textarea
  className="wl-modal-textarea"
  placeholder="Why do you want to join WL Society?"
  value={reason}
  onChange={(e) => {
    setReason(e.target.value);
    setReasonError("");
  }}
/>

{reasonError && (
  <p className="wl-modal-error">
    {reasonError}
  </p>
)}

            <div className="wl-modal-btn-row">
              <button className="wl-btn-secondary" onClick={() => setStep(2)}>
                ← Back
              </button>
              <button
                className="wl-btn-primary"
                onClick={submitApplication}
                disabled={loading}
              >
                {loading ? "Submitting…" : "Submit Application"}
              </button>
            </div>
          </div>
        )}

        {/* ══════════════ STEP 4 — SUCCESS ══════════════ */}
        {step === 4 && (
          <div className="wl-modal-step wl-modal-success">
            <div className="wl-modal-success-icon">✦</div>
            <h3 className="wl-modal-title">Application Received</h3>
            <p className="wl-modal-body">
              Welcome, Founder. Your application has been recorded in the WL
              archives. The Society will evaluate your submission and you will be
              notified of your status.
            </p>
            <p className="wl-modal-hint" style={{ marginTop: "1rem" }}>
              Returning to the Society in 5 seconds…
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────── */
export default function Home() {
  const [showModal, setShowModal] = useState(false);

  /* ── Starfield ── */
  useEffect(() => {
    const canvas = document.getElementById("wl-stars");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let stars = [];
    let raf;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      stars = Array.from({ length: 240 }, () => ({
        x:       Math.random() * canvas.width,
        y:       Math.random() * canvas.height,
        r:       Math.random() * 1.3,
        alpha:   Math.random() * 0.55 + 0.1,
        speed:   Math.random() * 0.14 + 0.02,
        twinkle: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.twinkle += 0.007;
        const a = s.alpha * (0.6 + 0.4 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,220,180,${a})`;
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
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("wl-visible"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ── Lock scroll when modal open ── */
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  return (
    <main style={{ background: "var(--void)" }}>

      {/* STARFIELD */}
      <div id="starfield">
        <canvas id="wl-stars" />
      </div>

      {/* APPLICATION MODAL */}
      {showModal && <ApplicationModal onClose={() => setShowModal(false)} />}

      <div className="wl-content">

        {/* ── NAVBAR ── */}
        <nav className="wl-nav">
          <span className="wl-nav-logo">WL</span>
          <ul className="wl-nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#benefits">Why WL</a></li>
            <li><a href="#legends">Legends</a></li>
            <li><a href="#join">Join</a></li>
          </ul>
        </nav>

        {/* ── HERO ── */}
        <section className="wl-hero">
          <div className="wl-hero-orb" />
          <p className="wl-hero-eyebrow">Est. 2026 · The Beginning of an Era</p>
          <h1 className="wl-hero-title">WL SOCIETY</h1>
          <div className="wl-hero-divider" />
          <p className="wl-hero-subtitle">Not A Project. It&apos;s A Society.</p>
          <p className="wl-hero-tagline">Built on Trust. Driven by Purpose. United as One.</p>
          <div className="wl-hero-btns">
            <button className="wl-btn-primary" onClick={() => setShowModal(true)}>
              Apply Now
            </button>
            <a href={X_PROFILE} target="_blank" rel="noopener noreferrer" className="wl-btn-secondary">
              Follow on X
            </a>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section
          id="about"
          className="wl-section"
          style={{ background: "linear-gradient(180deg, transparent, rgba(12,8,24,0.55) 50%, transparent)" }}
        >
          <p className="wl-section-eyebrow wl-reveal">The Foundation</p>
          <h2 className="wl-section-title wl-reveal">What Is WL Society?</h2>
          <div className="wl-rule wl-reveal" />
          <div className="wl-about-inner wl-reveal">
            <p className="wl-about-text">
              WL Society is not a traditional project.<br /><br />
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
        <section id="benefits" className="wl-section">
          <p className="wl-section-eyebrow wl-reveal">The Privileges</p>
          <h2 className="wl-section-title wl-reveal">Why WL Society?</h2>
          <div className="wl-rule wl-reveal" />
          <p className="wl-section-desc wl-reveal">Six reasons why joining the Society changes everything.</p>
          <div className="wl-benefits-grid wl-reveal">
            {benefits.map((item, i) => (
              <div key={i} className="wl-benefit-card">
                <span className="wl-benefit-num">0{i + 1}</span>
                <h3 className="wl-benefit-title">{item.title}</h3>
                <p className="wl-benefit-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── LEGENDS ── */}
        <section id="legends" className="wl-section">
          <p className="wl-section-eyebrow wl-reveal">The Legendary Pieces</p>
          <h2 className="wl-section-title wl-reveal">11 Legendary Figures</h2>
          <div className="wl-rule wl-reveal" />
          <p className="wl-section-desc wl-reveal">
            The legendary figures whose stories shaped the WL Society universe.
          </p>
          <div className="wl-legends-grid wl-reveal">
            {legends.map((legend, i) => (
              <div
                key={i}
                className={`wl-legend-card${legend.featured ? " wl-legend-featured" : ""}`}
              >
                <Image
                  src={legend.image}
                  alt={legend.name}
                  fill
                  sizes={legend.featured ? "(max-width:768px) 100vw, 50vw" : "(max-width:768px) 50vw, 25vw"}
                  className="wl-legend-img"
                  style={{ objectFit: "cover" }}
                />
                <div className="wl-legend-overlay">
                  <div className="wl-legend-line" />
                  <p className="wl-legend-name">{legend.name}</p>
                  <p className="wl-legend-desc">{legend.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── JOIN ── */}
        <section id="join" className="wl-section">
          <p className="wl-section-eyebrow wl-reveal">The Path</p>
          <h2 className="wl-section-title wl-reveal">Join The Society</h2>
          <div className="wl-rule wl-reveal" />
          <p className="wl-section-desc wl-reveal">
            The Society is still in its earliest era. Every member who joins
            today becomes part of the foundation that future generations will remember.
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
          <div className="wl-reveal" style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "5rem", flexWrap: "wrap" }}>
            <a href={X_PROFILE} target="_blank" rel="noopener noreferrer" className="wl-btn-primary">
              Follow On X
            </a>
            <button className="wl-btn-secondary" onClick={() => setShowModal(true)}>
              Apply To WL Society
            </button>
          </div>
        </section>

        {/* ── ROADMAP ── */}
        <section
          id="roadmap"
          className="wl-section"
          style={{ background: "linear-gradient(180deg, transparent, rgba(107,63,160,0.04), transparent)" }}
        >
          <p className="wl-section-eyebrow wl-reveal">The Path Forward</p>
          <h2 className="wl-section-title wl-reveal">WL Roadmap</h2>
          <div className="wl-rule wl-reveal" />
          <p className="wl-section-desc wl-reveal">The journey from genesis to a lasting multiverse.</p>
          <div className="wl-roadmap-track wl-reveal">
            {roadmap.map((item, i) => (
              <div key={i} className="wl-roadmap-item">
                <p className="wl-roadmap-phase">{item.phase}</p>
                <h3 className="wl-roadmap-title">{item.title}</h3>
                <p className="wl-roadmap-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="wl-cta">
          <p className="wl-section-eyebrow wl-reveal">The Choice Is Yours</p>
          <h2 className="wl-section-title wl-reveal" style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}>
            Are You Ready?
          </h2>
          <div className="wl-rule wl-reveal" />
          <p className="wl-cta-desc wl-reveal">
            This moment will not come again. The earliest era of WL Society
            belongs only to those who choose to step forward now.
          </p>
          <div className="wl-reveal" style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <button className="wl-btn-primary" onClick={() => setShowModal(true)}>
              Claim Your Place
            </button>
            <a href={X_PROFILE} target="_blank" rel="noopener noreferrer" className="wl-btn-secondary">
              Follow On X
            </a>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="wl-footer">
          <span className="wl-footer-logo">WL SOCIETY</span>
          <p className="wl-footer-copy">© 2026 WL Society. All Rights Reserved.</p>
        </footer>

      </div>
    </main>
  );
}