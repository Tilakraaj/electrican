import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Product, ProductCategory } from '../../../types';
import {
  Search,
  ShoppingCart,
  Heart,
  Filter,
  Star,
  Plus,
  Tag,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface StoreScreenProps {
  onOpenProductDetail: (product: Product) => void;
  onOpenCart: () => void;
}

export const StoreScreen: React.FC<StoreScreenProps> = ({
  onOpenProductDetail,
  onOpenCart,
}) => {
  const { products, cart, addToCart, wishlist, toggleWishlist } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating'>('featured');
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  const categories = [
    'All',
    'Smart Home',
    'Fans',
    'MCB',
    'Cables',
    'Inverters',
    'EV',
    'Lighting',
    'Switches',
    'Solar',
  ];

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products
    .filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (showInStockOnly && !p.inStock) return false;
      if (
        search &&
        !p.name.toLowerCase().includes(search.toLowerCase()) &&
        !p.brand.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            Electrical Marketplace
          </h2>
          <p className="text-xs text-slate-500">Genuine certified parts & smart appliances</p>
        </div>
        <button
          onClick={onOpenCart}
          className="relative p-2.5 rounded-2xl bg-[#0057D9] text-white shadow-md shadow-blue-500/20 cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFC107] text-slate-900 rounded-full text-[10px] font-black flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Search & In-stock toggle */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by brand, specs or model..."
            className="w-full pl-10 pr-3 py-2 rounded-2xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 shadow-xs"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-3 py-2 rounded-2xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none"
        >
          <option value="featured">Featured</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Promotional Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full">
            Bundle Offer
          </span>
          <h3 className="text-xs font-black">Free Certified Installation</h3>
          <p className="text-[10px] text-blue-200">On all Smart Switches & EV Wallboxes today</p>
        </div>
        <span className="text-2xl font-black text-[#FFC107]">⚡</span>
      </div>

      {/* Category Filter Chips */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-[#0057D9] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredProducts.map((product) => {
          const isWish = wishlist.includes(product.id);
          return (
            <div
              key={product.id}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all group"
            >
              <div
                className="relative aspect-square bg-slate-100 cursor-pointer overflow-hidden"
                onClick={() => onOpenProductDetail(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                {product.discountPercent > 0 && (
                  <span className="absolute top-2 left-2 bg-[#FFC107] text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded shadow-xs">
                    {product.discountPercent}% OFF
                  </span>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className={`absolute top-2 right-2 p-1.5 rounded-full bg-white/90 backdrop-blur-xs transition-colors ${
                    isWish ? 'text-red-500' : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWish ? 'fill-red-500' : ''}`} />
                </button>
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between">
                <div onClick={() => onOpenProductDetail(product)} className="cursor-pointer">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold uppercase">
                    <span>{product.brand}</span>
                    {product.installationAvailable && (
                      <span className="text-blue-600 font-bold text-[9px] lowercase">
                        +install
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug mt-0.5">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-amber-600 font-bold mt-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-extrabold text-[#0057D9]">
                      ${product.price}
                    </span>
                    {product.oldPrice > product.price && (
                      <span className="text-[10px] text-slate-400 line-through ml-1">
                        ${product.oldPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product, 1, product.installationAvailable)}
                    className="p-1.5 rounded-xl bg-blue-50 hover:bg-[#0057D9] text-[#0057D9] hover:text-white transition-colors cursor-pointer"
                    title="Add to Cart"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
