import { useState, useEffect } from "react";

const COLORS = {
  black: "#000000",
  darkNavy: "#05051A",
  navy: "#0A0A5A",
  gray: "#808080",
  lightGray: "#B0B0B0",
  yellow: "#E8F000",
  white: "#FFFFFF",
  offWhite: "#F5F5F0",
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Barlow:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #05051A;
    color: #FFFFFF;
    font-family: 'Barlow', sans-serif;
    font-weight: 400;
    line-height: 1.6;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #05051A; }
  ::-webkit-scrollbar-thumb { background: #E8F000; }

  .mono { font-family: 'Space Mono', monospace; }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 4rem;
    background: rgba(5, 5, 26, 0.92);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(232, 240, 0, 0.15);
  }

  .nav-logo {
    font-family: 'Space Mono', monospace;
    font-size: 1rem;
    color: #E8F000;
    letter-spacing: 0.08em;
    text-decoration: none;
  }

  .nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .nav-links a {
    font-family: 'Space Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #B0B0B0;
    text-decoration: none;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: #E8F000; }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column; justify-content: center;
    padding: 8rem 4rem 4rem;
    position: relative;
    overflow: hidden;
  }

  .hero-name-row {
    display: flex;
    align-items: flex-end;
    gap: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .hero-grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(10, 10, 90, 0.3) 1px, transparent 1px),
      linear-gradient(90deg, rgba(10, 10, 90, 0.3) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  .hero-accent {
    position: absolute; top: 20%; right: 6%;
    width: 320px; height: 320px;
    border: 1px solid rgba(232, 240, 0, 0.08);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }
  .hero-accent::before {
    content: '';
    position: absolute; inset: 20px;
    border: 1px solid rgba(232, 240, 0, 0.05);
    border-radius: 50%;
  }

  .hero-tag {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #E8F000;
    margin-bottom: 1.5rem;
  }

  .hero-name {
    font-family: 'Barlow', sans-serif;
    font-size: clamp(3.5rem, 8vw, 7rem);
    font-weight: 700;
    line-height: 0.95;
    letter-spacing: -0.02em;
    color: #FFFFFF;
    margin-bottom: 0.5rem;
  }

  .hero-name span {
    color: #E8F000;
    display: block;
  }

  .hero-subtitle {
    font-size: 1.15rem;
    font-weight: 300;
    color: #B0B0B0;
    margin-top: 2rem;
    max-width: 480px;
    border-left: 2px solid #E8F000;
    padding-left: 1.25rem;
    line-height: 1.7;
  }

  .hero-cta {
    margin-top: 3rem;
    display: flex; gap: 1rem; align-items: center;
  }

  /* PHOTO */
  .hero-photo-wrap {
    position: relative;
    z-index: 2;
    flex-shrink: 0;
    align-self: flex-end;
    margin-bottom: 0.2rem;
  }

  /* yellow offset frame behind the photo */
  .hero-photo-wrap::before {
    content: '';
    position: absolute;
    top: -5px; left: -5px; right: 5px; bottom: 5px;
    border: 1px solid rgba(232, 240, 0, 0.5);
    z-index: 0;
    pointer-events: none;
  }

  /* navy shadow block */
  .hero-photo-wrap::after {
    content: '';
    position: absolute;
    top: 5px; left: 5px; right: -5px; bottom: -5px;
    background: #0A0A5A;
    z-index: 0;
  }

  .hero-photo {
    position: relative;
    z-index: 1;
    width: 105px;
    height: 126px;
    object-fit: cover;
    object-position: center top;
    display: block;
    filter: grayscale(15%) brightness(0.88);
  }

  .btn-primary {
    font-family: 'Space Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.85rem 2rem;
    background: #E8F000;
    color: #05051A;
    border: none; cursor: pointer;
    font-weight: 700;
    transition: transform 0.15s, opacity 0.15s;
    text-decoration: none;
    display: inline-block;
  }
  .btn-primary:hover { transform: translateY(-2px); opacity: 0.9; }

  .btn-ghost {
    font-family: 'Space Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.85rem 2rem;
    background: transparent;
    color: #FFFFFF;
    border: 1px solid rgba(255,255,255,0.25);
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
    text-decoration: none;
    display: inline-block;
  }
  .btn-ghost:hover { border-color: #E8F000; color: #E8F000; }

  /* SECTIONS */
  section {
    padding: 6rem 4rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-label {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #E8F000;
    margin-bottom: 0.75rem;
    display: flex; align-items: center; gap: 0.75rem;
  }
  .section-label::after {
    content: '';
    flex: 1; max-width: 80px;
    height: 1px;
    background: #E8F000;
  }

  .section-title {
    font-family: 'Barlow', sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #FFFFFF;
    margin-bottom: 3rem;
  }

  /* ABOUT */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }

  .about-text p {
    font-size: 1.05rem;
    color: #B0B0B0;
    line-height: 1.8;
    margin-bottom: 1.25rem;
  }

  .about-text p strong {
    color: #FFFFFF;
    font-weight: 600;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.08);
  }

  .stat-box {
    background: #05051A;
    padding: 2rem 1.5rem;
    position: relative;
  }

  .stat-box::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 2px; height: 0;
    background: #E8F000;
    transition: height 0.4s ease;
  }
  .stat-box:hover::before { height: 100%; }

  .stat-number {
    font-family: 'Space Mono', monospace;
    font-size: 2.5rem;
    font-weight: 700;
    color: #E8F000;
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    font-size: 0.8rem;
    color: #808080;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  /* HOW I WORK */
  .work-section {
    background: rgba(10, 10, 90, 0.15);
    border-top: 1px solid rgba(232, 240, 0, 0.1);
    border-bottom: 1px solid rgba(232, 240, 0, 0.1);
  }

  .process-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0;
    border: 1px solid rgba(255,255,255,0.08);
  }

  .process-step {
    padding: 2.5rem 2rem;
    border-right: 1px solid rgba(255,255,255,0.08);
    position: relative;
    transition: background 0.25s;
  }
  .process-step:last-child { border-right: none; }
  .process-step:hover { background: rgba(232, 240, 0, 0.04); }

  .step-number {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    color: #E8F000;
    letter-spacing: 0.15em;
    margin-bottom: 1.5rem;
    display: block;
  }

  .step-title {
    font-family: 'Barlow', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #FFFFFF;
    margin-bottom: 0.75rem;
  }

  .step-desc {
    font-size: 0.875rem;
    color: #808080;
    line-height: 1.65;
  }

  .learning-note {
    margin-top: 3rem;
    padding: 2rem;
    border: 1px solid rgba(232, 240, 0, 0.2);
    background: rgba(232, 240, 0, 0.03);
    position: relative;
  }

  .learning-note::before {
    content: 'NOTE';
    font-family: 'Space Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    color: #E8F000;
    position: absolute;
    top: -0.5rem; left: 1.5rem;
    background: #05051A;
    padding: 0 0.5rem;
  }

  .learning-note p {
    font-size: 0.9rem;
    color: #B0B0B0;
    line-height: 1.75;
  }

  .learning-note a {
    color: #E8F000;
    text-decoration: none;
    border-bottom: 1px solid rgba(232,240,0,0.3);
    transition: border-color 0.2s;
  }
  .learning-note a:hover { border-color: #E8F000; }

  /* CASE STUDIES */
  .case-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: rgba(255,255,255,0.06);
  }

  .case-card {
    background: #05051A;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    aspect-ratio: 4/3;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-decoration: none;
    color: inherit;
  }

  .case-card-icon {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -60%);
    font-size: 3rem;
    opacity: 0.18;
    user-select: none;
    z-index: 1;
    filter: grayscale(1);
    transition: opacity 0.3s;
    pointer-events: none;
  }
  .case-card:hover .case-card-icon { opacity: 0.28; }

  .case-card-bg {
    position: absolute; inset: 0;
    transition: transform 0.5s ease;
  }
  .case-card:hover .case-card-bg { transform: scale(1.04); }

  .case-card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(5,5,26,0.95) 30%, transparent 80%);
    transition: background 0.3s;
  }
  .case-card:hover .case-card-overlay {
    background: linear-gradient(to top, rgba(5,5,26,0.98) 40%, rgba(5,5,26,0.3) 100%);
  }

  .case-card-content {
    position: relative; z-index: 2;
    padding: 2rem;
  }

  .case-tag {
    font-family: 'Space Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #E8F000;
    margin-bottom: 0.5rem;
    display: block;
  }

  .case-title {
    font-family: 'Barlow', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }

  .case-desc {
    font-size: 0.8rem;
    color: #B0B0B0;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.3s, transform 0.3s;
  }
  .case-card:hover .case-desc { opacity: 1; transform: translateY(0); }

  .case-arrow {
    position: absolute; top: 1.5rem; right: 1.5rem; z-index: 2;
    width: 36px; height: 36px;
    border: 1px solid rgba(232,240,0,0.3);
    display: flex; align-items: center; justify-content: center;
    color: #E8F000; font-size: 1rem;
    opacity: 0; transform: translateX(-8px);
    transition: opacity 0.3s, transform 0.3s;
  }
  .case-card:hover .case-arrow { opacity: 1; transform: translateX(0); }

  /* FOOTER */
  footer {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding: 3rem 4rem;
    display: flex; justify-content: space-between; align-items: center;
  }

  footer p {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    color: #808080;
    letter-spacing: 0.08em;
  }

  .footer-links { display: flex; gap: 2rem; list-style: none; }
  .footer-links a {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    color: #808080;
    text-decoration: none;
    letter-spacing: 0.08em;
    transition: color 0.2s;
  }
  .footer-links a:hover { color: #E8F000; }

  .divider {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.06);
    margin: 0 4rem;
  }

  @media (max-width: 900px) {
    .hero { padding: 7rem 1.5rem 3rem; }
    .hero-name-row { gap: 1.5rem; }
    .hero-photo { width: 80px; height: 96px; }
  }

  @media (max-width: 768px) {
    nav { padding: 1rem 1.5rem; }
    .nav-links { gap: 1.25rem; }
    section { padding: 4rem 1.5rem; }
    .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .case-grid { grid-template-columns: 1fr; }
    footer { flex-direction: column; gap: 1rem; padding: 2rem 1.5rem; }
    .process-steps { grid-template-columns: 1fr 1fr; }
    .divider { margin: 0 1.5rem; }
  }
