import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

/* ─── images ─── */
const I = {
  hero:    "https://cdn.poehali.dev/projects/0e86868c-e374-43ab-90f3-136671219025/files/c4c99fbc-b188-4bf8-b9a5-4660554e8b6a.jpg",
  hero2:   "https://cdn.poehali.dev/projects/0e86868c-e374-43ab-90f3-136671219025/files/6ba6b109-6065-4666-82b4-01a035883a35.jpg",
  flat:    "https://cdn.poehali.dev/projects/0e86868c-e374-43ab-90f3-136671219025/files/291558f6-c327-44c2-b91a-c088772e288b.jpg",
  detail:  "https://cdn.poehali.dev/projects/0e86868c-e374-43ab-90f3-136671219025/files/97d0ab66-87c0-4fa1-90c3-20cb6c85141e.jpg",
  coll:    "https://cdn.poehali.dev/projects/0e86868c-e374-43ab-90f3-136671219025/files/1cfd7b8e-f3f8-46b0-8c2f-ff2ae2e4f0bf.jpg",
  look:    "https://cdn.poehali.dev/projects/0e86868c-e374-43ab-90f3-136671219025/files/c05d001c-c918-4f24-bb32-1f7a40d21905.jpg",
};

/* ─── logo ─── */
const Logo = ({ light = false, size = 32 }: { light?: boolean; size?: number }) => {
  const c = light ? "#F7F3EE" : "#1A1714";
  const g = "#A07840";
  return (
    <svg width={size * 5.2} height={size} viewBox="0 0 208 40" fill="none">
      {/* diamond mark */}
      <polygon points="20,2 30,20 20,38 10,20" stroke={g} strokeWidth="1.1" fill="none"/>
      <polygon points="20,8 26,20 20,32 14,20" stroke={g} strokeWidth="0.6" fill="none"/>
      <circle cx="20" cy="20" r="2.5" fill={g} opacity="0.7"/>
      <circle cx="20" cy="2" r="1.2" fill={g} opacity="0.5"/>
      <circle cx="20" cy="38" r="1.2" fill={g} opacity="0.5"/>
      <circle cx="30" cy="20" r="1.2" fill={g} opacity="0.5"/>
      <circle cx="10" cy="20" r="1.2" fill={g} opacity="0.5"/>
      {/* pixel accent */}
      <rect x="18" y="0" width="4" height="1.5" fill={g} opacity="0.3"/>
      <rect x="18" y="38.5" width="4" height="1.5" fill={g} opacity="0.3"/>
      {/* wordmark */}
      <text x="42" y="28" fontFamily="'Cormorant Garamond', serif" fontWeight="300"
        fontSize="28" letterSpacing="7" fill={c}>YANA</text>
      {/* tagline */}
      <text x="43" y="38" fontFamily="'IBM Plex Mono', monospace"
        fontSize="5.5" letterSpacing="3.2" fill={c} opacity="0.4">NEW CODE · OLD ROOTS</text>
    </svg>
  );
};

/* ─── tiny ornament ─── */
const Gem = ({ s = 64, op = 0.15, spin = false }: { s?: number; op?: number; spin?: boolean }) => (
  <svg width={s} height={s} viewBox="0 0 60 60" fill="none"
    style={{ opacity: op, ...(spin ? { animation:"ornSpin 22s linear infinite" } : {}) }}>
    <polygon points="30,2 58,30 30,58 2,30" stroke="#A07840" strokeWidth="0.9" fill="none"/>
    <polygon points="30,10 50,30 30,50 10,30" stroke="#A07840" strokeWidth="0.6" fill="none"/>
    <polygon points="30,18 42,30 30,42 18,30" stroke="#C8A870" strokeWidth="0.4" fill="none"/>
    <circle cx="30" cy="30" r="4" stroke="#A07840" strokeWidth="0.6" fill="none"/>
    <circle cx="30" cy="30" r="1.5" fill="#A07840" opacity="0.55"/>
    <circle cx="30" cy="2"  r="1.2" fill="#C8A870" opacity="0.7"/>
    <circle cx="58" cy="30" r="1.2" fill="#C8A870" opacity="0.7"/>
    <circle cx="30" cy="58" r="1.2" fill="#C8A870" opacity="0.7"/>
    <circle cx="2"  cy="30" r="1.2" fill="#C8A870" opacity="0.7"/>
  </svg>
);

