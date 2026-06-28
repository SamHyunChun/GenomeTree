import { useState } from 'react';
import { Product } from '../types';
import { Leaf, Calendar, ShieldCheck, Search, ShoppingBag, Layers } from 'lucide-react';

interface ProductSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

type CategoryFilter = 'all' | 'ginkgo' | 'chionanthus' | 'apple' | 'grape' | 'larch' | 'tulip';

export default function ProductSection({ products, onAddToCart }: ProductSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState<string>('all');

  // Categories list
  const categories: { key: CategoryFilter; name: string }[] = [
    { key: 'all', name: '전체 수종' },
    { key: 'ginkgo', name: '은행 수나무' },
    { key: 'chionanthus', name: '이팝나무' },
    { key: 'apple', name: '사과나무 (과수)' },
    { key: 'grape', name: '포도나무 (과수)' },
    { key: 'larch', name: '낙엽송 (조림)' },
    { key: 'tulip', name: '백합나무 (조림)' },
  ];

  // Certification types for sub-filtering
  const certTypes = [
    { key: 'all', name: '전체 인증' },
    { key: 'DNA 인증', name: 'DNA 인증' },
    { key: '무독성 인증', name: '무독성 인증 (Virus-Free)' },
    { key: '원종 인증', name: '원종 인증 (Mother Tree)' },
    { key: 'DNA마커 인증', name: 'DNA마커 검증' }
  ];

  // Filtering logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesCert = selectedCert === 'all' || product.certificationType === selectedCert;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.specification.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.categoryKo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesCert && matchesSearch;
  });

  return (
    <div id="product-list-section" className="space-y-6">
      {/* Search and Filters panel */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="품종명, 규격, 수종으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-stone-800"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-start lg:justify-end">
            {certTypes.map(cert => (
              <button
                key={cert.key}
                onClick={() => setSelectedCert(cert.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCert === cert.key
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-stone-50 text-stone-600 border border-stone-200/60 hover:bg-stone-100'
                }`}
              >
                {cert.name}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Horizontal Scroll or Wrap */}
        <div className="flex flex-wrap gap-2 border-t border-stone-100 pt-4">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.key
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/10'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Leaf className={`w-3.5 h-3.5 ${selectedCategory === cat.key ? 'text-white' : 'text-emerald-600'}`} />
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isOutOfStock = product.stock <= 0;
            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden flex flex-col hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-900/[0.02] transition-all duration-300 group"
              >
                {/* Image & Certification Badge */}
                <div className="relative h-48 bg-stone-100 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600/95 backdrop-blur-sm text-white text-[11px] font-bold rounded-full shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {product.certificationType}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 bg-stone-900/85 backdrop-blur-sm text-white text-[11px] font-mono rounded-lg">
                      {product.categoryKo}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="mb-2">
                    <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-mono mt-0.5">
                      규격: {product.specification}
                    </p>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 mb-4 leading-relaxed flex-1">
                    {product.description}
                  </p>

                  {/* Metadata Row */}
                  <div className="grid grid-cols-2 gap-2 border-t border-stone-100 pt-3 mb-4 text-xs font-mono">
                    <div className="bg-stone-50 p-2 rounded-xl border border-stone-100">
                      <p className="text-[10px] text-stone-400">잔여 재고</p>
                      <p className={`font-bold mt-0.5 ${isOutOfStock ? 'text-red-500' : 'text-stone-700'}`}>
                        {isOutOfStock ? '품절' : `${product.stock.toLocaleString()}주 / 개`}
                      </p>
                    </div>
                    <div className="bg-stone-50 p-2 rounded-xl border border-stone-100">
                      <p className="text-[10px] text-stone-400">출하 가능일</p>
                      <p className="text-stone-700 font-bold mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-emerald-600 inline" />
                        <span>{product.availableDate}</span>
                      </p>
                    </div>
                  </div>

                  {/* Pricing and Action Button */}
                  <div className="flex items-center justify-between border-t border-stone-100 pt-3 mt-auto">
                    <div className="text-left">
                      <p className="text-[10px] text-stone-400 font-mono">단가 (VAT 포함)</p>
                      <p className="text-lg font-extrabold text-stone-900 font-mono">
                        ₩{product.price.toLocaleString()}<span className="text-xs font-normal text-stone-500"> / 주</span>
                      </p>
                    </div>

                    <button
                      id={`btn-add-to-cart-${product.id}`}
                      onClick={() => onAddToCart(product)}
                      disabled={isOutOfStock}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isOutOfStock
                          ? 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-sm'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{isOutOfStock ? '품절' : '담기'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center space-y-3">
          <Layers className="w-12 h-12 text-stone-300 mx-auto" />
          <p className="text-stone-600 font-medium">검색 조건에 맞는 판매 상품이 없습니다.</p>
          <p className="text-xs text-stone-400">다른 키워드나 수종 필터를 적용해 보세요.</p>
        </div>
      )}
    </div>
  );
}
