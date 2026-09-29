import React from 'react';
import { Sparkles, ArrowRight, Utensils, Star } from 'lucide-react';
import { MenuItem, CartItem } from '../types/menu';
import { MENU_ITEMS } from '../data/menuData';

interface SpecialitySectionProps {
  cartItems: CartItem[];
  onAddToCart: (item: MenuItem, portion: 'full' | 'half' | 'single') => void;
  onScrollToMenu: () => void;
}

export const SpecialitySection: React.FC<SpecialitySectionProps> = ({
  cartItems,
  onAddToCart,
  onScrollToMenu,
}) => {
  const specials = MENU_ITEMS.filter((item) => item.isChefSpecial);

  return (
    <section id="speciality" className="py-16 sm:py-20 bg-white border-b border-[#E7DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C3217] mb-2">
              <Star className="w-4 h-4 fill-[#DE5D2C] text-[#DE5D2C]" />
              <span>Kolkata Connoisseur's Choice</span>
            </div>
            <h2 className="font-serif-brand text-3xl sm:text-4xl font-extrabold text-[#241D17]">
              Chef's Signature Selections
            </h2>
            <p className="text-sm text-[#5D4E41] mt-1 max-w-xl">
              Slow simmered gravies, traditional street-style snacks, and heritage recipes refined by Manisha Ganguly over decades.
            </p>
          </div>

          <button
            onClick={onScrollToMenu}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#9C3217] hover:text-[#7C240E] transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>View Complete 35+ Dish Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specials.slice(0, 6).map((item) => {
            const portionPrice = typeof item.price === 'object' && item.price !== null ? item.price : null;
            const priceDisplay = portionPrice
              ? (portionPrice.half !== undefined
                  ? `₹${portionPrice.half} / ₹${portionPrice.full}`
                  : `₹${portionPrice.full}`)
              : `₹${item.price}`;

            return (
              <div
                key={item.id}
                className="group relative bg-[#FAF7F2] rounded-2xl p-5 border border-[#E7DFD5] hover:border-[#9C3217]/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {item.image && (
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 bg-[#EAE2D5]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2 text-xs mb-1">
                    <span className="font-semibold text-[#9C3217] uppercase tracking-wider text-[11px]">
                      {item.category.replace('-', ' ')}
                    </span>
                    <span className="text-[11px] font-bold text-[#7A6B5D]">
                      {item.diet === 'veg' ? 'Pure Veg' : item.diet === 'egg' ? 'Egg' : 'Non-Veg'}
                    </span>
                  </div>

                  <h3 className="font-serif-brand text-lg font-bold text-[#241D17] group-hover:text-[#9C3217] transition-colors">
                    {item.name}
                  </h3>
                  {item.bengaliName && (
                    <p className="font-bengali text-xs text-[#7A6B5D] mt-0.5">
                      {item.bengaliName}
                    </p>
                  )}

                  <p className="text-xs text-[#5D4E41] leading-relaxed mt-2 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#EBE3D7] flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-[#7A6B5D] block uppercase tracking-wider">Price</span>
                    <span className="text-base font-extrabold text-[#241D17] tabular-nums">
                      {priceDisplay}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddToCart(item, portionPrice ? 'full' : 'single')}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#9C3217] hover:bg-[#83260F] rounded-lg transition-colors cursor-pointer active:scale-95 shadow-xs"
                  >
                    + Add to Bag
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
