import React, { useState } from 'react';
import { Plus, Minus, Check, Sparkles } from 'lucide-react';
import { MenuItem, DietType } from '../types/menu';

interface FoodItemCardProps {
  item: MenuItem;
  cartQuantity: number;
  currentPortionInCart?: 'full' | 'half' | 'single';
  onAddToCart: (item: MenuItem, portion: 'full' | 'half' | 'single') => void;
  onUpdateQuantity: (menuItemId: string, portion: 'full' | 'half' | 'single', delta: number) => void;
}

export const FoodItemCard: React.FC<FoodItemCardProps> = ({
  item,
  cartQuantity,
  currentPortionInCart,
  onAddToCart,
  onUpdateQuantity,
}) => {
  const portionPrice = typeof item.price === 'object' && item.price !== null ? item.price : null;
  const [selectedPortion, setSelectedPortion] = useState<'half' | 'full'>('full');

  const currentPrice = portionPrice
    ? (selectedPortion === 'half' && portionPrice.half !== undefined
        ? portionPrice.half
        : portionPrice.full)
    : (item.price as number);

  const activePortion = portionPrice ? selectedPortion : 'single';

  // Dietary symbol colors
  const getDietIcon = (diet: DietType) => {
    switch (diet) {
      case 'veg':
        return (
          <div className="w-4 h-4 border-2 border-emerald-600 p-[2px] flex items-center justify-center rounded-[3px] bg-white shrink-0" title="Pure Vegetarian">
            <div className="w-2 h-2 rounded-full bg-emerald-600" />
          </div>
        );
      case 'egg':
        return (
          <div className="w-4 h-4 border-2 border-amber-600 p-[2px] flex items-center justify-center rounded-[3px] bg-white shrink-0" title="Contains Egg">
            <div className="w-2 h-2 rounded-full bg-amber-600" />
          </div>
        );
      case 'non-veg':
      default:
        return (
          <div className="w-4 h-4 border-2 border-rose-700 p-[2px] flex items-center justify-center rounded-[3px] bg-white shrink-0" title="Non-Vegetarian">
            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-rose-700" />
          </div>
        );
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-[#E7DFD5] hover:border-[#D1C2AF] hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Top Media or Header */}
      {item.image ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF7F2]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-2 py-1 rounded shadow-xs">
            {getDietIcon(item.diet)}
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#4D3F35]">
              {item.diet === 'veg' ? 'Veg' : item.diet === 'egg' ? 'Egg' : 'Non-Veg'}
            </span>
          </div>

          {item.isChefSpecial && (
            <div className="absolute top-3 right-3 bg-[#9C3217] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#FFD166]" />
              <span>Chef's Choice</span>
            </div>
          )}
        </div>
      ) : null}

      {/* Main Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Row without image */}
          {!item.image && (
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                {getDietIcon(item.diet)}
                <span className="text-[11px] font-medium uppercase tracking-wider text-[#7A6B5D]">
                  {item.diet === 'veg' ? 'Veg' : item.diet === 'egg' ? 'Egg' : 'Non-Veg'}
                </span>
                {item.pieces && (
                  <>
                    <span className="text-[#C4B7A6]">·</span>
                    <span className="text-[11px] text-[#7A6B5D] font-medium">{item.pieces}</span>
                  </>
                )}
              </div>

              {item.isChefSpecial && (
                <span className="text-[11px] font-semibold text-[#9C3217] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#DE5D2C]" />
                  <span>Special</span>
                </span>
              )}
            </div>
          )}

          {/* Titles */}
          <div className="space-y-0.5">
            <h3 className="font-serif-brand text-lg font-bold text-[#241D17] leading-snug group-hover:text-[#9C3217] transition-colors">
              {item.name}
            </h3>
            {item.bengaliName && (
              <p className="font-bengali text-sm text-[#7A6B5D] font-normal">
                {item.bengaliName}
              </p>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-[#5D4E41] leading-relaxed mt-2 line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Portion Selector & Pricing Bottom */}
        <div className="mt-4 pt-3 border-t border-[#F2ECE4] space-y-3">
          {portionPrice && (
            <div className="flex items-center justify-between gap-2 bg-[#FAF7F2] p-1 rounded-lg border border-[#EBE3D7]">
              <span className="text-[11px] font-medium text-[#7A6B5D] px-2">Size:</span>
              <div className="flex items-center gap-1">
                {portionPrice.half !== undefined && (
                  <button
                    type="button"
                    onClick={() => setSelectedPortion('half')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                      selectedPortion === 'half'
                        ? 'bg-white text-[#9C3217] shadow-xs border border-[#DED4C7]'
                        : 'text-[#6E5D4F] hover:text-[#241D17]'
                    }`}
                  >
                    Half (₹{portionPrice.half})
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedPortion('full')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    selectedPortion === 'full'
                      ? 'bg-white text-[#9C3217] shadow-xs border border-[#DED4C7]'
                      : 'text-[#6E5D4F] hover:text-[#241D17]'
                  }`}
                >
                  Full (₹{portionPrice.full})
                </button>
              </div>
            </div>
          )}

          {/* Price & Action Row */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs text-[#7A6B5D]">
                {portionPrice ? (selectedPortion === 'half' ? 'Half portion' : 'Full portion') : 'Price'}
              </div>
              <div className="text-xl font-extrabold text-[#241D17] tabular-nums">
                ₹{currentPrice}
              </div>
            </div>

            {/* Cart Button or Stepper */}
            <div>
              {cartQuantity > 0 ? (
                <div className="flex items-center gap-2 bg-[#F3ECE2] border border-[#DE5D2C]/40 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, activePortion, -1)}
                    className="w-7 h-7 flex items-center justify-center rounded bg-white text-[#9C3217] hover:bg-[#FAF7F2] shadow-xs transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-[#241D17] tabular-nums">
                    {cartQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, activePortion, 1)}
                    className="w-7 h-7 flex items-center justify-center rounded bg-[#9C3217] text-white hover:bg-[#83260F] shadow-xs transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onAddToCart(item, activePortion)}
                  className="px-3.5 py-2 text-xs font-bold text-[#9C3217] bg-[#FAF3EC] hover:bg-[#9C3217] hover:text-white border border-[#E7CEBC] hover:border-[#9C3217] rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
