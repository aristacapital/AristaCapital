<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Arista Capital Partners</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --slate:       #2B3A4A;
    --slate-dark:  #1C2A38;
    --slate-mid:   #3D5068;
    --slate-deep:  #111E2B;
    --accent:      #5B8FA8;
    --accent-light:#7AAEC4;
    --accent-pale: #D6E8F0;
    --bg:          #F4F6F8;
    --bg-dark:     #EAEDF1;
    --white:       #FFFFFF;
    --text-dark:   #1C2A38;
    --text-mid:    #3D5068;
    --text-muted:  #6B7E90;
    --border:      rgba(43, 58, 74, 0.13);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--white);
    color: var(--text-dark);
    font-size: 16px;
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px; height: 72px;
    background: rgba(255,255,255,0.97);
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(8px);
  }

  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 600;
    color: var(--slate-deep); letter-spacing: 0.02em;
    text-decoration: none;
  }
  .nav-logo span { color: var(--accent); }

  .nav-links { display: flex; gap: 36px; list-style: none; }
  .nav-links a {
    font-size: 13px; font-weight: 400; color: var(--text-mid);
    text-decoration: none; letter-spacing: 0.06em; text-transform: uppercase;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--accent); }

  .nav-cta {
    font-size: 13px; font-weight: 500; color: var(--slate);
    text-decoration: none; border: 1px solid var(--slate);
    padding: 8px 22px; letter-spacing: 0.04em; transition: all 0.2s;
  }
  .nav-cta:hover { background: var(--slate); color: var(--white); }

  /* HERO */
  .hero {
    min-height: 100vh;
    background: var(--slate-deep);
    display: flex; align-items: center;
    position: relative; overflow: hidden;
    padding: 120px 48px 80px;
  }

  .hero-bg-lines {
    position: absolute; inset: 0;
    overflow: hidden;
  }

  #hero-canvas {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    opacity: 0.55;
  }

  .hero-orb {
    position: absolute; right: -120px; top: 50%;
    transform: translateY(-50%);
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(91,143,168,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-content { max-width: 680px; position: relative; z-index: 2; }

  .hero-eyebrow {
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--accent-light); margin-bottom: 28px;
    display: flex; align-items: center; gap: 12px;
  }
  .hero-eyebrow::before {
    content: ''; display: block;
    width: 32px; height: 1px; background: var(--accent-light);
  }

  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(40px, 5vw, 62px);
    font-weight: 500; line-height: 1.15;
    color: var(--white); margin-bottom: 28px;
    letter-spacing: -0.01em;
  }
  .hero h1 em { font-style: italic; color: var(--accent-light); }

  .hero p {
    font-size: 17px; font-weight: 300;
    color: rgba(255,255,255,0.58);
    max-width: 520px; line-height: 1.75; margin-bottom: 44px;
  }

  .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }

  .btn-primary {
    background: var(--accent); color: var(--white);
    font-size: 13px; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase;
    padding: 14px 32px; text-decoration: none;
    border: none; cursor: pointer;
    transition: background 0.2s; display: inline-block;
  }
  .btn-primary:hover { background: var(--accent-light); }

  .btn-outline {
    background: transparent; color: rgba(255,255,255,0.75);
    font-size: 13px; font-weight: 400;
    letter-spacing: 0.06em; text-transform: uppercase;
    padding: 14px 32px; text-decoration: none;
    border: 1px solid rgba(255,255,255,0.22);
    cursor: pointer; transition: all 0.2s; display: inline-block;
  }
  .btn-outline:hover { border-color: rgba(255,255,255,0.55); color: white; }

  .hero-stats {
    position: absolute; right: 48px; bottom: 80px;
    display: flex; gap: 48px; z-index: 2;
  }

  .stat {
    text-align: right;
    border-right: 1px solid rgba(91,143,168,0.35);
    padding-right: 24px;
  }
  .stat:last-child { border-right: none; padding-right: 0; }
  .stat-number {
    font-family: 'Playfair Display', serif;
    font-size: 28px; font-weight: 500;
    color: var(--white); display: block;
  }
  .stat-label {
    font-size: 11px; font-weight: 400;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(255,255,255,0.38); display: block; margin-top: 4px;
  }

  /* SHARED */
  section { padding: 96px 48px; }

  .section-eyebrow {
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 16px;
    display: flex; align-items: center; gap: 10px;
  }
  .section-eyebrow::before {
    content: ''; display: block;
    width: 24px; height: 1px; background: var(--accent);
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(28px, 3.5vw, 40px);
    font-weight: 500; color: var(--slate-deep);
    line-height: 1.2; letter-spacing: -0.01em; margin-bottom: 20px;
  }

  .section-sub {
    font-size: 16px; color: var(--text-muted);
    max-width: 500px; line-height: 1.7;
  }

  /* ABOUT */
  #about {
    background: var(--bg);
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; align-items: center;
  }

  .about-text p {
    font-size: 16px; color: var(--text-mid);
    line-height: 1.8; margin-bottom: 20px;
  }

  .about-pillars { display: flex; flex-direction: column; }

  .pillar {
    padding: 28px 0; border-bottom: 1px solid var(--border);
    display: flex; align-items: flex-start; gap: 24px;
  }
  .pillar:first-child { border-top: 1px solid var(--border); }

  .pillar-num {
    font-family: 'Playfair Display', serif;
    font-size: 13px; color: var(--accent);
    min-width: 28px; padding-top: 2px;
  }

  .pillar-title { font-size: 15px; font-weight: 500; color: var(--slate-deep); margin-bottom: 6px; }
  .pillar-desc { font-size: 14px; color: var(--text-muted); line-height: 1.65; }

  /* SECTORS */
  #sectors { background: var(--white); }

  .sectors-header {
    display: flex; justify-content: space-between;
    align-items: flex-end; margin-bottom: 60px;
  }

  .sector-cards {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 1px; background: var(--border);
    border: 1px solid var(--border);
  }

  .sector-card {
    background: var(--white); padding: 40px 36px;
    transition: background 0.2s;
  }
  .sector-card:hover { background: var(--accent-pale); }

  .sector-icon {
    width: 40px; height: 40px;
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 24px; font-size: 18px; color: var(--accent);
  }

  .sector-name {
    font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 500;
    color: var(--slate-deep); margin-bottom: 12px;
  }

  .sector-desc {
    font-size: 14px; color: var(--text-muted); line-height: 1.7; margin-bottom: 20px;
  }

  .sector-tag {
    display: inline-block; font-size: 11px;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--accent); border: 1px solid rgba(91,143,168,0.35);
    padding: 4px 12px;
  }

  /* INVESTORS */
  #investors {
    background: var(--slate-deep); color: var(--white);
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 96px; align-items: start;
  }

  #investors .section-title { color: var(--white); }
  #investors .section-sub { color: rgba(255,255,255,0.48); }

  .invest-points { display: flex; flex-direction: column; margin-top: 48px; }

  .invest-point {
    padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.08);
    display: flex; gap: 20px; align-items: flex-start;
  }
  .invest-point:first-child { border-top: 1px solid rgba(255,255,255,0.08); }

  .invest-check {
    width: 20px; height: 20px;
    border: 1px solid var(--accent);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 2px;
    font-size: 11px; color: var(--accent);
  }

  .invest-point-text { font-size: 14px; color: rgba(255,255,255,0.65); line-height: 1.65; }
  .invest-point-text strong {
    display: block; font-size: 15px; font-weight: 500;
    color: var(--white); margin-bottom: 4px;
  }

  .deal-terms {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 40px;
  }

  .deal-terms-title {
    font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(255,255,255,0.38); margin-bottom: 28px;
  }

  .term-row {
    display: flex; justify-content: space-between;
    align-items: center; padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .term-row:last-child { border-bottom: none; }

  .term-label { font-size: 13px; color: rgba(255,255,255,0.42); letter-spacing: 0.03em; }
  .term-value { font-size: 14px; font-weight: 500; color: var(--white); }
  .term-value.accent { color: var(--accent-light); }

  /* TEAM */
  #team { background: var(--bg); text-align: center; }

  .team-header { max-width: 520px; margin: 0 auto 64px; }

  .team-grid {
    display: grid; grid-template-columns: repeat(2, 380px);
    gap: 24px; justify-content: center;
  }

  .team-card {
    background: var(--white); border: 1px solid var(--border);
    padding: 40px; text-align: left;
    transition: box-shadow 0.2s;
  }
  .team-card:hover { box-shadow: 0 8px 32px rgba(43,58,74,0.1); }

  .team-avatar {
    width: 56px; height: 56px; border-radius: 50%;
    background: var(--slate);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 18px; color: var(--accent-light); font-weight: 500;
    margin-bottom: 20px;
  }

  .team-name {
    font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 500;
    color: var(--slate-deep); margin-bottom: 4px;
  }

  .team-role {
    font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 16px;
  }

  .team-bio { font-size: 14px; color: var(--text-muted); line-height: 1.7; }

  /* CONTACT */
  #contact {
    background: var(--white);
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; align-items: start;
  }

  .contact-form { display: flex; flex-direction: column; gap: 16px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }

  .form-label {
    font-size: 11px; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--text-muted);
  }

  .form-input, .form-select, .form-textarea {
    background: var(--bg); border: 1px solid var(--border);
    padding: 12px 16px; font-family: 'DM Sans', sans-serif;
    font-size: 14px; color: var(--slate-deep); outline: none;
    transition: border-color 0.2s; width: 100%; appearance: none;
  }
  .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--accent); }
  .form-textarea { resize: vertical; min-height: 100px; }

  .form-submit {
    background: var(--slate); color: var(--white); border: none;
    padding: 14px 32px; font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase;
    cursor: pointer; transition: background 0.2s;
    align-self: flex-start; margin-top: 8px;
  }
  .form-submit:hover { background: var(--slate-mid); }

  .contact-info { padding-top: 8px; }

  .contact-detail { padding: 20px 0; border-bottom: 1px solid var(--border); }
  .contact-detail:first-of-type { border-top: 1px solid var(--border); margin-top: 40px; }

  .contact-detail-label {
    font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--text-muted); margin-bottom: 4px;
  }
  .contact-detail-value { font-size: 15px; color: var(--slate-deep); }

  /* FOOTER */
  footer {
    background: var(--slate-deep); padding: 40px 48px;
    display: flex; justify-content: space-between; align-items: center;
    border-top: 1px solid rgba(91,143,168,0.2);
  }

  .footer-logo {
    font-family: 'Playfair Display', serif;
    font-size: 18px; font-weight: 600; color: var(--white);
  }
  .footer-logo span { color: var(--accent-light); }

  .footer-text { font-size: 12px; color: rgba(255,255,255,0.28); letter-spacing: 0.04em; }

  .fade-in {
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-in.visible { opacity: 1; transform: translateY(0); }

  /* HAMBURGER BUTTON */
  .nav-hamburger {
    display: none; flex-direction: column; gap: 5px;
    cursor: pointer; background: none; border: none; padding: 4px;
  }
  .nav-hamburger span {
    display: block; width: 22px; height: 1.5px;
    background: var(--slate-deep);
    transition: transform 0.3s, opacity 0.3s;
  }
  .nav-hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(4.5px, 4.5px); }
  .nav-hamburger.open span:nth-child(2) { opacity: 0; }
  .nav-hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(4.5px, -4.5px); }

  /* ─── MOBILE ─── */
  @media (max-width: 768px) {
    /* NAV */
    nav { padding: 0 20px; height: 60px; }
    .nav-hamburger { display: flex; }
    .nav-cta { display: none; }
    .nav-links {
      display: none; position: fixed;
      top: 60px; left: 0; right: 0;
      background: rgba(255,255,255,0.98);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--border);
      flex-direction: column; gap: 0; padding: 0; z-index: 99;
    }
    .nav-links.open { display: flex; }
    .nav-links li { width: 100%; }
    .nav-links a {
      display: block; padding: 16px 24px;
      font-size: 14px; border-bottom: 1px solid var(--border);
    }

    /* HERO */
    .hero {
      padding: 80px 24px 60px;
      flex-direction: column;
      justify-content: flex-start; align-items: flex-start;
    }
    .hero-content { max-width: 100%; }
    .hero h1 { font-size: clamp(32px, 8vw, 48px); }
    .hero-orb { width: 240px; height: 240px; right: -60px; opacity: 0.5; }
    .hero-stats {
      position: static;
      flex-direction: row; flex-wrap: wrap;
      gap: 20px; margin-top: 48px;
    }
    .stat {
      text-align: left;
      border-right: none; padding-right: 0;
      border-bottom: 1px solid rgba(91,143,168,0.35);
      padding-bottom: 12px; min-width: 100px;
    }
    .stat:last-child { border-bottom: none; }
    .stat-number { font-size: 22px; }

    /* SECTIONS */
    section { padding: 56px 24px; }

    /* ABOUT */
    #about { grid-template-columns: 1fr; gap: 40px; }

    /* SECTORS */
    .sectors-header {
      flex-direction: column; align-items: flex-start;
      gap: 16px; margin-bottom: 40px;
    }
    .sectors-header p { max-width: 100% !important; }
    .sector-cards { grid-template-columns: 1fr; }
    .sector-card { padding: 28px 24px; }

    /* INVESTORS */
    #investors { grid-template-columns: 1fr; gap: 40px; }
    .deal-terms { padding: 24px 20px; }
    .term-label { font-size: 12px; }
    .term-value { font-size: 13px; }

    /* TEAM */
    #team { text-align: left; }
    .team-header { text-align: left; margin-bottom: 40px; }
    .team-header .section-eyebrow { justify-content: flex-start; }
    .team-header .section-sub { margin: 0; }
    .team-grid { grid-template-columns: 1fr; max-width: 100%; }
    .team-card { padding: 28px 20px; }

    /* CONTACT */
    #contact { grid-template-columns: 1fr; gap: 40px; }
    .form-row { grid-template-columns: 1fr; }
    .contact-detail:first-of-type { margin-top: 24px; }

    /* FOOTER */
    footer {
      flex-direction: column; gap: 10px;
      padding: 32px 24px; text-align: center;
    }
  }

  @media (max-width: 480px) {
    .hero { padding: 72px 20px 48px; }
    section { padding: 48px 20px; }
    nav { padding: 0 16px; }
    footer { padding: 28px 20px; }
    .sector-card { padding: 24px 20px; }
    .team-card { padding: 24px 20px; }
    .deal-terms { padding: 20px 16px; }
    .hero-stats { gap: 16px; }
    .stat-number { font-size: 20px; }
    .pillar { gap: 16px; }
  }
