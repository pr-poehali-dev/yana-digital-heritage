import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/0e86868c-e374-43ab-90f3-136671219025/files/5b3c5f81-674d-44aa-a8f1-089b2f79e449.jpg";
const COLLECTION_IMG = "https://cdn.poehali.dev/projects/0e86868c-e374-43ab-90f3-136671219025/files/1cfd7b8e-f3f8-46b0-8c2f-ff2ae2e4f0bf.jpg";

const OrnamentSVG = ({ size = 120, opacity = 0.12, className = "", style: s }: { size?: number; opacity?: number; className?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className} style={{ opacity, ...s }}>
    <polygon points="60,4 116,60 60,116 4,60" stroke="#C9A84C" strokeWidth="1" fill="none"/>
    <polygon points="60,16 104,60 60,104 16,60" stroke="#C9A84C" strokeWidth="0.8" fill="none"/>
    <polygon points="60,28 92,60 60,92 28,60" stroke="#2ABFB0" strokeWidth="0.6" fill="none"/>
    <circle cx="60" cy="60" r="8" stroke="#C9A84C" strokeWidth="0.8" fill="none"/>
    <circle cx="60" cy="60" r="3" fill="#C9A84C" opacity="0.6"/>
    <circle cx="60" cy="4" r="2" fill="#2ABFB0" opacity="0.8"/>
    <circle cx="116" cy="60" r="2" fill="#2ABFB0" opacity="0.8"/>
    <circle cx="60" cy="116" r="2" fill="#2ABFB0" opacity="0.8"/>
    <circle cx="4" cy="60" r="2" fill="#2ABFB0" opacity="0.8"/>
    <line x1="60" y1="4" x2="60" y2="28" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5"/>
    <line x1="116" y1="60" x2="92" y2="60" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5"/>
    <line x1="60" y1="116" x2="60" y2="92" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5"/>
    <line x1="4" y1="60" x2="28" y2="60" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5"/>
    <polygon points="60,36 84,60 60,84 36,60" stroke="#C9A84C" strokeWidth="0.4" fill="rgba(201,168,76,0.03)"/>
  </svg>
);

const PixelOrnament = ({ className = "" }: { className?: string }) => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className={className}>
    <rect x="36" y="0" width="8" height="8" fill="#C9A84C" opacity="0.6"/>
    <rect x="28" y="8" width="8" height="8" fill="#C9A84C" opacity="0.4"/>
    <rect x="44" y="8" width="8" height="8" fill="#C9A84C" opacity="0.4"/>
    <rect x="20" y="16" width="8" height="8" fill="#2ABFB0" opacity="0.5"/>
    <rect x="36" y="16" width="8" height="8" fill="#C9A84C" opacity="0.3"/>
    <rect x="52" y="16" width="8" height="8" fill="#2ABFB0" opacity="0.5"/>
    <rect x="12" y="24" width="8" height="8" fill="#C9A84C" opacity="0.4"/>
    <rect x="60" y="24" width="8" height="8" fill="#C9A84C" opacity="0.4"/>
    <rect x="0" y="36" width="8" height="8" fill="#C9A84C" opacity="0.6"/>
    <rect x="36" y="36" width="8" height="8" fill="#2ABFB0" opacity="0.7"/>
    <rect x="72" y="36" width="8" height="8" fill="#C9A84C" opacity="0.6"/>
    <rect x="12" y="48" width="8" height="8" fill="#C9A84C" opacity="0.4"/>
    <rect x="60" y="48" width="8" height="8" fill="#C9A84C" opacity="0.4"/>
    <rect x="20" y="56" width="8" height="8" fill="#2ABFB0" opacity="0.5"/>
    <rect x="52" y="56" width="8" height="8" fill="#2ABFB0" opacity="0.5"/>
    <rect x="28" y="64" width="8" height="8" fill="#C9A84C" opacity="0.4"/>
    <rect x="44" y="64" width="8" height="8" fill="#C9A84C" opacity="0.4"/>
    <rect x="36" y="72" width="8" height="8" fill="#C9A84C" opacity="0.6"/>
  </svg>
);

