import Link from "next/link";
import { Search, Heart, User, ShoppingBag } from "lucide-react";

export function SellerDashboardHeader() {
  return (
    <header className="sticky top-0 z-30 bg-background border-b border-border">
      <div className="bg-charcoal text-white text-center text-[11px] font-medium tracking-wide" style={{ height: 36, lineHeight: "36px" }}>
        Panel sprzedawcy FashionHero · Wersja testowa
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-[64px] flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-[20px] font-semibold tracking-tight text-charcoal">
            FashionHero
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium uppercase tracking-[0.5px]">
            <Link href="/seller/dashboard" className="text-charcoal hover:opacity-70 transition-opacity">Dashboard</Link>
            <span className="text-charcoal/40 cursor-default">Zamówienia</span>
            <span className="text-charcoal/40 cursor-default">Produkty</span>
            <span className="text-charcoal/40 cursor-default">Statystyki</span>
          </nav>
        </div>
        <div className="flex items-center gap-5 text-charcoal">
          <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
          <Heart className="w-[18px] h-[18px] hidden sm:block" strokeWidth={1.5} />
          <User className="w-[18px] h-[18px]" strokeWidth={1.5} />
          <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
        </div>
      </div>
    </header>
  );
}