/* ─── data ─── */
type Prod = { id:number; name:string; sub:string; price:string; tag:string|null; desc:string; sizes:string[]; color:string; img:string; };
const PRODUCTS: Prod[] = [
  { id:1, name:"Архив",    sub:"001", price:"8 900",  tag:"НОВИНКА", desc:"Оверсайз-худи. 100% органический хлопок с тюбетеичным орнаментом.", sizes:["XS","S","M","L","XL"],       color:"Молочный", img:I.flat },
  { id:2, name:"Код",      sub:"002", price:"16 500", tag:"ЛИМИТ",   desc:"Бомбер с пиксель-вышивкой. Японский нейлон, французская подкладка.", sizes:["S","M","L"],                color:"Антрацит", img:I.hero2 },
  { id:3, name:"Корни",    sub:"003", price:"7 200",  tag:null,      desc:"Туника из льняной смеси. Геометрический орнамент тюбетейки.", sizes:["XS","S","M","L","XL","2XL"], color:"Песок",    img:I.detail },
  { id:4, name:"Степь",    sub:"004", price:"9 800",  tag:"НОВИНКА", desc:"Широкие брюки, высокая посадка. Кипчакский орнамент по боку.", sizes:["XS","S","M","L"],           color:"Терракот", img:I.look },
  { id:5, name:"Цифра",    sub:"005", price:"5 400",  tag:null,      desc:"Лонгслив из мерсеризованного хлопка. Принт — тюбетейка через цифровой фильтр.", sizes:["S","M","L","XL"], color:"Белый", img:I.flat },
  { id:6, name:"Манифест", sub:"006", price:"21 000", tag:"ЛИМИТ",   desc:"Двусторонняя ветровка. Орнамент / ASCII-данные.", sizes:["S","M","L"],                color:"Чёрный/Бежевый", img:I.hero },
];

const TICKER_MSG = ["YANA — SS 2025", "New Code. Old Roots.", "Цифровой Тюбетеизм", "Казань · Москва", "Бесплатная доставка от 8 000 ₽", "Лимитированная коллекция"];
const NAV = ["коллекции", "о бренде", "галерея", "манифест", "контакты"] as const;
type Sec = typeof NAV[number] | "главная";

/* ─── helpers ─── */
const px = (x: number) => `${x}px`;

