import { useState, useEffect, useRef } from "react";
import { type Prod, type Sec, NAV } from "@/components/yana/shared";
import Navbar from "@/components/yana/Navbar";
import Sections from "@/components/yana/Sections";
import { ProductModal, CartSidebar } from "@/components/yana/Overlays";

export default function Index() {
  const [sec, setSec]           = useState<Sec>("главная");
  const [cart, setCart]         = useState<Prod[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mob, setMob]           = useState(false);
  const [modal, setModal]       = useState<Prod | null>(null);
  const [sz, setSz]             = useState("");
  const [rdy, setRdy]           = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const refs: Record<Sec, React.RefObject<HTMLDivElement>> = {
    "главная":   useRef(null),
    "коллекции": useRef(null),
    "о бренде":  useRef(null),
    "галерея":   useRef(null),
    "манифест":  useRef(null),
    "контакты":  useRef(null),
  };

  useEffect(() => {
    setTimeout(() => setRdy(true), 60);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (k: Sec) => {
    setSec(k);
    setMob(false);
    refs[k]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const addCart = () => {
    if (modal && sz) {
      setCart(p => [...p, modal]);
      setModal(null);
      setSz("");
    }
  };

  const total = cart.reduce((a, i) => a + parseInt(i.price.replace(/\s/g, "")), 0);

  return (
    <div style={{ background: "var(--pale)", color: "var(--ink)", minHeight: "100vh" }}>
      <Navbar
        sec={sec}
        cart={cart}
        mob={mob}
        setMob={setMob}
        setCartOpen={setCartOpen}
        go={go}
      />

      <Sections
        refs={refs}
        rdy={rdy}
        go={go}
        setModal={setModal}
        setSz={setSz}
      />

      <ProductModal
        modal={modal}
        sz={sz}
        setSz={setSz}
        setModal={setModal}
        addCart={addCart}
      />

      <CartSidebar
        cartOpen={cartOpen}
        cart={cart}
        setCart={setCart}
        setCartOpen={setCartOpen}
        total={total}
      />
    </div>
  );
}