</style>
</head>
<body>

<nav>
  <a href="#hero" class="nav-logo">Arista <span>Capital Partners</span></a>
  <button class="nav-hamburger" aria-label="Toggle menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <ul class="nav-links">
    <li><a href="#about" data-en="About" data-es="Nosotros">About</a></li>
    <li><a href="#sectors" data-en="Sectors" data-es="Sectores">Sectors</a></li>
    <li><a href="#investors" data-en="Investors" data-es="Inversores">Investors</a></li>
    <li><a href="#team" data-en="Team" data-es="Equipo">Team</a></li>

  </ul>
  <div style="display:flex;align-items:center;gap:12px;">
    <button id="lang-toggle" aria-label="Toggle language" style="font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;background:transparent;border:1px solid var(--border);color:var(--text-mid);padding:6px 14px;cursor:pointer;transition:all 0.2s;white-space:nowrap;">ES</button>
    <a href="#contact" class="nav-cta" data-en="Get in Touch" data-es="Contáctanos">Get in Touch</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero" id="hero">
  <div class="hero-bg-lines"><canvas id="hero-canvas"></canvas></div>
  <div class="hero-orb"></div>
  <div class="hero-content fade-in">
    <div class="hero-eyebrow" data-en="Search Fund — Latin America" data-es="Search Fund — América Latina">Search Fund — Latin America</div>
    <h1 data-en="Acquiring <em>exceptional</em> businesses in Colombia" data-es="Adquiriendo empresas <em>excepcionales</em> en Colombia">Acquiring <em>exceptional</em> businesses in Colombia</h1>
    <p data-en="Arista Capital Partners is a search fund focused on identifying, acquiring, and operating premier SMEs across Latin America — building enduring value for investors, operators, and the communities we serve." data-es="Arista Capital Partners es un search fund enfocado en identificar, adquirir y operar las mejores pymes de América Latina — generando valor duradero para inversores, operadores y las comunidades que servimos.">Arista Capital Partners is a search fund focused on identifying, acquiring, and operating premier SMEs across Latin America — building enduring value for investors, operators, and the communities we serve.</p>
    <div class="hero-actions">
      <a href="#investors" class="btn-primary" data-en="Investor Information" data-es="Información para Inversores">Investor Information</a>
      <a href="#about" class="btn-outline" data-en="Our Thesis" data-es="Nuestra Tesis">Our Thesis</a>
    </div>
  </div>
