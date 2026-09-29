import React from 'react';
import { ShoppingBag, Phone, Clock, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenDeliveryInfo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenDeliveryInfo,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7DFD5]">
      {/* Top 3-Zone Contract Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="flex flex-col text-left group">
          <span className="font-serif-brand text-2xl sm:text-3xl font-extrabold tracking-tight text-[#9C3217] group-hover:text-[#7C240E] transition-colors leading-tight">
            {RESTAURANT_INFO.name}
          </span>
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#6E5D4F]">
            {RESTAURANT_INFO.nameEnglish}
          </span>
        </a>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4D3F35]">
          <a href="#menu" className="hover:text-[#9C3217] transition-colors">
            Our Menu
          </a>
          <a href="#speciality" className="hover:text-[#9C3217] transition-colors">
            Chef's Specials
          </a>
          <a href="#delivery-zones" className="hover:text-[#9C3217] transition-colors flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#9C3217]" />
            Delivery Hubs
          </a>
          <a href="#story" className="hover:text-[#9C3217] transition-colors">
            Our Heritage
          </a>
          <button
            onClick={onOpenDeliveryInfo}
            className="hover:text-[#9C3217] transition-colors text-left flex items-center gap-1.5 cursor-pointer text-[#9C3217] font-semibold"
          >
            <Clock className="w-3.5 h-3.5" />
            2-Day Pre-Order Rule
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#4D3F35] bg-[#EFE9DF] hover:bg-[#E4DCD0] rounded-lg transition-colors whitespace-nowrap"
            title="Call Manisha Ganguly directly"
          >
            <Phone className="w-3.5 h-3.5 text-[#9C3217]" />
            <span className="tabular-nums">{RESTAURANT_INFO.phone}</span>
          </a>

          <button
            onClick={onOpenCart}
            aria-label="View Food Cart"
            className="relative flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#9C3217] hover:bg-[#83260F] active:scale-95 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            {cartCount > 0 ? (
              <span className="flex items-center gap-1 bg-[#DE5D2C] px-2 py-0.5 rounded text-xs font-bold text-white tabular-nums">
                {cartCount} · ₹{cartTotal}
              </span>
            ) : (
              <span className="text-white/80 text-xs hidden sm:inline">Empty</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
