import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Filter, X, UtensilsCrossed } from 'lucide-react';
import { MenuItem, DietType, CartItem } from '../types/menu';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';
import { FoodItemCard } from './FoodItemCard';

interface MenuSectionProps {
  cartItems: CartItem[];
  onAddToCart: (item: MenuItem, portion: 'full' | 'half' | 'single') => void;
  onUpdateQuantity: (menuItemId: string, portion: 'full' | 'half' | 'single', delta: number) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  cartItems,
  onAddToCart,
  onUpdateQuantity,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDiet, setSelectedDiet] = useState<DietType | 'all'>('all');
  const [onlySpecials, setOnlySpecials] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Diet filter
      if (selectedDiet !== 'all' && item.diet !== selectedDiet) {
        return false;
      }
      // Specials filter
      if (onlySpecials && !item.isChefSpecial) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesBengali = item.bengaliName?.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesBengali && !matchesDesc) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedDiet, onlySpecials, searchQuery]);

  // Helper to get total quantity of a menu item in cart
  const getItemCartQty = (menuItemId: string) => {
    return cartItems
      .filter((ci) => ci.menuItemId === menuItemId)
      .reduce((sum, ci) => sum + ci.quantity, 0);
  };

  return (
    <section id="menu" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E7DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C3217]">
            <UtensilsCrossed className="w-4 h-4 text-[#DE5D2C]" />
            <span>Handcrafted Kitchen Menu</span>
          </div>

          <h2 className="font-serif-brand text-3xl sm:text-4xl font-extrabold text-[#241D17]">
            Our Authentic Delicacies
          </h2>

          <p className="text-sm sm:text-base text-[#5D4E41]">
            Slow cooked, authentic home style preparations with freshest local ingredients. Every item is freshly prepared 48 hours after your order is confirmed.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E7DFD5] shadow-xs mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8C7A6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mutton kasha, chicken bharta, tarka, naan, cutlets..."
                className="w-full pl-9 pr-9 py-2 text-sm bg-[#FAF7F2] border border-[#DED4C7] rounded-xl focus:outline-none focus:border-[#9C3217] text-[#241D17]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7A6B] hover:text-[#241D17] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dietary Filter Segmented Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-[#FAF7F2] rounded-xl border border-[#EBE3D7] self-start sm:self-auto overflow-x-auto max-w-full">
              <button
                type="button"
                onClick={() => setSelectedDiet('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedDiet === 'all'
                    ? 'bg-white text-[#241D17] shadow-xs'
                    : 'text-[#6E5D4F] hover:text-[#241D17]'
                }`}
              >
                All Diet
              </button>
              <button
                type="button"
                onClick={() => setSelectedDiet('veg')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  selectedDiet === 'veg'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-[#6E5D4F] hover:text-emerald-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                Pure Veg
              </button>
              <button
                type="button"
                onClick={() => setSelectedDiet('non-veg')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  selectedDiet === 'non-veg'
                    ? 'bg-white text-rose-800 shadow-xs'
                    : 'text-[#6E5D4F] hover:text-rose-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-700 inline-block" />
                Non-Veg
              </button>
              <button
                type="button"
                onClick={() => setSelectedDiet('egg')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  selectedDiet === 'egg'
                    ? 'bg-white text-amber-800 shadow-xs'
                    : 'text-[#6E5D4F] hover:text-amber-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-600 inline-block" />
                Egg
              </button>
            </div>

            {/* Chef's special toggle */}
            <button
              type="button"
              onClick={() => setOnlySpecials(!onlySpecials)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                onlySpecials
                  ? 'bg-[#9C3217] text-white border-[#9C3217] shadow-xs'
                  : 'bg-[#FAF7F2] text-[#6E5D4F] border-[#DED4C7] hover:border-[#9C3217]'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${onlySpecials ? 'text-[#FFD166]' : 'text-[#9C3217]'}`} />
              <span>Chef's Choice</span>
            </button>
          </div>

          {/* Category Tabs (Horizontally scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-[#F2ECE4] pt-3 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer flex flex-col items-center ${
                    isActive
                      ? 'bg-[#2C1810] text-white shadow-xs font-semibold'
                      : 'bg-[#FAF7F2] hover:bg-[#EFE8DE] text-[#55473B] border border-[#E7DFD5]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] ${isActive ? 'text-[#FFD166]' : 'text-[#8C7A6B]'}`}>
                    {cat.bengali}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#7A6B5D] mb-6 px-1">
          <div>
            Showing <strong className="text-[#241D17] tabular-nums">{filteredItems.length}</strong> items
            {selectedCategory !== 'all' && (
              <span> in <strong>{CATEGORIES.find((c) => c.id === selectedCategory)?.label}</strong></span>
            )}
            {selectedDiet !== 'all' && (
              <span> · Filtered by <strong>{selectedDiet.toUpperCase()}</strong></span>
            )}
          </div>

          {(selectedCategory !== 'all' || selectedDiet !== 'all' || onlySpecials || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDiet('all');
                setOnlySpecials(false);
                setSearchQuery('');
              }}
              className="text-[#9C3217] hover:underline font-semibold cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <FoodItemCard
                key={item.id}
                item={item}
                cartQuantity={getItemCartQty(item.id)}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E7DFD5] p-12 text-center max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FAF3EC] text-[#9C3217] flex items-center justify-center mx-auto">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="font-serif-brand text-lg font-bold text-[#241D17]">
              No dishes found
            </h3>
            <p className="text-xs text-[#5D4E41]">
              Try clearing your search term or selecting a different dietary filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDiet('all');
                setOnlySpecials(false);
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#9C3217] rounded-lg transition-colors cursor-pointer"
            >
              Show All Menu Items
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
