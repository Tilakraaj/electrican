import React, { useState } from 'react';
import { Product } from '../../../types';
import { useApp } from '../../../context/AppContext';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  Wrench,
  Heart,
  Plus,
  Minus,
  Check,
  Share2,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenCart: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenCart,
}) => {
  const { addToCart, wishlist, toggleWishlist, showToast } = useApp();
  const [quantity, setQuantity] = useState<number>(1);
  const [includeInstallation, setIncludeInstallation] = useState<boolean>(true);

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, includeInstallation && product.installationAvailable);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, includeInstallation && product.installationAvailable);
    onClose();
    onOpenCart();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(
      `Check out ${product.name} on My Electrician Store: https://myelectrician.app/store/${product.id}`
    );
    showToast('success', 'Link Copied', 'Product link copied to clipboard.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-xl bg-white sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-full sm:h-[90vh]">
        {/* Top Header */}
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              {product.category}
            </span>
            <span className="text-xs text-slate-500">{product.brand}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isWishlisted
                  ? 'border-red-200 bg-red-50 text-red-500'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Main Product Image Container */}
          <div className="relative aspect-4/3 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-3 left-3 bg-[#FFC107] text-slate-900 text-xs font-black px-2.5 py-1 rounded-lg shadow-sm">
                {product.discountPercent}% OFF
              </span>
            )}
            <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
              In Stock: {product.stockCount} units
            </span>
          </div>

          {/* Title & Price */}
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xl sm:text-2xl font-black text-[#0057D9]">
                ${product.price}
              </span>
              {product.oldPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.oldPrice}
                </span>
              )}
              <div className="flex items-center gap-1 text-xs text-amber-600 font-bold ml-auto">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400 font-normal">({product.reviewsCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* Trust Value Badges */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-500 font-medium">Delivery</p>
                <p className="text-xs font-bold text-slate-900">{product.deliveryInfo}</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-500 font-medium">Warranty</p>
                <p className="text-xs font-bold text-slate-900">{product.warranty}</p>
              </div>
            </div>
          </div>

          {/* Installation Add-on Option */}
          {product.installationAvailable && (
            <div
              onClick={() => setIncludeInstallation(!includeInstallation)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                includeInstallation
                  ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100/70 text-[#0057D9] flex items-center justify-center">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Add Certified Electrician Installation
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Includes unboxing, mounting, testing & 30-day warranty
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-[#0057D9]">
                  +${product.installationFee}
                </span>
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    includeInstallation
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {includeInstallation && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Overview
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Specifications Table */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Technical Specifications
            </h3>
            <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 text-xs">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="flex p-2.5 bg-white even:bg-slate-50/50">
                  <span className="w-2/5 text-slate-500 font-medium">{key}</span>
                  <span className="w-3/5 text-slate-900 font-semibold">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Bottom Actions */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-3 shrink-0">
          {/* Quantity Controls */}
          <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-white transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-bold tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 px-3 rounded-xl border border-blue-600 text-[#0057D9] hover:bg-blue-50 font-bold text-xs transition-colors cursor-pointer"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="flex-1 py-3 px-3 rounded-xl bg-[#0057D9] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
