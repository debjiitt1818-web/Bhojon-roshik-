import React from 'react';
import { Calendar, MapPin, AlertCircle, ArrowRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface AdvanceNoticeBannerProps {
  onLearnMore: () => void;
  onViewZones: () => void;
}

export const AdvanceNoticeBanner: React.FC<AdvanceNoticeBannerProps> = ({
  onLearnMore,
  onViewZones,
}) => {
  return (
    <div className="bg-[#2C1810] text-[#F3ECE2] border-b border-[#432A20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          {/* Left: 2-day requirement */}
          <div className="flex items-center gap-2.5 text-center md:text-left">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#DE5D2C] text-white">
              <Calendar className="w-3.5 h-3.5" />
            </span>
            <p className="font-medium text-[#F3ECE2]">
              <strong className="text-white font-semibold underline decoration-[#DE5D2C] decoration-2">
                Order at least 2 days in advance:
              </strong>{' '}
              All curries and biryanis are prepared freshly on-demand by {RESTAURANT_INFO.founder}.
            </p>
          </div>

          {/* Right: Delivery Areas */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-[#E0D5C7]">
              <MapPin className="w-3.5 h-3.5 text-[#DE5D2C] shrink-0" />
              <span>Delivering to:</span>
              <strong className="text-white">Kankurgachi · Salt Lake · Ultadanga · New Town</strong>
            </div>

            <button
              onClick={onViewZones}
              className="inline-flex items-center gap-1 text-[#F29F05] hover:text-[#FFB638] font-semibold transition-colors cursor-pointer ml-1"
            >
              <span>View Hubs</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