</section>
<section id="about">
  <div class="about-text fade-in">
    <div class="section-eyebrow" data-en="Our Thesis" data-es="Nuestra Tesis">Our Thesis</div>
    <h2 class="section-title" data-en="A disciplined approach to acquiring Colombia's finest operators" data-es="Un enfoque disciplinado para adquirir los mejores operadores de Colombia">A disciplined approach to acquiring Colombia's finest operators</h2>
    <p data-en="Latin America represents one of the most compelling untapped markets for the search fund model. Colombia's growing middle class, improving institutional environment, and fragmented SME landscape create a unique window of opportunity for experienced operators." data-es="América Latina representa uno de los mercados más atractivos y sin explotar para el modelo de search fund. La creciente clase media de Colombia, la mejora del entorno institucional y el fragmentado ecosistema de pymes crean una ventana única de oportunidad para operadores experimentados.">Latin America represents one of the most compelling untapped markets for the search fund model. Colombia's growing middle class, improving institutional environment, and fragmented SME landscape create a unique window of opportunity for experienced operators.</p>
    <p data-en="We focus on profitable, established businesses with defensible competitive positions — where skilled ownership can unlock meaningful value creation over a 5–7 year horizon." data-es="Nos enfocamos en empresas rentables y consolidadas con posiciones competitivas defendibles — donde una gestión experta puede desbloquear una creación de valor significativa en un horizonte de 5 a 7 años.">We focus on profitable, established businesses with defensible competitive positions — where skilled ownership can unlock meaningful value creation over a 5–7 year horizon.</p>
  </div>
  <div class="about-pillars fade-in">
    <div class="pillar">
      <span class="pillar-num">01</span>
      <div>
        <div class="pillar-title" data-en="Focused Sector Expertise" data-es="Especialización Sectorial">Focused Sector Expertise</div>
        <div class="pillar-desc" data-en="Deep sector knowledge across clinical laboratories, engineering services, industrial linen and laundry, heavy equipment rentals, specialty medical practices, and specialty chemicals and pharmaceutical manufacturing — resilient industries with strong recurring revenue characteristics." data-es="Conocimiento profundo en laboratorios clínicos, servicios de ingeniería, lavandería industrial, alquiler de maquinaria pesada, consultorios médicos especializados y fabricación de químicos y farmacéuticos — industrias resilientes con ingresos recurrentes sólidos.">Deep sector knowledge across clinical laboratories, engineering services, industrial linen and laundry, heavy equipment rentals, specialty medical practices, and specialty chemicals and pharmaceutical manufacturing — resilient industries with strong recurring revenue characteristics.</div>
      </div>
    </div>
    <div class="pillar">
      <span class="pillar-num">02</span>
      <div>
        <div class="pillar-title" data-en="Operational Value Creation" data-es="Creación de Valor Operacional">Operational Value Creation</div>
        <div class="pillar-desc" data-en="Our edge is operational improvement — bringing rigorous management practices, data-driven decision making, and M&A playbooks to businesses built on strong foundations." data-es="Nuestra ventaja es la mejora operacional — aplicando prácticas de gestión rigurosas, toma de decisiones basada en datos y metodologías de M&A a empresas con bases sólidas.">Our edge is operational improvement — bringing rigorous management practices, data-driven decision making, and M&A playbooks to businesses built on strong foundations.</div>
      </div>
    </div>
    <div class="pillar">
      <span class="pillar-num">03</span>
      <div>
        <div class="pillar-title" data-en="Aligned Incentives" data-es="Incentivos Alineados">Aligned Incentives</div>
        <div class="pillar-desc" data-en="As operators who invest alongside our investors, our incentives are fully aligned. We take pride in building businesses that create lasting value for all stakeholders." data-es="Como operadores que invertimos junto a nuestros inversores, nuestros incentivos están completamente alineados. Nos enorgullece construir empresas que generen valor duradero para todos los grupos de interés.">As operators who invest alongside our investors, our incentives are fully aligned. We take pride in building businesses that create lasting value for all stakeholders.</div>
      </div>
    </div>
    <div class="pillar">
      <span class="pillar-num">04</span>
      <div>
        <div class="pillar-title" data-en="Local Advantage" data-es="Ventaja Local">Local Advantage</div>
        <div class="pillar-desc" data-en="On-the-ground presence in Colombia, deep local networks, and fluency in the regulatory and cultural landscape provide meaningful information and execution advantages." data-es="Presencia directa en Colombia, redes locales profundas y dominio del entorno regulatorio y cultural nos proporcionan ventajas informativas y de ejecución significativas.">On-the-ground presence in Colombia, deep local networks, and fluency in the regulatory and cultural landscape provide meaningful information and execution advantages.</div>
      </div>
    </div>
  </div>
</section>

<!-- SECTORS -->
<section id="sectors">
  <div class="sectors-header fade-in">
    <div>
      <div class="section-eyebrow" data-en="Target Sectors" data-es="Sectores Objetivo">Target Sectors</div>
      <h2 class="section-title" data-en="Where we focus our search" data-es="Dónde enfocamos nuestra búsqueda">Where we focus our search</h2>
    </div>
    <p class="section-sub" style="max-width: 300px;" data-en="Fragmented markets with strong unit economics and a clear path to consolidation." data-es="Mercados fragmentados con sólida economía unitaria y una clara ruta hacia la consolidación.">Fragmented markets with strong unit economics and a clear path to consolidation.</p>
  </div>
  <div class="sector-cards fade-in">
    <div class="sector-card">
      <div class="sector-icon">✦</div>
      <div class="sector-name" data-en="Clinical<br>Laboratories" data-es="Laboratorios<br>Clínicos">Clinical<br>Laboratories</div>
      <div class="sector-desc" data-en="Diagnostic and testing labs serving healthcare providers and direct patients. Recurring demand, essential services, and strong cash flow dynamics with clear consolidation opportunities." data-es="Laboratorios de diagnóstico al servicio de proveedores de salud y pacientes directos. Demanda recurrente, servicios esenciales y sólida dinámica de flujo de caja con claras oportunidades de consolidación.">Diagnostic and testing labs serving healthcare providers and direct patients. Recurring demand, essential services, and strong cash flow dynamics with clear consolidation opportunities.</div>
      <span class="sector-tag" data-en="Target Sector" data-es="Sector Objetivo">Target Sector</span>
    </div>
    <div class="sector-card">
      <div class="sector-icon">✦</div>
      <div class="sector-name" data-en="Engineering<br>Services" data-es="Servicios de<br>Ingeniería">Engineering<br>Services</div>
      <div class="sector-desc" data-en="Specialized engineering firms providing technical consulting, project management, and design services across infrastructure and industrial sectors with stable recurring client relationships." data-es="Firmas de ingeniería especializadas que ofrecen consultoría técnica, gestión de proyectos y diseño en sectores de infraestructura e industria, con relaciones comerciales recurrentes y estables.">Specialized engineering firms providing technical consulting, project management, and design services across infrastructure and industrial sectors with stable recurring client relationships.</div>
      <span class="sector-tag" data-en="Target Sector" data-es="Sector Objetivo">Target Sector</span>
    </div>
    <div class="sector-card">
      <div class="sector-icon">✦</div>
      <div class="sector-name" data-en="Industrial Linen<br>&amp; Laundry" data-es="Lavandería<br>Industrial">Industrial Linen<br>&amp; Laundry</div>
      <div class="sector-desc" data-en="Commercial laundry and linen supply businesses serving hospitality, healthcare, and industrial clients. Predictable revenue, high switching costs, and significant local market fragmentation." data-es="Empresas de lavandería y suministro de lencería para clientes de hotelería, salud e industria. Ingresos predecibles, altos costos de cambio y notable fragmentación del mercado local.">Commercial laundry and linen supply businesses serving hospitality, healthcare, and industrial clients. Predictable revenue, high switching costs, and significant local market fragmentation.</div>
      <span class="sector-tag" data-en="Target Sector" data-es="Sector Objetivo">Target Sector</span>
    </div>
    <div class="sector-card">
      <div class="sector-icon">✦</div>
      <div class="sector-name" data-en="Heavy Equipment<br>Rentals" data-es="Alquiler de<br>Maquinaria Pesada">Heavy Equipment<br>Rentals</div>
      <div class="sector-desc" data-en="Equipment rental companies serving construction, mining, and infrastructure industries. Asset-backed businesses with strong recurring revenue and meaningful barriers to entry." data-es="Empresas de alquiler de equipos para construcción, minería e infraestructura. Negocios respaldados por activos con ingresos recurrentes sólidos y barreras de entrada significativas.">Equipment rental companies serving construction, mining, and infrastructure industries. Asset-backed businesses with strong recurring revenue and meaningful barriers to entry.</div>
      <span class="sector-tag" data-en="Target Sector" data-es="Sector Objetivo">Target Sector</span>
    </div>
    <div class="sector-card">
      <div class="sector-icon">✦</div>
      <div class="sector-name" data-en="Specialty Medical<br>Practices" data-es="Consultorios Médicos<br>Especializados">Specialty Medical<br>Practices</div>
      <div class="sector-desc" data-en="Focused specialty medical clinics with defensible patient bases, recurring revenue, and professional management upside. Essential healthcare services with strong local market positions." data-es="Clínicas médicas especializadas con bases de pacientes defendibles, ingresos recurrentes y potencial de mejora en gestión profesional. Servicios de salud esenciales con posiciones sólidas en el mercado local.">Focused specialty medical clinics with defensible patient bases, recurring revenue, and professional management upside. Essential healthcare services with strong local market positions.</div>
      <span class="sector-tag" data-en="Target Sector" data-es="Sector Objetivo">Target Sector</span>
    </div>
    <div class="sector-card">
      <div class="sector-icon">✦</div>
      <div class="sector-name" data-en="Specialty Chemicals &amp;<br>Pharma Manufacturing" data-es="Química Especializada<br>y Farmacéutica">Specialty Chemicals &amp;<br>Pharma Manufacturing</div>
      <div class="sector-desc" data-en="Niche chemical and pharmaceutical manufacturers with proprietary formulations, regulatory moats, and established customer relationships in industrial and healthcare end markets." data-es="Fabricantes de nicho en química y farmacéutica con formulaciones propias, barreras regulatorias y relaciones consolidadas con clientes en mercados industriales y sanitarios.">Niche chemical and pharmaceutical manufacturers with proprietary formulations, regulatory moats, and established customer relationships in industrial and healthcare end markets.</div>
      <span class="sector-tag" data-en="Target Sector" data-es="Sector Objetivo">Target Sector</span>
    </div>
  </div>
</section>