export default function Index() {
  const [sec, setSec]         = useState<Sec>("главная");
  const [cart, setCart]       = useState<Prod[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mob, setMob]         = useState(false);
  const [modal, setModal]     = useState<Prod|null>(null);
  const [sz, setSz]           = useState("");
  const [rdy, setRdy]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const refs: Record<Sec, React.RefObject<HTMLDivElement>> = {
    "главная":   useRef(null), "коллекции": useRef(null),
    "о бренде":  useRef(null), "галерея":   useRef(null),
    "манифест":  useRef(null), "контакты":  useRef(null),
  };

  useEffect(() => {
    setTimeout(() => setRdy(true), 60);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (k: Sec) => { setSec(k); setMob(false); refs[k]?.current?.scrollIntoView({ behavior:"smooth", block:"start" }); };
  const addCart = () => { if (modal && sz) { setCart(p=>[...p,modal]); setModal(null); setSz(""); } };
  const total = cart.reduce((a,i)=>a+parseInt(i.price.replace(/\s/g,"")),0);

  /* ticker doubled for seamless loop */
  const tickerItems = [...TICKER_MSG, ...TICKER_MSG, ...TICKER_MSG, ...TICKER_MSG];

  return (
    <div style={{ background:"var(--pale)", color:"var(--ink)", minHeight:"100vh" }}>

      {/* ════ TICKER ════ */}
      <div style={{ background:"var(--ink)", height:30, overflow:"hidden", display:"flex", alignItems:"center" }}>
        <div className="ticker-track">
          {tickerItems.map((t,i)=>(
            <span key={i} className="t-label" style={{ color:"var(--pale)", opacity:0.7, padding:"0 40px", fontSize:8.5, whiteSpace:"nowrap" }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ════ NAV ════ */}
      <nav className="nav-wrap" style={{ top:30 }}>
        <div style={{ maxWidth:1320, margin:"0 auto", padding:"0 40px", height:58, display:"flex", alignItems:"center", justifyContent:"space-between" }}>

          <button onClick={()=>go("главная")} style={{ background:"none", border:"none", cursor:"pointer", padding:0, lineHeight:0 }}>
            <Logo size={26} />
          </button>

          {/* desktop */}
          <div className="hidden md:flex" style={{ gap:40 }}>
            {NAV.map(k=>(
              <button key={k} className={`nav-link ${sec===k?"on":""}`} onClick={()=>go(k)}>{k}</button>
            ))}
          </div>

          <div style={{ display:"flex", gap:20, alignItems:"center" }}>
            <button onClick={()=>setCartOpen(true)} style={{ background:"none", border:"none", cursor:"pointer", position:"relative", color:"var(--mid)", display:"flex", alignItems:"center" }}>
              <Icon name="ShoppingBag" size={17} />
              {cart.length>0&&(
                <span style={{ position:"absolute", top:-6, right:-7, width:14, height:14, borderRadius:"50%", background:"var(--ink)", color:"var(--pale)", fontSize:7.5, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"IBM Plex Mono" }}>
                  {cart.length}
                </span>
              )}
            </button>
            <button className="md:hidden nav-link" style={{ color:"var(--mid)", display:"flex", alignItems:"center" }} onClick={()=>setMob(!mob)}>
              <Icon name={mob?"X":"Menu"} size={17} />
            </button>
          </div>
        </div>

        {mob&&(
          <div style={{ background:"var(--pale)", borderTop:"1px solid var(--linen)", padding:"24px 40px", display:"flex", flexDirection:"column", gap:18 }}>
            {NAV.map(k=>(
              <button key={k} className={`nav-link ${sec===k?"on":""}`} style={{ textAlign:"left" }} onClick={()=>go(k)}>{k}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ════ HERO — split layout ════ */}
      <section ref={refs["главная"]} style={{ paddingTop:88, minHeight:"100vh", display:"grid", gridTemplateColumns:"1fr 1fr" }} className="max-md:!grid-cols-1">

        {/* LEFT: text */}
        <div style={{ display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"80px 56px 80px 40px", background:"var(--cream)" }}>
          {rdy&&<>
            <span className="t-label reveal d1" style={{ color:"var(--gold)", marginBottom:20 }}>SS 2025 — Цифровой Тюбетеизм</span>

            <h1 style={{ marginBottom:28 }}>
              <span className="t-display reveal d2" style={{ display:"block", fontSize:"clamp(52px,7vw,96px)", color:"var(--ink)" }}>New</span>
              <span className="t-display reveal d2" style={{ display:"block", fontSize:"clamp(52px,7vw,96px)", color:"var(--ink)" }}>Code.</span>
              <span className="t-display-i reveal d3" style={{ display:"block", fontSize:"clamp(52px,7vw,96px)", color:"var(--gold)" }}>Old Roots.</span>
            </h1>

            <p className="t-caption reveal d4" style={{ color:"var(--mid)", maxWidth:360, marginBottom:48, fontSize:17 }}>
              Одежда для тех, кто живёт в ритме мегаполиса и помнит, откуда он. Каждая вещь — диалог между пикселем и орнаментом.
            </p>

            <div className="reveal d5" style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <button className="btn-dark" onClick={()=>go("коллекции")}>Смотреть коллекцию</button>
              <button className="btn-ghost" onClick={()=>go("манифест")}>Читать манифест</button>
            </div>

            {/* stats row */}
            <div className="reveal d6" style={{ display:"flex", gap:40, marginTop:64, paddingTop:32, borderTop:"1px solid var(--linen)" }}>
              {[["47","предметов"],["2025","год"],["∞","орнаментов"]].map(([n,l])=>(
                <div key={l}>
                  <div className="t-display-i" style={{ fontSize:30, color:"var(--gold)" }}>{n}</div>
                  <div className="t-label" style={{ fontSize:8.5, color:"var(--mid)", marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
          </>}
        </div>

        {/* RIGHT: image */}
        <div style={{ position:"relative", overflow:"hidden", minHeight:560, background:"var(--sand)" }}>
          <img src={I.hero} alt="YANA SS2025" className="img-zoom"
            style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", filter:"sepia(8%)", display:"block" }} />

          {/* floating ornament badge */}
          <div style={{ position:"absolute", bottom:40, left:-28, background:"var(--cream)", border:"1px solid var(--linen)", padding:20, boxShadow:"0 8px 32px rgba(26,23,20,0.08)" }}>
            <Gem s={60} op={0.55} spin />
          </div>
        </div>
      </section>

      {/* ════ MARQUEE BAND ════ */}
      <div style={{ background:"var(--sand)", borderTop:"1px solid var(--linen)", borderBottom:"1px solid var(--linen)", height:44, overflow:"hidden", display:"flex", alignItems:"center" }}>
        <div className="ticker-track">
          {tickerItems.map((t,i)=>(
            <span key={i} className="t-label" style={{ color:"var(--mid)", padding:"0 36px", fontSize:8.5, whiteSpace:"nowrap", opacity:0.6 }}>
              {i%2===0 ? t : "·"}
            </span>
          ))}
        </div>
      </div>

      {/* ════ FEATURED — asymmetric 3-col ════ */}
      <section style={{ maxWidth:1320, margin:"0 auto", padding:"100px 40px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:56, flexWrap:"wrap", gap:24 }}>
          <div>
            <span className="section-tag t-label" style={{ color:"var(--gold)", display:"block", marginBottom:16 }}>001 — Коллекции</span>
            <h2 style={{ margin:0 }}>
              <span className="t-display" style={{ display:"block", fontSize:"clamp(36px,5vw,68px)" }}>Цифровой</span>
              <span className="t-display-i" style={{ display:"block", fontSize:"clamp(36px,5vw,68px)", color:"var(--gold)" }}>Тюбетеизм</span>
            </h2>
          </div>
          <div style={{ maxWidth:280 }}>
            <p className="t-caption" style={{ color:"var(--mid)", fontSize:16, margin:"0 0 20px" }}>
              Каждая вещь — диалог между пикселем и орнаментом. Между сервером и степью.
            </p>
            <button className="btn-ghost t-label" style={{ fontSize:8.5 }} onClick={()=>go("коллекции")}>Все предметы</button>
          </div>
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section ref={refs["коллекции"]} style={{ maxWidth:1320, margin:"0 auto", padding:"0 40px 100px" }}>
        {/* Row 1: big + small */}
        <div style={{ display:"grid", gridTemplateColumns:"3fr 2fr", gap:4, marginBottom:4 }} className="max-md:!grid-cols-1">

          {/* Big card */}
          <div className="pcard" onClick={()=>{setModal(PRODUCTS[0]);setSz("")}}>
            <div className="pcard-img" style={{ height:580, background:"var(--cream)" }}>
              <img src={PRODUCTS[0].img} alt={PRODUCTS[0].name} />
              <div className="pcard-overlay">
                <span className="t-label" style={{ color:"var(--pale)", fontSize:8.5 }}>Быстро добавить →</span>
              </div>
              {PRODUCTS[0].tag&&<span className="t-label" style={{ position:"absolute", top:16, left:16, background:"var(--gold)", color:"var(--pale)", fontSize:7.5, padding:"4px 10px" }}>{PRODUCTS[0].tag}</span>}
            </div>
            <div style={{ padding:"16px 0 0", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div>
                <p className="t-serif" style={{ fontSize:17, marginBottom:4 }}>{PRODUCTS[0].name}</p>
                <p className="t-label" style={{ color:"var(--mid)", fontSize:8.5 }}>/ {PRODUCTS[0].sub} — {PRODUCTS[0].color}</p>
              </div>
              <span className="t-price" style={{ color:"var(--gold)" }}>{PRODUCTS[0].price} ₽</span>
            </div>
          </div>

          {/* Stack of 2 */}
          <div style={{ display:"grid", gridTemplateRows:"1fr 1fr", gap:4 }}>
            {PRODUCTS.slice(1,3).map(p=>(
              <div key={p.id} className="pcard" onClick={()=>{setModal(p);setSz("")}}>
                <div className="pcard-img" style={{ height:285, background:"var(--sand)" }}>
                  <img src={p.img} alt={p.name} />
                  <div className="pcard-overlay">
                    <span className="t-label" style={{ color:"var(--pale)", fontSize:8.5 }}>Быстро добавить →</span>
                  </div>
                  {p.tag&&<span className="t-label" style={{ position:"absolute", top:14, left:14, background: p.tag==="ЛИМИТ"?"var(--ink)":"var(--gold)", color:"var(--pale)", fontSize:7.5, padding:"4px 9px" }}>{p.tag}</span>}
                </div>
                <div style={{ padding:"12px 0 0", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div>
                    <p className="t-serif" style={{ fontSize:16, marginBottom:3 }}>{p.name}</p>
                    <p className="t-label" style={{ color:"var(--mid)", fontSize:8 }}>/ {p.sub}</p>
                  </div>
                  <span className="t-price" style={{ fontSize:17, color:"var(--gold)" }}>{p.price} ₽</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: 3 equal */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:4, marginBottom:4 }} className="max-md:!grid-cols-1">
          {PRODUCTS.slice(3).map(p=>(
            <div key={p.id} className="pcard" onClick={()=>{setModal(p);setSz("")}}>
              <div className="pcard-img" style={{ height:400, background:"var(--cream)" }}>
                <img src={p.img} alt={p.name} />
                <div className="pcard-overlay">
                  <span className="t-label" style={{ color:"var(--pale)", fontSize:8.5 }}>Быстро добавить →</span>
                </div>
                {p.tag&&<span className="t-label" style={{ position:"absolute", top:14, left:14, background: p.tag==="ЛИМИТ"?"var(--ink)":"var(--gold)", color:"var(--pale)", fontSize:7.5, padding:"4px 9px" }}>{p.tag}</span>}
              </div>
              <div style={{ padding:"14px 0 0", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div>
                  <p className="t-serif" style={{ fontSize:16, marginBottom:3 }}>{p.name}</p>
                  <p className="t-label" style={{ color:"var(--mid)", fontSize:8 }}>/ {p.sub} — {p.color}</p>
                </div>
                <span className="t-price" style={{ fontSize:17, color:"var(--gold)" }}>{p.price} ₽</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════ EDITORIAL STRIP ════ */}
      <section style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:540, background:"var(--ink)" }} className="max-md:!grid-cols-1">
        <div style={{ overflow:"hidden", position:"relative" }}>
          <img src={I.hero2} alt="editorial" className="img-zoom"
            style={{ width:"100%", height:"100%", objectFit:"cover", filter:"sepia(12%) brightness(0.85)", display:"block", minHeight:380 }} />
        </div>
        <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", padding:"72px 56px", position:"relative" }}>
          <Gem s={180} op={0.06} spin />
          <div style={{ position:"relative" }}>
            <span className="section-tag t-label" style={{ color:"var(--gold-lt)", display:"block", marginBottom:24 }}>002 — О бренде</span>
            <h2 style={{ marginBottom:20 }} ref={refs["о бренде"]}>
              <span className="t-display" style={{ display:"block", fontSize:"clamp(34px,4.5vw,62px)", color:"var(--pale)" }}>Знаю, кто я.</span>
              <span className="t-display-i" style={{ display:"block", fontSize:"clamp(34px,4.5vw,62px)", color:"var(--gold-lt)" }}>Создаю завтра.</span>
            </h2>
            <p className="t-caption" style={{ color:"rgba(247,243,238,0.5)", fontSize:16, marginBottom:16, maxWidth:380 }}>
              YANA — платформа для тех, кто вырос между традиционной культурой и цифровым будущим. Каждый орнамент — это код.
            </p>
            <p className="t-caption" style={{ color:"rgba(247,243,238,0.5)", fontSize:16, marginBottom:40, maxWidth:380 }}>
              Татарский тюбетей встречается с Japanese streetwear. Кипчакский орнамент рифмуется с circuit board.
            </p>
            <button className="btn-light" onClick={()=>go("манифест")}>Читать манифест</button>
          </div>
        </div>
      </section>

      {/* ════ GALLERY ════ */}
      <section ref={refs["галерея"]} style={{ maxWidth:1320, margin:"0 auto", padding:"100px 40px" }}>
        <div style={{ marginBottom:56 }}>
          <span className="section-tag t-label" style={{ color:"var(--gold)", display:"block", marginBottom:16 }}>003 — Галерея</span>
          <h2>
            <span className="t-display" style={{ display:"block", fontSize:"clamp(32px,4.5vw,62px)" }}>Визуальный</span>
            <span className="t-display-i" style={{ display:"block", fontSize:"clamp(32px,4.5vw,62px)", color:"var(--gold)" }}>архив</span>
          </h2>
        </div>

        {/* Organic asymmetric mosaic */}
        <div style={{ display:"grid", gridTemplateColumns:"5fr 3fr 4fr", gridTemplateRows:"300px 260px", gap:4 }} className="max-md:!grid-cols-1 max-md:!grid-rows-none">
          {/* tall left */}
          <div style={{ gridRow:"1/3", overflow:"hidden", position:"relative", background:"var(--sand)" }}>
            <img src={I.hero} alt="campaign" className="img-zoom"
              style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top", filter:"sepia(8%)", display:"block" }} />
            <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"20px 24px", background:"linear-gradient(to top, rgba(26,23,20,0.65), transparent)" }}>
              <span className="t-label" style={{ color:"var(--pale)", opacity:0.6, fontSize:8 }}>Кампания 2025</span>
              <p className="t-display-i" style={{ fontSize:22, color:"var(--pale)", marginTop:4 }}>New Code. Old Roots.</p>
            </div>
          </div>
          {/* top center */}
          <div style={{ overflow:"hidden", position:"relative", background:"var(--cream)" }}>
            <img src={I.detail} alt="detail" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.7s" }}
              onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.05)")}
              onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")} />
            <div style={{ position:"absolute", bottom:12, left:14 }}>
              <span className="t-caption" style={{ color:"var(--pale)", fontSize:13, textShadow:"0 1px 4px rgba(0,0,0,0.4)" }}>Детали орнамента</span>
            </div>
          </div>
          {/* top right */}
          <div style={{ overflow:"hidden", position:"relative", background:"var(--sand)" }}>
            <img src={I.flat} alt="flatlay" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.7s" }}
              onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.05)")}
              onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")} />
            <div style={{ position:"absolute", bottom:12, left:14 }}>
              <span className="t-caption" style={{ color:"var(--pale)", fontSize:13, textShadow:"0 1px 4px rgba(0,0,0,0.4)" }}>SS26 Лукбук</span>
            </div>
          </div>
          {/* bottom center: ornament tile */}
          <div style={{ background:"var(--cream)", border:"1px solid var(--linen)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
            <Gem s={100} op={0.22} spin />
            <div style={{ position:"absolute", bottom:12, left:14 }}>
              <span className="t-caption" style={{ color:"var(--mid)", fontSize:13 }}>Паттерны</span>
            </div>
          </div>
          {/* bottom right */}
          <div style={{ overflow:"hidden", position:"relative", background:"var(--sand)" }}>
            <img src={I.look} alt="lookbook" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.7s" }}
              onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.05)")}
              onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")} />
            <div style={{ position:"absolute", bottom:12, left:14 }}>
              <span className="t-caption" style={{ color:"var(--pale)", fontSize:13, textShadow:"0 1px 4px rgba(0,0,0,0.4)" }}>Текстуры</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════ MANIFESTO ════ */}
      <section ref={refs["манифест"]} style={{ background:"var(--ink)" }}>
        {/* Big quote */}
        <div style={{ maxWidth:1000, margin:"0 auto", padding:"100px 40px 72px", textAlign:"center" }}>
          <span className="section-tag t-label" style={{ color:"var(--gold-lt)", display:"inline-flex", marginBottom:32, opacity:0.65 }}>004 — Манифест</span>
          <h2 style={{ marginBottom:64 }}>
            <span className="t-display-i" style={{ display:"block", fontSize:"clamp(40px,7vw,88px)", color:"var(--gold-lt)" }}>«Я знаю,</span>
            <span className="t-display"   style={{ display:"block", fontSize:"clamp(40px,7vw,88px)", color:"var(--pale)" }}>кто я.»</span>
          </h2>
        </div>

        {/* Pillars */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderTop:"1px solid rgba(255,255,255,0.06)" }} className="max-md:!grid-cols-1">
          {[
            { n:"I",   h:"Корни — это не прошлое",        t:"Национальная культура — живой код. Орнамент — алгоритм, созданный поколениями, который можно запустить в новом мире." },
            { n:"II",  h:"Тело — это манифест",           t:"То, что ты носишь — это заявление. YANA — для тех, кто делает это заявление сознательно и уверенно." },
            { n:"III", h:"Будущее строят те, кто помнит", t:"Настоящие инноваторы компилируют прошлое в будущее. Мы создаём новый код на основе старых данных." },
          ].map((item,i)=>(
            <div key={i} style={{ padding:"48px 40px", borderRight: i<2 ? "1px solid rgba(255,255,255,0.06)" : "none", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
              <span className="t-display-i" style={{ fontSize:40, color:"var(--gold-lt)", opacity:0.3, display:"block", marginBottom:20, lineHeight:1 }}>{item.n}</span>
              <h3 className="t-serif" style={{ fontSize:18, color:"var(--pale)", marginBottom:14 }}>{item.h}</h3>
              <p className="t-caption" style={{ color:"rgba(247,243,238,0.45)", fontSize:15, margin:0 }}>{item.t}</p>
            </div>
          ))}
        </div>

        <div style={{ padding:"60px 40px", display:"flex", justifyContent:"center", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
          <button className="btn-light" onClick={()=>go("коллекции")}>Смотреть коллекцию</button>
        </div>
      </section>

      {/* ════ CONTACTS ════ */}
      <section ref={refs["контакты"]} style={{ maxWidth:1320, margin:"0 auto", padding:"100px 40px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start" }} className="max-md:!grid-cols-1">

          {/* left */}
          <div>
            <span className="section-tag t-label" style={{ color:"var(--gold)", display:"block", marginBottom:20 }}>005 — Контакты</span>
            <h2 style={{ marginBottom:32 }}>
              <span className="t-display" style={{ display:"block", fontSize:"clamp(32px,4vw,58px)" }}>Свяжитесь</span>
              <span className="t-display-i" style={{ display:"block", fontSize:"clamp(32px,4vw,58px)", color:"var(--gold)" }}>с нами</span>
            </h2>
            <p className="t-caption" style={{ color:"var(--mid)", fontSize:16, maxWidth:340, marginBottom:48 }}>
              Коллаборации, оптовые заявки, пресс-запросы — мы всегда открыты к разговору.
            </p>

            {[
              { icon:"Mail",      l:"Email",     v:"hello@yana-brand.com" },
              { icon:"Instagram", l:"Instagram", v:"@yana.brand" },
              { icon:"MapPin",    l:"Офисы",     v:"Казань · Москва" },
            ].map(c=>(
              <div key={c.l} style={{ display:"flex", gap:16, alignItems:"center", marginBottom:20 }}>
                <div style={{ width:38, height:38, border:"1px solid var(--linen)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Icon name={c.icon as "Mail"} size={13} style={{ color:"var(--gold)" }} />
                </div>
                <div>
                  <div className="t-label" style={{ fontSize:8, color:"var(--mid)", opacity:0.5, marginBottom:2 }}>{c.l}</div>
                  <div className="t-body" style={{ fontSize:14 }}>{c.v}</div>
                </div>
              </div>
            ))}
          </div>

          {/* form */}
          <div style={{ background:"var(--cream)", border:"1px solid var(--linen)", padding:48 }}>
            <h3 className="t-serif" style={{ fontSize:22, marginBottom:6 }}>Оставить заявку</h3>
            <p className="t-caption" style={{ color:"var(--mid)", marginBottom:32 }}>Ответим в течение суток</p>

            {[
              { l:"Имя",  t:"text",  ph:"Ваше имя" },
              { l:"Email",t:"email", ph:"your@email.com" },
            ].map(f=>(
              <div key={f.l} style={{ marginBottom:16 }}>
                <label className="t-label" style={{ fontSize:8.5, color:"var(--mid)", opacity:0.5, display:"block", marginBottom:7 }}>{f.l}</label>
                <input type={f.t} placeholder={f.ph}
                  style={{ width:"100%", background:"transparent", border:"1px solid var(--linen)", padding:"11px 14px", fontFamily:"IBM Plex Sans", fontWeight:300, fontSize:13, color:"var(--ink)", outline:"none", transition:"border-color 0.25s" }}
                  onFocus={e=>e.target.style.borderColor="var(--ink)"}
                  onBlur={e=>e.target.style.borderColor="var(--linen)"} />
              </div>
            ))}
            <div style={{ marginBottom:20 }}>
              <label className="t-label" style={{ fontSize:8.5, color:"var(--mid)", opacity:0.5, display:"block", marginBottom:7 }}>Сообщение</label>
              <textarea rows={4} placeholder="Расскажите о запросе..."
                style={{ width:"100%", background:"transparent", border:"1px solid var(--linen)", padding:"11px 14px", fontFamily:"IBM Plex Sans", fontWeight:300, fontSize:13, color:"var(--ink)", outline:"none", resize:"none", transition:"border-color 0.25s" }}
                onFocus={e=>e.target.style.borderColor="var(--ink)"}
                onBlur={e=>e.target.style.borderColor="var(--linen)"} />
            </div>
            <button className="btn-dark" style={{ width:"100%" }}>Отправить</button>
          </div>
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer style={{ background:"var(--ink2)", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:1320, margin:"0 auto", padding:"56px 40px 32px" }}>
          {/* logo center */}
          <div style={{ display:"flex", justifyContent:"center", marginBottom:32 }}>
            <Logo size={24} light />
          </div>
          <div className="line-gold" style={{ maxWidth:360, margin:"0 auto 32px" }} />
          {/* links */}
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:20 }}>
            <span className="t-label" style={{ fontSize:8, color:"rgba(247,243,238,0.22)" }}>© YANA 2025. Все права защищены.</span>
            <div style={{ display:"flex", gap:28 }}>
              {["Политика","Доставка","Возврат"].map(l=>(
                <button key={l} className="t-label hover-line" style={{ fontSize:8, color:"rgba(247,243,238,0.28)", background:"none", border:"none", cursor:"pointer" }}>{l}</button>
              ))}
            </div>
            <div style={{ display:"flex", gap:10 }}>
              {[{i:"Instagram",l:"IG"},{i:"Send",l:"TG"}].map(s=>(
                <button key={s.l} style={{ width:30, height:30, border:"1px solid rgba(255,255,255,0.1)", background:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(247,243,238,0.35)", transition:"all 0.25s" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(200,168,112,0.5)";e.currentTarget.style.color="var(--gold-lt)"}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.1)";e.currentTarget.style.color="rgba(247,243,238,0.35)"}}>
                  <Icon name={s.i as "Instagram"} size={12} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ════ PRODUCT MODAL ════ */}
      {modal&&(
        <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"flex-end", justifyContent:"center", background:"rgba(26,23,20,0.6)", backdropFilter:"blur(8px)" }}
          onClick={()=>setModal(null)}>
          <div style={{ width:"100%", maxWidth:560, background:"var(--pale)", padding:"48px 44px 56px" }}
            onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
              <div>
                <span className="t-label" style={{ color:"var(--mid)", fontSize:8.5 }}>/ {modal.sub}</span>
                <h3 className="t-serif" style={{ fontSize:26, margin:"4px 0 0" }}>{modal.name}</h3>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                <span className="t-price" style={{ color:"var(--gold)", fontSize:22 }}>{modal.price} ₽</span>
                <button onClick={()=>setModal(null)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--mid)", padding:4 }}>
                  <Icon name="X" size={16} />
                </button>
              </div>
            </div>

            <div className="line-gold" style={{ marginBottom:20 }} />

            <p className="t-caption" style={{ color:"var(--mid)", fontSize:15, marginBottom:24 }}>{modal.desc}</p>

            <div style={{ marginBottom:28 }}>
              <div className="t-label" style={{ fontSize:8, color:"var(--mid)", opacity:0.5, marginBottom:10 }}>ВЫБЕРИТЕ РАЗМЕР</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {modal.sizes.map(s=>(
                  <button key={s} onClick={()=>setSz(s)}
                    style={{
                      fontFamily:"IBM Plex Mono", fontSize:9.5, letterSpacing:"0.15em", padding:"9px 16px",
                      border:`1px solid ${sz===s?"var(--ink)":"var(--linen)"}`,
                      background: sz===s ? "var(--ink)" : "transparent",
                      color: sz===s ? "var(--pale)" : "var(--ink)",
                      cursor:"pointer", transition:"all 0.2s"
                    }}>{s}
                  </button>
                ))}
              </div>
            </div>

            <button className="btn-dark" style={{ width:"100%", opacity: sz ? 1 : 0.4, cursor: sz ? "pointer" : "default" }}
              onClick={addCart}>
              {sz ? `Добавить — ${sz}` : "Сначала выберите размер"}
            </button>
          </div>
        </div>
      )}

      {/* ════ CART ════ */}
      {cartOpen&&(
        <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", justifyContent:"flex-end", background:"rgba(26,23,20,0.45)", backdropFilter:"blur(6px)" }}
          onClick={()=>setCartOpen(false)}>
          <div style={{ width:"100%", maxWidth:400, height:"100%", background:"var(--pale)", borderLeft:"1px solid var(--linen)", display:"flex", flexDirection:"column" }}
            onClick={e=>e.stopPropagation()}>
            <div style={{ padding:"24px 28px", borderBottom:"1px solid var(--linen)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <h3 className="t-serif" style={{ fontSize:20 }}>Корзина</h3>
                <span className="t-label" style={{ fontSize:8, color:"var(--mid)", opacity:0.45 }}>{cart.length} ПОЗИЦ.</span>
              </div>
              <button onClick={()=>setCartOpen(false)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--mid)" }}>
                <Icon name="X" size={17} />
              </button>
            </div>

            <div style={{ flex:1, overflowY:"auto", padding:"20px 28px" }}>
              {cart.length===0 ? (
                <div style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", opacity:0.25 }}>
                  <Gem s={56} op={1} />
                  <p className="t-caption" style={{ marginTop:14, color:"var(--mid)", fontSize:15 }}>Корзина пуста</p>
                </div>
              ):cart.map((item,i)=>(
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 0", borderBottom:"1px solid var(--linen)" }}>
                  <div>
                    <div className="t-serif" style={{ fontSize:16 }}>{item.name}</div>
                    <div className="t-price" style={{ fontSize:16, color:"var(--gold)" }}>{item.price} ₽</div>
                  </div>
                  <button onClick={()=>setCart(p=>p.filter((_,j)=>j!==i))} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--mid)", opacity:0.4 }}>
                    <Icon name="Trash2" size={13} />
                  </button>
                </div>
              ))}
            </div>

            {cart.length>0&&(
              <div style={{ padding:"24px 28px", borderTop:"1px solid var(--linen)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
                  <span className="t-label" style={{ fontSize:8.5, color:"var(--mid)", opacity:0.5 }}>ИТОГО</span>
                  <span className="t-price" style={{ fontSize:22, color:"var(--gold)" }}>{total.toLocaleString("ru")} ₽</span>
                </div>
                <button className="btn-dark" style={{ width:"100%" }}>Оформить заказ</button>
                <p className="t-label" style={{ textAlign:"center", marginTop:10, fontSize:7.5, color:"var(--mid)", opacity:0.3 }}>
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