`;

const caseStudies = [
  {
    id: 1,
    tag: "Design 01 — Service",
    title: "Service Site",
    desc: "A local service business — dentist, bike repair, or hairdresser.",
    icon: "🔧",
    bg: "linear-gradient(135deg, #0A0A5A 0%, #000000 100%)",
    pattern: "radial-gradient(circle at 30% 40%, rgba(232,240,0,0.08) 0%, transparent 60%)",
  },
  {
    id: 2,
    tag: "Design 02 — Game",
    title: "Jeu de Mémoire",
    desc: "An interactive memory card game with clean, engaging UI.",
    icon: "🃏",
    bg: "linear-gradient(135deg, #05051A 0%, #0A0A5A 100%)",
    pattern: "radial-gradient(circle at 70% 60%, rgba(232,240,0,0.1) 0%, transparent 60%)",
  },
  {
    id: 3,
    tag: "Design 03 — Commerce",
    title: "E-Commerce Site",
    desc: "A product-focused shopping experience built for conversion.",
    icon: "🛍️",
    bg: "linear-gradient(135deg, #000000 0%, #0A0A5A 100%)",
    pattern: "radial-gradient(circle at 20% 70%, rgba(128,128,128,0.15) 0%, transparent 60%)",
  },
  {
    id: 4,
    tag: "Design 04 — Analytics",
    title: "Analytics Dashboard",
    desc: "Data visualization — sports, BI, or any insight-driven platform.",
    icon: "📊",
    bg: "linear-gradient(135deg, #0A0A5A 0%, #05051A 100%)",
    pattern: "radial-gradient(circle at 60% 30%, rgba(232,240,0,0.07) 0%, transparent 60%)",
  },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalCSS;
    document.head.appendChild(style);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => {
      document.head.removeChild(style);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <nav>
        <a href="#hero" className="nav-logo mono" onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}>
          SS/
        </a>
        <ul className="nav-links">
          {[["About", "about"], ["Process", "process"], ["Work", "work"]].map(([label, id]) => (
            <li key={id}>
              <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <div id="hero" className="hero">
        <div className="hero-grid-bg" />
        <div className="hero-accent" />

        <div style={{ position: "relative", zIndex: 2 }}>
          <p className="hero-tag mono">UI/UX Portfolio — SEG3125</p>

          <div className="hero-name-row">
            <h1 className="hero-name">
              Souren
              <span>Savari.</span>
            </h1>
            <div className="hero-photo-wrap">
              <img
                src="/profile.jpeg"
                alt="Souren Savari"
                className="hero-photo"
              />
            </div>
          </div>

          <p className="hero-subtitle">
            Engineering student at the University of Ottawa — exploring the intersection of
            <strong style={{ color: "#E8F000" }}> technical systems</strong> and
            <strong style={{ color: "#E8F000" }}> human-centered design</strong>.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => scrollTo("work")}>View Projects</button>
            <button className="btn-ghost" onClick={() => scrollTo("about")}>About Me</button>
          </div>
        </div>
      </div>

      <hr className="divider" />

      {/* ABOUT */}
      <section id="about">
        <p className="section-label mono">01 — About</p>
        <h2 className="section-title">Who I Am</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              I'm <strong>Souren Savari</strong>, a 3rd year software engineering student at the University of Ottawa with a passion
              for building functional and well designed projects as efficiently as possible.
            </p>
            <p>
              I'm currently enrolled in <strong>SEG3125 — Analysis and Design of User Interfaces</strong>,
              where I'm developing skills in UX principles, visual communication, and user-centered design methodology.
            </p>
            <p>
              This portfolio is a snapshot of my learning journey in UI/UX design, showcasing projects that apply concepts from the course and beyond.
            </p>
          </div>

          <div>
            <div className="stats-grid">
              {[
                ["4", "Projects this semester"],
                ["UOttawa", "Software Engineering"],
                ["SEG3125", "Current UI Course"],
                ["2028", "Expected Graduation"],
              ].map(([num, label]) => (
                <div className="stat-box" key={label}>
                  <div className="stat-number mono">{num}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "2rem", display: "grid", gap: "1rem" }}>
              <a href="mailto:ssava033@uottawa.ca" className="btn-ghost" style={{ width: "100%", textAlign: "center" }}>
                Email: ssava033@uottawa.ca
              </a>
              <a href="https://github.com/ss-savari" target="_blank" rel="noreferrer" className="btn-ghost" style={{ width: "100%", textAlign: "center" }}>
                GitHub: ss-savari
              </a>
              <a href="https://www.linkedin.com/in/souren-savari-56b007336/" target="_blank" rel="noreferrer" className="btn-ghost" style={{ width: "100%", textAlign: "center" }}>
                LinkedIn: souren-savari-56b007336
              </a>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* PROCESS */}
      <div className="work-section" id="process">
        <section>
          <p className="section-label mono">02 — Process</p>
          <h2 className="section-title">How I Work</h2>
          <div className="process-steps">
            {[
              { n: "01", title: "Research & Discover", desc: "Understanding the project requirements and exploring standard UI patterns. I often use AI tools as a sounding board to brainstorm layout ideas and gather inspiration before making any final design decisions." },
              { n: "02", title: "Sketch & Wireframe", desc: "Translating initial ideas into rough sketches. I prefer mapping out the user flow and structural layout on paper or online to ensure the logic works and looks good before actual implementation." },
              { n: "03", title: "Design & Prototype", desc: "Applying the concepts learned so far in SEG3125 — visual hierarchy, color theory. I focus on clean layouts and user-centered design, occasionally leveraging AI to generate boilerplate code or troubleshoot so I can be more efficient." },
              { n: "04", title: "Test & Refine", desc: "Clicking through the final prototype to ensure it feels intuitive. This involves checking mobile responsiveness, fixing broken elements, and tweaking the design based on self-review and external feedback." },
            ].map((s) => (
              <div className="process-step" key={s.n}>
                <span className="step-number mono">{s.n}</span>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="learning-note">
            <p>
              I'm actively developing my UI/UX foundations through SEG3125 and supplementary resources from{" "}
              <a href="https://www.nngroup.com" target="_blank" rel="noreferrer">Nielsen Norman Group</a>,{" "}
              <a href="https://www.interaction-design.org" target="_blank" rel="noreferrer">Interaction Design Foundation</a>, and{" "}
              <a href="https://www.w3schools.com/bootstrap5/index.php" target="_blank" rel="noreferrer">Bootstrap 5 documentation</a>.
              As the semester progresses, this section will grow with concepts like user-centered design,
              heuristic evaluation, and accessibility best practices.
            </p>
          </div>
        </section>
      </div>

      {/* CASE STUDIES */}
      <section id="work">
        <p className="section-label mono">03 — Work</p>
        <h2 className="section-title">Case Studies</h2>
        <div className="case-grid">
          {caseStudies.map((c) => (
            <a
              key={c.id}
              href="/coming-soon.html"
              className="case-card"
              onClick={(e) => {
                e.preventDefault();
                alert("🚧 Coming Soon — This project is currently in progress.");
              }}
            >
              <div
                className="case-card-bg"
                style={{ backgroundImage: c.pattern + ", " + c.bg }}
              />
              <div className="case-card-overlay" />
              <div className="case-card-icon">{c.icon}</div>
              <div className="case-card-content">
                <span className="case-tag mono">{c.tag}</span>
                <h3 className="case-title">{c.title}</h3>
                <p className="case-desc">{c.desc}</p>
              </div>
              <div className="case-arrow">↗</div>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p className="mono">© 2026 Souren Savari — SEG3125 Portfolio</p>
        <ul className="footer-links">
          <li><a href="mailto:ssava033@uottawa.ca">Email</a></li>
          <li><a href="https://github.com/ss-savari" target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/souren-savari-56b007336/" target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}>Back to top ↑</a></li>
        </ul>
      </footer>
    </>
  );
}