<!-- INVESTORS -->
<section id="investors">
  <div class="fade-in">
    <div class="section-eyebrow" style="color: var(--accent-light);">
      <span style="background: var(--accent); display:block; width:24px; height:1px;"></span>
      <span data-en="For Investors" data-es="Para Inversores">For Investors</span>
    </div>
    <h2 class="section-title" data-en="A differentiated return profile in an emerging market" data-es="Un perfil de retorno diferenciado en un mercado emergente">A differentiated return profile in an emerging market</h2>
    <p class="section-sub" data-en="The search fund model has generated compelling returns for investors over three decades. Arista Capital Partners applies this proven structure to the Latin American opportunity." data-es="El modelo de search fund ha generado retornos atractivos para inversores durante tres décadas. Arista Capital Partners aplica esta estructura probada a la oportunidad latinoamericana.">The search fund model has generated compelling returns for investors over three decades. Arista Capital Partners applies this proven structure to the Latin American opportunity.</p>
    <div class="invest-points">
      <div class="invest-point">
        <div class="invest-check">✓</div>
        <div class="invest-point-text">
          <strong data-en="Asymmetric upside" data-es="Potencial asimétrico">Asymmetric upside</strong>
          <span data-en="Step-up economics on acquisition provide early investors preferential returns prior to equity participation by the operators." data-es="La estructura escalonada en la adquisición otorga a los inversores tempranos retornos preferenciales antes de la participación accionaria de los operadores.">Step-up economics on acquisition provide early investors preferential returns prior to equity participation by the operators.</span>
        </div>
      </div>
      <div class="invest-point">
        <div class="invest-check">✓</div>
        <div class="invest-point-text">
          <strong data-en="Operator-led model" data-es="Modelo liderado por operadores">Operator-led model</strong>
          <span data-en="Principals invest meaningfully alongside investors — full alignment of incentives throughout the search and ownership phases." data-es="Los socios invierten de forma significativa junto a los inversores — alineación total de incentivos durante las fases de búsqueda y propiedad.">Principals invest meaningfully alongside investors — full alignment of incentives throughout the search and ownership phases.</span>
        </div>
      </div>
      <div class="invest-point">
        <div class="invest-check">✓</div>
        <div class="invest-point-text">
          <strong data-en="Experienced principals" data-es="Socios con experiencia">Experienced principals</strong>
          <span data-en="Operators bring world-class management consulting and M&A backgrounds — rigorous frameworks applied to SME acquisition." data-es="Los operadores aportan trayectorias de consultoría de gestión y M&A de primer nivel — marcos rigurosos aplicados a la adquisición de pymes.">Operators bring world-class management consulting and M&A backgrounds — rigorous frameworks applied to SME acquisition.</span>
        </div>
      </div>
      <div class="invest-point">
        <div class="invest-check">✓</div>
        <div class="invest-point-text">
          <strong data-en="Underpenetrated market" data-es="Mercado sin explotar">Underpenetrated market</strong>
          <span data-en="Latin American search funds remain nascent, creating deal pricing and structural advantages not available in more competitive markets." data-es="Los search funds en América Latina siguen siendo incipientes, lo que genera ventajas de precio y estructurales no disponibles en mercados más competitivos.">Latin American search funds remain nascent, creating deal pricing and structural advantages not available in more competitive markets.</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- TEAM -->
<section id="team">
  <div class="team-header fade-in">
    <div class="section-eyebrow" style="justify-content: center;" data-en="The Team" data-es="El Equipo">The Team</div>
    <h2 class="section-title" data-en="Operators first" data-es="Operadores ante todo">Operators first</h2>
    <p class="section-sub" style="margin: 0 auto;" data-en="Two principals combining global consulting credentials with deep on-the-ground expertise in Latin America." data-es="Dos socios que combinan credenciales de consultoría global con un profundo conocimiento sobre el terreno en América Latina.">Two principals combining global consulting credentials with deep on-the-ground expertise in Latin America.</p>
  </div>
  <div class="team-grid fade-in">
    <div class="team-card">
      <div class="team-avatar">L</div>
      <div class="team-name">Louis Abrassard</div>
      <div class="team-role" data-en="Co-Founder &amp; Principal" data-es="Co-Fundador y Director">Co-Founder &amp; Principal</div>
      <div class="team-bio" data-en="Consultant at Bain &amp; Company with M&amp;A and strategy experience across multiple sectors. A Yale graduate who has completed 50+ due diligences, Louis brings deep diligence experience across both the buy side and sell side. Brings rigorous analytical frameworks and transaction structuring expertise to the search. Based in Boston, with deep ties to Latin American markets." data-es="Consultor en Bain &amp; Company con experiencia en M&amp;A y estrategia en múltiples sectores. Graduado de Yale y con más de 50 due diligences completados, Louis aporta una profunda experiencia en procesos de análisis tanto en el lado comprador como vendedor, junto con marcos analíticos rigurosos y conocimiento en estructuración de transacciones.">Consultant at Bain &amp; Company with M&amp;A and strategy experience across multiple sectors. A Yale graduate who has completed 50+ due diligences, Louis brings deep diligence experience across both the buy side and sell side. Brings rigorous analytical frameworks and transaction structuring expertise to the search. Based in Boston, with deep ties to Latin American markets.</div>
    </div>
    <div class="team-card">
      <div class="team-avatar">M</div>
      <div class="team-name">Mateo Morales</div>
      <div class="team-role" data-en="Co-Founder &amp; Principal" data-es="Co-Fundador y Director">Co-Founder &amp; Principal</div>
      <div class="team-bio" data-en="A native Colombian, Mateo brings an extensive network of bankers, advisors, and intermediaries in the region. Provides critical on-the-ground deal sourcing networks, regulatory fluency, and management expertise across the target sectors, with deep operational experience in the Colombian market." data-es="Colombiano de nacimiento, Mateo aporta una extensa red de banqueros, asesores e intermediarios en la región. Ofrece redes críticas de originación de operaciones sobre el terreno, dominio regulatorio y experiencia en gestión en los sectores objetivo, con una profunda trayectoria operacional en el mercado colombiano.">A native Colombian, Mateo brings an extensive network of bankers, advisors, and intermediaries in the region. Provides critical on-the-ground deal sourcing networks, regulatory fluency, and management expertise across the target sectors, with deep operational experience in the Colombian market.</div>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section id="contact">
  <div class="contact-info fade-in">
    <div class="section-eyebrow" data-en="Contact" data-es="Contacto">Contact</div>
    <h2 class="section-title" data-en="Let's start a conversation" data-es="Iniciemos una conversación">Let's start a conversation</h2>
    <p class="section-sub" data-en="Whether you're a potential investor, a business owner considering your next chapter, or an advisor — we'd like to hear from you." data-es="Ya sea que sea un potencial inversor, un empresario considerando su próximo capítulo o un asesor — nos gustaría escucharle.">Whether you're a potential investor, a business owner considering your next chapter, or an advisor — we'd like to hear from you.</p>
    <div class="contact-detail">
      <div class="contact-detail-label" data-en="Headquarters" data-es="Sede">Headquarters</div>
      <div class="contact-detail-value">Boston, MA &amp; Bogotá, Colombia</div>
    </div>
    <div class="contact-detail">
      <div class="contact-detail-label" data-en="For Investors" data-es="Para Inversores">For Investors</div>
      <div class="contact-detail-value">investors@aristacapitalpartners.com</div>
    </div>
    <div class="contact-detail">
      <div class="contact-detail-label" data-en="For Business Owners" data-es="Para Empresarios">For Business Owners</div>
      <div class="contact-detail-value">acquisitions@aristacapitalpartners.com</div>
    </div>
  </div>
  <div class="contact-form fade-in">
    <div class="form-row">
      <div class="form-group">
        <label class="form-label" data-en="First Name" data-es="Nombre">First Name</label>
        <input type="text" class="form-input" placeholder="Ana">
      </div>
      <div class="form-group">
        <label class="form-label" data-en="Last Name" data-es="Apellido">Last Name</label>
        <input type="text" class="form-input" placeholder="García">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Email</label>
      <input type="email" class="form-input" placeholder="ana@example.com">
    </div>
    <div class="form-group">
      <label class="form-label" data-en="I am a" data-es="Soy">I am a</label>
      <select class="form-select">
        <option value="" data-en="Select one..." data-es="Seleccione...">Select one...</option>
        <option data-en="Prospective Investor" data-es="Inversor Potencial">Prospective Investor</option>
        <option data-en="Business Owner / Seller" data-es="Empresario / Vendedor">Business Owner / Seller</option>
        <option data-en="M&amp;A Advisor / Intermediary" data-es="Asesor M&amp;A / Intermediario">M&amp;A Advisor / Intermediary</option>
        <option data-en="Other" data-es="Otro">Other</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label" data-en="Message" data-es="Mensaje">Message</label>
      <textarea class="form-textarea" data-placeholder-en="Tell us about your interest in Arista Capital Partners..." data-placeholder-es="Cuéntenos sobre su interés en Arista Capital Partners..." placeholder="Tell us about your interest in Arista Capital Partners..."></textarea>
    </div>
    <button class="form-submit" data-en="Send Message" data-es="Enviar Mensaje">Send Message</button>
  </div>
</section>

<footer>
  <div class="footer-logo">Arista <span>Capital Partners</span></div>
  <div class="footer-text">© <span id="footer-year"></span> Arista Capital Partners · Boston, MA &amp; Bogotá, Colombia</div>
  <div class="footer-text" data-en="Confidential — Not an offer to sell securities" data-es="Confidencial — No constituye una oferta de venta de valores">Confidential — Not an offer to sell securities</div>
</footer>

