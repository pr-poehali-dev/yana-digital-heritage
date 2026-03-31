/* ─── shared constants, types, and primitive UI atoms ─── */

export const I = {
  hero:   "https://cdn.poehali.dev/projects/0e86868c-e374-43ab-90f3-136671219025/files/c4c99fbc-b188-4bf8-b9a5-4660554e8b6a.jpg",
  hero2:  "https://cdn.poehali.dev/projects/0e86868c-e374-43ab-90f3-136671219025/files/6ba6b109-6065-4666-82b4-01a035883a35.jpg",
  flat:   "https://cdn.poehali.dev/projects/0e86868c-e374-43ab-90f3-136671219025/files/291558f6-c327-44c2-b91a-c088772e288b.jpg",
  detail: "https://cdn.poehali.dev/projects/0e86868c-e374-43ab-90f3-136671219025/files/97d0ab66-87c0-4fa1-90c3-20cb6c85141e.jpg",
  coll:   "https://cdn.poehali.dev/projects/0e86868c-e374-43ab-90f3-136671219025/files/1cfd7b8e-f3f8-46b0-8c2f-ff2ae2e4f0bf.jpg",
  look:   "https://cdn.poehali.dev/projects/0e86868c-e374-43ab-90f3-136671219025/files/c05d001c-c918-4f24-bb32-1f7a40d21905.jpg",
};

export type Prod = {
  id: number; name: string; sub: string; price: string;
  tag: string | null; desc: string; sizes: string[]; color: string; img: string;
};

export const PRODUCTS: Prod[] = [
  { id:1, name:"Архив",    sub:"001", price:"8 900",  tag:"НОВИНКА", desc:"Оверсайз-худи. 100% органический хлопок с тюбетеичным орнаментом.", sizes:["XS","S","M","L","XL"],       color:"Молочный",      img:I.flat   },
  { id:2, name:"Код",      sub:"002", price:"16 500", tag:"ЛИМИТ",   desc:"Бомбер с пиксель-вышивкой. Японский нейлон, французская подкладка.", sizes:["S","M","L"],                color:"Антрацит",      img:I.hero2  },
  { id:3, name:"Корни",    sub:"003", price:"7 200",  tag:null,      desc:"Туника из льняной смеси. Геометрический орнамент тюбетейки.", sizes:["XS","S","M","L","XL","2XL"], color:"Песок",         img:I.detail },
  { id:4, name:"Степь",    sub:"004", price:"9 800",  tag:"НОВИНКА", desc:"Широкие брюки, высокая посадка. Кипчакский орнамент по боку.", sizes:["XS","S","M","L"],           color:"Терракот",      img:I.look   },
  { id:5, name:"Цифра",    sub:"005", price:"5 400",  tag:null,      desc:"Лонгслив из мерсеризованного хлопка. Принт — тюбетейка через цифровой фильтр.", sizes:["S","M","L","XL"], color:"Белый",    img:I.flat   },
  { id:6, name:"Манифест", sub:"006", price:"21 000", tag:"ЛИМИТ",   desc:"Двусторонняя ветровка. Орнамент / ASCII-данные.", sizes:["S","M","L"],                color:"Чёрный/Бежевый", img:I.hero  },
];

export const TICKER_MSG = [
  "YANA — SS 2025", "New Code. Old Roots.", "Цифровой Тюбетеизм",
  "Казань · Москва", "Бесплатная доставка от 8 000 ₽", "Лимитированная коллекция",
];

export const NAV = ["коллекции", "о бренде", "галерея", "манифест", "контакты"] as const;
export type Sec = typeof NAV[number] | "главная";

/* ─── Logo SVG ─── */
export const Logo = ({ light = false, size = 32 }: { light?: boolean; size?: number }) => {
  const c = light ? "#F7F3EE" : "#1A1714";
  const g = "#A07840";
  return (
    <svg width={size * 5.2} height={size} viewBox="0 0 208 40" fill="none">
      <polygon points="20,2 30,20 20,38 10,20" stroke={g} strokeWidth="1.1" fill="none"/>
      <polygon points="20,8 26,20 20,32 14,20" stroke={g} strokeWidth="0.6" fill="none"/>
      <circle cx="20" cy="20" r="2.5" fill={g} opacity="0.7"/>
      <circle cx="20" cy="2" r="1.2" fill={g} opacity="0.5"/>
      <circle cx="20" cy="38" r="1.2" fill={g} opacity="0.5"/>
      <circle cx="30" cy="20" r="1.2" fill={g} opacity="0.5"/>
      <circle cx="10" cy="20" r="1.2" fill={g} opacity="0.5"/>
      <rect x="18" y="0" width="4" height="1.5" fill={g} opacity="0.3"/>
      <rect x="18" y="38.5" width="4" height="1.5" fill={g} opacity="0.3"/>
      <text x="42" y="28" fontFamily="'Cormorant Garamond', serif" fontWeight="300"
        fontSize="28" letterSpacing="7" fill={c}>YANA</text>
      <text x="43" y="38" fontFamily="'IBM Plex Mono', monospace"
        fontSize="5.5" letterSpacing="3.2" fill={c} opacity="0.4">NEW CODE · OLD ROOTS</text>
    </svg>
  );
};

/* ─── Gem ornament ─── */
export const Gem = ({ s = 64, op = 0.15, spin = false }: { s?: number; op?: number; spin?: boolean }) => (
  <svg width={s} height={s} viewBox="0 0 60 60" fill="none"
    style={{ opacity: op, ...(spin ? { animation: "ornSpin 22s linear infinite" } : {}) }}>
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
