import React from 'react';
import { Phone, MapPin, Calendar, Heart, MessageSquare } from 'lucide-react';
import { RESTAURANT_INFO, DELIVERY_AREAS } from '../data/menuData';

interface FooterProps {
  onOpenDeliveryPolicy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDeliveryPolicy }) => {
  return (
    <footer className="bg-[#241711] text-[#E8DFD3] border-t border-[#3B281E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Soul */}
          <div className="space-y-3">
            <div className="space-y-0.5">
              <span className="font-serif-brand text-2xl font-bold text-white block">
                {RESTAURANT_INFO.name}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#D39B75] font-semibold">
                {RESTAURANT_INFO.nameEnglish}
              </span>
            </div>
            <p className="text-xs text-[#B5A596] leading-relaxed">
              Homemade authentic Bengali and dhaba cuisine by <strong>{RESTAURANT_INFO.founder}</strong>. Prepared with pure ingredients, love, and slow-cooking traditions.
            </p>
            <div className="pt-2">
              <span className="text-[11px] text-[#A39282] italic font-bengali block">
                "সেই চেনা ভালোবাসার স্বাদই আমরা তুলে দিই আপনার পাতে"
              </span>
            </div>
          </div>

          {/* Delivery Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Kolkata Delivery Hubs
            </h4>
            <ul className="text-xs space-y-2 text-[#C9BCB0]">
              {DELIVERY_AREAS.map((area) => (
                <li key={area.id} className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#DE5D2C] shrink-0 mt-0.5" />
                  <span>
                    <strong>{area.name}</strong> ({area.bengaliName})
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ordering Policy */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Ordering Policy
            </h4>
            <ul className="text-xs space-y-2 text-[#C9BCB0]">
              <li className="flex items-start gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#DE5D2C] shrink-0 mt-0.5" />
                <span>
                  <strong>2-Day Advance Notice:</strong> All orders must be placed at least 48 hours ahead.
                </span>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenDeliveryPolicy}
                  className="text-xs text-[#FFB638] hover:underline cursor-pointer font-medium"
                >
                  Read full preparation promise & FAQ
                </button>
              </li>
              <li className="text-[11px] text-[#9E8E80] pt-1">
                Lunch Feast: 12:30 PM - 2:30 PM<br />
                Evening Feast: 6:00 PM - 9:00 PM
              </li>
            </ul>
          </div>

          {/* Direct Kitchen Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Kitchen Contact
            </h4>
            <div className="text-xs space-y-2 text-[#C9BCB0]">
              <p>
                <strong>Chef & Founder:</strong> {RESTAURANT_INFO.founder}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#382319] hover:bg-[#4A2F22] text-white text-xs font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#DE5D2C]" />
                  <span className="tabular-nums">{RESTAURANT_INFO.phone}</span>
                </a>
              </div>
              <div className="pt-1">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.phoneRaw}?text=${encodeURIComponent('Hello Manisha Di, I would like to place an order with Bhojon Roshik.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1B8A5A] hover:bg-[#146E47] text-white text-xs font-semibold transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Chef Direct</span>
                </a>
              </div>
              <p className="text-[11px] text-[#9E8E80] pt-1">
                {RESTAURANT_INFO.location}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#3B281E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7B6E]">
          <div>
            © {new Date().getFullYear()} {RESTAURANT_INFO.name} ({RESTAURANT_INFO.nameEnglish}). Handcrafted by {RESTAURANT_INFO.founder}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-[#DE5D2C] fill-[#DE5D2C]" />
            <span>for Kolkata Food Connoisseurs</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
