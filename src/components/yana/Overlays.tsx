import Icon from "@/components/ui/icon";
import { type Prod, Gem } from "./shared";

/* ════ PRODUCT MODAL ════ */
interface ProductModalProps {
  modal: Prod | null;
  sz: string;
  setSz: (s: string) => void;
  setModal: (p: Prod | null) => void;
  addCart: () => void;
}

export function ProductModal({ modal, sz, setSz, setModal, addCart }: ProductModalProps) {
  if (!modal) return null;
  return (
    <div
      style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"flex-end", justifyContent:"center", background:"rgba(26,23,20,0.6)", backdropFilter:"blur(8px)" }}
      onClick={() => setModal(null)}
    >
      <div
        style={{ width:"100%", maxWidth:560, background:"var(--pale)", padding:"48px 44px 56px" }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
          <div>
            <span className="t-label" style={{ color:"var(--mid)", fontSize:8.5 }}>/ {modal.sub}</span>
            <h3 className="t-serif" style={{ fontSize:26, margin:"4px 0 0" }}>{modal.name}</h3>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <span className="t-price" style={{ color:"var(--gold)", fontSize:22 }}>{modal.price} ₽</span>
            <button onClick={() => setModal(null)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--mid)", padding:4 }}>
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>

        <div className="line-gold" style={{ marginBottom:20 }} />

        <p className="t-caption" style={{ color:"var(--mid)", fontSize:15, marginBottom:24 }}>{modal.desc}</p>

        <div style={{ marginBottom:28 }}>
          <div className="t-label" style={{ fontSize:8, color:"var(--mid)", opacity:0.5, marginBottom:10 }}>ВЫБЕРИТЕ РАЗМЕР</div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {modal.sizes.map(s => (
              <button key={s} onClick={() => setSz(s)}
                style={{
                  fontFamily:"IBM Plex Mono", fontSize:9.5, letterSpacing:"0.15em", padding:"9px 16px",
                  border: `1px solid ${sz === s ? "var(--ink)" : "var(--linen)"}`,
                  background: sz === s ? "var(--ink)" : "transparent",
                  color: sz === s ? "var(--pale)" : "var(--ink)",
                  cursor:"pointer", transition:"all 0.2s",
                }}>
                {s}
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
  );
}

/* ════ CART SIDEBAR ════ */
interface CartSidebarProps {
  cartOpen: boolean;
  cart: Prod[];
  setCart: React.Dispatch<React.SetStateAction<Prod[]>>;
  setCartOpen: (v: boolean) => void;
  total: number;
}

export function CartSidebar({ cartOpen, cart, setCart, setCartOpen, total }: CartSidebarProps) {
  if (!cartOpen) return null;
  return (
    <div
      style={{ position:"fixed", inset:0, zIndex:200, display:"flex", justifyContent:"flex-end", background:"rgba(26,23,20,0.45)", backdropFilter:"blur(6px)" }}
      onClick={() => setCartOpen(false)}
    >
      <div
        style={{ width:"100%", maxWidth:400, height:"100%", background:"var(--pale)", borderLeft:"1px solid var(--linen)", display:"flex", flexDirection:"column" }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ padding:"24px 28px", borderBottom:"1px solid var(--linen)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <h3 className="t-serif" style={{ fontSize:20 }}>Корзина</h3>
            <span className="t-label" style={{ fontSize:8, color:"var(--mid)", opacity:0.45 }}>{cart.length} ПОЗИЦ.</span>
          </div>
          <button onClick={() => setCartOpen(false)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--mid)" }}>
            <Icon name="X" size={17} />
          </button>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:"20px 28px" }}>
          {cart.length === 0 ? (
            <div style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", opacity:0.25 }}>
              <Gem s={56} op={1} />
              <p className="t-caption" style={{ marginTop:14, color:"var(--mid)", fontSize:15 }}>Корзина пуста</p>
            </div>
          ) : cart.map((item, i) => (
            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 0", borderBottom:"1px solid var(--linen)" }}>
              <div>
                <div className="t-serif" style={{ fontSize:16 }}>{item.name}</div>
                <div className="t-price" style={{ fontSize:16, color:"var(--gold)" }}>{item.price} ₽</div>
              </div>
              <button onClick={() => setCart(p => p.filter((_, j) => j !== i))} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--mid)", opacity:0.4 }}>
                <Icon name="Trash2" size={13} />
              </button>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
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
  );
}
