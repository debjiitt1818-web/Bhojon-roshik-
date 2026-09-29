import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, Printer, X, MessageSquare, Phone } from 'lucide-react';
import { CartItem, OrderDetails } from '../types/menu';
import { RESTAURANT_INFO, DELIVERY_AREAS } from '../data/menuData';
import { formatFriendlyDate } from '../utils/dateHelper';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    items: CartItem[];
    orderDetails: OrderDetails;
    subtotal: number;
    deliveryFee: number;
    grandTotal: number;
  } | null;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  orderData,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !orderData) return null;

  const { items, orderDetails, subtotal, deliveryFee, grandTotal } = orderData;
  const areaObj = DELIVERY_AREAS.find((a) => a.id === orderDetails.deliveryArea);

  const getSummaryText = () => {
    let text = `${RESTAURANT_INFO.nameEnglish} (${RESTAURANT_INFO.name}) Order Summary\n`;
    text += `Delivery Area: ${areaObj?.name || orderDetails.deliveryArea}\n`;
    text += `Date: ${formatFriendlyDate(orderDetails.deliveryDate)} (${orderDetails.deliverySlot})\n\n`;
    text += `Items:\n`;
    items.forEach((item, i) => {
      text += `${i + 1}. ${item.name} (${item.portion}) x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    text += `\nSubtotal: ₹${subtotal}\n`;
    text += `Delivery: ₹${deliveryFee}\n`;
    text += `Grand Total: ₹${grandTotal}\n`;
    if (orderDetails.specialInstructions) {
      text += `Special Note: ${orderDetails.specialInstructions}\n`;
    }
    return text;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#7A6B5D] hover:text-[#241D17] w-8 h-8 rounded-full hover:bg-white flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with success badge */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="font-serif-brand text-2xl font-extrabold text-[#241D17]">
            Pre-Order Sent to WhatsApp!
          </h2>
          <p className="text-xs sm:text-sm text-[#5D4E41]">
            Your pre-order has been forwarded to <strong>Manisha Ganguly</strong> on WhatsApp. Simply send the message and share your delivery address in chat.
          </p>
        </div>

        {/* Order Receipt Box */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E7DFD5] space-y-3 text-xs shadow-2xs">
          <div className="flex justify-between items-center pb-2 border-b border-[#F2ECE4]">
            <span className="font-serif-brand font-bold text-sm text-[#241D17]">
              Order Receipt
            </span>
            <span className="font-semibold text-[#9C3217] bg-[#FAF3EC] px-2 py-0.5 rounded">
              2-Day Pre-Order
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[#5D4E41]">
            <div>
              <span className="text-[10px] text-[#8C7A6B] block uppercase tracking-wider">Scheduled Date</span>
              <strong className="text-[#241D17] text-xs">
                {formatFriendlyDate(orderDetails.deliveryDate)}
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-[#8C7A6B] block uppercase tracking-wider">Time Slot</span>
              <strong className="text-[#241D17] text-xs capitalize">
                {orderDetails.deliverySlot} ({orderDetails.deliverySlot === 'lunch' ? '12:30-2:30 PM' : '6:00-9:00 PM'})
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-[#8C7A6B] block uppercase tracking-wider">Destination Hub</span>
              <strong className="text-[#241D17] text-xs">
                {areaObj?.name}
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-[#8C7A6B] block uppercase tracking-wider">Kitchen Phone</span>
              <strong className="text-[#241D17] text-xs tabular-nums">
                {RESTAURANT_INFO.phone}
              </strong>
            </div>
          </div>

          <div className="pt-2 border-t border-[#F2ECE4] space-y-1.5">
            <span className="text-[10px] text-[#8C7A6B] block uppercase tracking-wider">Dishes</span>
            {items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-[#241D17]">
                <span>
                  {item.name} {item.portion !== 'single' && `(${item.portion})`} × {item.quantity}
                </span>
                <span className="tabular-nums font-semibold">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#F2ECE4] space-y-1">
            <div className="flex justify-between text-[#7A6B5D]">
              <span>Subtotal</span>
              <span className="tabular-nums font-semibold">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-[#7A6B5D]">
              <span>Delivery Charge</span>
              <span className="tabular-nums font-semibold">
                ₹{deliveryFee}
              </span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-[#241D17] pt-1 border-t border-[#F2ECE4]">
              <span>Total Payable</span>
              <span className="text-[#9C3217] tabular-nums">₹{grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Next Steps Guide */}
        <div className="bg-[#FAF3EC] border border-[#DECFBA] rounded-xl p-3.5 text-xs text-[#5D4E41] space-y-1">
          <p className="font-bold text-[#241D17]">Next Steps:</p>
          <ul className="list-disc list-inside space-y-0.5 text-[#5D4E41]">
            <li>Manisha Ganguly will message you on WhatsApp to confirm delivery window.</li>
            <li>Payment is accepted via UPI (GPay/PhonePe/Paytm) or Cash on Delivery.</li>
            <li>Your meal will be cooked fresh with whole bazaar ingredients on delivery day!</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 px-3 bg-white hover:bg-[#FAF7F2] border border-[#DED4C7] rounded-xl text-xs font-semibold text-[#4D3F35] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Receipt' : 'Copy Details'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 px-3 bg-white hover:bg-[#FAF7F2] border border-[#DED4C7] rounded-xl text-xs font-semibold text-[#4D3F35] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-3 bg-[#9C3217] hover:bg-[#83260F] rounded-xl text-xs font-bold text-white transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
