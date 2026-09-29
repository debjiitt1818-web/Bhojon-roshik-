import React from 'react';
import { Calendar, MapPin, ChefHat, Sparkles, ArrowDown, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface HeroProps {
  onScrollToMenu: () => void;
  onScrollToZones: () => void;
  onOpenOrderModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToMenu,
  onScrollToZones,
  onOpenOrderModal,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] pt-8 pb-16 lg:py-20 border-b border-[#E7DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Story & Call to Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Bengali kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C3217]">
              <ChefHat className="w-4 h-4 text-[#9C3217]" />
              <span>By {RESTAURANT_INFO.founder}</span>
              <span aria-hidden="true" className="text-[#C4B7A6]">·</span>
              <span>Kolkata, West Bengal</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="font-serif-brand text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#241D17] leading-[1.12]" style={{ textWrap: 'balance' }}>
              Authentic Kolkata Home Feasts & Dhaba Classics.
            </h1>

            {/* Bengali quote line */}
            <div className="border-l-3 border-[#DE5D2C] pl-4 py-1">
              <p className="font-bengali text-lg sm:text-xl font-medium text-[#7C240E] leading-relaxed">
                "সেই চেনা ভালোবাসার স্বাদই আমরা তুলে দিই আপনার পাতে"
              </p>
              <p className="text-xs text-[#7A6B5D] mt-0.5">
                Every dish prepared by hand with freshly ground spices & patience.
              </p>
            </div>

            {/* Subheading description */}
            <p className="text-base sm:text-lg text-[#55473B] leading-relaxed max-w-2xl">
              From slow-simmered <strong>Mutton Kasha</strong> and velvety <strong>Chicken Bharta</strong> to sizzling <strong>Egg Keema Tarka</strong> and delicate <strong>Dhokar Dalna</strong>. Freshly sourced and cooked strictly on-demand.
            </p>

            {/* Crucial Notice Card */}
            <div className="bg-[#F3ECE2] border border-[#E2D5C3] rounded-xl p-4 text-[#3C3026] space-y-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#DE5D2C]/10 text-[#9C3217] shrink-0 mt-0.5">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#241D17]">
                    Important: Order at least 2 Days in Advance
                  </h2>
                  <p className="text-xs text-[#5D4E41] leading-relaxed">
                    We maintain no frozen inventory. Every order is shopped fresh from the Kolkata bazaar 48 hours prior to delivery.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-[#E5DACD] text-xs text-[#5D4E41]">
                <MapPin className="w-4 h-4 text-[#9C3217] shrink-0" />
                <span>
                  <strong>Covered Locations:</strong> Kankurgachi, Salt Lake, Ultadanga, and New Town.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onScrollToMenu}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#9C3217] hover:bg-[#83260F] active:scale-[0.98] rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Browse Menu & Order</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToZones}
                className="px-5 py-3.5 text-sm font-semibold text-[#4D3F35] bg-white hover:bg-[#EFE9DF] border border-[#DED4C7] active:scale-[0.98] rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#9C3217]" />
                <span>Delivery Areas</span>
              </button>

              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="px-5 py-3.5 text-sm font-semibold text-[#4D3F35] bg-white hover:bg-[#EFE9DF] border border-[#DED4C7] rounded-xl transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#9C3217]" />
                <span>Call Kitchen</span>
              </a>
            </div>

            {/* Subtle metadata tags (anti-slop clean typography) */}
            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#7A6B5D] pt-2">
              <span>Pure Mustard Oil Cooking</span>
              <span aria-hidden="true">·</span>
              <span>100% Home Crafted</span>
              <span aria-hidden="true">·</span>
              <span>Hygienic Packaging</span>
              <span aria-hidden="true">·</span>
              <span>Lunch & Dinner Slots</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative soft border */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-[#EAE2D5] aspect-[4/3] lg:aspect-[4/3.2]">
                <img
                  src="/src/assets/images/hero_bengali_feast_1790651090475.jpg"
                  alt="Authentic Bengali Feast with Mutton Kasha, Steamed Rice, Dhokar Dalna, and Fragrant Pulao"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />

                {/* Scrim overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white text-left">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FFB638] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Signature Feast</span>
                  </div>
                  <h2 className="font-serif-brand text-xl sm:text-2xl font-bold leading-snug">
                    Traditional Bengali & Dhaba Spread
                  </h2>
                  <p className="text-xs sm:text-sm text-[#F3ECE2] mt-1 opacity-90">
                    Hand-crafted mutton kasha, dhoka, tarka, and butter naan prepared for your family celebrations.
                  </p>
                </div>
              </div>

              {/* Floating feature note (grounded, not floating random) */}
              <div className="mt-4 p-3.5 bg-white border border-[#E7DFD5] rounded-xl shadow-sm flex items-center justify-between gap-4 text-left">
                <div>
                  <p className="text-xs font-medium text-[#7A6B5D]">Delivery Schedule</p>
                  <p className="text-sm font-bold text-[#241D17]">Min 48 Hours Advance</p>
                </div>
                <div className="h-8 w-px bg-[#E7DFD5]" />
                <div>
                  <p className="text-xs font-medium text-[#7A6B5D]">Kolkata Zones</p>
                  <p className="text-sm font-bold text-[#241D17]">Kankurgachi · Salt Lake +</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
