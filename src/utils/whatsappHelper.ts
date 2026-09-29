import { CartItem, OrderDetails } from '../types/menu';
import { DELIVERY_AREAS, RESTAURANT_INFO } from '../data/menuData';
import { formatFriendlyDate } from './dateHelper';

export function generateWhatsAppOrderUrl(
  items: CartItem[],
  orderDetails: OrderDetails,
  deliveryFee: number,
  subtotal: number,
  grandTotal: number
): string {
  const selectedArea = DELIVERY_AREAS.find((a) => a.id === orderDetails.deliveryArea);
  const areaName = selectedArea ? `${selectedArea.name} (${selectedArea.bengaliName})` : orderDetails.deliveryArea;

  const slotMap: Record<string, string> = {
    lunch: 'Lunch (12:30 PM - 2:30 PM)',
    dinner: 'Evening (6:00 PM - 9:00 PM)',
    custom: orderDetails.customTime || 'Custom Time',
  };

  const formattedDate = formatFriendlyDate(orderDetails.deliveryDate);

  let message = `🍽️ *NEW PRE-ORDER - ${RESTAURANT_INFO.name} (${RESTAURANT_INFO.nameEnglish})*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📍 *Delivery Area:* ${areaName}\n`;
  message += `📅 *Delivery Date:* ${formattedDate} (2-Day Advance Notice)\n`;
  message += `⏰ *Delivery Slot:* ${slotMap[orderDetails.deliverySlot] || orderDetails.deliverySlot}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📋 *FOOD ITEMS ORDERED:*\n`;

  items.forEach((item, index) => {
    const portionText = item.portion === 'single' ? '' : ` (${item.portion.toUpperCase()})`;
    message += `${index + 1}. ${item.name}${portionText} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Subtotal: ₹${subtotal}\n`;
  message += `Delivery Fee (${selectedArea?.name || 'Kolkata'}): ₹${deliveryFee}\n`;
  message += `💰 *Grand Total: ₹${grandTotal}*\n`;

  if (orderDetails.specialInstructions?.trim()) {
    message += `\n📝 *Special Note:* ${orderDetails.specialInstructions.trim()}\n`;
  }

  message += `\n🏠 *My Delivery Address & Contact:*\n[Please reply with your name & delivery address here]\n`;
  message += `\n🙏 *Hello Manisha Di, please confirm my order!*`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${RESTAURANT_INFO.phoneRaw}?text=${encoded}`;
}
