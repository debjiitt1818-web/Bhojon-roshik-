import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  AlertTriangle,
  Send,
  Phone,
  ShoppingBag,
  MessageSquare,
} from 'lucide-react';
import { CartItem, DeliveryAreaId, OrderDetails } from '../types/menu';
import { DELIVERY_AREAS, RESTAURANT_INFO } from '../data/menuData';
import {
  getEarliestDeliveryDate,
  formatDateToYYYYMMDD,
  formatFriendlyDate,
  isDateAtLeastTwoDaysAhead,
} from '../utils/dateHelper';
import { generateWhatsAppOrderUrl } from '../utils/whatsappHelper';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (menuItemId: string, portion: 'full' | 'half' | 'single', delta: number) => void;
  onRemoveItem: (menuItemId: string, portion: 'full' | 'half' | 'single') => void;
  onClearCart: () => void;
  onOrderSuccess: (details: {
    items: CartItem[];
    orderDetails: OrderDetails;
    subtotal: number;
    deliveryFee: number;
    grandTotal: number;
  }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
}) => {
  const earliestDate = getEarliestDeliveryDate();
  const earliestDateStr = formatDateToYYYYMMDD(earliestDate);

  // Quick 3-day date
  const inThreeDays = new Date(earliestDate);
  inThreeDays.setDate(inThreeDays.getDate() + 1);
  const inThreeDaysStr = formatDateToYYYYMMDD(inThreeDays);

  const [deliveryArea, setDeliveryArea] = useState<DeliveryAreaId>('kankurgachi');
  const [deliveryDate, setDeliveryDate] = useState(earliestDateStr);
  const [deliverySlot, setDeliverySlot] = useState<'lunch' | 'dinner' | 'custom'>('lunch');
  const [customTime, setCustomTime] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const selectedAreaObj = DELIVERY_AREAS.find((a) => a.id === deliveryArea) || DELIVERY_AREAS[0];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // All delivery charges are flat ₹40
  const deliveryFee = 40;
  const grandTotal = subtotal + (cartItems.length > 0 ? deliveryFee : 0);

  const isDateValid = isDateAtLeastTwoDaysAhead(deliveryDate);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (cartItems.length === 0) {
      setErrorMsg('Your order bag is empty. Please add items from our menu.');
      return;
    }

    if (!isDateValid) {
      setErrorMsg(
        `Orders must be placed at least 2 days in advance. Earliest delivery date is ${formatFriendlyDate(
          earliestDateStr
        )}.`
      );
      return;
    }

    const orderDetails: OrderDetails = {
      deliveryArea,
      deliveryDate,
      deliverySlot,
      customTime: deliverySlot === 'custom' ? customTime : undefined,
      specialInstructions: specialInstructions.trim() || undefined,
    };

    // Open WhatsApp directly
    const whatsappUrl = generateWhatsAppOrderUrl(
      cartItems,
      orderDetails,
      deliveryFee,
      subtotal,
      grandTotal
    );

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Trigger success callback
    onOrderSuccess({
      items: cartItems,
      orderDetails,
      subtotal,
      deliveryFee,
      grandTotal,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      {/* Backdrop click */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer Container */}
      <div className="w-full max-w-lg bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 border-l border-[#E7DFD5]">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E7DFD5] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#FAF3EC] text-[#9C3217]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-brand text-lg font-bold text-[#241D17]">
                Your Order Bag
              </h2>
              <p className="text-xs text-[#7A6B5D]">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} · No minimum order limit
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#FAF7F2] flex items-center justify-center text-[#7A6B5D] hover:text-[#241D17] transition-colors cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-6 flex-1">
          {/* Mandatory 2-Day Notice Alert inside Cart */}
          <div className="bg-[#FFF8E6] border border-[#F2DEAC] rounded-xl p-3.5 flex items-start gap-3">
            <Calendar className="w-5 h-5 text-[#C47D00] shrink-0 mt-0.5" />
            <div className="text-xs text-[#6B4B00] space-y-0.5">
              <p className="font-bold">Advance Order Policy (2 Days Ahead):</p>
              <p>
                Delivering to <strong>Kankurgachi, Salt Lake, Ultadanga, and New Town</strong>. Order any quantity or item.
              </p>
            </div>
          </div>

          {/* Cart Items List */}
          {cartItems.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#EFE9DF] text-[#7A6B5D] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <p className="font-serif-brand text-base font-semibold text-[#241D17]">
                Your bag is currently empty
              </p>
              <p className="text-xs text-[#7A6B5D] max-w-xs mx-auto">
                Explore our mouth-watering mutton kasha, chicken bharta, hot naans, and authentic Kolkata tarka.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-[#9C3217] rounded-lg transition-colors cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#7A6B5D] pb-1 border-b border-[#E7DFD5]">
                <span>Selected Delicacies (Any amount)</span>
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-rose-700 hover:underline font-medium cursor-pointer"
                >
                  Clear Bag
                </button>
              </div>

              {cartItems.map((ci) => (
                <div
                  key={`${ci.menuItemId}-${ci.portion}`}
                  className="bg-white rounded-xl p-3.5 border border-[#E7DFD5] flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif-brand text-sm font-bold text-[#241D17] truncate">
                        {ci.name}
                      </span>
                      {ci.portion !== 'single' && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#9C3217] bg-[#FAF3EC] px-1.5 py-0.5 rounded">
                          {ci.portion}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-[#7A6B5D] tabular-nums">
                      ₹{ci.price} each
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center gap-1 bg-[#FAF7F2] border border-[#DED4C7] rounded-lg p-0.5">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(ci.menuItemId, ci.portion, -1)}
                        className="w-6 h-6 flex items-center justify-center rounded bg-white text-[#9C3217] shadow-2xs hover:bg-[#FAF7F2] cursor-pointer"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-[#241D17] tabular-nums">
                        {ci.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(ci.menuItemId, ci.portion, 1)}
                        className="w-6 h-6 flex items-center justify-center rounded bg-[#9C3217] text-white shadow-2xs hover:bg-[#83260F] cursor-pointer"
                        aria-label="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right min-w-[50px]">
                      <span className="text-sm font-extrabold text-[#241D17] tabular-nums">
                        ₹{ci.price * ci.quantity}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(ci.menuItemId, ci.portion)}
                      className="text-[#998A7D] hover:text-rose-700 p-1 cursor-pointer transition-colors"
                      title="Remove dish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Form & Delivery Setup */}
          {cartItems.length > 0 && (
            <form onSubmit={handleCheckout} className="space-y-5 pt-2">
              {/* Delivery Date Picker */}
              <div className="pt-2 border-t border-[#E7DFD5]">
                <h3 className="font-serif-brand text-sm font-bold text-[#241D17] mb-2.5 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#9C3217]" />
                  <span>1. Delivery Date (Order before 2 days)</span>
                </h3>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryDate(earliestDateStr)}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        deliveryDate === earliestDateStr
                          ? 'bg-[#9C3217] text-white border-[#9C3217]'
                          : 'bg-white text-[#5D4E41] border-[#DED4C7] hover:border-[#9C3217]'
                      }`}
                    >
                      Earliest: {formatFriendlyDate(earliestDateStr)}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryDate(inThreeDaysStr)}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        deliveryDate === inThreeDaysStr
                          ? 'bg-[#9C3217] text-white border-[#9C3217]'
                          : 'bg-white text-[#5D4E41] border-[#DED4C7] hover:border-[#9C3217]'
                      }`}
                    >
                      In 3 Days: {formatFriendlyDate(inThreeDaysStr)}
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type="date"
                      min={earliestDateStr}
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-[#DED4C7] rounded-xl focus:outline-none focus:border-[#9C3217] text-[#241D17]"
                      required
                    />
                  </div>
                  {!isDateValid && (
                    <p className="text-[11px] text-rose-700 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Must be at least 2 days ahead (on or after {formatFriendlyDate(earliestDateStr)}).
                    </p>
                  )}
                </div>
              </div>

              {/* Delivery Hub Selector */}
              <div className="space-y-2">
                <label className="font-serif-brand text-sm font-bold text-[#241D17] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#9C3217]" />
                  <span>2. Delivery Area</span>
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {DELIVERY_AREAS.map((area) => {
                    const isSelected = deliveryArea === area.id;
                    return (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => setDeliveryArea(area.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FAF3EC] border-[#9C3217] ring-1 ring-[#9C3217]'
                            : 'bg-white border-[#DED4C7] hover:border-[#9C3217]/50'
                        }`}
                      >
                        <div className="font-serif-brand text-xs font-bold text-[#241D17]">
                          {area.name}
                        </div>
                        <div className="font-bengali text-[11px] text-[#9C3217]">
                          {area.bengaliName}
                        </div>
                        <div className="text-[10px] text-[#7A6B5D] mt-1">
                          Delivery: ₹{area.deliveryFee}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Time Slot */}
              <div className="space-y-2">
                <label className="font-serif-brand text-sm font-bold text-[#241D17] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#9C3217]" />
                  <span>3. Preferred Delivery Slot</span>
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliverySlot('lunch')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-left ${
                      deliverySlot === 'lunch'
                        ? 'bg-[#2C1810] text-white border-[#2C1810]'
                        : 'bg-white text-[#5D4E41] border-[#DED4C7] hover:border-[#2C1810]'
                    }`}
                  >
                    <span>Lunch Slot</span>
                    <span className="block text-[10px] opacity-80">12:30 PM - 2:30 PM</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliverySlot('dinner')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-left ${
                      deliverySlot === 'dinner'
                        ? 'bg-[#2C1810] text-white border-[#2C1810]'
                        : 'bg-white text-[#5D4E41] border-[#DED4C7] hover:border-[#2C1810]'
                    }`}
                  >
                    <span>Evening Slot</span>
                    <span className="block text-[10px] opacity-80">6:00 PM - 9:00 PM</span>
                  </button>
                </div>
              </div>

              {/* Optional Cooking Note */}
              <div className="space-y-1.5">
                <label className="font-serif-brand text-xs font-bold text-[#241D17] block">
                  Cooking Preference / Special Request (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Less spicy, mild oil, extra green chillies"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#DED4C7] rounded-xl focus:outline-none focus:border-[#9C3217] text-[#241D17]"
                />
              </div>

              {/* WhatsApp Connection Callout */}
              <div className="bg-[#EBF7EE] border border-[#C2E8CA] rounded-xl p-3 text-xs text-[#1E5D2F] flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#1B8A5A] shrink-0 mt-0.5" />
                <p>
                  <strong>Direct WhatsApp Connection:</strong> No sign-up or forms needed! Clicking the button below opens WhatsApp with your full order, where you can share your address directly with <strong>Manisha Ganguly</strong>.
                </p>
              </div>

              {/* Bill Summary */}
              <div className="bg-white rounded-xl p-4 border border-[#E7DFD5] space-y-2 text-xs">
                <div className="flex justify-between text-[#5D4E41]">
                  <span>Items Subtotal</span>
                  <span className="font-semibold tabular-nums text-[#241D17]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#5D4E41]">
                  <span>Delivery ({selectedAreaObj.name})</span>
                  <span className="font-semibold tabular-nums text-[#241D17]">
                    ₹{deliveryFee}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#F2ECE4] flex justify-between text-sm font-extrabold text-[#241D17]">
                  <span>Total</span>
                  <span className="text-base text-[#9C3217] tabular-nums">₹{grandTotal}</span>
                </div>
              </div>

              {/* Error warning */}
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Instant WhatsApp Order Button */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="submit"
                  disabled={!isDateValid}
                  className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    !isDateValid
                      ? 'bg-[#C4B7A6] cursor-not-allowed opacity-75'
                      : 'bg-[#1B8A5A] hover:bg-[#146E47] active:scale-[0.99]'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>Place Order on WhatsApp</span>
                </button>

                <div className="text-center">
                  <span className="text-[11px] text-[#7A6B5D]">
                    Prefer a direct phone call?{' '}
                  </span>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="text-[11px] font-bold text-[#9C3217] hover:underline inline-flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Manisha Ganguly ({RESTAURANT_INFO.phone})</span>
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