<script>
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        const siblings = e.target.parentElement?.querySelectorAll('.fade-in');
        if (siblings) {
          let delay = 0;
          siblings.forEach((s) => {
            if (!s.classList.contains('visible')) {
              s.style.transitionDelay = (delay * 0.12) + 's';
              delay++;
            }
          });
        }
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Hamburger menu
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Full-coverage topographic contour lines — non-crossing, visibly animated
  (function() {
    const canvas = document.getElementById('hero-canvas');
    const ctx    = canvas.getContext('2d');
    let W = 0, H = 0;
    const R = 91, G = 143, B = 168;

    const TOTAL_LINES = 46;
    const STEPS       = 110;  // horizontal resolution per line
    // Each line gets independent phase offsets per x-column
    // We use a simple multi-sine noise — no hermite needed
    // Speed in radians/ms — ~0.3–0.7 rad/sec so motion is clearly visible
    const linePhase = Array.from({length: TOTAL_LINES}, () => Math.random() * Math.PI * 2);
    const lineSpeed = Array.from({length: TOTAL_LINES}, () => 0.00028 + Math.random() * 0.00022);
    // Per-line spatial frequencies (how wavy each line is horizontally)
    const lineFreqA = Array.from({length: TOTAL_LINES}, () => 1.4 + Math.random() * 1.2);
    const lineFreqB = Array.from({length: TOTAL_LINES}, () => 3.1 + Math.random() * 2.0);
    const lineFreqC = Array.from({length: TOTAL_LINES}, () => 6.5 + Math.random() * 3.0);
    // Per-line amplitude weights
    const lineAmpA  = Array.from({length: TOTAL_LINES}, () => 0.45 + Math.random() * 0.3);
    const lineAmpB  = Array.from({length: TOTAL_LINES}, () => 0.25 + Math.random() * 0.2);
    const lineAmpC  = Array.from({length: TOTAL_LINES}, () => 0.10 + Math.random() * 0.1);
    // Secondary drift phase per line (so lines move at different rates)
    const linePhase2 = Array.from({length: TOTAL_LINES}, () => Math.random() * Math.PI * 2);
    const lineSpeed2 = Array.from({length: TOTAL_LINES}, () => 0.00015 + Math.random() * 0.00015);

    // Uneven base vertical distribution — denser in two bands
    function buildBaseY(n) {
      const pos = [];
      for (let i = 0; i < n; i++) {
        const u = i / (n - 1); // 0..1
        // Warp to cluster lines around 30% and 68% of height
        const w = u + 0.09 * Math.sin(u * Math.PI * 3.1 + 0.5);
        pos.push(Math.max(0.03, Math.min(0.97, w)));
      }
      return pos;
    }
    const baseY = buildBaseY(TOTAL_LINES);

    function resize() {
      const parent = canvas.parentElement;
      const rect   = parent.getBoundingClientRect();
      const w = Math.round(rect.width  > 0 ? rect.width  : window.innerWidth);
      const h = Math.round(rect.height > 0 ? rect.height : window.innerHeight);
      if (w !== W || h !== H) { W = canvas.width = w; H = canvas.height = h; }
    }

    // Raw noise value for line i at x-fraction xf at time ts (-1..1 approx)
    function rawNoise(i, xf, ts) {
      const t1 = ts * lineSpeed[i]  + linePhase[i];
      const t2 = ts * lineSpeed2[i] + linePhase2[i];
      return lineAmpA[i] * Math.sin(xf * lineFreqA[i] + t1)
           + lineAmpB[i] * Math.sin(xf * lineFreqB[i] - t2 * 1.3)
           + lineAmpC[i] * Math.sin(xf * lineFreqC[i] + t1 * 0.7);
    }

    function draw(ts) {
      if (W === 0 || H === 0) { requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, W, H);

      // Max displacement per line — tight enough that lines don't cross neighbours
      // Gap between adjacent lines in pixels
      const gap = H / (TOTAL_LINES + 1);
      // Amplitude capped at 38% of the gap so lines can get close but not cross
      const MAX_AMP = gap * 0.38;

      // Build Y grid first, then clamp to enforce non-crossing
      const grid = new Float32Array(TOTAL_LINES * (STEPS + 1));

      for (let i = 0; i < TOTAL_LINES; i++) {
        const by = baseY[i] * H;
        for (let s = 0; s <= STEPS; s++) {
          const xf = s / STEPS;
          grid[i * (STEPS+1) + s] = by + rawNoise(i, xf * Math.PI * 2, ts) * MAX_AMP;
        }
      }

      // Clamp: each line must stay below the one beneath it
      for (let i = 1; i < TOTAL_LINES; i++) {
        for (let s = 0; s <= STEPS; s++) {
          const prev = grid[(i-1) * (STEPS+1) + s];
          if (grid[i * (STEPS+1) + s] < prev + 1) {
            grid[i * (STEPS+1) + s] = prev + 1;
          }
        }
      }

      // Draw
      for (let i = 0; i < TOTAL_LINES; i++) {
        // Opacity clusters — brighter where lines are denser
        const t_ = baseY[i];
        const density = 0.5 + 0.5 * Math.pow(Math.sin(t_ * Math.PI * 3.0 + 0.4), 2);
        const alpha = 0.07 + density * 0.17;

        ctx.beginPath();
        for (let s = 0; s <= STEPS; s++) {
          const x = (s / STEPS) * W;
          const y = grid[i * (STEPS+1) + s];
          s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${R},${G},${B},${alpha.toFixed(3)})`;
        ctx.lineWidth   = 0.85;
        ctx.lineJoin    = 'round';
        ctx.stroke();
      }

      requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas.parentElement);

    if (document.readyState === 'complete') {
      resize(); requestAnimationFrame(draw);
    } else {
      window.addEventListener('load', () => { resize(); requestAnimationFrame(draw); });
    }
  })();

  // Language system
  const LATAM_COUNTRIES = new Set([
    'AR','BO','BR','CL','CO','CR','CU','DO','EC','GT','HN','MX',
    'NI','PA','PE','PR','PY','SV','UY','VE','GY','SR','BZ'
  ]);

  let currentLang = 'en';

  function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'es' ? 'es' : 'en';

    // Update all data-en / data-es elements
    document.querySelectorAll('[data-en]').forEach(el => {
      const val = el.getAttribute('data-' + lang);
      if (!val) return;
      // Preserve inner HTML for elements that contain tags like <em>
      if (val.includes('<')) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });

    // Handle select options separately
    document.querySelectorAll('select option[data-en]').forEach(opt => {
      opt.textContent = opt.getAttribute('data-' + lang) || opt.getAttribute('data-en');
    });

    // Textarea placeholder
    const ta = document.querySelector('.form-textarea[data-placeholder-en]');
    if (ta) ta.placeholder = ta.getAttribute('data-placeholder-' + lang) || ta.getAttribute('data-placeholder-en');

    // Toggle button label
    const btn = document.getElementById('lang-toggle');
    btn.textContent = lang === 'es' ? 'EN' : 'ES';
    btn.title = lang === 'es' ? 'Switch to English' : 'Cambiar a Español';

    localStorage.setItem('acp-lang', lang);
  }

  async function detectAndSetLang() {
    // Check manual override first
    const saved = localStorage.getItem('acp-lang');
    if (saved) { applyLang(saved); return; }

    try {
      const res  = await fetch('https://ipapi.co/json/');
      const data = await res.json();
      const code = (data.country_code || '').toUpperCase();
      applyLang(LATAM_COUNTRIES.has(code) ? 'es' : 'en');
    } catch {
      applyLang('en'); // fallback
    }
  }

  document.getElementById('lang-toggle').addEventListener('click', () => {
    applyLang(currentLang === 'en' ? 'es' : 'en');
  });

  detectAndSetLang();

  // Dynamic copyright year
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  // Formspree contact form
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mkoenogq';

  document.querySelector('.form-submit').addEventListener('click', async () => {
    const btn = document.querySelector('.form-submit');

    const firstName = document.querySelector('input[placeholder="Ana"]').value.trim();
    const lastName  = document.querySelector('input[placeholder="García"]').value.trim();
    const email     = document.querySelector('input[type="email"]').value.trim();
    const role      = document.querySelector('.form-select').value;
    const message   = document.querySelector('.form-textarea').value.trim();

    if (!firstName || !email || !message) {
      btn.textContent = 'Please fill in required fields';
      btn.style.background = '#8B4A4A';
      setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; }, 2500);
      return;
    }

    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, role, message })
      });

      if (res.ok) {
        btn.textContent = 'Message Sent ✓';
        btn.style.background = '#3D7A6B';
        document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(el => el.value = '');
        setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; btn.disabled = false; }, 3000);
      } else {
        throw new Error('Server error');
      }
    } catch {
      btn.textContent = 'Something went wrong - try again';
      btn.style.background = '#8B4A4A';
      setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; btn.disabled = false; }, 3000);
    }
  });
</script>

</body>
</html>
    function hermite(a,b,c,d,t) {
      const t2=t*t, t3=t2*t;
      return a*(-0.5*t3+t2-0.5*t)+b*(1.5*t3-2.5*t2+1)+c*(-1.5*t3+2*t2+0.5*t)+d*(0.5*t3-0.5*t2);
    }

    function resize() {
      // Key fix: read the *parent* bounding rect after layout, not offsetWidth/Height
      const parent = canvas.parentElement;
      const w = parent.getBoundingClientRect().width  || window.innerWidth;
      const h = parent.getBoundingClientRect().height || window.innerHeight;
      canvas.width  = Math.round(w);
      canvas.height = Math.round(h);
    }

    function spineY(m, xFrac, ts) {
      const seg = xFrac * (m.pts - 1);
      const i   = Math.floor(seg);
      const t   = seg - i;
      const cp  = k => {
        const idx = Math.max(0, Math.min(m.pts-1, k));
        return Math.sin(ts * m.cpSpeeds[idx] + m.cpSeeds[idx]) * 0.5;
      };
      return hermite(cp(i-1), cp(i), cp(i+1), cp(i+2), t);
    }

    function drawMass(m, ts, W, H) {
      const cx = m.cx + Math.sin(ts * m.driftSpeedX + m.driftPhaseX) * 0.025;
      const cy = m.cy + Math.cos(ts * m.driftSpeedY + m.driftPhaseY) * 0.018;

      for (let i = 0; i < m.lines; i++) {
        const level = m.levels[i];
        const widthFrac = Math.sqrt(Math.max(0, 1 - level*level));
        if (widthFrac < 0.08) continue;

        const xLeft  = (cx - m.rx * widthFrac) * W;
        const xRight = (cx + m.rx * widthFrac) * W;
        if (xRight - xLeft < 6) continue;

        ctx.beginPath();
        const steps = 90;
        for (let s = 0; s <= steps; s++) {
          const xf    = s / steps;
          const x     = xLeft + xf * (xRight - xLeft);
          const taper = Math.sin(xf * Math.PI);
          const off   = spineY(m, xf, ts) * m.ry * 0.20 * taper;
          const y     = (cy + level * m.ry + off) * H;
          s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const alpha = Math.max(0.05, 0.34 - Math.abs(level) * 0.28);
        ctx.strokeStyle = `rgba(${R},${G},${B},${alpha.toFixed(3)})`;
        ctx.lineWidth   = 0.85;
        ctx.lineJoin    = "round";
        ctx.stroke();
      }
    }

    function draw(ts) {
      const W = canvas.width, H = canvas.height;
      if (W === 0 || H === 0) { rafRef.current = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, W, H);
      (stateRef.current || []).forEach(m => drawMass(m, ts, W, H));
      rafRef.current = requestAnimationFrame(draw);
    }

    // Wait for full paint before first size read
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas.parentElement);
    resize();
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [initState]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.6, display:"block" }}
    />
  );
}

// ─── Shared primitives ────────────────────────────────────────────────────────
function Eyebrow({ children, light }) {
  return (
    <div style={{
      fontSize:11, fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase",
      color: light ? C.accentLight : C.accent,
      display:"flex", alignItems:"center", gap:12, marginBottom:16,
    }}>
      <span style={{ display:"block", width:24, height:1, background: light ? C.accentLight : C.accent }} />
      {children}
    </div>
  );
}

function SectionTitle({ children, light, style }) {
  return (
    <h2 style={{
      fontFamily:"'Playfair Display', serif", fontWeight:500,
      fontSize:"clamp(28px,3.5vw,40px)", lineHeight:1.2,
      letterSpacing:"-0.01em", marginBottom:20,
      color: light ? C.white : C.slateDark,
      ...style,
    }}>{children}</h2>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ lang, setLang }) {
  const [open,    setOpen]    = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href:"#about",     en:"About",     es:"Nosotros" },
    { href:"#sectors",   en:"Sectors",   es:"Sectores" },
    { href:"#investors", en:"Investors", es:"Inversores" },
    { href:"#team",      en:"Team",      es:"Equipo" },
  ];

  const t = k => lang === "es" ? k.es : k.en;

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:100,
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"0 48px", height:72,
      background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.95)",
      borderBottom:`1px solid ${C.border}`,
      backdropFilter:"blur(8px)",
      transition:"background 0.3s",
    }}>
      <a href="#hero" style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:600, color:C.slateDeep, textDecoration:"none", letterSpacing:"0.02em" }}>
        Arista <span style={{ color:C.accent }}>Capital Partners</span>
      </a>

      {/* Desktop links */}
      <ul style={{ display:"flex", gap:36, listStyle:"none", margin:0, padding:0 }}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} style={{ fontSize:13, fontWeight:400, color:C.textMid, textDecoration:"none", letterSpacing:"0.06em", textTransform:"uppercase" }}>
              {t(l)}
            </a>
          </li>
        ))}
      </ul>

      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={() => setLang(l => l === "en" ? "es" : "en")} style={{
          fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:500,
          letterSpacing:"0.08em", textTransform:"uppercase",
          background:"transparent", border:`1px solid ${C.border}`, color:C.textMid,
          padding:"6px 14px", cursor:"pointer",
        }}>{lang === "en" ? "ES" : "EN"}</button>
        <a href="#contact" style={{
          fontSize:13, fontWeight:500, color:C.slate, textDecoration:"none",
          border:`1px solid ${C.slate}`, padding:"8px 22px", letterSpacing:"0.04em",
        }}>{lang === "es" ? "Contáctanos" : "Get in Touch"}</a>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ lang }) {
  const t = (en, es) => lang === "es" ? es : en;

  const stats = [
    { num:"$700K",  label: t("Search Capital","Capital de Búsqueda") },
    { num:"3–6×",   label: t("EBITDA Entry Multiple","Múltiplo de Entrada EBITDA") },
    { num:"35.1%",  label: t("Median IRR (Stanford)","TIR Mediana (Stanford)") },
  ];

  return (
    <section id="hero" style={{
      minHeight:"100vh", background:C.slateDeep,
      display:"flex", alignItems:"center",
      position:"relative", overflow:"hidden",
      padding:"120px 48px 80px",
    }}>
      {/* Canvas — sits inside a positioned container so ResizeObserver can measure it */}
      <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
        <TopoCanvas />
      </div>

      {/* Orb */}
      <div style={{
        position:"absolute", right:-120, top:"50%", transform:"translateY(-50%)",
        width:600, height:600, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(91,143,168,0.12) 0%, transparent 70%)",
        pointerEvents:"none",
      }} />

      {/* Content */}
      <div style={{ maxWidth:680, position:"relative", zIndex:2 }}>
        <Eyebrow light>{t("Search Fund — Latin America","Search Fund — América Latina")}</Eyebrow>
        <h1 style={{
          fontFamily:"'Playfair Display',serif", fontWeight:500,
          fontSize:"clamp(40px,5vw,62px)", lineHeight:1.15,
          color:C.white, marginBottom:28, letterSpacing:"-0.01em",
        }}>
          {t(<>Acquiring <em style={{fontStyle:"italic",color:C.accentLight}}>exceptional</em> businesses in Colombia</>,
             <>Adquiriendo empresas <em style={{fontStyle:"italic",color:C.accentLight}}>excepcionales</em> en Colombia</>)}
        </h1>
        <p style={{ fontSize:17, fontWeight:300, color:"rgba(255,255,255,0.58)", maxWidth:520, lineHeight:1.75, marginBottom:44 }}>
          {t(
            "Arista Capital Partners is a search fund focused on identifying, acquiring, and operating premier SMEs across Latin America — building enduring value for investors, operators, and the communities we serve.",
            "Arista Capital Partners es un search fund enfocado en identificar, adquirir y operar las mejores pymes de América Latina — generando valor duradero para inversores, operadores y las comunidades que servimos."
          )}
        </p>
        <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
          <a href="#investors" style={{ background:C.accent, color:C.white, fontSize:13, fontWeight:500, letterSpacing:"0.06em", textTransform:"uppercase", padding:"14px 32px", textDecoration:"none" }}>
            {t("Investor Information","Información para Inversores")}
          </a>
          <a href="#about" style={{ background:"transparent", color:"rgba(255,255,255,0.75)", fontSize:13, fontWeight:400, letterSpacing:"0.06em", textTransform:"uppercase", padding:"14px 32px", textDecoration:"none", border:"1px solid rgba(255,255,255,0.22)" }}>
            {t("Our Thesis","Nuestra Tesis")}
          </a>
        </div>
      </div>

      {/* Stats — bottom right */}
      <div style={{
        position:"absolute", right:48, bottom:80, zIndex:2,
        display:"flex", gap:48,
      }}>
        {stats.map((s,i) => (
          <div key={i} style={{
            textAlign:"right",
            borderRight: i < stats.length-1 ? `1px solid rgba(91,143,168,0.35)` : "none",
            paddingRight: i < stats.length-1 ? 24 : 0,
          }}>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:500, color:C.white, display:"block" }}>{s.num}</span>
            <span style={{ fontSize:11, fontWeight:400, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.38)", display:"block", marginTop:4 }}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About({ lang }) {
  const t = (en, es) => lang === "es" ? es : en;
  const pillars = [
    { num:"01", en:["Focused Sector Expertise","Deep sector knowledge across clinical laboratories, engineering services, industrial linen and laundry, heavy equipment rentals, specialty medical practices, and specialty chemicals — resilient industries with strong recurring revenue."], es:["Especialización Sectorial","Conocimiento profundo en laboratorios clínicos, servicios de ingeniería, lavandería industrial, alquiler de maquinaria pesada, consultorios médicos y farmacéutica — industrias resilientes con ingresos recurrentes."] },
    { num:"02", en:["Operational Value Creation","Our edge is operational improvement — bringing rigorous management practices, data-driven decision making, and M&A playbooks to businesses built on strong foundations."], es:["Creación de Valor Operacional","Nuestra ventaja es la mejora operacional — aplicando prácticas de gestión rigurosas, toma de decisiones basada en datos y metodologías de M&A a empresas con bases sólidas."] },
    { num:"03", en:["Aligned Incentives","As operators who invest alongside our investors, our incentives are fully aligned. We take pride in building businesses that create lasting value for all stakeholders."], es:["Incentivos Alineados","Como operadores que invertimos junto a nuestros inversores, nuestros incentivos están completamente alineados. Nos enorgullece construir empresas que generen valor duradero para todos."] },
    { num:"04", en:["Local Advantage","On-the-ground presence in Colombia, deep local networks, and fluency in the regulatory and cultural landscape provide meaningful information and execution advantages."], es:["Ventaja Local","Presencia directa en Colombia, redes locales profundas y dominio del entorno regulatorio y cultural nos proporcionan ventajas informativas y de ejecución significativas."] },
  ];

  return (
    <section id="about" style={{ background:C.bg, display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center", padding:"96px 48px" }}>
      <div>
        <Eyebrow>{t("Our Thesis","Nuestra Tesis")}</Eyebrow>
        <SectionTitle>{t("A disciplined approach to acquiring Colombia's finest operators","Un enfoque disciplinado para adquirir los mejores operadores de Colombia")}</SectionTitle>
        <p style={{ fontSize:16, color:C.textMid, lineHeight:1.8, marginBottom:20 }}>
          {t("Latin America represents one of the most compelling untapped markets for the search fund model. Colombia's growing middle class, improving institutional environment, and fragmented SME landscape create a unique window of opportunity for experienced operators.",
             "América Latina representa uno de los mercados más atractivos y sin explotar para el modelo de search fund. La creciente clase media de Colombia, la mejora del entorno institucional y el fragmentado ecosistema de pymes crean una ventana única de oportunidad.")}
        </p>
        <p style={{ fontSize:16, color:C.textMid, lineHeight:1.8 }}>
          {t("We focus on profitable, established businesses with defensible competitive positions — where skilled ownership can unlock meaningful value creation over a 5–7 year horizon.",
             "Nos enfocamos en empresas rentables y consolidadas con posiciones competitivas defendibles — donde una gestión experta puede desbloquear una creación de valor significativa en un horizonte de 5–7 años.")}
        </p>
      </div>
      <div>
        {pillars.map((p,i) => (
          <div key={i} style={{ padding:"28px 0", borderBottom:`1px solid ${C.border}`, borderTop: i===0 ? `1px solid ${C.border}` : "none", display:"flex", alignItems:"flex-start", gap:24 }}>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:13, color:C.accent, minWidth:28, paddingTop:2 }}>{p.num}</span>
            <div>
              <div style={{ fontSize:15, fontWeight:500, color:C.slateDark, marginBottom:6 }}>{lang==="es"?p.es[0]:p.en[0]}</div>
              <div style={{ fontSize:14, color:C.textMuted, lineHeight:1.65 }}>{lang==="es"?p.es[1]:p.en[1]}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Sectors ──────────────────────────────────────────────────────────────────
function Sectors({ lang }) {
  const t = (en, es) => lang === "es" ? es : en;
  const sectors = [
    { en:["Clinical Laboratories","Diagnostic and testing labs serving healthcare providers and direct patients. Recurring demand, essential services, and strong cash flow dynamics with clear consolidation opportunities."], es:["Laboratorios Clínicos","Laboratorios de diagnóstico al servicio de proveedores de salud y pacientes directos. Demanda recurrente, servicios esenciales y sólida dinámica de flujo de caja."] },
    { en:["Engineering Services","Specialized engineering firms providing technical consulting, project management, and design services across infrastructure and industrial sectors with stable recurring client relationships."], es:["Servicios de Ingeniería","Firmas de ingeniería especializadas que ofrecen consultoría técnica, gestión de proyectos y diseño en sectores de infraestructura e industria."] },
    { en:["Industrial Linen & Laundry","Commercial laundry and linen supply businesses serving hospitality, healthcare, and industrial clients. Predictable revenue, high switching costs, and significant local market fragmentation."], es:["Lavandería Industrial","Empresas de lavandería y suministro de lencería para clientes de hotelería, salud e industria. Ingresos predecibles y alta fragmentación del mercado local."] },
    { en:["Heavy Equipment Rentals","Equipment rental companies serving construction, mining, and infrastructure industries. Asset-backed businesses with strong recurring revenue and meaningful barriers to entry."], es:["Alquiler de Maquinaria Pesada","Empresas de alquiler de equipos para construcción, minería e infraestructura. Negocios respaldados por activos con ingresos recurrentes sólidos."] },
    { en:["Specialty Medical Practices","Focused specialty medical clinics with defensible patient bases, recurring revenue, and professional management upside. Essential healthcare services with strong local market positions."], es:["Consultorios Médicos Especializados","Clínicas médicas especializadas con bases de pacientes defendibles, ingresos recurrentes y potencial de mejora en gestión profesional."] },
    { en:["Specialty Chemicals & Pharma","Niche chemical and pharmaceutical manufacturers with proprietary formulations, regulatory moats, and established customer relationships in industrial and healthcare end markets."], es:["Química Especializada y Farmacéutica","Fabricantes de nicho en química y farmacéutica con formulaciones propias, barreras regulatorias y relaciones consolidadas con clientes."] },
  ];

  return (
    <section id="sectors" style={{ background:C.white, padding:"96px 48px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:60 }}>
        <div>
          <Eyebrow>{t("Target Sectors","Sectores Objetivo")}</Eyebrow>
          <SectionTitle style={{marginBottom:0}}>{t("Where we focus our search","Dónde enfocamos nuestra búsqueda")}</SectionTitle>
        </div>
        <p style={{ fontSize:16, color:C.textMuted, maxWidth:300, lineHeight:1.7 }}>
          {t("Fragmented markets with strong unit economics and a clear path to consolidation.","Mercados fragmentados con sólida economía unitaria y una clara ruta hacia la consolidación.")}
        </p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:C.border, border:`1px solid ${C.border}` }}>
        {sectors.map((s,i) => (
          <div key={i} style={{ background:C.white, padding:"40px 36px", transition:"background 0.2s", cursor:"default" }}
            onMouseEnter={e=>e.currentTarget.style.background=C.accentPale}
            onMouseLeave={e=>e.currentTarget.style.background=C.white}>
            <div style={{ width:40, height:40, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24, fontSize:18, color:C.accent }}>✦</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:500, color:C.slateDark, marginBottom:12 }}>{lang==="es"?s.es[0]:s.en[0]}</div>
            <div style={{ fontSize:14, color:C.textMuted, lineHeight:1.7, marginBottom:20 }}>{lang==="es"?s.es[1]:s.en[1]}</div>
            <span style={{ display:"inline-block", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:C.accent, border:`1px solid rgba(91,143,168,0.35)`, padding:"4px 12px" }}>
              {t("Target Sector","Sector Objetivo")}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Investors ────────────────────────────────────────────────────────────────
function Investors({ lang }) {
  const t = (en, es) => lang === "es" ? es : en;
  const points = [
    { en:["Asymmetric upside","Step-up economics on acquisition provide early investors preferential returns prior to equity participation by the operators."], es:["Potencial asimétrico","La estructura escalonada en la adquisición otorga a los inversores tempranos retornos preferenciales antes de la participación accionaria de los operadores."] },
    { en:["Operator-led model","Principals invest meaningfully alongside investors — full alignment of incentives throughout the search and ownership phases."], es:["Modelo liderado por operadores","Los socios invierten de forma significativa junto a los inversores — alineación total de incentivos durante las fases de búsqueda y propiedad."] },
    { en:["Experienced principals","Operators bring world-class management consulting and M&A backgrounds — rigorous frameworks applied to SME acquisition."], es:["Socios con experiencia","Los operadores aportan trayectorias de consultoría de gestión y M&A de primer nivel — marcos rigurosos aplicados a la adquisición de pymes."] },
    { en:["Underpenetrated market","Latin American search funds remain nascent, creating deal pricing and structural advantages not available in more competitive markets."], es:["Mercado sin explotar","Los search funds en América Latina siguen siendo incipientes, lo que genera ventajas de precio y estructurales no disponibles en mercados más competitivos."] },
  ];
  const terms = [
    { label: t("Structure","Estructura"),          value: t("Traditional Search Fund","Search Fund Tradicional") },
    { label: t("Search Capital","Capital de Búsqueda"), value: "$600K–$700K",  accent:true },
    { label: t("Target Investors","Inversores Objetivo"), value: "~15 investors" },
    { label: t("Check Size","Tamaño de Cheque"),    value: "$40K–$50K" },
    { label: t("Search Period","Período de Búsqueda"), value: t("24 months","24 meses"), accent:true },
    { label: t("Target EBITDA","EBITDA Objetivo"),   value: "$1M–$5M" },
    { label: t("Entry Multiple","Múltiplo de Entrada"), value: "3–6×",         accent:true },
    { label: t("Geography","Geografía"),             value: "Colombia / Chile" },
  ];

  return (
    <section id="investors" style={{ background:C.slateDeep, color:C.white, display:"grid", gridTemplateColumns:"1fr 1fr", gap:96, alignItems:"start", padding:"96px 48px" }}>
      <div>
        <Eyebrow light>{t("For Investors","Para Inversores")}</Eyebrow>
        <SectionTitle light>{t("A differentiated return profile in an emerging market","Un perfil de retorno diferenciado en un mercado emergente")}</SectionTitle>
        <p style={{ fontSize:16, color:"rgba(255,255,255,0.48)", lineHeight:1.7, marginBottom:0 }}>
          {t("The search fund model has generated compelling returns for investors over three decades. Arista Capital Partners applies this proven structure to the Latin American opportunity.",
             "El modelo de search fund ha generado retornos atractivos para inversores durante tres décadas. Arista Capital Partners aplica esta estructura probada a la oportunidad latinoamericana.")}
        </p>
        <div style={{ marginTop:48 }}>
          {points.map((p,i) => (
            <div key={i} style={{ padding:"20px 0", borderBottom:"1px solid rgba(255,255,255,0.08)", borderTop: i===0?"1px solid rgba(255,255,255,0.08)":undefined, display:"flex", gap:20, alignItems:"flex-start" }}>
              <div style={{ width:20, height:20, border:`1px solid ${C.accent}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2, fontSize:11, color:C.accent }}>✓</div>
              <div style={{ fontSize:14, color:"rgba(255,255,255,0.65)", lineHeight:1.65 }}>
                <strong style={{ display:"block", fontSize:15, fontWeight:500, color:C.white, marginBottom:4 }}>{lang==="es"?p.es[0]:p.en[0]}</strong>
                {lang==="es"?p.es[1]:p.en[1]}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", padding:40 }}>
        <div style={{ fontSize:11, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(255,255,255,0.38)", marginBottom:28 }}>{t("Deal Terms","Términos del Acuerdo")}</div>
        {terms.map((row,i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 0", borderBottom: i<terms.length-1?"1px solid rgba(255,255,255,0.07)":undefined }}>
            <span style={{ fontSize:13, color:"rgba(255,255,255,0.42)", letterSpacing:"0.03em" }}>{row.label}</span>
            <span style={{ fontSize:14, fontWeight:500, color: row.accent ? C.accentLight : C.white }}>{row.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Team ─────────────────────────────────────────────────────────────────────
function Team({ lang }) {
  const t = (en, es) => lang === "es" ? es : en;
  const members = [
    {
      init:"L", name:"Louis Abrassard",
      role: t("Co-Founder & Principal","Co-Fundador y Director"),
      bio:  t("Consultant at Bain & Company with M&A and strategy experience across multiple sectors. A Yale graduate who has completed 50+ due diligences, Louis brings deep diligence experience across both the buy side and sell side. Based in Boston, with deep ties to Latin American markets.",
              "Consultor en Bain & Company con experiencia en M&A y estrategia. Graduado de Yale y con más de 50 due diligences completados, Louis aporta una profunda experiencia en procesos de análisis tanto en el lado comprador como vendedor."),
    },
    {
      init:"M", name:"Mateo Morales",
      role: t("Co-Founder & Principal","Co-Fundador y Director"),
      bio:  t("A native Colombian, Mateo brings an extensive network of bankers, advisors, and intermediaries in the region. Provides critical on-the-ground deal sourcing networks, regulatory fluency, and management expertise across the target sectors.",
              "Colombiano de nacimiento, Mateo aporta una extensa red de banqueros, asesores e intermediarios en la región. Ofrece redes críticas de originación de operaciones sobre el terreno, dominio regulatorio y experiencia en gestión en los sectores objetivo."),
    },
  ];

  return (
    <section id="team" style={{ background:C.bg, padding:"96px 48px", textAlign:"center" }}>
      <div style={{ maxWidth:520, margin:"0 auto 64px" }}>
        <Eyebrow>{t("The Team","El Equipo")}</Eyebrow>
        <SectionTitle>{t("Operators first","Operadores ante todo")}</SectionTitle>
        <p style={{ fontSize:16, color:C.textMuted, lineHeight:1.7 }}>
          {t("Two principals combining global consulting credentials with deep on-the-ground expertise in Latin America.",
             "Dos socios que combinan credenciales de consultoría global con un profundo conocimiento sobre el terreno en América Latina.")}
        </p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,380px)", gap:24, justifyContent:"center" }}>
        {members.map((m,i) => (
          <div key={i} style={{ background:C.white, border:`1px solid ${C.border}`, padding:40, textAlign:"left", transition:"box-shadow 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 32px rgba(43,58,74,0.1)"}
            onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
            <div style={{ width:56, height:56, borderRadius:"50%", background:C.slate, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Playfair Display',serif", fontSize:18, color:C.accentLight, fontWeight:500, marginBottom:20 }}>{m.init}</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:500, color:C.slateDark, marginBottom:4 }}>{m.name}</div>
            <div style={{ fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", color:C.accent, marginBottom:16 }}>{m.role}</div>
            <div style={{ fontSize:14, color:C.textMuted, lineHeight:1.7 }}>{m.bio}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact({ lang }) {
  const t = (en, es) => lang === "es" ? es : en;
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", role:"", message:"" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    const res = await fetch("https://formspree.io/f/mkoenogq", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ firstName:form.firstName, lastName:form.lastName, email:form.email, role:form.role, message:form.message }),
    });
    if (res.ok) setSent(true);
  };

  return (
    <section id="contact" style={{ background:C.white, display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start", padding:"96px 48px" }}>
      <div>
        <Eyebrow>{t("Contact","Contacto")}</Eyebrow>
        <SectionTitle>{t("Let's start a conversation","Iniciemos una conversación")}</SectionTitle>
        <p style={{ fontSize:16, color:C.textMuted, lineHeight:1.7 }}>
          {t("Whether you're a potential investor, a business owner considering your next chapter, or an advisor — we'd like to hear from you.",
             "Ya sea que sea un potencial inversor, un empresario considerando su próximo capítulo o un asesor — nos gustaría escucharle.")}
        </p>
        {[
          { label: t("Headquarters","Sede"),                  val:"Boston, MA & Bogotá, Colombia" },
          { label: t("For Investors","Para Inversores"),       val:"investors@aristacapitalpartners.com" },
          { label: t("For Business Owners","Para Empresarios"),val:"acquisitions@aristacapitalpartners.com" },
        ].map((d,i) => (
          <div key={i} style={{ padding:"20px 0", borderBottom:`1px solid ${C.border}`, borderTop: i===0?`1px solid ${C.border}`:undefined, marginTop: i===0?40:0 }}>
            <div style={{ fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", color:C.textMuted, marginBottom:4 }}>{d.label}</div>
            <div style={{ fontSize:15, color:C.slateDark }}>{d.val}</div>
          </div>
        ))}
      </div>
      {sent ? (
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:300, fontSize:18, color:C.accent, fontFamily:"'Playfair Display',serif" }}>
          {t("Thank you — we'll be in touch.","Gracias — nos pondremos en contacto.")}
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            {[{f:"firstName",en:"First Name",es:"Nombre",ph:"Ana"},{f:"lastName",en:"Last Name",es:"Apellido",ph:"García"}].map(({f,en,es,ph}) => (
              <div key={f} style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <label style={{ fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:C.textMuted }}>{t(en,es)}</label>
                <input type="text" placeholder={ph} value={form[f]} onChange={e=>setForm(p=>({...p,[f]:e.target.value}))}
                  style={{ background:C.bg, border:`1px solid ${C.border}`, padding:"12px 16px", fontFamily:"'DM Sans',sans-serif", fontSize:14, color:C.slateDark, outline:"none", width:"100%" }} />
              </div>
            ))}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            <label style={{ fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:C.textMuted }}>Email</label>
            <input type="email" placeholder="ana@example.com" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))}
              style={{ background:C.bg, border:`1px solid ${C.border}`, padding:"12px 16px", fontFamily:"'DM Sans',sans-serif", fontSize:14, color:C.slateDark, outline:"none", width:"100%" }} />
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            <label style={{ fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:C.textMuted }}>{t("I am a","Soy")}</label>
            <select value={form.role} onChange={e=>setForm(p=>({...p,role:e.target.value}))}
              style={{ background:C.bg, border:`1px solid ${C.border}`, padding:"12px 16px", fontFamily:"'DM Sans',sans-serif", fontSize:14, color:C.slateDark, outline:"none", width:"100%", appearance:"none" }}>
              <option value="">{t("Select one...","Seleccione...")}</option>
              <option>{t("Prospective Investor","Inversor Potencial")}</option>
              <option>{t("Business Owner / Seller","Empresario / Vendedor")}</option>
              <option>{t("M&A Advisor / Intermediary","Asesor M&A / Intermediario")}</option>
              <option>{t("Other","Otro")}</option>
            </select>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            <label style={{ fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:C.textMuted }}>{t("Message","Mensaje")}</label>
            <textarea placeholder={t("Tell us about your interest in Arista Capital Partners...","Cuéntenos sobre su interés en Arista Capital Partners...")}
              value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))}
              rows={5} style={{ background:C.bg, border:`1px solid ${C.border}`, padding:"12px 16px", fontFamily:"'DM Sans',sans-serif", fontSize:14, color:C.slateDark, outline:"none", width:"100%", resize:"vertical" }} />
          </div>
          <button onClick={handleSubmit} style={{ background:C.slate, color:C.white, border:"none", padding:"14px 32px", fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer", alignSelf:"flex-start", marginTop:8 }}>
            {t("Send Message","Enviar Mensaje")}
          </button>
        </div>
      )}
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ lang }) {
  const t = (en, es) => lang === "es" ? es : en;
  return (
    <footer style={{ background:C.slateDeep, padding:"40px 48px", display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:`1px solid rgba(91,143,168,0.2)` }}>
      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:600, color:C.white }}>
        Arista <span style={{ color:C.accentLight }}>Capital Partners</span>
      </div>
      <div style={{ fontSize:12, color:"rgba(255,255,255,0.28)", letterSpacing:"0.04em" }}>
        © {new Date().getFullYear()} Arista Capital Partners · Boston, MA & Bogotá, Colombia
      </div>
      <div style={{ fontSize:12, color:"rgba(255,255,255,0.28)", letterSpacing:"0.04em" }}>
        {t("Confidential — Not an offer to sell securities","Confidencial — No constituye una oferta de venta de valores")}
      </div>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("en");

  // Detect LATAM IP on mount
  useEffect(() => {
    const LATAM = new Set(["AR","BO","BR","CL","CO","CR","CU","DO","EC","GT","HN","MX","NI","PA","PE","PR","PY","SV","UY","VE","GY","SR","BZ"]);
    const saved = localStorage.getItem("arista_lang");
    if (saved) { setLang(saved); return; }
    fetch("https://ipapi.co/json/").then(r=>r.json()).then(d=>{ if(LATAM.has(d.country_code)) setLang("es"); }).catch(()=>{});
  }, []);

  const handleSetLang = (fn) => {
    setLang(l => {
      const next = typeof fn === "function" ? fn(l) : fn;
      localStorage.setItem("arista_lang", next);
      return next;
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { font-family:'DM Sans',sans-serif; background:#fff; color:${C.textDark}; font-size:16px; line-height:1.6; overflow-x:hidden; }
        a { transition:color 0.2s; }
        a:hover { color:${C.accent}; }
        nav a:hover { color:${C.accent}; }
        input:focus, select:focus, textarea:focus { border-color:${C.accent} !important; }
        button { transition:background 0.2s; }
        button:hover { opacity:0.88; }
      `}</style>
      <Nav lang={lang} setLang={handleSetLang} />
      <Hero lang={lang} />
      <About lang={lang} />
      <Sectors lang={lang} />
      <Investors lang={lang} />
      <Team lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
    </>
  );
}
