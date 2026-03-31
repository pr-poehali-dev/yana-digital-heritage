import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

/* ── image assets ── */
const IMG_HERO       = "https://cdn.poehali.dev/projects/0e86868c-e374-43ab-90f3-136671219025/files/8c59621d-aa26-419b-9b79-ccd0c4912556.jpg";
const IMG_COLLECTION = "https://cdn.poehali.dev/projects/0e86868c-e374-43ab-90f3-136671219025/files/1cfd7b8e-f3f8-46b0-8c2f-ff2ae2e4f0bf.jpg";
const IMG_LOOKBOOK   = "https://cdn.poehali.dev/projects/0e86868c-e374-43ab-90f3-136671219025/files/c05d001c-c918-4f24-bb32-1f7a40d21905.jpg";

/* ── YANA logotype SVG ── */
const YanaLogo = ({ size = 36, dark = true }: { size?: number; dark?: boolean }) => {
  const c = dark ? "#111009" : "#F8F5F0";
  const g = "#9C7A3C";
  return (
    <svg width={size * 3.6} height={size} viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ornamental diamond mark */}
      <polygon points="25,4 34,25 25,46 16,25" stroke={g} strokeWidth="1.2" fill="none"/>
      <polygon points="25,10 30,25 25,40 20,25" stroke={g} strokeWidth="0.7" fill="none"/>
      <circle cx="25" cy="25" r="3" fill={g} opacity="0.7"/>
      <circle cx="25" cy="4"  r="1.5" fill={g} opacity="0.5"/>
      <circle cx="25" cy="46" r="1.5" fill={g} opacity="0.5"/>
      {/* Pixel dots */}
      <rect x="22" y="1"  width="6" height="2" fill={g} opacity="0.3"/>
      <rect x="22" y="47" width="6" height="2" fill={g} opacity="0.3"/>
      {/* Wordmark: YANA */}
      <text x="44" y="35" fontFamily="'Cormorant Garamond', serif" fontWeight="300"
        fontSize="32" letterSpacing="6" fill={c}>YANA</text>
      {/* Tagline */}
      <text x="45" y="46" fontFamily="'IBM Plex Mono', monospace"
        fontSize="6" letterSpacing="3.5" fill={c} opacity="0.38">NEW CODE · OLD ROOTS</text>
    </svg>
  );
};

/* ── Small mark for mobile / favicon use ── */
const YanaMark = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <polygon points="14,2 22,14 14,26 6,14" stroke="#9C7A3C" strokeWidth="1.4" fill="none"/>
    <polygon points="14,7 19,14 14,21 9,14" stroke="#9C7A3C" strokeWidth="0.8" fill="none"/>
    <circle cx="14" cy="14" r="2.5" fill="#9C7A3C" opacity="0.7"/>
  </svg>
);

