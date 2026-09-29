/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AdvanceNoticeBanner } from './components/AdvanceNoticeBanner';
import { Hero } from './components/Hero';
import { SpecialitySection } from './components/SpecialitySection';
import { MenuSection } from './components/MenuSection';
import { DeliveryZonesSection } from './components/DeliveryZonesSection';
import { PoemStorySection } from './components/PoemStorySection';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { DeliveryPolicyModal } from './components/DeliveryPolicyModal';
import { Footer } from './components/Footer';
import { CartItem, MenuItem, OrderDetails } from './types/menu';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const CART_STORAGE_KEY = 'bhojon_roshik_cart_v1';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [orderSuccessData, setOrderSuccessData] = useState<{
    items: CartItem[];
    orderDetails: OrderDetails;
    subtotal: number;
    deliveryFee: number;
    grandTotal: number;
  } | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleAddToCart = (item: MenuItem, portion: 'full' | 'half' | 'single') => {
    let itemPrice = 0;
    if (typeof item.price === 'number') {
      itemPrice = item.price;
    } else {
      itemPrice = portion === 'half' && item.price.half !== undefined ? item.price.half : item.price.full;
    }

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (ci) => ci.menuItemId === item.id && ci.portion === portion
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + 1,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            id: `${item.id}-${portion}-${Date.now()}`,
            menuItemId: item.id,
            name: item.name,
            portion,
            price: itemPrice,
            quantity: 1,
            diet: item.diet,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (
    menuItemId: string,
    portion: 'full' | 'half' | 'single',
    delta: number
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (ci) => ci.menuItemId === menuItemId && ci.portion === portion
      );
      if (existingIdx === -1) return prev;

      const currentItem = prev[existingIdx];
      const newQty = currentItem.quantity + delta;

      if (newQty <= 0) {
        return prev.filter((_, i) => i !== existingIdx);
      }

      const next = [...prev];
      next[existingIdx] = {
        ...currentItem,
        quantity: newQty,
      };
      return next;
    });
  };

  const handleRemoveItem = (menuItemId: string, portion: 'full' | 'half' | 'single') => {
    setCartItems((prev) =>
      prev.filter((ci) => !(ci.menuItemId === menuItemId && ci.portion === portion))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderSuccess = (data: {
    items: CartItem[];
    orderDetails: OrderDetails;
    subtotal: number;
    deliveryFee: number;
    grandTotal: number;
  }) => {
    setIsCartOpen(false);
    setOrderSuccessData(data);
    setCartItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#241D17]">
      {/* 2-Day Pre-Order & Delivery Areas Notice Strip */}
      <AdvanceNoticeBanner
        onLearnMore={() => setIsPolicyModalOpen(true)}
        onViewZones={() => scrollToSection('delivery-zones')}
      />

      {/* Top Bar with 3-Zone Contract */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDeliveryInfo={() => setIsPolicyModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onScrollToMenu={() => scrollToSection('menu')}
        onScrollToZones={() => scrollToSection('delivery-zones')}
        onOpenOrderModal={() => setIsCartOpen(true)}
      />

      {/* Chef's Signature Selections */}
      <SpecialitySection
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        onScrollToMenu={() => scrollToSection('menu')}
      />

      {/* Complete Interactive Menu Section */}
      <MenuSection
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
      />

      {/* Kolkata Delivery Hubs Section (Kankurgachi, Salt Lake, Ultadanga, New Town) */}
      <DeliveryZonesSection />

      {/* Authentic Bengali Heartfelt Verse & Heritage Story */}
      <PoemStorySection />

      {/* Footer */}
      <Footer onOpenDeliveryPolicy={() => setIsPolicyModalOpen(true)} />

      {/* Mobile Floating Order Bag Bar (Max 15% Viewport Height) */}
      {cartCount > 0 && !isCartOpen && (
        <aside
          aria-label="Shopping bag summary"
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#2C1810] text-white p-3 px-4 shadow-xl border-t border-[#432A20]"
        >
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#DE5D2C] flex items-center justify-center font-bold text-xs text-white tabular-nums">
                {cartCount}
              </div>
              <div>
                <p className="text-xs text-[#D8CCC0] leading-none">Subtotal</p>
                <p className="text-sm font-extrabold text-white tabular-nums leading-snug">
                  ₹{cartSubtotal}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2 bg-[#9C3217] hover:bg-[#83260F] text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View Bag & Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Slide-over Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Success & Print Modal */}
      <OrderSuccessModal
        isOpen={orderSuccessData !== null}
        onClose={() => setOrderSuccessData(null)}
        orderData={orderSuccessData}
      />

      {/* 2-Day Pre-Order Guarantee & FAQ Modal */}
      <DeliveryPolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
        onOpenOrder={() => setIsCartOpen(true)}
      />
    </div>
  );
}
