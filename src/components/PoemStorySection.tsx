import React from 'react';
import { Heart, Sparkles, ChefHat, Phone, MessageSquare } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const PoemStorySection: React.FC = () => {
  return (
    <section id="story" className="py-20 bg-[#FAF3EC] border-b border-[#E7DFD5] relative overflow-hidden">
      {/* Decorative background element */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: The Heartfelt Bengali Poem Box */}
          <div className="lg:col-span-6">
            <div className="relative bg-[#FFFDF9] border border-[#DECFBA] rounded-3xl p-8 sm:p-12 shadow-sm text-center">
              {/* Top Bengali Calligraphy Accent */}
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#9C3217] font-semibold mb-6">
                <Heart className="w-3.5 h-3.5 fill-[#9C3217]" />
                <span>হৃদয়ের কথা · A Letter From Our Kitchen</span>
              </div>

              {/* The Bengali Verses exactly as written on Page 3 */}
              <div className="space-y-4 my-4 font-bengali text-[#2C1810]">
                {RESTAURANT_INFO.poemBengali.map((line, idx) => (
                  <p
                    key={idx}
                    className={`leading-relaxed tracking-wide ${
                      idx === 4 || idx === 5
                        ? 'text-xl sm:text-2xl font-bold text-[#9C3217]'
                        : 'text-lg sm:text-xl font-medium text-[#4A3B30]'
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* English lyrical translation */}
              <div className="mt-8 pt-6 border-t border-[#EFE5D7] text-xs sm:text-sm text-[#705F52] italic leading-relaxed">
                "{RESTAURANT_INFO.poemEnglish}"
              </div>

              {/* Signoff */}
              <div className="mt-6 flex flex-col items-center">
                <span className="font-serif-brand text-base font-bold text-[#241D17]">
                  By {RESTAURANT_INFO.founder}
                </span>
                <span className="text-xs text-[#7A6B5D] uppercase tracking-wider">
                  {RESTAURANT_INFO.name} · Kolkata
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Culinary Philosophy & The 2-Day Promise */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#DE5D2C]">
              <Sparkles className="w-4 h-4" />
              <span>The {RESTAURANT_INFO.nameEnglish} Way</span>
            </div>

            <h2 className="font-serif-brand text-3xl sm:text-4xl font-extrabold text-[#241D17] leading-tight">
              Cooked with the Soul of an Authentic Kolkata Home
            </h2>

            <p className="text-sm sm:text-base text-[#55473B] leading-relaxed">
              In a city that worships good food, <strong>{RESTAURANT_INFO.name} ({RESTAURANT_INFO.nameEnglish})</strong> was founded with one simple promise: to cook without industrial haste. No artificial food coloring, no re-heated commercial broths, and no microwave shortcuts.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF0E6] border border-[#DECFBA] text-[#9C3217] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#241D17]">
                    Why You Order 2 Days in Advance
                  </h3>
                  <p className="text-xs text-[#5D4E41] leading-relaxed mt-0.5">
                    Slow-cooking mutton or braising chicken bharta takes unhurried patience. When you order 48 hours ahead, Manisha personally procures the freshest morning cuts from Kolkata markets and marinates them overnight in freshly ground whole spices.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF0E6] border border-[#DECFBA] text-[#9C3217] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#241D17]">
                    Dedicated Delivery Routes
                  </h3>
                  <p className="text-xs text-[#5D4E41] leading-relaxed mt-0.5">
                    We focus our direct delivery exclusively on <strong>Kankurgachi, Salt Lake, Ultadanga, and New Town</strong> so food travels minimal distance and arrives hot, pristine, and comforting.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF0E6] border border-[#DECFBA] text-[#9C3217] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#241D17]">
                    Personal Attention to Every Palate
                  </h3>
                  <p className="text-xs text-[#5D4E41] leading-relaxed mt-0.5">
                    Need less spicy gravy for elders? Extra green chillies for your weekend friends adda? Manisha is always just a quick WhatsApp or phone call away.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.phoneRaw}?text=${encodeURIComponent('Hello Manisha Di, I would like to inquire about ordering from Bhojon Roshik.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1B8A5A] hover:bg-[#146E47] rounded-xl shadow-xs transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with Chef on WhatsApp</span>
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#4D3F35] bg-white hover:bg-[#FAF7F2] border border-[#DED4C7] rounded-xl transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#9C3217]" />
                <span className="tabular-nums">{RESTAURANT_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