/* ── Ornament (decorative, used sparingly) ── */
const Orn = ({ size = 80, op = 0.1, spin = false }: { size?: number; op?: number; spin?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none"
    style={{ opacity: op, animation: spin ? "slowZoom 20s ease-in-out infinite alternate" : undefined }}>
    <polygon points="40,3 77,40 40,77 3,40" stroke="#9C7A3C" strokeWidth="0.8" fill="none"/>
    <polygon points="40,12 68,40 40,68 12,40" stroke="#9C7A3C" strokeWidth="0.5" fill="none"/>
    <polygon points="40,22 58,40 40,58 22,40" stroke="#C4A86A" strokeWidth="0.4" fill="none"/>
    <circle cx="40" cy="40" r="5" stroke="#9C7A3C" strokeWidth="0.6" fill="none"/>
    <circle cx="40" cy="40" r="2" fill="#9C7A3C" opacity="0.5"/>
    <circle cx="40" cy="3"  r="1.5" fill="#C4A86A" opacity="0.6"/>
    <circle cx="77" cy="40" r="1.5" fill="#C4A86A" opacity="0.6"/>
    <circle cx="40" cy="77" r="1.5" fill="#C4A86A" opacity="0.6"/>
    <circle cx="3"  cy="40" r="1.5" fill="#C4A86A" opacity="0.6"/>
  </svg>
);

/* ── data ── */
const NAV_ITEMS = ["коллекции", "о бренде", "галерея", "манифест", "контакты"] as const;
type NavKey = typeof NAV_ITEMS[number] | "главная";

const PRODUCTS = [
  { id:1, name:"Архив",    sub:"001",  price:"8 900",  tag:"НОВИНКА", desc:"Оверсайз-худи с тюбетеичным орнаментом на спине. 100% органический хлопок.", sizes:["XS","S","M","L","XL"],      color:"Молочный" },
  { id:2, name:"Код",      sub:"002",  price:"16 500", tag:"ЛИМИТ",   desc:"Бомбер с вышивкой пиксель-арт. Японский нейлон, французская подкладка.",      sizes:["S","M","L"],              color:"Антрацит" },
  { id:3, name:"Корни",    sub:"003",  price:"7 200",  tag:null,      desc:"Туника свободного кроя. Льняная смесь, геометрический орнамент тюбетейки.",    sizes:["XS","S","M","L","XL","2XL"], color:"Песок" },
  { id:4, name:"Степь",    sub:"004",  price:"9 800",  tag:"НОВИНКА", desc:"Широкие брюки с боковым кипчакским орнаментом. Высокая посадка.",             sizes:["XS","S","M","L"],         color:"Терракот" },
  { id:5, name:"Цифра",    sub:"005",  price:"5 400",  tag:null,      desc:"Лонгслив с принтом тюбетейки через цифровой фильтр. Мерсеризованный хлопок.", sizes:["S","M","L","XL"],          color:"Белый" },
  { id:6, name:"Манифест", sub:"006",  price:"21 000", tag:"ЛИМИТ",   desc:"Двусторонняя ветровка. Один слой — орнамент, второй — ASCII-данные.",         sizes:["S","M","L"],              color:"Чёрный/Бежевый" },
];

const TICKER = ["YANA — SS 2025", "New Code. Old Roots.", "Digital Tubeteism", "Казань · Москва", "Free Shipping from 8 000 ₽", "YANA — SS 2025", "New Code. Old Roots.", "Digital Tubeteism", "Казань · Москва", "Free Shipping from 8 000 ₽"];

export default function Index() {
  const [active, setActive]   = useState<NavKey>("главная");
  const [cartOpen, setCartOpen]   = useState(false);
  const [cart, setCart]           = useState<typeof PRODUCTS[0][]>([]);
  const [mobile, setMobile]       = useState(false);
  const [picked, setPicked]       = useState<typeof PRODUCTS[0] | null>(null);
  const [pickedSize, setPickedSize] = useState<string>("");
  const [ready, setReady]         = useState(false);

  const refs: Record<NavKey, React.RefObject<HTMLDivElement>> = {
    "главная":    useRef(null),
    "коллекции":  useRef(null),
    "о бренде":   useRef(null),
    "галерея":    useRef(null),
    "манифест":   useRef(null),
    "контакты":   useRef(null),
  };

  useEffect(() => { setTimeout(() => setReady(true), 80); }, []);

  const go = (k: NavKey) => {
    setActive(k);
    setMobile(false);
    refs[k]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const addToCart = () => {
    if (!picked) return;
    setCart(p => [...p, picked]);
    setPicked(null);
    setPickedSize("");
  };

  const total = cart.reduce((s, i) => s + parseInt(i.price.replace(/\s/g, "")), 0);

  return (
    <div style={{ background:"var(--f-warm)", color:"var(--f-black)", minHeight:"100vh" }}>

      {/* ══ TOP TICKER ══ */}
      <div style={{ background:"var(--f-black)", color:"var(--f-warm)", height:"32px", display:"flex", alignItems:"center", overflow:"hidden" }}>
        <div className="marquee-track">
          {TICKER.map((t, i) => (
            <span key={i} className="f-label" style={{ fontSize:"9px", color:"var(--f-warm)", opacity:0.8, padding:"0 32px" }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ══ NAVBAR ══ */}
      <nav className="nav-bar sticky top-0 z-50">
        <div style={{ maxWidth:1340, margin:"0 auto", padding:"0 32px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>

          {/* Logo */}
          <button onClick={() => go("главная")} style={{ background:"none", border:"none", cursor:"pointer", padding:0, lineHeight:0 }}>
            <YanaLogo size={30} dark />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex" style={{ gap:36 }}>
            {NAV_ITEMS.map(k => (
              <button key={k} className={`nav-item ${active === k ? "active" : ""}`} onClick={() => go(k)}>{k}</button>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display:"flex", alignItems:"center", gap:20 }}>
            <button onClick={() => setCartOpen(true)} style={{ background:"none", border:"none", cursor:"pointer", position:"relative", display:"flex", alignItems:"center", color:"var(--f-mid)" }}>
              <Icon name="ShoppingBag" size={18} />
              {cart.length > 0 && (
                <span style={{ position:"absolute", top:-6, right:-7, background:"var(--f-black)", color:"var(--f-warm)", borderRadius:"50%", width:15, height:15, fontSize:8, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"IBM Plex Mono" }}>
                  {cart.length}
                </span>
              )}
            </button>
            <button className="md:hidden nav-item" onClick={() => setMobile(!mobile)} style={{ color:"var(--f-mid)" }}>
              <Icon name={mobile ? "X" : "Menu"} size={18} />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobile && (
          <div style={{ borderTop:"1px solid var(--f-border)", background:"var(--f-warm)", padding:"24px 32px", display:"flex", flexDirection:"column", gap:20 }}>
            {NAV_ITEMS.map(k => (
              <button key={k} className={`nav-item ${active === k ? "active" : ""}`} style={{ textAlign:"left" }} onClick={() => go(k)}>{k}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ══ HERO ══ */}
      <section ref={refs["главная"]} style={{ position:"relative", height:"92vh", minHeight:560, overflow:"hidden", background:"var(--f-sand)" }}>

        {/* Full-bleed image */}
        <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
          <img src={IMG_HERO} alt="YANA SS2025" className="hero-img"
            style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", filter:"sepia(8%) contrast(1.04)" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(17,16,9,0.62) 0%, rgba(17,16,9,0.1) 55%, transparent 100%)" }} />
        </div>

        {/* Content */}
        <div style={{ position:"relative", maxWidth:1340, margin:"0 auto", padding:"0 32px", height:"100%", display:"flex", flexDirection:"column", justifyContent:"flex-end", paddingBottom:64 }}>
          {ready && <>
            <span className="f-label anim-up d1" style={{ color:"var(--f-gold2)", fontSize:10, marginBottom:20 }}>
              SS 2025 — Цифровой Тюбетеизм
            </span>
            <h1 style={{ margin:0 }}>
              <span className="f-display anim-up d2" style={{ display:"block", fontSize:"clamp(56px,8vw,110px)", color:"var(--f-warm)" }}>New Code.</span>
              <span className="f-display-italic anim-up d3" style={{ display:"block", fontSize:"clamp(56px,8vw,110px)", color:"var(--f-gold2)" }}>Old Roots.</span>
            </h1>
            <p className="f-caption anim-up d4" style={{ color:"rgba(248,245,240,0.65)", fontSize:17, maxWidth:380, marginTop:20, marginBottom:36 }}>
              Одежда для тех, кто живёт в ритме мегаполиса и помнит, откуда он.
            </p>
            <div className="anim-up d5" style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
              <button className="btn-primary" onClick={() => go("коллекции")}>Смотреть коллекцию</button>
              <button className="btn-outline" style={{ borderColor:"rgba(248,245,240,0.35)", color:"var(--f-warm)" }} onClick={() => go("манифест")}>
                Манифест бренда
              </button>
            </div>
          </>}
        </div>

        {/* Scroll hint */}
        <div style={{ position:"absolute", bottom:24, right:40, display:"flex", flexDirection:"column", alignItems:"center", gap:6, opacity:0.35 }}>
          <span className="f-label" style={{ fontSize:8, color:"var(--f-warm)", writingMode:"vertical-rl" }}>SCROLL</span>
          <Icon name="ArrowDown" size={12} style={{ color:"var(--f-warm)" }} />
        </div>
      </section>

      {/* ══ STRIP STATS ══ */}
      <div style={{ background:"var(--f-cream)", borderBottom:"1px solid var(--f-border)" }}>
        <div style={{ maxWidth:1340, margin:"0 auto", padding:"28px 32px", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:0 }}>
          {[
            { n:"47",    l:"предметов\nв коллекции" },
            { n:"2025",  l:"год\nоснования" },
            { n:"∞",     l:"орнаментов\nв ДНК" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign:"center", padding:"0 16px", borderRight: i < 2 ? "1px solid var(--f-border)" : "none" }}>
              <div className="f-display-italic" style={{ fontSize:36, color:"var(--f-gold)" }}>{s.n}</div>
              <div className="f-label" style={{ fontSize:9, color:"var(--f-mid)", whiteSpace:"pre-line", lineHeight:1.6, marginTop:4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ COLLECTIONS ══ */}
      <section ref={refs["коллекции"]} style={{ maxWidth:1340, margin:"0 auto", padding:"80px 32px" }}>

        {/* Section header */}
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:48, flexWrap:"wrap", gap:20 }}>
          <div>
            <span className="f-label" style={{ color:"var(--f-gold)", display:"block", marginBottom:12 }}>001 — Коллекции</span>
            <h2 className="f-display" style={{ fontSize:"clamp(36px,5vw,64px)", margin:0 }}>
              Цифровой <span className="f-display-italic" style={{ color:"var(--f-gold)" }}>Тюбетеизм</span>
            </h2>
          </div>
          <p className="f-caption" style={{ color:"var(--f-mid)", maxWidth:300, fontSize:16 }}>
            Каждая вещь — диалог между пикселем и орнаментом.
          </p>
        </div>

        {/* Product grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:2 }}>
          {PRODUCTS.map((p, i) => (
            <div key={p.id} className="product-card" onClick={() => { setPicked(p); setPickedSize(""); }}
              style={{ background:"var(--f-cream)", border:"1px solid var(--f-border)" }}>

              {/* Image */}
              <div className="card-img" style={{ height:340, background:"var(--f-sand)", position:"relative" }}>
                <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Orn size={120} op={0.18 + (i % 3) * 0.05} />
                </div>
                {/* overlay gradient */}
                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"40%", background:"linear-gradient(to top, var(--f-sand), transparent)" }} />
                {/* tag */}
                {p.tag && (
                  <div className="f-label" style={{
                    position:"absolute", top:14, left:14,
                    background: p.tag === "ЛИМИТ" ? "var(--f-black)" : "var(--f-gold)",
                    color:"var(--f-warm)", fontSize:8, padding:"4px 10px"
                  }}>{p.tag}</div>
                )}
                {/* quick add */}
                <div style={{ position:"absolute", bottom:14, right:14, opacity:0, transition:"opacity 0.3s" }}
                  className="product-card-add">
                  <Icon name="Plus" size={16} style={{ color:"var(--f-black)" }} />
                </div>
              </div>

              {/* Info */}
              <div style={{ padding:"18px 20px 22px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:6 }}>
                  <div>
                    <span className="f-heading" style={{ fontSize:17 }}>{p.name}</span>
                    <span className="f-label" style={{ color:"var(--f-mid)", marginLeft:8, fontSize:9 }}>/ {p.sub}</span>
                  </div>
                  <span className="f-display-italic" style={{ fontSize:18, color:"var(--f-gold)" }}>{p.price} ₽</span>
                </div>
                <p className="f-body" style={{ fontSize:12, color:"var(--f-mid)", margin:"0 0 12px" }}>{p.desc}</p>
                <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                  {p.sizes.map(s => (
                    <span key={s} className="f-label" style={{
                      fontSize:8, padding:"3px 7px",
                      border:"1px solid var(--f-border)", color:"var(--f-mid)"
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section ref={refs["о бренде"]} style={{ background:"var(--f-cream)", borderTop:"1px solid var(--f-border)", borderBottom:"1px solid var(--f-border)" }}>
        <div style={{ maxWidth:1340, margin:"0 auto", padding:"80px 32px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>

          {/* Image */}
          <div style={{ position:"relative" }}>
            <div style={{ height:560, overflow:"hidden" }}>
              <img src={IMG_COLLECTION} alt="О бренде"
                style={{ width:"100%", height:"100%", objectFit:"cover", filter:"sepia(10%)", display:"block" }} />
            </div>
            {/* Floating ornament */}
            <div style={{ position:"absolute", bottom:-20, right:-20, background:"var(--f-warm)", border:"1px solid var(--f-border)", padding:20 }}>
              <Orn size={72} op={0.5} />
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="f-label" style={{ color:"var(--f-gold)", display:"block", marginBottom:16 }}>002 — О бренде</span>
            <h2 className="f-display" style={{ fontSize:"clamp(34px,4vw,58px)", margin:"0 0 10px" }}>Знаю, кто я.</h2>
            <h2 className="f-display-italic" style={{ fontSize:"clamp(34px,4vw,58px)", color:"var(--f-gold)", margin:"0 0 32px" }}>Создаю завтра.</h2>

            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {[
                "YANA — не просто бренд одежды. Это платформа для тех, кто вырос между двумя мирами: традиционной культурой и цифровым будущим.",
                "Каждый орнамент — это код. Национальный узор, переосмысленный через пиксель-арт и 3D-графику, становится новым языком идентичности.",
                "Татарский тюбетей встречается с Japanese streetwear. Кипчакский орнамент рифмуется с circuit board. Степь и сервер — одно целое.",
              ].map((t, i) => (
                <p key={i} className="f-caption" style={{ fontSize:16, color:"var(--f-mid)", margin:0 }}>{t}</p>
              ))}
            </div>

            <hr className="rule-gold" style={{ margin:"36px 0" }} />

            <div style={{ display:"flex", gap:12 }}>
              <button className="btn-primary" onClick={() => go("коллекции")}>Смотреть коллекцию</button>
              <button className="btn-outline" onClick={() => go("манифест")}>Читать манифест</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ GALLERY ══ */}
      <section ref={refs["галерея"]} style={{ maxWidth:1340, margin:"0 auto", padding:"80px 32px" }}>
        <span className="f-label" style={{ color:"var(--f-gold)", display:"block", marginBottom:16 }}>003 — Галерея</span>
        <h2 className="f-display" style={{ fontSize:"clamp(32px,4.5vw,60px)", margin:"0 0 48px" }}>
          Визуальный <span className="f-display-italic" style={{ color:"var(--f-gold)" }}>архив</span>
        </h2>

        {/* Mosaic grid */}
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gridTemplateRows:"260px 260px", gap:4 }}>

          {/* Big tile */}
          <div style={{ gridRow:"1/3", overflow:"hidden", position:"relative", background:"var(--f-sand)" }}>
            <img src={IMG_HERO} alt="Campaign" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", filter:"sepia(10%)", display:"block", transition:"transform 0.7s", }} className="gallery-img" />
            <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"20px 24px", background:"linear-gradient(to top, rgba(17,16,9,0.7), transparent)" }}>
              <span className="f-label" style={{ color:"var(--f-warm)", opacity:0.6, fontSize:9 }}>Кампания 2025</span>
              <p className="f-display-italic" style={{ fontSize:22, color:"var(--f-warm)", margin:"4px 0 0" }}>New Code. Old Roots.</p>
            </div>
          </div>

          {/* Small tiles */}
          {[
            { src:IMG_LOOKBOOK, label:"SS26 Лукбук" },
            { src:IMG_COLLECTION, label:"Детали орнамента" },
          ].map((tile, i) => (
            <div key={i} style={{ overflow:"hidden", position:"relative", background:"var(--f-cream)" }}>
              <img src={tile.src} alt={tile.label} style={{ width:"100%", height:"100%", objectFit:"cover", filter:"sepia(8%)", display:"block", transition:"transform 0.7s" }} />
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"12px 16px", background:"linear-gradient(to top, rgba(17,16,9,0.55), transparent)" }}>
                <span className="f-label" style={{ color:"var(--f-warm)", opacity:0.7, fontSize:9 }}>{tile.label}</span>
              </div>
            </div>
          ))}

          {/* Ornament tiles */}
          {[
            { bg:"var(--f-sand)", label:"Текстуры" },
            { bg:"var(--f-cream)", label:"Архив паттернов" },
          ].map((tile, i) => (
            <div key={i} style={{ position:"relative", background:tile.bg, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", border:"1px solid var(--f-border)" }}>
              <Orn size={100} op={0.25} spin />
              <div style={{ position:"absolute", bottom:12, left:16 }}>
                <span className="f-caption" style={{ color:"var(--f-mid)", fontSize:13 }}>{tile.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ MANIFESTO ══ */}
      <section ref={refs["манифест"]} style={{ background:"var(--f-black)", color:"var(--f-warm)" }}>
        <div style={{ maxWidth:900, margin:"0 auto", padding:"100px 32px", textAlign:"center" }}>
          <span className="f-label" style={{ color:"var(--f-gold2)", display:"block", marginBottom:24, opacity:0.7 }}>004 — Манифест</span>
          <h2 className="f-display-italic" style={{ fontSize:"clamp(40px,6vw,80px)", color:"var(--f-gold2)", margin:"0 0 16px" }}>Я знаю,</h2>
          <h2 className="f-display" style={{ fontSize:"clamp(40px,6vw,80px)", color:"var(--f-warm)", margin:"0 0 64px" }}>кто я.</h2>

          <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
            {[
              { n:"I",   t:"Корни — это не прошлое",          b:"Национальная культура — не музей. Это живой код, который можно переписать для нового мира. Орнамент — алгоритм, созданный поколениями." },
              { n:"II",  t:"Тело — это манифест",             b:"Одежда — первое высказывание. То, что ты носишь — заявление о том, кто ты и откуда. YANA — для тех, кто делает это сознательно." },
              { n:"III", t:"Будущее строят те, кто помнит",   b:"Настоящие инноваторы не отрезают себя от корней. Они компилируют прошлое в будущее. Мы создаём новый код на основе старых данных." },
            ].map((item, i) => (
              <div key={i} style={{
                display:"grid", gridTemplateColumns:"48px 1fr",
                gap:28, padding:"36px 40px", textAlign:"left",
                background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent",
                borderTop:"1px solid rgba(255,255,255,0.06)"
              }}>
                <span className="f-display-italic" style={{ fontSize:40, color:"var(--f-gold2)", opacity:0.35, lineHeight:1, paddingTop:4 }}>{item.n}</span>
                <div>
                  <h3 className="f-heading" style={{ fontSize:20, color:"var(--f-warm)", marginBottom:10 }}>{item.t}</h3>
                  <p className="f-caption" style={{ fontSize:16, color:"rgba(248,245,240,0.5)", margin:0 }}>{item.b}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop:64, display:"flex", justifyContent:"center" }}>
            <button className="btn-primary" style={{ borderColor:"var(--f-gold)", background:"var(--f-gold)", color:"var(--f-black)" }}
              onClick={() => go("коллекции")}>
              Смотреть коллекцию
            </button>
          </div>
        </div>
      </section>

      {/* ══ CONTACTS ══ */}
      <section ref={refs["контакты"]} style={{ maxWidth:1340, margin:"0 auto", padding:"80px 32px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"start" }}>

          <div>
            <span className="f-label" style={{ color:"var(--f-gold)", display:"block", marginBottom:16 }}>005 — Контакты</span>
            <h2 className="f-display" style={{ fontSize:"clamp(32px,4vw,56px)", margin:"0 0 8px" }}>Свяжитесь</h2>
            <h2 className="f-display-italic" style={{ fontSize:"clamp(32px,4vw,56px)", color:"var(--f-gold)", margin:"0 0 32px" }}>с нами</h2>

            <p className="f-caption" style={{ fontSize:16, color:"var(--f-mid)", maxWidth:340, marginBottom:40 }}>
              Коллаборации, оптовые заявки, пресс-запросы — мы всегда открыты к разговору.
            </p>

            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              {[
                { icon:"Mail",    l:"Email",     v:"hello@yana-brand.com" },
                { icon:"Instagram", l:"Instagram", v:"@yana.brand" },
                { icon:"MapPin",  l:"Город",     v:"Казань / Москва" },
              ].map(item => (
                <div key={item.l} style={{ display:"flex", alignItems:"center", gap:16 }}>
                  <div style={{
                    width:40, height:40, border:"1px solid var(--f-border)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    background:"var(--f-cream)", flexShrink:0
                  }}>
                    <Icon name={item.icon as "Mail"} size={14} style={{ color:"var(--f-gold)" }} />
                  </div>
                  <div>
                    <div className="f-label" style={{ fontSize:9, color:"var(--f-mid)", opacity:0.5, marginBottom:2 }}>{item.l}</div>
                    <div className="f-body" style={{ fontSize:14 }}>{item.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ background:"var(--f-cream)", border:"1px solid var(--f-border)", padding:40 }}>
            <h3 className="f-heading" style={{ fontSize:22, marginBottom:4 }}>Оставить заявку</h3>
            <p className="f-caption" style={{ color:"var(--f-mid)", marginBottom:28 }}>Ответим в течение суток</p>

            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {[
                { l:"Имя", t:"text", ph:"Ваше имя" },
                { l:"Email", t:"email", ph:"your@email.com" },
              ].map(f => (
                <div key={f.l}>
                  <label className="f-label" style={{ fontSize:9, color:"var(--f-mid)", opacity:0.55, display:"block", marginBottom:6 }}>{f.l}</label>
                  <input type={f.t} placeholder={f.ph} style={{
                    width:"100%", background:"transparent",
                    border:"1px solid var(--f-border)", padding:"11px 14px",
                    fontFamily:"IBM Plex Sans", fontSize:13, color:"var(--f-black)", outline:"none",
                    transition:"border-color 0.25s"
                  }}
                    onFocus={e => (e.target.style.borderColor="var(--f-black)")}
                    onBlur={e => (e.target.style.borderColor="var(--f-border)")} />
                </div>
              ))}
              <div>
                <label className="f-label" style={{ fontSize:9, color:"var(--f-mid)", opacity:0.55, display:"block", marginBottom:6 }}>Сообщение</label>
                <textarea rows={4} placeholder="Расскажите о вашем запросе..." style={{
                  width:"100%", background:"transparent",
                  border:"1px solid var(--f-border)", padding:"11px 14px", resize:"none",
                  fontFamily:"IBM Plex Sans", fontSize:13, color:"var(--f-black)", outline:"none",
                  transition:"border-color 0.25s"
                }}
                  onFocus={e => (e.target.style.borderColor="var(--f-black)")}
                  onBlur={e => (e.target.style.borderColor="var(--f-border)")} />
              </div>
              <button className="btn-primary">Отправить</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background:"var(--f-black)", color:"var(--f-warm)", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        {/* Logo row */}
        <div style={{ maxWidth:1340, margin:"0 auto", padding:"48px 32px 24px", display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
          <YanaLogo size={28} dark={false} />
          <hr className="rule-gold" style={{ width:"100%", maxWidth:400, margin:"8px 0" }} />
        </div>
        {/* Links */}
        <div style={{ maxWidth:1340, margin:"0 auto", padding:"0 32px 40px", display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:16 }}>
          <span className="f-label" style={{ fontSize:9, color:"rgba(248,245,240,0.25)" }}>© YANA 2025. Все права защищены.</span>
          <div style={{ display:"flex", gap:28 }}>
            {["Политика конфиденциальности", "Доставка и возврат", "О бренде"].map(l => (
              <button key={l} className="f-label link-hover" style={{ fontSize:9, color:"rgba(248,245,240,0.3)", background:"none", border:"none", cursor:"pointer" }}>{l}</button>
            ))}
          </div>
          <div style={{ display:"flex", gap:16 }}>
            {[
              { icon:"Instagram", label:"IG" },
              { icon:"Send", label:"TG" },
            ].map(s => (
              <button key={s.label} style={{ background:"none", border:"1px solid rgba(255,255,255,0.12)", width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(248,245,240,0.4)", transition:"border-color 0.25s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor="rgba(196,168,106,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor="rgba(255,255,255,0.12)")}>
                <Icon name={s.icon as "Instagram"} size={13} />
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* ══ PRODUCT MODAL ══ */}
      {picked && (
        <div style={{ position:"fixed", inset:0, zIndex:60, display:"flex", alignItems:"flex-end", justifyContent:"center", padding:"0 0 0 0", background:"rgba(17,16,9,0.55)", backdropFilter:"blur(6px)" }}
          onClick={() => setPicked(null)}>
          <div style={{ width:"100%", maxWidth:540, background:"var(--f-warm)", borderTop:"1px solid var(--f-border)", padding:"40px 40px 48px" }}
            className="anim-up" onClick={e => e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
              <div>
                <div style={{ display:"flex", alignItems:"baseline", gap:10 }}>
                  <h3 className="f-heading" style={{ fontSize:26, margin:0 }}>{picked.name}</h3>
                  <span className="f-label" style={{ fontSize:9, color:"var(--f-mid)" }}>/ {picked.sub}</span>
                </div>
                <span className="f-display-italic" style={{ fontSize:22, color:"var(--f-gold)" }}>{picked.price} ₽</span>
              </div>
              <button onClick={() => setPicked(null)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--f-mid)", marginTop:4 }}>
                <Icon name="X" size={18} />
              </button>
            </div>

            <p className="f-caption" style={{ fontSize:15, color:"var(--f-mid)", marginBottom:24 }}>{picked.desc}</p>

            <div style={{ marginBottom:24 }}>
              <div className="f-label" style={{ fontSize:9, color:"var(--f-mid)", opacity:0.55, marginBottom:10 }}>Цвет: {picked.color}</div>
              <div className="f-label" style={{ fontSize:9, color:"var(--f-mid)", opacity:0.55, marginBottom:10 }}>Размер</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {picked.sizes.map(s => (
                  <button key={s} onClick={() => setPickedSize(s)}
                    style={{
                      fontFamily:"IBM Plex Mono", fontSize:10, letterSpacing:"0.15em",
                      padding:"8px 14px", cursor:"pointer",
                      border:`1px solid ${pickedSize === s ? "var(--f-black)" : "var(--f-border)"}`,
                      background: pickedSize === s ? "var(--f-black)" : "transparent",
                      color: pickedSize === s ? "var(--f-warm)" : "var(--f-black)",
                      transition:"all 0.2s"
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button className="btn-primary" style={{ width:"100%" }} onClick={addToCart}>
              {pickedSize ? `Добавить в корзину — ${pickedSize}` : "Выберите размер"}
            </button>
          </div>
        </div>
      )}

      {/* ══ CART SIDEBAR ══ */}
      {cartOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:60, display:"flex", justifyContent:"flex-end", background:"rgba(17,16,9,0.45)", backdropFilter:"blur(4px)" }}
          onClick={() => setCartOpen(false)}>
          <div style={{ width:"100%", maxWidth:400, height:"100%", background:"var(--f-warm)", borderLeft:"1px solid var(--f-border)", display:"flex", flexDirection:"column" }}
            className="anim-in" onClick={e => e.stopPropagation()}>

            <div style={{ padding:"24px 28px", borderBottom:"1px solid var(--f-border)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <h3 className="f-heading" style={{ fontSize:20, margin:0 }}>Корзина</h3>
                <span className="f-label" style={{ fontSize:9, color:"var(--f-mid)", opacity:0.5 }}>{cart.length} ПОЗИЦ.</span>
              </div>
              <button onClick={() => setCartOpen(false)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--f-mid)" }}>
                <Icon name="X" size={18} />
              </button>
            </div>

            <div style={{ flex:1, overflowY:"auto", padding:"20px 28px" }}>
              {cart.length === 0 ? (
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", opacity:0.3 }}>
                  <Orn size={60} op={1} />
                  <p className="f-caption" style={{ marginTop:16, fontSize:15, color:"var(--f-mid)" }}>Корзина пуста</p>
                </div>
              ) : cart.map((item, i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 0", borderBottom:"1px solid var(--f-border)" }}>
                  <div>
                    <div className="f-heading" style={{ fontSize:16 }}>{item.name}</div>
                    <div className="f-display-italic" style={{ fontSize:15, color:"var(--f-gold)" }}>{item.price} ₽</div>
                  </div>
                  <button onClick={() => setCart(p => p.filter((_,j) => j !== i))} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--f-mid)", opacity:0.4 }}>
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div style={{ padding:"24px 28px", borderTop:"1px solid var(--f-border)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
                  <span className="f-label" style={{ fontSize:9, color:"var(--f-mid)", opacity:0.5 }}>ИТОГО</span>
                  <span className="f-display-italic" style={{ fontSize:22, color:"var(--f-gold)" }}>{total.toLocaleString("ru")} ₽</span>
                </div>
                <button className="btn-primary" style={{ width:"100%" }}>Оформить заказ</button>
                <p className="f-label" style={{ textAlign:"center", marginTop:10, fontSize:8, color:"var(--f-mid)", opacity:0.35 }}>
                  Stripe · ЮKassa · СБП · Рассрочка
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
