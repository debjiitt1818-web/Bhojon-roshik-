import React, { useState } from 'react';
import { MapPin, Clock, CheckCircle2, Search, AlertCircle, Calendar } from 'lucide-react';
import { DELIVERY_AREAS, RESTAURANT_INFO } from '../data/menuData';

export const DeliveryZonesSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [matchResult, setMatchResult] = useState<{ found: boolean; zoneName?: string } | null>(null);

  const handleCheckArea = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setMatchResult(null);
      return;
    }

    // Check against delivery areas & popular spots
    for (const area of DELIVERY_AREAS) {
      if (
        area.name.toLowerCase().includes(query) ||
        area.bengaliName.toLowerCase().includes(query) ||
        area.description.toLowerCase().includes(query) ||
        area.popularSpots.some((spot) => spot.toLowerCase().includes(query))
      ) {
        setMatchResult({ found: true, zoneName: `${area.name} (${area.bengaliName})` });
        return;
      }
    }

    // Common synonyms
    const synonyms: Record<string, string> = {
      'kakurgachi': 'Kankurgachi (কাকুড়গাছি)',
      'kankurgachi': 'Kankurgachi (কাকুড়গাছি)',
      'saltlake': 'Salt Lake (সল্টলেক)',
      'bidhannagar': 'Salt Lake (সল্টলেক)',
      'sector 5': 'Salt Lake (সল্টলেক)',
      'ultodanga': 'Ultadanga (উল্টোডাঙa)',
      'ultadanga': 'Ultadanga (উল্টোডাঙা)',
      'newtow': 'New Town (নিউ টাউন)',
      'newtown': 'New Town (নিউ টাউন)',
      'rajarhat': 'New Town (নিউ টাউন)',
    };

    for (const [key, val] of Object.entries(synonyms)) {
      if (query.includes(key)) {
        setMatchResult({ found: true, zoneName: val });
        return;
      }
    }

    setMatchResult({ found: false });
  };

  return (
    <section id="delivery-zones" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E7DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C3217]">
            <MapPin className="w-4 h-4 text-[#DE5D2C]" />
            <span>Exclusively Serving Kolkata</span>
          </div>

          <h2 className="font-serif-brand text-3xl sm:text-4xl font-extrabold text-[#241D17] leading-tight">
            Our 4 Delivery Hubs in Kolkata
          </h2>

          <p className="text-sm sm:text-base text-[#5D4E41] leading-relaxed">
            To ensure your food arrives piping hot and straight from the kitchen stove, {RESTAURANT_INFO.name} currently accepts pre-orders for these four prime Kolkata neighborhoods.
          </p>
        </div>

        {/* 4 Delivery Hub Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DELIVERY_AREAS.map((area) => (
            <div
              key={area.id}
              className="bg-white rounded-2xl p-6 border border-[#E7DFD5] hover:border-[#9C3217]/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="p-2.5 rounded-xl bg-[#FAF3EC] text-[#9C3217]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#7A6B5D] bg-[#F7F2EB] px-2 py-0.5 rounded">
                    Fee: ₹{area.deliveryFee}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif-brand text-xl font-bold text-[#241D17]">
                    {area.name}
                  </h3>
                  <p className="font-bengali text-sm text-[#9C3217] font-semibold">
                    {area.bengaliName}
                  </p>
                </div>

                <p className="text-xs text-[#5D4E41] leading-relaxed">
                  {area.description}
                </p>

                <div className="pt-2 border-t border-[#F2ECE4]">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#7A6B5D] mb-1.5">
                    Common Landmarks:
                  </p>
                  <ul className="text-xs text-[#3C3026] space-y-1">
                    {area.popularSpots.map((spot, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#1B8A5A] shrink-0" />
                        <span>{spot}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#F2ECE4] text-[11px] text-[#7A6B5D] flex items-center justify-between">
                <span className="text-emerald-700 font-semibold">No Min Order Limit</span>
                <span className="text-[#9C3217] font-semibold">2 Days Advance</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Locality Checker Box */}
        <div className="mt-12 bg-white rounded-2xl border border-[#E7DFD5] p-6 sm:p-8 max-w-2xl mx-auto shadow-sm">
          <div className="text-center space-y-2 mb-5">
            <h3 className="font-serif-brand text-lg sm:text-xl font-bold text-[#241D17]">
              Check Your Kolkata Locality
            </h3>
            <p className="text-xs sm:text-sm text-[#5D4E41]">
              Enter your neighborhood, apartment complex, or landmark to verify delivery availability:
            </p>
          </div>

          <form onSubmit={handleCheckArea} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8C7A6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. City Centre 1, Phoolbagan, Hudco, Sector 5, Axis Mall"
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-[#FAF7F2] border border-[#DED4C7] rounded-xl focus:outline-none focus:border-[#9C3217] text-[#241D17]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#9C3217] hover:bg-[#83260F] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer shrink-0"
            >
              Verify Location
            </button>
          </form>

          {matchResult && (
            <div className="mt-4">
              {matchResult.found ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Yes, we deliver to you!</strong> Covered under our <strong>{matchResult.zoneName}</strong> hub. Remember to book 2 days ahead!
                  </span>
                </div>
              ) : (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span>
                      We primarily deliver within <strong>Kankurgachi, Salt Lake, Ultadanga, and New Town</strong>. If you are situated in adjacent areas, please call Manisha Ganguly directly at <strong className="tabular-nums">{RESTAURANT_INFO.phone}</strong> to confirm special catering!
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 2-Day Pre-Order Rule Explanation Banner */}
        <div className="mt-12 bg-[#2C1810] text-[#F3ECE2] rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#DE5D2C]/20 text-[#DE5D2C] shrink-0 mt-1">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">Why 2 Days in Advance?</h4>
              <p className="text-xs text-[#D8CCC0] mt-1 leading-relaxed">
                Zero commercial cold storage. Whole spices are roasted and ground by hand, meat is bought fresh from Kolkata bazaars on order morning.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#DE5D2C]/20 text-[#DE5D2C] shrink-0 mt-1">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">Delivery Slots</h4>
              <p className="text-xs text-[#D8CCC0] mt-1 leading-relaxed">
                Lunch Feast: <strong>12:30 PM – 2:30 PM</strong><br />
                Evening Feast: <strong>6:00 PM – 9:00 PM</strong><br />
                Custom party slots coordinated on WhatsApp.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#DE5D2C]/20 text-[#DE5D2C] shrink-0 mt-1">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">Direct Chef Contact</h4>
              <p className="text-xs text-[#D8CCC0] mt-1 leading-relaxed">
                Speaks directly with home cook {RESTAURANT_INFO.founder}. Customize spice levels, salt, or dietary preferences freely!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
