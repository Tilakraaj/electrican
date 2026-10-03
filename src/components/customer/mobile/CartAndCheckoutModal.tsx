import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  CreditCard,
  Wallet,
  Building,
  CheckCircle2,
  ShoppingBag,
  MapPin,
  Truck,
  Wrench,
  ChevronRight,
} from 'lucide-react';

interface CartAndCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderPlaced: (orderId: string) => void;
}

export const CartAndCheckoutModal: React.FC<CartAndCheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderPlaced,
}) => {
  const { cart, updateCartQuantity, removeFromCart, placeOrder, showToast } = useApp();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [couponCode, setCouponCode] = useState<string>('POWER25');
  const [couponApplied, setCouponApplied] = useState<boolean>(true);
  const [deliveryAddress, setDeliveryAddress] = useState<string>(
    'Apartment 4B, Emerald Residency, Lazimpat, Kathmandu'
  );
  const [paymentMethod, setPaymentMethod] = useState<'eSewa' | 'Khalti' | 'Card' | 'COD' | 'Bank Transfer'>('eSewa');
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');

  if (!isOpen) return null;

  // Price computations
  const subtotal = cart.reduce(
    (acc, item) =>
      acc +
      item.product.price * item.quantity +
      (item.withInstallation ? (item.product.installationFee || 0) * item.quantity : 0),
    0
  );

  const discountAmount = couponApplied && subtotal > 50 ? 15 : 0;
  const deliveryFee = subtotal > 60 ? 0 : 5;
  const tax = Math.round((subtotal - discountAmount) * 0.13 * 10) / 10;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee + tax);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'POWER25') {
      setCouponApplied(true);
      showToast('success', 'Coupon Applied', '$15 discount has been applied!');
    } else {
      showToast('error', 'Invalid Coupon', 'Code not recognized or expired.');
    }
  };

  const handleFinalOrder = () => {
    const id = placeOrder(paymentMethod, deliveryAddress);
    setConfirmedOrderId(id);
    setCheckoutStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-white sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-full sm:h-[90vh]">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0057D9] flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold text-slate-900">
              {checkoutStep === 'cart' && `Shopping Cart (${cart.length})`}
              {checkoutStep === 'checkout' && 'Checkout & Payment'}
              {checkoutStep === 'success' && 'Order Placed!'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* VIEW: CART */}
          {checkoutStep === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Your cart is empty</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Explore our electrical store to find switches, fans, cables, and smart home automation gadgets.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3 rounded-2xl border border-slate-200 bg-white flex items-start gap-3 shadow-xs"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-400 hover:text-red-600 p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">
                          ${item.product.price} each
                        </p>
                        {item.withInstallation && (
                          <div className="flex items-center gap-1 text-[10px] text-blue-600 font-semibold mt-0.5">
                            <Wrench className="w-3 h-3" />
                            <span>+${item.product.installationFee} Installation included</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-0.5 text-slate-600 hover:bg-slate-200 rounded-l"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-slate-600 hover:bg-slate-200 rounded-r"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-xs font-black text-slate-900">
                            $
                            {(
                              item.product.price * item.quantity +
                              (item.withInstallation
                                ? (item.product.installationFee || 0) * item.quantity
                                : 0)
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Coupon Input */}
                  <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Promo code (POWER25)"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs uppercase font-semibold"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Price Summary */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal:</span>
                      <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Coupon Discount (POWER25):</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600">
                      <span>Express Courier Delivery:</span>
                      <span className="font-semibold text-slate-900">
                        {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>VAT (13%):</span>
                      <span className="font-semibold text-slate-900">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-extrabold text-slate-900">
                      <span>Total:</span>
                      <span className="text-[#0057D9]">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* VIEW: CHECKOUT */}
          {checkoutStep === 'checkout' && (
            <div className="space-y-4 text-xs">
              {/* Shipping Address */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 uppercase tracking-wider text-[11px]">
                  Delivery Address
                </label>
                <div className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full bg-transparent font-medium text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              {/* Delivery Window */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 uppercase tracking-wider text-[11px]">
                  Estimated Dispatch
                </label>
                <div className="p-3 rounded-2xl border border-emerald-200 bg-emerald-50/50 flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-emerald-950 font-semibold">
                    Express 2-Hour Courier Delivery to Lazimpat
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="font-bold text-slate-700 block mb-2 uppercase tracking-wider text-[11px]">
                  Select Payment Gateway
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'eSewa', label: 'eSewa Mobile Wallet', badge: 'Instant Cashback', icon: <Wallet className="w-4 h-4 text-emerald-600" /> },
                    { id: 'Khalti', label: 'Khalti Digital Wallet', badge: 'Popular in Nepal', icon: <Wallet className="w-4 h-4 text-purple-600" /> },
                    { id: 'Card', label: 'Credit / Debit Card', badge: 'Visa, Mastercard', icon: <CreditCard className="w-4 h-4 text-blue-600" /> },
                    { id: 'COD', label: 'Cash on Delivery', badge: 'Pay when package arrives', icon: <CreditCard className="w-4 h-4 text-amber-600" /> },
                    { id: 'Bank Transfer', label: 'Direct Bank Transfer / ConnectIPS', badge: 'Online Banking', icon: <Building className="w-4 h-4 text-slate-600" /> },
                  ].map((p) => {
                    const isSelected = paymentMethod === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPaymentMethod(p.id as any)}
                        className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-600'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                            {p.icon}
                          </span>
                          <div>
                            <p className="font-bold text-slate-900 leading-tight">{p.label}</p>
                            <p className="text-[10px] text-slate-500">{p.badge}</p>
                          </div>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Order total confirmation */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                <span className="text-slate-500 font-semibold">Total Payable:</span>
                <span className="text-base font-black text-[#0057D9]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* VIEW: SUCCESS */}
          {checkoutStep === 'success' && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Payment Verified
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-2">
                  Order #{confirmedOrderId} Confirmed!
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  Your electrical items are being packed for express courier dispatch to {deliveryAddress}.
                </p>
              </div>

              <div className="pt-4 flex flex-col gap-2 max-w-xs mx-auto">
                <button
                  onClick={() => {
                    onClose();
                    onOrderPlaced(confirmedOrderId);
                  }}
                  className="w-full py-3 rounded-xl bg-[#0057D9] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                >
                  Track Order in My Orders →
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        {checkoutStep !== 'success' && cart.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Grand Total</p>
              <p className="text-base font-black text-slate-900">${grandTotal.toFixed(2)}</p>
            </div>
            {checkoutStep === 'cart' ? (
              <button
                onClick={() => setCheckoutStep('checkout')}
                className="py-3 px-6 rounded-xl bg-[#0057D9] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinalOrder}
                className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Place Order Now</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
