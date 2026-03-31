import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/0e86868c-e374-43ab-90f3-136671219025/files/5b3c5f81-674d-44aa-a8f1-089b2f79e449.jpg";
const COLLECTION_IMG = "https://cdn.poehali.dev/projects/0e86868c-e374-43ab-90f3-136671219025/files/1cfd7b8e-f3f8-46b0-8c2f-ff2ae2e4f0bf.jpg";

const OrnamentSVG = ({ size = 120, opacity = 0.12, className = "", style: s }: { size?: number; opacity?: number; className?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className} style={{ opacity, ...s }}>
    <polygon points="60,4 116,60 60,116 4,60" stroke="#9B6E2E" strokeWidth="1" fill="none"/>
    <polygon points="60,16 104,60 60,104 16,60" stroke="#9B6E2E" strokeWidth="0.8" fill="none"/>
    <polygon points="60,28 92,60 60,92 28,60" stroke="#2A7A72" strokeWidth="0.6" fill="none"/>
    <circle cx="60" cy="60" r="8" stroke="#9B6E2E" strokeWidth="0.8" fill="none"/>
    <circle cx="60" cy="60" r="3" fill="#9B6E2E" opacity="0.5"/>
    <circle cx="60" cy="4" r="2" fill="#2A7A72" opacity="0.7"/>
    <circle cx="116" cy="60" r="2" fill="#2A7A72" opacity="0.7"/>
    <circle cx="60" cy="116" r="2" fill="#2A7A72" opacity="0.7"/>
    <circle cx="4" cy="60" r="2" fill="#2A7A72" opacity="0.7"/>
    <line x1="60" y1="4" x2="60" y2="28" stroke="#9B6E2E" strokeWidth="0.5" opacity="0.4"/>
    <line x1="116" y1="60" x2="92" y2="60" stroke="#9B6E2E" strokeWidth="0.5" opacity="0.4"/>
    <line x1="60" y1="116" x2="60" y2="92" stroke="#9B6E2E" strokeWidth="0.5" opacity="0.4"/>
    <line x1="4" y1="60" x2="28" y2="60" stroke="#9B6E2E" strokeWidth="0.5" opacity="0.4"/>
    <polygon points="60,36 84,60 60,84 36,60" stroke="#9B6E2E" strokeWidth="0.4" fill="rgba(155,110,46,0.04)"/>
  </svg>
);