const products = [
  { id: 1, name: "Архив / 001", desc: "Хлопковый оверсайз-худи с тюбетеичным орнаментом на спине", price: "8 900 ₽", tag: "НОВИНКА", size: ["XS","S","M","L","XL"] },
  { id: 2, name: "Код / 002", desc: "Куртка-бомбер с вышивкой в технике пиксель-арт", price: "16 500 ₽", tag: "ЛИМИТ", size: ["S","M","L"] },
  { id: 3, name: "Корни / 003", desc: "Туника с геометрическим узором тюбетейки, свободный крой", price: "7 200 ₽", tag: null, size: ["XS","S","M","L","XL","2XL"] },
  { id: 4, name: "Степь / 004", desc: "Широкие брюки с боковым орнаментом в стиле кипчакских узоров", price: "9 800 ₽", tag: "НОВИНКА", size: ["XS","S","M","L"] },
  { id: 5, name: "Цифра / 005", desc: "Лонгслив с принтом тюбетейки через цифровой фильтр", price: "5 400 ₽", tag: null, size: ["S","M","L","XL"] },
  { id: 6, name: "Манифест / 006", desc: "Двусторонняя ветровка: один слой — орнамент, второй — данные", price: "21 000 ₽", tag: "ЛИМИТ", size: ["S","M","L"] },
];

