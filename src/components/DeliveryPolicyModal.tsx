import React from 'react';
import { X, Calendar, MapPin, CheckCircle2, ShieldCheck, Heart, Phone } from 'lucide-react';
import { RESTAURANT_INFO, DELIVERY_AREAS } from '../data/menuData';

interface DeliveryPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrder: () => void;
}

export const DeliveryPolicyModal: React.FC<DeliveryPolicyModalProps> = ({
  isOpen,
  onClose,
  onOpenOrder,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#7A6B5D] hover:text-[#241D17] w-8 h-8 rounded-full hover:bg-white flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 text-left">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9C3217]">
            <Calendar className="w-4 h-4 text-[#DE5D2C]" />
            <span>Kitchen Policy</span>
          </div>
          <h2 className="font-serif-brand text-2xl font-extrabold text-[#241D17]">
            The 2-Day Advance Order & Delivery Promise
          </h2>
          <p className="text-xs sm:text-sm text-[#5D4E41]">
            How we cook at <strong>{RESTAURANT_INFO.name} ({RESTAURANT_INFO.nameEnglish})</strong> by {RESTAURANT_INFO.founder}.
          </p>
        </div>

        {/* The 3 Pillars */}
        <div className="space-y-3.5 text-left">
          <div className="bg-white rounded-xl p-4 border border-[#E7DFD5] space-y-1">
            <h3 className="font-serif-brand text-sm font-bold text-[#241D17] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>1. Zero Frozen Stock Guarantee</span>
            </h3>
            <p className="text-xs text-[#5D4E41] leading-relaxed">
              Unlike commercial takeaway restaurants that keep pre-fried cutlets and frozen gravy bases in freezers for weeks, {RESTAURANT_INFO.nameEnglish} procures goat meat, poultry, fish, and seasonal veggies on the day of delivery from local Kolkata markets.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-[#E7DFD5] space-y-1">
            <h3 className="font-serif-brand text-sm font-bold text-[#241D17] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>2. Authentic Slow-Cooking & Overnight Marination</span>
            </h3>
            <p className="text-xs text-[#5D4E41] leading-relaxed">
              Dishes like our signature <strong>Mutton Kasha</strong> and <strong>Chicken Bharta</strong> require unhurried simmering in pure mustard oil, slow onion caramelization, and tenderizing in freshly ground spices. Ordering 2 days in advance allows this authentic flavor to develop.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-[#E7DFD5] space-y-1">
            <h3 className="font-serif-brand text-sm font-bold text-[#241D17] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#9C3217]" />
              <span>3. Exclusive 4 Delivery Hubs in Kolkata</span>
            </h3>
            <p className="text-xs text-[#5D4E41] leading-relaxed">
              We focus our delivery radius exclusively on:
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-semibold text-[#241D17]">
              {DELIVERY_AREAS.map((a) => (
                <div key={a.id} className="bg-[#FAF7F2] p-2 rounded-lg border border-[#EBE3D7]">
                  • {a.name} ({a.bengaliName})
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[#7A6B5D] pt-1">
              By serving these zones directly, our food arrives hot without having spent hours stuck in cross-city traffic.
            </p>
          </div>
        </div>

        {/* Contact info footer in modal */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="text-xs font-semibold text-[#4D3F35] flex items-center gap-1.5 hover:text-[#9C3217]"
          >
            <Phone className="w-3.5 h-3.5 text-[#9C3217]" />
            <span>Questions? Call {RESTAURANT_INFO.phone}</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onOpenOrder();
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#9C3217] hover:bg-[#83260F] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Got it, Let's Order
          </button>
        </div>
      </div>
    </div>
  );
};