const PixelOrnament = ({ className = "" }: { className?: string }) => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className={className}>
    <rect x="36" y="0" width="8" height="8" fill="#9B6E2E" opacity="0.5"/>
    <rect x="28" y="8" width="8" height="8" fill="#9B6E2E" opacity="0.35"/>
    <rect x="44" y="8" width="8" height="8" fill="#9B6E2E" opacity="0.35"/>
    <rect x="20" y="16" width="8" height="8" fill="#2A7A72" opacity="0.4"/>
    <rect x="36" y="16" width="8" height="8" fill="#9B6E2E" opacity="0.25"/>
    <rect x="52" y="16" width="8" height="8" fill="#2A7A72" opacity="0.4"/>
    <rect x="12" y="24" width="8" height="8" fill="#9B6E2E" opacity="0.35"/>
    <rect x="60" y="24" width="8" height="8" fill="#9B6E2E" opacity="0.35"/>
    <rect x="0" y="36" width="8" height="8" fill="#9B6E2E" opacity="0.5"/>
    <rect x="36" y="36" width="8" height="8" fill="#2A7A72" opacity="0.6"/>
    <rect x="72" y="36" width="8" height="8" fill="#9B6E2E" opacity="0.5"/>
    <rect x="12" y="48" width="8" height="8" fill="#9B6E2E" opacity="0.35"/>
    <rect x="60" y="48" width="8" height="8" fill="#9B6E2E" opacity="0.35"/>
    <rect x="20" y="56" width="8" height="8" fill="#2A7A72" opacity="0.4"/>
    <rect x="52" y="56" width="8" height="8" fill="#2A7A72" opacity="0.4"/>
    <rect x="28" y="64" width="8" height="8" fill="#9B6E2E" opacity="0.35"/>
    <rect x="44" y="64" width="8" height="8" fill="#9B6E2E" opacity="0.35"/>
    <rect x="36" y="72" width="8" height="8" fill="#9B6E2E" opacity="0.5"/>
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

  useEffect(() => { setTimeout(() => setHeroLoaded(true), 100); }, []);

  const scrollTo = (key: string) => {
    setActiveNav(key);
    setMobileMenu(false);
    sectionRefs[key as SectionKey]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const addToCart = (product: typeof products[0]) => {
    setCartItems(prev => [...prev, { name: product.name, price: product.price }]);
    setCartCount(c => c + 1);
    setSelectedProduct(null);
  };

  const navItems: SectionKey[] = ["главная", "коллекции", "о бренде", "галерея", "манифест", "контакты"];

  return (
    <div className="min-h-screen" style={{ background: "var(--yana-warm)", color: "var(--yana-ink)" }}>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel" style={{ borderBottom: "1px solid var(--yana-border)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("главная")}>
            <PixelOrnament className="w-8 h-8" />
            <div>
              <div className="font-playfair text-lg font-normal tracking-[0.25em] italic" style={{ color: "var(--yana-gold)" }}>YANA</div>
              <div className="font-mono text-[8px] tracking-[0.18em] opacity-35" style={{ color: "var(--yana-ink)" }}>NEW CODE · OLD ROOTS</div>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button key={item} className={`nav-link ${activeNav === item ? "!opacity-100 gold-text" : ""}`} onClick={() => scrollTo(item)}>
                {item}
              </button>
            ))}
          </div>

          {/* Cart + mobile toggle */}
          <div className="flex items-center gap-4">
            <button onClick={() => setCartOpen(true)} className="relative p-2 nav-link !opacity-60 hover:!opacity-100" style={{ color: "var(--yana-ink)" }}>
              <Icon name="ShoppingBag" size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-mono font-bold"
                  style={{ background: "var(--yana-gold)", color: "var(--yana-warm)" }}>
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden nav-link !opacity-60" onClick={() => setMobileMenu(!mobileMenu)}>
              <Icon name={mobileMenu ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-5 border-t" style={{ borderColor: "var(--yana-border)", background: "var(--yana-cream)" }}>
            {navItems.map(item => (
              <button key={item} className={`nav-link text-left ${activeNav === item ? "!opacity-100 gold-text" : ""}`} onClick={() => scrollTo(item)}>
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section ref={главная} className="relative min-h-screen flex items-center overflow-hidden ornament-bg"
        style={{ background: "var(--yana-cream)" }}>

        {/* Right: large image panel */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <img src={HERO_IMG} alt="YANA" className="w-full h-full object-cover"
            style={{ opacity: 0.55, filter: "sepia(20%) contrast(1.05)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, var(--yana-cream) 0%, transparent 40%)" }} />
        </div>

        {/* Floating ornaments */}
        <OrnamentSVG size={340} opacity={0.07} className="absolute -top-16 right-[10%] animate-spin-slow hidden lg:block" />
        <OrnamentSVG size={180} opacity={0.06} className="absolute bottom-16 left-4 animate-spin-slow" style={{ animationDirection: "reverse" }} />

        {/* Vertical label */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3">
          <div className="w-px h-16 opacity-20" style={{ background: "var(--yana-gold)" }} />
          <div className="font-mono text-[8px] tracking-[0.5em] opacity-25" style={{ writingMode: "vertical-rl", color: "var(--yana-gold)", transform: "rotate(180deg)" }}>
            YANA BRAND © 2025
          </div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-20 w-full">
          <div className={`max-w-2xl transition-all duration-1000 ${heroLoaded ? "opacity-100" : "opacity-0"}`}>

            <div className="flex items-center gap-3 mb-10 animate-fade-in-up">
              <div className="section-line" />
              <span className="font-mono text-[10px] tracking-[0.4em] opacity-40" style={{ color: "var(--yana-teal)" }}>
                DIGITAL TUBETEISM · КОЛЛЕКЦИЯ 2025
              </span>
            </div>

            {/* Main headline — mixed fonts & styles */}
            <h1 className="mb-8 leading-[1.05]">
              <span className="block font-playfair font-normal text-6xl md:text-7xl lg:text-[86px] animate-fade-in-up delay-100"
                style={{ color: "var(--yana-ink)" }}>
                Новый
              </span>
              <span className="block font-cormorant font-light italic text-6xl md:text-7xl lg:text-[86px] animate-fade-in-up delay-200 shimmer-text">
                Код.
              </span>
              <span className="block font-playfair font-normal text-6xl md:text-7xl lg:text-[86px] animate-fade-in-up delay-300"
                style={{ color: "var(--yana-ink)" }}>
                Старые
              </span>
              <span className="block font-cormorant font-light italic text-6xl md:text-7xl lg:text-[86px] animate-fade-in-up delay-400"
                style={{ color: "var(--yana-gold)" }}>
                Корни.
              </span>
            </h1>

            <p className="font-garamond italic text-xl leading-relaxed mb-10 animate-fade-in-up delay-500"
              style={{ color: "var(--yana-muted)", maxWidth: "420px" }}>
              Одежда для тех, кто живёт в ритме мегаполиса и помнит, откуда он.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-600">
              <button className="yana-btn-filled" onClick={() => scrollTo("коллекции")}>Смотреть коллекцию</button>
              <button className="yana-btn" onClick={() => scrollTo("манифест")}>Манифест бренда</button>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <div className="font-mono text-[8px] tracking-[0.35em] opacity-25">SCROLL</div>
          <Icon name="ChevronDown" size={13} className="opacity-25" style={{ color: "var(--yana-gold)" }} />
        </div>
      </section>

      {/* ── COLLECTIONS ── */}
      <section ref={коллекции} className="py-24 px-6" style={{ background: "var(--yana-warm)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-line" />
            <span className="font-mono text-[10px] tracking-[0.4em] opacity-35" style={{ color: "var(--yana-teal)" }}>
              001 — КОЛЛЕКЦИИ
            </span>
          </div>

          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <h2 className="leading-tight">
              <span className="block font-playfair text-5xl md:text-6xl font-normal" style={{ color: "var(--yana-ink)" }}>
                Цифровой
              </span>
              <span className="block font-cormorant italic text-5xl md:text-6xl font-light gold-text">
                Тюбетеизм
              </span>
            </h2>
            <p className="font-garamond italic text-lg max-w-xs leading-relaxed" style={{ color: "var(--yana-muted)" }}>
              Каждая вещь — диалог между пикселем и орнаментом. Между сервером и степью.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <div key={product.id}
                className="product-card animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s` }}
                onClick={() => setSelectedProduct(product)}>

                {/* Image area */}
                <div className="relative overflow-hidden ornament-dense" style={{ height: "250px", background: "var(--yana-parchment)" }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <OrnamentSVG size={130} opacity={0.25} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/3"
                    style={{ background: "linear-gradient(to top, var(--yana-parchment), transparent)" }} />
                  {product.tag && (
                    <div className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.18em] px-2 py-1"
                      style={{
                        background: product.tag === "ЛИМИТ" ? "var(--yana-teal)" : "var(--yana-gold)",
                        color: "#FAF7F2"
                      }}>
                      {product.tag}
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-playfair text-lg font-normal" style={{ color: "var(--yana-ink)" }}>
                      {product.name}
                    </h3>
                    <span className="font-cormorant italic text-lg gold-text">{product.price}</span>
                  </div>
                  <p className="font-ibm text-xs leading-relaxed mb-4" style={{ color: "var(--yana-muted)", opacity: 0.8 }}>
                    {product.desc}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {product.size.map(s => (
                      <span key={s} className="font-mono text-[9px] px-2 py-0.5 border"
                        style={{ borderColor: "var(--yana-border)", color: "var(--yana-muted)" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section ref={оБренде} className="py-24 px-6 ornament-bg" style={{ background: "var(--yana-cream)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="organic-blob overflow-hidden" style={{ height: "500px", background: "var(--yana-parchment)" }}>
                <img src={COLLECTION_IMG} alt="YANA Collection"
                  className="w-full h-full object-cover"
                  style={{ opacity: 0.75, filter: "sepia(15%) contrast(1.05)" }} />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 glass-panel p-5 animate-float"
                style={{ borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%", border: "1px solid var(--yana-border)" }}>
                <OrnamentSVG size={70} opacity={0.5} />
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="section-line" />
                <span className="font-mono text-[10px] tracking-[0.4em] opacity-35" style={{ color: "var(--yana-teal)" }}>
                  002 — О БРЕНДЕ
                </span>
              </div>

              <h2 className="mb-8 leading-tight">
                <span className="block font-playfair text-4xl md:text-5xl font-normal" style={{ color: "var(--yana-ink)" }}>
                  Знаю, кто я.
                </span>
                <span className="block font-cormorant italic text-4xl md:text-5xl font-light gold-text">
                  Создаю завтра.
                </span>
              </h2>

              <div className="space-y-5 font-garamond text-lg italic leading-relaxed" style={{ color: "var(--yana-muted)" }}>
                <p>
                  YANA — это не просто бренд одежды. Это платформа для тех, кто вырос между двумя мирами: традиционной культурой и цифровым будущим.
                </p>
                <p>
                  Каждый орнамент на наших вещах — это не декор. Это код. Национальный узор, переосмысленный через пиксель-арт и 3D-графику, становится новым языком идентичности.
                </p>
              </div>

              <hr className="yana-divider my-8" />

              <div className="grid grid-cols-3 gap-6">
                {[
                  { num: "2025", label: "Год основания" },
                  { num: "47", label: "Предметов" },
                  { num: "∞", label: "Орнаментов" },
                ].map(stat => (
                  <div key={stat.num}>
                    <div className="font-cormorant italic text-4xl gold-text mb-1">{stat.num}</div>
                    <div className="font-mono text-[9px] tracking-[0.15em] uppercase" style={{ color: "var(--yana-muted)", opacity: 0.6 }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section ref={галерея} className="py-24 px-6" style={{ background: "var(--yana-warm)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-line" />
            <span className="font-mono text-[10px] tracking-[0.4em] opacity-35" style={{ color: "var(--yana-teal)" }}>
              003 — ГАЛЕРЕЯ
            </span>
          </div>
          <h2 className="mb-16 leading-tight">
            <span className="block font-playfair text-5xl font-normal" style={{ color: "var(--yana-ink)" }}>Визуальный</span>
            <span className="block font-cormorant italic text-5xl font-light gold-text">архив</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ gridTemplateRows: "220px 220px" }}>
            {/* Large tile */}
            <div className="product-card col-span-2 row-span-2 ornament-dense relative overflow-hidden"
              style={{ background: "var(--yana-parchment)" }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <OrnamentSVG size={210} opacity={0.18} className="animate-spin-slow" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6"
                style={{ background: "linear-gradient(to top, rgba(234,224,206,0.95), transparent)" }}>
                <span className="font-mono text-[9px] tracking-[0.2em] opacity-40" style={{ color: "var(--yana-ink)" }}>
                  КАМПАНИЯ 2025
                </span>
                <p className="font-cormorant italic text-2xl mt-1" style={{ color: "var(--yana-ink)" }}>
                  New Code. Old Roots.
                </p>
              </div>
            </div>

            {[
              { label: "Детали орнамента", bg: "rgba(42,122,114,0.06)" },
              { label: "Текстуры ткани",   bg: "rgba(155,110,46,0.07)" },
              { label: "SS26 Лукбук",       bg: "rgba(42,122,114,0.04)" },
              { label: "Архив паттернов",  bg: "rgba(155,110,46,0.1)" },
            ].map((item, i) => (
              <div key={i} className="product-card relative overflow-hidden ornament-dense"
                style={{ background: `linear-gradient(135deg, var(--yana-cream) 0%, ${item.bg} 100%)` }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <PixelOrnament className="opacity-40" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3"
                  style={{ background: "linear-gradient(to top, rgba(243,237,226,0.9), transparent)" }}>
                  <span className="font-garamond italic text-sm" style={{ color: "var(--yana-muted)" }}>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section ref={манифест} className="py-32 px-6 ornament-bg relative" style={{ background: "var(--yana-parchment)" }}>
        <OrnamentSVG size={480} opacity={0.05} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="section-line" />
            <span className="font-mono text-[10px] tracking-[0.4em] opacity-35" style={{ color: "var(--yana-teal)" }}>
              004 — МАНИФЕСТ
            </span>
            <div className="section-line" />
          </div>

          <h2 className="mb-16 leading-tight">
            <span className="font-cormorant italic text-6xl md:text-7xl font-light gold-text">Я знаю, </span>
            <span className="font-playfair text-6xl md:text-7xl font-normal" style={{ color: "var(--yana-ink)" }}>кто я.</span>
          </h2>

          <div className="space-y-6 text-left">
            {[
              {
                num: "I",
                title: "Корни — это не прошлое",
                text: "Национальная культура — не музей и не ностальгия. Это живой код, который можно переписать для нового мира. Орнамент — это алгоритм, созданный поколениями."
              },
              {
                num: "II",
                title: "Тело — это манифест",
                text: "Одежда — первое высказывание. То, что ты носишь — это заявление о том, кто ты и откуда. YANA — для тех, кто делает это заявление сознательно."
              },
              {
                num: "III",
                title: "Будущее строят те, кто помнит",
                text: "Настоящие инноваторы не отрезают себя от корней. Они компилируют прошлое в будущее. Мы создаём новый код на основе старых данных."
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-8 items-start p-8"
                style={{
                  background: "rgba(250,247,242,0.7)",
                  border: "1px solid var(--yana-border)",
                  borderRadius: "0 32px 0 32px"
                }}>
                <span className="font-cormorant italic text-5xl flex-shrink-0 gold-text" style={{ opacity: 0.4, lineHeight: 1 }}>
                  {item.num}
                </span>
                <div>
                  <h3 className="font-playfair text-xl font-normal mb-3" style={{ color: "var(--yana-ink)" }}>
                    {item.title}
                  </h3>
                  <p className="font-garamond italic text-lg leading-relaxed" style={{ color: "var(--yana-muted)" }}>
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section ref={контакты} className="py-24 px-6" style={{ background: "var(--yana-warm)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-line" />
            <span className="font-mono text-[10px] tracking-[0.4em] opacity-35" style={{ color: "var(--yana-teal)" }}>
              005 — КОНТАКТЫ
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="mb-8 leading-tight">
                <span className="block font-playfair text-5xl font-normal" style={{ color: "var(--yana-ink)" }}>Свяжитесь</span>
                <span className="block font-cormorant italic text-5xl font-light gold-text">с нами</span>
              </h2>

              <p className="font-garamond italic text-lg leading-relaxed mb-10 max-w-sm" style={{ color: "var(--yana-muted)" }}>
                Коллаборации, оптовые заявки, пресс-запросы и просто хороший разговор — мы открыты.
              </p>

              <div className="space-y-6">
                {[
                  { icon: "Mail", label: "Email", value: "hello@yana-brand.com" },
                  { icon: "Instagram", label: "Instagram", value: "@yana.brand" },
                  { icon: "MapPin", label: "Город", value: "Казань / Москва" },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center border"
                      style={{ borderColor: "var(--yana-border)", background: "var(--yana-cream)" }}>
                      <Icon name={item.icon as "Mail"} size={14} style={{ color: "var(--yana-gold)" }} />
                    </div>
                    <div>
                      <div className="font-mono text-[9px] tracking-[0.2em] uppercase mb-0.5" style={{ color: "var(--yana-muted)", opacity: 0.5 }}>
                        {item.label}
                      </div>
                      <div className="font-ibm text-sm" style={{ color: "var(--yana-ink)", opacity: 0.75 }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="p-8" style={{
              background: "var(--yana-cream)",
              border: "1px solid var(--yana-border)",
              borderRadius: "32px 0 32px 0"
            }}>
              <h3 className="font-playfair text-2xl font-normal mb-1" style={{ color: "var(--yana-ink)" }}>
                Оставить заявку
              </h3>
              <p className="font-garamond italic mb-6" style={{ color: "var(--yana-muted)" }}>
                Ответим в течение суток
              </p>

              <div className="space-y-4">
                {[
                  { label: "Имя", type: "text", placeholder: "Ваше имя" },
                  { label: "Email", type: "email", placeholder: "your@email.com" },
                ].map(field => (
                  <div key={field.label}>
                    <label className="font-mono text-[9px] tracking-[0.2em] uppercase block mb-2"
                      style={{ color: "var(--yana-muted)", opacity: 0.6 }}>
                      {field.label}
                    </label>
                    <input type={field.type}
                      className="w-full bg-transparent border px-4 py-3 font-ibm text-sm outline-none transition-colors"
                      style={{ borderColor: "var(--yana-border)", color: "var(--yana-ink)", borderRadius: "4px" }}
                      placeholder={field.placeholder}
                      onFocus={e => (e.target.style.borderColor = "var(--yana-gold)")}
                      onBlur={e => (e.target.style.borderColor = "var(--yana-border)")} />
                  </div>
                ))}
                <div>
                  <label className="font-mono text-[9px] tracking-[0.2em] uppercase block mb-2"
                    style={{ color: "var(--yana-muted)", opacity: 0.6 }}>
                    Сообщение
                  </label>
                  <textarea rows={4}
                    className="w-full bg-transparent border px-4 py-3 font-ibm text-sm outline-none transition-colors resize-none"
                    style={{ borderColor: "var(--yana-border)", color: "var(--yana-ink)", borderRadius: "4px" }}
                    placeholder="Расскажите о вашем запросе..."
                    onFocus={e => (e.target.style.borderColor = "var(--yana-gold)")}
                    onBlur={e => (e.target.style.borderColor = "var(--yana-border)")} />
                </div>
                <button className="yana-btn-filled w-full mt-2">Отправить сообщение</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6" style={{ background: "var(--yana-cream)", borderTop: "1px solid var(--yana-border)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <PixelOrnament className="w-5 h-5 opacity-40" />
            <span className="font-cormorant italic text-base gold-text">YANA</span>
            <span className="font-mono text-[9px] tracking-[0.2em] opacity-25" style={{ color: "var(--yana-ink)" }}>© 2025</span>
          </div>
          <div className="font-garamond italic text-sm opacity-30" style={{ color: "var(--yana-muted)" }}>
            New Code · Old Roots · Digital Tubeteism
          </div>
          <div className="flex gap-6">
            {["Политика", "Доставка", "Возврат"].map(link => (
              <button key={link}
                className="font-mono text-[9px] tracking-[0.15em] transition-opacity hover:opacity-70"
                style={{ color: "var(--yana-muted)", opacity: 0.35 }}>
                {link}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* ── PRODUCT MODAL ── */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
          style={{ background: "rgba(44,32,22,0.5)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelectedProduct(null)}>
          <div className="w-full max-w-md p-8 animate-fade-in"
            style={{ background: "var(--yana-warm)", border: "1px solid var(--yana-border)", borderRadius: "32px 0 32px 0" }}
            onClick={e => e.stopPropagation()}>

            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="font-playfair text-2xl font-normal mb-1" style={{ color: "var(--yana-ink)" }}>
                  {selectedProduct.name}
                </h3>
                <span className="font-cormorant italic text-xl gold-text">{selectedProduct.price}</span>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="opacity-30 hover:opacity-70 transition-opacity">
                <Icon name="X" size={18} style={{ color: "var(--yana-ink)" }} />
              </button>
            </div>

            <p className="font-garamond italic text-base leading-relaxed mb-6" style={{ color: "var(--yana-muted)" }}>
              {selectedProduct.desc}
            </p>

            <div className="mb-6">
              <div className="font-mono text-[9px] tracking-[0.2em] uppercase mb-3" style={{ color: "var(--yana-muted)", opacity: 0.5 }}>
                Размер
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.size.map(s => (
                  <button key={s} className="font-mono text-xs px-3 py-1.5 border transition-all"
                    style={{ borderColor: "var(--yana-border)", color: "var(--yana-ink)" }}
                    onMouseEnter={e => { (e.target as HTMLButtonElement).style.borderColor = "var(--yana-gold)"; (e.target as HTMLButtonElement).style.color = "var(--yana-gold)"; }}
                    onMouseLeave={e => { (e.target as HTMLButtonElement).style.borderColor = "var(--yana-border)"; (e.target as HTMLButtonElement).style.color = "var(--yana-ink)"; }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <button className="yana-btn-filled w-full" onClick={() => addToCart(selectedProduct)}>
              Добавить в корзину
            </button>
          </div>
        </div>
      )}

      {/* ── CART SIDEBAR ── */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end"
          style={{ background: "rgba(44,32,22,0.4)", backdropFilter: "blur(4px)" }}
          onClick={() => setCartOpen(false)}>
          <div className="w-full max-w-sm h-full flex flex-col animate-fade-in"
            style={{ background: "var(--yana-warm)", borderLeft: "1px solid var(--yana-border)" }}
            onClick={e => e.stopPropagation()}>

            <div className="p-6 flex items-center justify-between" style={{ borderBottom: "1px solid var(--yana-border)" }}>
              <div>
                <h3 className="font-playfair text-xl font-normal" style={{ color: "var(--yana-ink)" }}>Корзина</h3>
                <span className="font-mono text-[9px] tracking-[0.2em] opacity-35" style={{ color: "var(--yana-muted)" }}>
                  {cartCount} ПОЗИЦ.
                </span>
              </div>
              <button onClick={() => setCartOpen(false)} className="opacity-35 hover:opacity-70 transition-opacity">
                <Icon name="X" size={18} style={{ color: "var(--yana-ink)" }} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-16">
                  <OrnamentSVG size={70} opacity={0.15} className="mx-auto mb-4" />
                  <p className="font-garamond italic text-base" style={{ color: "var(--yana-muted)", opacity: 0.5 }}>
                    Корзина пуста
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-4"
                      style={{ borderBottom: "1px solid var(--yana-border)" }}>
                      <div>
                        <div className="font-playfair text-base" style={{ color: "var(--yana-ink)" }}>{item.name}</div>
                        <div className="font-cormorant italic text-base gold-text">{item.price}</div>
                      </div>
                      <button onClick={() => { setCartItems(p => p.filter((_, idx) => idx !== i)); setCartCount(c => c - 1); }}
                        className="opacity-25 hover:opacity-60 transition-opacity">
                        <Icon name="Trash2" size={13} style={{ color: "var(--yana-ink)" }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6" style={{ borderTop: "1px solid var(--yana-border)" }}>
                <div className="flex justify-between mb-4">
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: "var(--yana-muted)", opacity: 0.5 }}>
                    Итого
                  </span>
                  <span className="font-cormorant italic text-2xl gold-text">
                    {cartItems.reduce((acc, item) => acc + parseInt(item.price.replace(/\D/g, "")), 0).toLocaleString("ru")} ₽
                  </span>
                </div>
                <button className="yana-btn-filled w-full">Оформить заказ</button>
                <p className="font-mono text-[9px] text-center mt-3 opacity-20" style={{ color: "var(--yana-muted)" }}>
                  Stripe · ЮKassa · СБП
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