export default function Index() {
  const [activeNav, setActiveNav] = useState("главная");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<{name: string; price: string}[]>([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [heroLoaded, setHeroLoaded] = useState(false);

  type SectionKey = "главная" | "коллекции" | "о бренде" | "галерея" | "манифест" | "контакты";

  const главная = useRef<HTMLDivElement>(null);
  const коллекции = useRef<HTMLDivElement>(null);
  const оБренде = useRef<HTMLDivElement>(null);
  const галерея = useRef<HTMLDivElement>(null);
  const манифест = useRef<HTMLDivElement>(null);
  const контакты = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<SectionKey, React.RefObject<HTMLDivElement>> = {
    "главная": главная,
    "коллекции": коллекции,
    "о бренде": оБренде,
    "галерея": галерея,
    "манифест": манифест,
    "контакты": контакты,
  };

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
  }, []);

  const scrollTo = (key: string) => {
    setActiveNav(key);
    setMobileMenu(false);
    const ref = sectionRefs[key as SectionKey];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const addToCart = (product: typeof products[0]) => {
    setCartItems(prev => [...prev, { name: product.name, price: product.price }]);
    setCartCount(c => c + 1);
    setSelectedProduct(null);
  };

  const navItems: SectionKey[] = ["главная", "коллекции", "о бренде", "галерея", "манифест", "контакты"];

  return (
    <div className="min-h-screen" style={{ background: "var(--yana-dark)", color: "var(--yana-warm)" }}>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("главная")}>
            <PixelOrnament className="w-8 h-8" />
            <div>
              <div className="font-cormorant text-xl font-light tracking-[0.3em] gold-text">YANA</div>
              <div className="font-mono text-[8px] tracking-[0.2em] opacity-40" style={{ color: "var(--yana-warm)" }}>NEW CODE · OLD ROOTS</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button key={item} className={`nav-link ${activeNav === item ? "!opacity-100 gold-text" : ""}`} onClick={() => scrollTo(item)}>
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setCartOpen(true)} className="relative p-2 nav-link !opacity-80 hover:!opacity-100" style={{ color: "var(--yana-warm)" }}>
              <Icon name="ShoppingBag" size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-mono font-bold"
                  style={{ background: "var(--yana-gold)", color: "var(--yana-dark)" }}>
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden nav-link !opacity-80" onClick={() => setMobileMenu(!mobileMenu)}>
              <Icon name={mobileMenu ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-5 border-t" style={{ borderColor: "rgba(201,168,76,0.1)" }}>
            {navItems.map(item => (
              <button key={item} className={`nav-link text-left ${activeNav === item ? "!opacity-100 gold-text" : ""}`} onClick={() => scrollTo(item)}>
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section ref={главная} className="relative min-h-screen flex items-center overflow-hidden ornament-bg">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="YANA Hero" className="w-full h-full object-cover"
            style={{ opacity: 0.35, filter: "saturate(0.7) contrast(1.1)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.85) 100%)" }} />
        </div>

        <OrnamentSVG size={300} opacity={0.06} className="absolute -top-10 -right-10 animate-spin-slow" />
        <OrnamentSVG size={180} opacity={0.08} className="absolute bottom-20 left-10 animate-spin-slow" style={{ animationDirection: "reverse" }} />

        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2">
          <div className="font-mono text-[9px] tracking-[0.4em] opacity-30" style={{ writingMode: "vertical-rl", color: "var(--yana-gold)" }}>
            YANA BRAND © 2025
          </div>
          <div className="w-px h-20 opacity-20" style={{ background: "var(--yana-gold)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className={`${heroLoaded ? "opacity-100" : "opacity-0"} transition-all duration-1000`}>
            <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
              <div className="section-line" />
              <span className="font-mono text-[10px] tracking-[0.4em] opacity-50" style={{ color: "var(--yana-teal)" }}>
                DIGITAL TUBETEISM / КОЛЛЕКЦИЯ 2025
              </span>
            </div>

            <h1 className="font-cormorant font-light mb-6 leading-none">
              <span className="block text-6xl md:text-8xl lg:text-[9rem] animate-fade-in-up delay-100" style={{ color: "var(--yana-warm)" }}>Новый</span>
              <span className="block text-6xl md:text-8xl lg:text-[9rem] animate-fade-in-up delay-200 shimmer-text italic">Код.</span>
              <span className="block text-6xl md:text-8xl lg:text-[9rem] animate-fade-in-up delay-300" style={{ color: "var(--yana-warm)" }}>Старые</span>
              <span className="block text-6xl md:text-8xl lg:text-[9rem] animate-fade-in-up delay-400 italic" style={{ color: "var(--yana-gold)" }}>Корни.</span>
            </h1>

            <p className="font-ibm font-light text-lg max-w-md mb-10 opacity-60 animate-fade-in-up delay-500 leading-relaxed" style={{ color: "var(--yana-warm)" }}>
              Одежда для тех, кто живёт в ритме мегаполиса и помнит, откуда он.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-600">
              <button className="yana-btn-filled" onClick={() => scrollTo("коллекции")}>Смотреть коллекцию</button>
              <button className="yana-btn" onClick={() => scrollTo("манифест")}>Манифест бренда</button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <div className="font-mono text-[9px] tracking-[0.3em] opacity-30">SCROLL</div>
          <Icon name="ChevronDown" size={14} className="opacity-30" style={{ color: "var(--yana-gold)" }} />
        </div>
      </section>

      {/* COLLECTIONS */}
      <section ref={коллекции} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="section-line" />
            <span className="font-mono text-[10px] tracking-[0.4em] opacity-40" style={{ color: "var(--yana-teal)" }}>001 — КОЛЛЕКЦИИ</span>
          </div>
          <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
            <h2 className="font-cormorant text-5xl md:text-6xl font-light" style={{ color: "var(--yana-warm)" }}>
              Цифровой<br /><span className="italic gold-text">Тюбетеизм</span>
            </h2>
            <p className="font-ibm font-light text-sm max-w-xs opacity-50 leading-relaxed">
              Каждая вещь — диалог между пикселем и орнаментом. Между сервером и степью.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product, i) => (
              <div key={product.id}
                className="product-card p-0 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => setSelectedProduct(product)}>
                <div className="relative overflow-hidden ornament-dense" style={{ height: "260px", background: "linear-gradient(135deg, #141414 0%, #1a1a18 100%)" }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <OrnamentSVG size={140} opacity={0.2} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/2" style={{ background: "linear-gradient(to top, #141414, transparent)" }} />
                  {product.tag && (
                    <div className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.2em] px-2 py-1"
                      style={{ background: product.tag === "ЛИМИТ" ? "var(--yana-teal)" : "var(--yana-gold)", color: "var(--yana-dark)" }}>
                      {product.tag}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-cormorant text-xl font-light" style={{ color: "var(--yana-warm)" }}>{product.name}</h3>
                    <span className="font-mono text-sm gold-text font-normal">{product.price}</span>
                  </div>
                  <p className="font-ibm text-xs opacity-40 leading-relaxed mb-4">{product.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {product.size.map(s => (
                      <span key={s} className="font-mono text-[9px] px-2 py-0.5 border opacity-30"
                        style={{ borderColor: "rgba(201,168,76,0.2)", color: "var(--yana-warm)" }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section ref={оБренде} className="py-24 px-6 ornament-bg relative overflow-hidden">
        <OrnamentSVG size={400} opacity={0.04} className="absolute -left-20 top-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="relative organic-blob overflow-hidden" style={{ height: "520px", background: "var(--yana-charcoal)" }}>
                <img src={COLLECTION_IMG} alt="YANA Collection" className="w-full h-full object-cover"
                  style={{ opacity: 0.7, mixBlendMode: "luminosity" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.1) 0%, transparent 60%)" }} />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-panel p-6 animate-float"
                style={{ borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%" }}>
                <OrnamentSVG size={80} opacity={0.6} />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="section-line" />
                <span className="font-mono text-[10px] tracking-[0.4em] opacity-40" style={{ color: "var(--yana-teal)" }}>002 — О БРЕНДЕ</span>
              </div>
              <h2 className="font-cormorant text-5xl font-light mb-8 leading-tight">
                <span style={{ color: "var(--yana-warm)" }}>Знаю, кто я.</span><br />
                <span className="italic gold-text">Создаю завтра.</span>
              </h2>
              <div className="space-y-5 font-ibm text-sm font-light opacity-60 leading-relaxed">
                <p>YANA — это не просто бренд одежды. Это платформа для тех, кто вырос между двумя мирами: традиционной культурой и цифровым будущим.</p>
                <p>Каждый орнамент на наших вещах — это не декор. Это код. Национальный узор, переосмысленный через пиксель-арт и 3D-графику, становится новым языком идентичности.</p>
                <p>Татарский тюбетей встречается с Japanese streetwear. Кипчакский орнамент рифмуется с circuit board. Степь и сервер. Сабантуй и Software.</p>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t" style={{ borderColor: "rgba(201,168,76,0.1)" }}>
                {[{ num: "2025", label: "Год основания" }, { num: "47", label: "Предметов в коллекции" }, { num: "∞", label: "Орнаментов в ДНК" }].map(stat => (
                  <div key={stat.num}>
                    <div className="font-cormorant text-3xl gold-text mb-1">{stat.num}</div>
                    <div className="font-mono text-[9px] tracking-[0.15em] opacity-40 uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section ref={галерея} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="section-line" />
            <span className="font-mono text-[10px] tracking-[0.4em] opacity-40" style={{ color: "var(--yana-teal)" }}>003 — ГАЛЕРЕЯ</span>
          </div>
          <h2 className="font-cormorant text-5xl font-light mb-16" style={{ color: "var(--yana-warm)" }}>
            Визуальный<br /><span className="italic gold-text">архив</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3" style={{ gridTemplateRows: "200px 200px" }}>
            <div className="product-card col-span-2 row-span-2 ornament-dense relative overflow-hidden" style={{ background: "var(--yana-charcoal)" }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <OrnamentSVG size={200} opacity={0.15} className="animate-spin-slow" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.9), transparent)" }}>
                <span className="font-mono text-[9px] tracking-[0.2em] opacity-50">КАМПАНИЯ 2025</span>
                <p className="font-cormorant text-xl mt-1" style={{ color: "var(--yana-warm)" }}>New Code. Old Roots.</p>
              </div>
            </div>
            {[
              { label: "Детали орнамента", color: "rgba(42,191,176,0.05)" },
              { label: "Текстуры ткани", color: "rgba(201,168,76,0.05)" },
              { label: "SS26 Лукбук", color: "rgba(42,191,176,0.03)" },
              { label: "Архив паттернов", color: "rgba(201,168,76,0.08)" },
            ].map((item, i) => (
              <div key={i} className="product-card relative overflow-hidden ornament-dense"
                style={{ background: `linear-gradient(135deg, var(--yana-charcoal) 0%, ${item.color} 100%)` }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <PixelOrnament className="opacity-30" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.8), transparent)" }}>
                  <span className="font-mono text-[9px] tracking-[0.15em] opacity-50">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section ref={манифест} className="py-32 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, var(--yana-dark) 0%, #0d0c08 50%, var(--yana-dark) 100%)" }}>
        <OrnamentSVG size={500} opacity={0.04} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="section-line" />
            <span className="font-mono text-[10px] tracking-[0.4em] opacity-40" style={{ color: "var(--yana-teal)" }}>004 — МАНИФЕСТ</span>
            <div className="section-line" />
          </div>
          <h2 className="font-cormorant text-5xl md:text-7xl font-light mb-16 leading-tight">
            <span className="italic gold-text">Я знаю,</span>{" "}
            <span style={{ color: "var(--yana-warm)" }}>кто я.</span>
          </h2>
          <div className="space-y-6 text-left">
            {[
              { num: "I", title: "Корни — это не прошлое", text: "Национальная культура — не музей и не ностальгия. Это живой код, который можно переписать для нового мира. Орнамент — это алгоритм, созданный поколениями." },
              { num: "II", title: "Тело — это манифест", text: "Одежда — первое высказывание. То, что ты носишь — это заявление о том, кто ты и откуда. YANA — для тех, кто делает это заявление сознательно." },
              { num: "III", title: "Будущее строят те, кто помнит", text: "Настоящие инноваторы не отрезают себя от корней. Они компилируют прошлое в будущее. Мы создаём новый код на основе старых данных." },
            ].map((item, i) => (
              <div key={i} className="flex gap-8 items-start p-8 glass-panel" style={{ borderRadius: "0 40px 0 40px" }}>
                <span className="font-cormorant text-4xl italic flex-shrink-0 opacity-30 gold-text">{item.num}</span>
                <div>
                  <h3 className="font-cormorant text-2xl mb-3" style={{ color: "var(--yana-warm)" }}>{item.title}</h3>
                  <p className="font-ibm text-sm font-light opacity-50 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section ref={контакты} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="section-line" />
            <span className="font-mono text-[10px] tracking-[0.4em] opacity-40" style={{ color: "var(--yana-teal)" }}>005 — КОНТАКТЫ</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="font-cormorant text-5xl font-light mb-8 leading-tight">
                <span style={{ color: "var(--yana-warm)" }}>Свяжитесь</span><br />
                <span className="italic gold-text">с нами</span>
              </h2>
              <p className="font-ibm text-sm font-light opacity-50 leading-relaxed mb-10 max-w-sm">
                Коллаборации, оптовые заявки, пресс-запросы и просто хороший разговор — мы открыты.
              </p>
              <div className="space-y-6">
                {[
                  { icon: "Mail", label: "Email", value: "hello@yana-brand.com" },
                  { icon: "Instagram", label: "Instagram", value: "@yana.brand" },
                  { icon: "MapPin", label: "Город", value: "Казань / Москва" },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center border" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
                      <Icon name={item.icon as "Mail"} size={14} style={{ color: "var(--yana-gold)" }} />
                    </div>
                    <div>
                      <div className="font-mono text-[9px] tracking-[0.2em] opacity-30 uppercase mb-0.5">{item.label}</div>
                      <div className="font-ibm text-sm opacity-70">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-8" style={{ borderRadius: "40px 0 40px 0" }}>
              <h3 className="font-cormorant text-2xl mb-6" style={{ color: "var(--yana-warm)" }}>Оставить заявку</h3>
              <div className="space-y-4">
                {[
                  { label: "Имя", type: "text", placeholder: "Ваше имя" },
                  { label: "Email", type: "email", placeholder: "your@email.com" },
                ].map(field => (
                  <div key={field.label}>
                    <label className="font-mono text-[9px] tracking-[0.2em] opacity-40 uppercase block mb-2">{field.label}</label>
                    <input type={field.type} className="w-full bg-transparent border px-4 py-3 font-ibm text-sm outline-none transition-colors"
                      style={{ borderColor: "rgba(201,168,76,0.2)", color: "var(--yana-warm)", borderRadius: "4px" }}
                      placeholder={field.placeholder}
                      onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.6)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(201,168,76,0.2)")} />
                  </div>
                ))}
                <div>
                  <label className="font-mono text-[9px] tracking-[0.2em] opacity-40 uppercase block mb-2">Сообщение</label>
                  <textarea rows={4} className="w-full bg-transparent border px-4 py-3 font-ibm text-sm outline-none transition-colors resize-none"
                    style={{ borderColor: "rgba(201,168,76,0.2)", color: "var(--yana-warm)", borderRadius: "4px" }}
                    placeholder="Расскажите о вашем запросе..."
                    onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.6)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(201,168,76,0.2)")} />
                </div>
                <button className="yana-btn-filled w-full mt-2">Отправить сообщение</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t" style={{ borderColor: "rgba(201,168,76,0.08)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <PixelOrnament className="w-6 h-6 opacity-50" />
            <span className="font-mono text-[10px] tracking-[0.3em] opacity-30">YANA © 2025</span>
          </div>
          <div className="font-mono text-[9px] tracking-[0.25em] opacity-20 italic">NEW CODE · OLD ROOTS · DIGITAL TUBETEISM</div>
          <div className="flex gap-6">
            {["Политика", "Доставка", "Возврат"].map(link => (
              <button key={link} className="font-mono text-[9px] tracking-[0.15em] opacity-25 hover:opacity-60 transition-opacity"
                style={{ color: "var(--yana-warm)" }}>{link}</button>
            ))}
          </div>
        </div>
      </footer>

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setSelectedProduct(null)}>
          <div className="glass-panel w-full max-w-md p-8 animate-fade-in"
            style={{ borderRadius: "40px 0 40px 0" }}
            onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-cormorant text-3xl font-light mb-1" style={{ color: "var(--yana-warm)" }}>{selectedProduct.name}</h3>
                <span className="gold-text font-mono text-lg">{selectedProduct.price}</span>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="opacity-40 hover:opacity-80 transition-opacity">
                <Icon name="X" size={20} style={{ color: "var(--yana-warm)" }} />
              </button>
            </div>
            <p className="font-ibm text-sm opacity-50 leading-relaxed mb-6">{selectedProduct.desc}</p>
            <div className="mb-6">
              <div className="font-mono text-[9px] tracking-[0.2em] opacity-40 uppercase mb-3">Размер</div>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.size.map(s => (
                  <button key={s} className="font-mono text-xs px-3 py-1.5 border transition-all"
                    style={{ borderColor: "rgba(201,168,76,0.3)", color: "var(--yana-warm)" }}
                    onMouseEnter={e => { (e.target as HTMLButtonElement).style.borderColor = "var(--yana-gold)"; (e.target as HTMLButtonElement).style.color = "var(--yana-gold)"; }}
                    onMouseLeave={e => { (e.target as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.3)"; (e.target as HTMLButtonElement).style.color = "var(--yana-warm)"; }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <button className="yana-btn-filled w-full" onClick={() => addToCart(selectedProduct)}>Добавить в корзину</button>
          </div>
        </div>
      )}

      {/* CART SIDEBAR */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={() => setCartOpen(false)}>
          <div className="glass-panel w-full max-w-sm h-full flex flex-col animate-fade-in"
            style={{ borderLeft: "1px solid rgba(201,168,76,0.15)" }}
            onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: "rgba(201,168,76,0.1)" }}>
              <div>
                <h3 className="font-cormorant text-2xl font-light" style={{ color: "var(--yana-warm)" }}>Корзина</h3>
                <span className="font-mono text-[9px] tracking-[0.2em] opacity-40">{cartCount} ПОЗИЦ.</span>
              </div>
              <button onClick={() => setCartOpen(false)} className="opacity-40 hover:opacity-80 transition-opacity">
                <Icon name="X" size={18} style={{ color: "var(--yana-warm)" }} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-16">
                  <OrnamentSVG size={80} opacity={0.15} className="mx-auto mb-4" />
                  <p className="font-ibm text-sm opacity-30">Корзина пуста</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-4 border-b" style={{ borderColor: "rgba(201,168,76,0.08)" }}>
                      <div>
                        <div className="font-cormorant text-lg" style={{ color: "var(--yana-warm)" }}>{item.name}</div>
                        <div className="gold-text font-mono text-sm">{item.price}</div>
                      </div>
                      <button onClick={() => { setCartItems(prev => prev.filter((_, idx) => idx !== i)); setCartCount(c => c - 1); }}
                        className="opacity-30 hover:opacity-80 transition-opacity">
                        <Icon name="Trash2" size={14} style={{ color: "var(--yana-warm)" }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="p-6 border-t" style={{ borderColor: "rgba(201,168,76,0.1)" }}>
                <div className="flex justify-between mb-4">
                  <span className="font-mono text-[10px] tracking-[0.15em] opacity-40 uppercase">Итого</span>
                  <span className="font-cormorant text-xl gold-text">
                    {cartItems.reduce((acc, item) => acc + parseInt(item.price.replace(/\D/g, "")), 0).toLocaleString("ru")} ₽
                  </span>
                </div>
                <button className="yana-btn-filled w-full">Оформить заказ</button>
                <p className="font-mono text-[9px] text-center mt-3 opacity-25" style={{ color: "var(--yana-warm)" }}>Stripe · ЮKassa · СБП</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
