import Icon from "@/components/ui/icon";
import { I, PRODUCTS, TICKER_MSG, type Prod, type Sec, Logo, Gem } from "./shared";

interface SectionsProps {
  refs: Record<Sec, React.RefObject<HTMLDivElement>>;
  rdy: boolean;
  go: (k: Sec) => void;
  setModal: (p: Prod) => void;
  setSz: (s: string) => void;
}

const tickerItems = [...TICKER_MSG, ...TICKER_MSG, ...TICKER_MSG, ...TICKER_MSG];

export default function Sections({ refs, rdy, go, setModal, setSz }: SectionsProps) {
  return (
    <>
      {/* ════ HERO — split layout ════ */}
      <section ref={refs["главная"]} style={{ paddingTop:88, minHeight:"100vh", display:"grid", gridTemplateColumns:"1fr 1fr" }} className="max-md:!grid-cols-1">

        <div style={{ display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"80px 56px 80px 40px", background:"var(--cream)" }}>
          {rdy && <>
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
              <button className="btn-dark" onClick={() => go("коллекции")}>Смотреть коллекцию</button>
              <button className="btn-ghost" onClick={() => go("манифест")}>Читать манифест</button>
            </div>

            <div className="reveal d6" style={{ display:"flex", gap:40, marginTop:64, paddingTop:32, borderTop:"1px solid var(--linen)" }}>
              {[["47","предметов"],["2025","год"],["∞","орнаментов"]].map(([n, l]) => (
                <div key={l}>
                  <div className="t-display-i" style={{ fontSize:30, color:"var(--gold)" }}>{n}</div>
                  <div className="t-label" style={{ fontSize:8.5, color:"var(--mid)", marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
          </>}
        </div>

        <div style={{ position:"relative", overflow:"hidden", minHeight:560, background:"var(--sand)" }}>
          <img src={I.hero} alt="YANA SS2025" className="img-zoom"
            style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", filter:"sepia(8%)", display:"block" }} />
          <div style={{ position:"absolute", bottom:40, left:-28, background:"var(--cream)", border:"1px solid var(--linen)", padding:20, boxShadow:"0 8px 32px rgba(26,23,20,0.08)" }}>
            <Gem s={60} op={0.55} spin />
          </div>
        </div>
      </section>

      {/* ════ MARQUEE BAND ════ */}
      <div style={{ background:"var(--sand)", borderTop:"1px solid var(--linen)", borderBottom:"1px solid var(--linen)", height:44, overflow:"hidden", display:"flex", alignItems:"center" }}>
        <div className="ticker-track">
          {tickerItems.map((t, i) => (
            <span key={i} className="t-label" style={{ color:"var(--mid)", padding:"0 36px", fontSize:8.5, whiteSpace:"nowrap", opacity:0.6 }}>
              {i % 2 === 0 ? t : "·"}
            </span>
          ))}
        </div>
      </div>

      {/* ════ FEATURED header ════ */}
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
            <button className="btn-ghost t-label" style={{ fontSize:8.5 }} onClick={() => go("коллекции")}>Все предметы</button>
          </div>
        </div>
      </section>

      {/* ════ PRODUCT GRID ════ */}
      <section ref={refs["коллекции"]} style={{ maxWidth:1320, margin:"0 auto", padding:"0 40px 100px" }}>
        {/* Row 1: big + stack of 2 */}
        <div style={{ display:"grid", gridTemplateColumns:"3fr 2fr", gap:4, marginBottom:4 }} className="max-md:!grid-cols-1">

          <div className="pcard" onClick={() => { setModal(PRODUCTS[0]); setSz(""); }}>
            <div className="pcard-img" style={{ height:580, background:"var(--cream)" }}>
              <img src={PRODUCTS[0].img} alt={PRODUCTS[0].name} />
              <div className="pcard-overlay">
                <span className="t-label" style={{ color:"var(--pale)", fontSize:8.5 }}>Быстро добавить →</span>
              </div>
              {PRODUCTS[0].tag && <span className="t-label" style={{ position:"absolute", top:16, left:16, background:"var(--gold)", color:"var(--pale)", fontSize:7.5, padding:"4px 10px" }}>{PRODUCTS[0].tag}</span>}
            </div>
            <div style={{ padding:"16px 0 0", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div>
                <p className="t-serif" style={{ fontSize:17, marginBottom:4 }}>{PRODUCTS[0].name}</p>
                <p className="t-label" style={{ color:"var(--mid)", fontSize:8.5 }}>/ {PRODUCTS[0].sub} — {PRODUCTS[0].color}</p>
              </div>
              <span className="t-price" style={{ color:"var(--gold)" }}>{PRODUCTS[0].price} ₽</span>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateRows:"1fr 1fr", gap:4 }}>
            {PRODUCTS.slice(1, 3).map(p => (
              <div key={p.id} className="pcard" onClick={() => { setModal(p); setSz(""); }}>
                <div className="pcard-img" style={{ height:285, background:"var(--sand)" }}>
                  <img src={p.img} alt={p.name} />
                  <div className="pcard-overlay">
                    <span className="t-label" style={{ color:"var(--pale)", fontSize:8.5 }}>Быстро добавить →</span>
                  </div>
                  {p.tag && <span className="t-label" style={{ position:"absolute", top:14, left:14, background: p.tag === "ЛИМИТ" ? "var(--ink)" : "var(--gold)", color:"var(--pale)", fontSize:7.5, padding:"4px 9px" }}>{p.tag}</span>}
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
          {PRODUCTS.slice(3).map(p => (
            <div key={p.id} className="pcard" onClick={() => { setModal(p); setSz(""); }}>
              <div className="pcard-img" style={{ height:400, background:"var(--cream)" }}>
                <img src={p.img} alt={p.name} />
                <div className="pcard-overlay">
                  <span className="t-label" style={{ color:"var(--pale)", fontSize:8.5 }}>Быстро добавить →</span>
                </div>
                {p.tag && <span className="t-label" style={{ position:"absolute", top:14, left:14, background: p.tag === "ЛИМИТ" ? "var(--ink)" : "var(--gold)", color:"var(--pale)", fontSize:7.5, padding:"4px 9px" }}>{p.tag}</span>}
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
            <button className="btn-light" onClick={() => go("манифест")}>Читать манифест</button>
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

        <div style={{ display:"grid", gridTemplateColumns:"5fr 3fr 4fr", gridTemplateRows:"300px 260px", gap:4 }} className="max-md:!grid-cols-1 max-md:!grid-rows-none">
          <div style={{ gridRow:"1/3", overflow:"hidden", position:"relative", background:"var(--sand)" }}>
            <img src={I.hero} alt="campaign" className="img-zoom"
              style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top", filter:"sepia(8%)", display:"block" }} />
            <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"20px 24px", background:"linear-gradient(to top, rgba(26,23,20,0.65), transparent)" }}>
              <span className="t-label" style={{ color:"var(--pale)", opacity:0.6, fontSize:8 }}>Кампания 2025</span>
              <p className="t-display-i" style={{ fontSize:22, color:"var(--pale)", marginTop:4 }}>New Code. Old Roots.</p>
            </div>
          </div>

          {[
            { src:I.detail, label:"Детали орнамента" },
            { src:I.flat,   label:"SS26 Лукбук" },
          ].map((tile, i) => (
            <div key={i} style={{ overflow:"hidden", position:"relative", background:"var(--cream)" }}>
              <img src={tile.src} alt={tile.label} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.7s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
              <div style={{ position:"absolute", bottom:12, left:14 }}>
                <span className="t-caption" style={{ color:"var(--pale)", fontSize:13, textShadow:"0 1px 4px rgba(0,0,0,0.4)" }}>{tile.label}</span>
              </div>
            </div>
          ))}

          <div style={{ background:"var(--cream)", border:"1px solid var(--linen)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
            <Gem s={100} op={0.22} spin />
            <div style={{ position:"absolute", bottom:12, left:16 }}>
              <span className="t-caption" style={{ color:"var(--mid)", fontSize:13 }}>Паттерны</span>
            </div>
          </div>

          <div style={{ overflow:"hidden", position:"relative", background:"var(--sand)" }}>
            <img src={I.look} alt="lookbook" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.7s" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
            <div style={{ position:"absolute", bottom:12, left:14 }}>
              <span className="t-caption" style={{ color:"var(--pale)", fontSize:13, textShadow:"0 1px 4px rgba(0,0,0,0.4)" }}>Текстуры</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════ MANIFESTO ════ */}
      <section ref={refs["манифест"]} style={{ background:"var(--ink)" }}>
        <div style={{ maxWidth:1000, margin:"0 auto", padding:"100px 40px 72px", textAlign:"center" }}>
          <span className="section-tag t-label" style={{ color:"var(--gold-lt)", display:"inline-flex", marginBottom:32, opacity:0.65 }}>004 — Манифест</span>
          <h2 style={{ marginBottom:64 }}>
            <span className="t-display-i" style={{ display:"block", fontSize:"clamp(40px,7vw,88px)", color:"var(--gold-lt)" }}>«Я знаю,</span>
            <span className="t-display"   style={{ display:"block", fontSize:"clamp(40px,7vw,88px)", color:"var(--pale)" }}>кто я.»</span>
          </h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderTop:"1px solid rgba(255,255,255,0.06)" }} className="max-md:!grid-cols-1">
          {[
            { n:"I",   h:"Корни — это не прошлое",        t:"Национальная культура — живой код. Орнамент — алгоритм, созданный поколениями, который можно запустить в новом мире." },
            { n:"II",  h:"Тело — это манифест",           t:"То, что ты носишь — это заявление. YANA — для тех, кто делает это заявление сознательно и уверенно." },
            { n:"III", h:"Будущее строят те, кто помнит", t:"Настоящие инноваторы компилируют прошлое в будущее. Мы создаём новый код на основе старых данных." },
          ].map((item, i) => (
            <div key={i} style={{ padding:"48px 40px", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
              <span className="t-display-i" style={{ fontSize:40, color:"var(--gold-lt)", opacity:0.3, display:"block", marginBottom:20, lineHeight:1 }}>{item.n}</span>
              <h3 className="t-serif" style={{ fontSize:18, color:"var(--pale)", marginBottom:14 }}>{item.h}</h3>
              <p className="t-caption" style={{ color:"rgba(247,243,238,0.45)", fontSize:15, margin:0 }}>{item.t}</p>
            </div>
          ))}
        </div>

        <div style={{ padding:"60px 40px", display:"flex", justifyContent:"center", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
          <button className="btn-light" onClick={() => go("коллекции")}>Смотреть коллекцию</button>
        </div>
      </section>

      {/* ════ CONTACTS ════ */}
      <section ref={refs["контакты"]} style={{ maxWidth:1320, margin:"0 auto", padding:"100px 40px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start" }} className="max-md:!grid-cols-1">

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
            ].map(c => (
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

          <div style={{ background:"var(--cream)", border:"1px solid var(--linen)", padding:48 }}>
            <h3 className="t-serif" style={{ fontSize:22, marginBottom:6 }}>Оставить заявку</h3>
            <p className="t-caption" style={{ color:"var(--mid)", marginBottom:32 }}>Ответим в течение суток</p>

            {[
              { l:"Имя",  t:"text",  ph:"Ваше имя" },
              { l:"Email", t:"email", ph:"your@email.com" },
            ].map(f => (
              <div key={f.l} style={{ marginBottom:16 }}>
                <label className="t-label" style={{ fontSize:8.5, color:"var(--mid)", opacity:0.5, display:"block", marginBottom:7 }}>{f.l}</label>
                <input type={f.t} placeholder={f.ph}
                  style={{ width:"100%", background:"transparent", border:"1px solid var(--linen)", padding:"11px 14px", fontFamily:"IBM Plex Sans", fontWeight:300, fontSize:13, color:"var(--ink)", outline:"none", transition:"border-color 0.25s" }}
                  onFocus={e => e.target.style.borderColor = "var(--ink)"}
                  onBlur={e => e.target.style.borderColor = "var(--linen)"} />
              </div>
            ))}
            <div style={{ marginBottom:20 }}>
              <label className="t-label" style={{ fontSize:8.5, color:"var(--mid)", opacity:0.5, display:"block", marginBottom:7 }}>Сообщение</label>
              <textarea rows={4} placeholder="Расскажите о запросе..."
                style={{ width:"100%", background:"transparent", border:"1px solid var(--linen)", padding:"11px 14px", fontFamily:"IBM Plex Sans", fontWeight:300, fontSize:13, color:"var(--ink)", outline:"none", resize:"none", transition:"border-color 0.25s" }}
                onFocus={e => e.target.style.borderColor = "var(--ink)"}
                onBlur={e => e.target.style.borderColor = "var(--linen)"} />
            </div>
            <button className="btn-dark" style={{ width:"100%" }}>Отправить</button>
          </div>
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer style={{ background:"var(--ink2)", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:1320, margin:"0 auto", padding:"56px 40px 32px" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:32 }}>
            <Logo size={24} light />
          </div>
          <div className="line-gold" style={{ maxWidth:360, margin:"0 auto 32px" }} />
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:20 }}>
            <span className="t-label" style={{ fontSize:8, color:"rgba(247,243,238,0.22)" }}>© YANA 2025. Все права защищены.</span>
            <div style={{ display:"flex", gap:28 }}>
              {["Политика","Доставка","Возврат"].map(l => (
                <button key={l} className="t-label hover-line" style={{ fontSize:8, color:"rgba(247,243,238,0.28)", background:"none", border:"none", cursor:"pointer" }}>{l}</button>
              ))}
            </div>
            <div style={{ display:"flex", gap:10 }}>
              {[{ i:"Instagram", l:"IG" }, { i:"Send", l:"TG" }].map(s => (
                <button key={s.l} style={{ width:30, height:30, border:"1px solid rgba(255,255,255,0.1)", background:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(247,243,238,0.35)", transition:"all 0.25s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(200,168,112,0.5)"; e.currentTarget.style.color = "var(--gold-lt)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(247,243,238,0.35)"; }}>
                  <Icon name={s.i as "Instagram"} size={12} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
