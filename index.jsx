import { useState, useEffect, useRef, useCallback } from "react";

// ─── Brand tokens ────────────────────────────────────────────────────────────
const C = {
  slateDeep:   "#111E2B",
  slateDark:   "#1C2A38",
  slateMid:    "#3D5068",
  slate:       "#2B3A4A",
  accent:      "#5B8FA8",
  accentLight: "#7AAEC4",
  accentPale:  "#D6E8F0",
  bg:          "#F4F6F8",
  white:       "#FFFFFF",
  textDark:    "#1C2A38",
  textMid:     "#3D5068",
  textMuted:   "#6B7E90",
  border:      "rgba(43,58,74,0.13)",
};

// ─── Topographic canvas ───────────────────────────────────────────────────────
function TopoCanvas() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const stateRef  = useRef(null);

  const initState = useCallback(() => {
    function makeGaps(n) {
      const g = [];
      for (let i = 0; i < n - 1; i++) {
        const pos = i / (n - 1);
        const t = 0.3 + 0.7 * (
          Math.abs(Math.sin(pos * Math.PI * 2.3 + 0.8)) *
          Math.abs(Math.sin(pos * Math.PI * 1.1 + 0.3))
        );
        g.push(t);
      }
      return g;
    }

    const MASSES = [
      { cx:0.70, cy:0.36, rx:0.28, ry:0.21, lines:30, pts:8, driftSpeedX:0.000011, driftSpeedY:0.000008, driftPhaseX:0.0,  driftPhaseY:1.4 },
      { cx:0.28, cy:0.65, rx:0.26, ry:0.19, lines:26, pts:7, driftSpeedX:0.000009, driftSpeedY:0.000012, driftPhaseX:2.1,  driftPhaseY:0.6 },
    ];

    MASSES.forEach(m => {
      const np = m.pts + 3;
      m.cpSeeds  = Array.from({length:np}, () => Math.random() * 6.28);
      m.cpSpeeds = Array.from({length:np}, () => Math.random() * 0.00018 + 0.00008);
      const gaps  = makeGaps(m.lines);
      const total = gaps.reduce((s,v) => s+v, 0);
      m.levels = [0];
      let acc = 0;
      for (let i = 0; i < gaps.length; i++) { acc += gaps[i]/total; m.levels.push(acc); }
      m.levels = m.levels.map(v => v * 2 - 1);
    });

    stateRef.current = MASSES;
  }, []);

  useEffect(() => {
    initState();
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const R=91, G=143, B=168;

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
