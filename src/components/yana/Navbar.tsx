import Icon from "@/components/ui/icon";
import { Logo, NAV, TICKER_MSG, type Sec, type Prod } from "./shared";

interface NavbarProps {
  sec: Sec;
  cart: Prod[];
  mob: boolean;
  setMob: (v: boolean) => void;
  setCartOpen: (v: boolean) => void;
  go: (k: Sec) => void;
}

const tickerItems = [...TICKER_MSG, ...TICKER_MSG, ...TICKER_MSG, ...TICKER_MSG];

export default function Navbar({ sec, cart, mob, setMob, setCartOpen, go }: NavbarProps) {
  return (
    <>
      {/* ════ TICKER ════ */}
      <div style={{ background:"var(--ink)", height:30, overflow:"hidden", display:"flex", alignItems:"center" }}>
        <div className="ticker-track">
          {tickerItems.map((t, i) => (
            <span key={i} className="t-label" style={{ color:"var(--pale)", opacity:0.7, padding:"0 40px", fontSize:8.5, whiteSpace:"nowrap" }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ════ NAV ════ */}
      <nav className="nav-wrap" style={{ top:30 }}>
        <div style={{ maxWidth:1320, margin:"0 auto", padding:"0 40px", height:58, display:"flex", alignItems:"center", justifyContent:"space-between" }}>

          <button onClick={() => go("главная")} style={{ background:"none", border:"none", cursor:"pointer", padding:0, lineHeight:0 }}>
            <Logo size={26} />
          </button>

          <div className="hidden md:flex" style={{ gap:40 }}>
            {NAV.map(k => (
              <button key={k} className={`nav-link ${sec === k ? "on" : ""}`} onClick={() => go(k)}>{k}</button>
            ))}
          </div>

          <div style={{ display:"flex", gap:20, alignItems:"center" }}>
            <button onClick={() => setCartOpen(true)} style={{ background:"none", border:"none", cursor:"pointer", position:"relative", color:"var(--mid)", display:"flex", alignItems:"center" }}>
              <Icon name="ShoppingBag" size={17} />
              {cart.length > 0 && (
                <span style={{ position:"absolute", top:-6, right:-7, width:14, height:14, borderRadius:"50%", background:"var(--ink)", color:"var(--pale)", fontSize:7.5, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"IBM Plex Mono" }}>
                  {cart.length}
                </span>
              )}
            </button>
            <button className="md:hidden nav-link" style={{ color:"var(--mid)", display:"flex", alignItems:"center" }} onClick={() => setMob(!mob)}>
              <Icon name={mob ? "X" : "Menu"} size={17} />
            </button>
          </div>
        </div>

        {mob && (
          <div style={{ background:"var(--pale)", borderTop:"1px solid var(--linen)", padding:"24px 40px", display:"flex", flexDirection:"column", gap:18 }}>
            {NAV.map(k => (
              <button key={k} className={`nav-link ${sec === k ? "on" : ""}`} style={{ textAlign:"left" }} onClick={() => go(k)}>{k}</button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
