import { useState, useEffect } from 'react';
import { Product, CartItem, TreeHistory, SmartFarmStatus, OrderInfo, OrderLog } from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_HISTORY_DATA,
  DEFAULT_SMART_FARM
} from './data/mockData';

// Component imports
import SmartFarmStatusCard from './components/SmartFarmStatusCard';
import ProductSection from './components/ProductSection';
import NFCScanner from './components/NFCScanner';
import CartAndCheckout from './components/CartAndCheckout';
import AdminPanel from './components/AdminPanel';
import SupabaseGuide from './components/SupabaseGuide';

// Icon imports
import {
  Leaf,
  ShoppingBag,
  Search,
  Settings,
  Database,
  Grid,
  Droplet,
  Fan,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  // Global States
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [historyData, setHistoryData] = useState<TreeHistory[]>(INITIAL_HISTORY_DATA);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [smartFarmStatus, setSmartFarmStatus] = useState<SmartFarmStatus>(DEFAULT_SMART_FARM);
  const [orderLogs, setOrderLogs] = useState<OrderLog[]>([]);

  // Current view tab
  const [activeTab, setActiveTab] = useState<'market' | 'trace' | 'cart' | 'admin' | 'supabase'>('market');

  // Interactive Live Weather & IoT Simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSmartFarmStatus((prev) => {
        // Naturally drift values slightly
        let tempDiff = (Math.random() - 0.5) * 0.1;
        let humDiff = (Math.random() - 0.5) * 0.2;
        let soilDiff = (Math.random() - 0.5) * 0.15;

        // Apply fan cooling effect
        if (prev.fanActive) {
          tempDiff -= 0.05; // cools down
          humDiff -= 0.08; // ventilates
        } else {
          tempDiff += 0.03; // gets warmer
        }

        // Apply watering effect
        if (prev.irrigationActive) {
          soilDiff += 0.4; // wets soil
          humDiff += 0.25; // increases air humidity
        } else {
          soilDiff -= 0.05; // naturally dries
        }

        // Constrain to realistic ranges
        const nextTemp = Math.max(18, Math.min(32, prev.temperature + tempDiff));
        const nextHum = Math.max(30, Math.min(95, prev.humidity + humDiff));
        const nextSoil = Math.max(20, Math.min(85, prev.soilMoisture + soilDiff));

        return {
          ...prev,
          temperature: nextTemp,
          humidity: nextHum,
          soilMoisture: nextSoil
        };
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Handler: Add to Cart
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          alert(`죄송합니다. 현재 상품의 최대 잔여 재고(${product.stock}주)를 모두 담으셨습니다.`);
          return prevCart;
        }
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });

    // Optionally swap tab to cart or show confirmation
    // Let's keep them on marketplace but trigger a minor toast/alert in UI
  };

  // Handler: Update Cart Quantity
  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Handler: Remove Item from Cart
  const handleRemoveCartItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // Handler: Clean Cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Handler: Checkout Success
  const handleCheckoutSuccess = (orderInfo: OrderInfo) => {
    // 1. Calculate total checkout amount
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const fee = subtotal > 100000 ? 0 : 5000;
    const finalTotal = subtotal + fee;

    // 2. Formulate new order log
    const newOrderLog: OrderLog = {
      id: `GT-ORDER-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleString('ko-KR'),
      buyerName: orderInfo.buyerName,
      items: cart.map(item => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      })),
      totalAmount: finalTotal,
      status: '결제완료'
    };

    // 3. Deduct stock values from products state
    setProducts((prevProducts) =>
      prevProducts.map((prod) => {
        const orderItem = cart.find((item) => item.product.id === prod.id);
        if (orderItem) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - orderItem.quantity)
          };
        }
        return prod;
      })
    );

    // 4. Update orders record list
    setOrderLogs((prevLogs) => [newOrderLog, ...prevLogs]);
  };

  // Handler: Admin Adjust Stocks
  const handleUpdateStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p))
    );
  };

  // Handler: Admin Adjust Shipping Schedule Date
  const handleUpdateAvailableDate = (productId: string, newDate: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, availableDate: newDate } : p))
    );
  };

  // Handler: Admin Update individual RFID seedling trace progress
  const handleUpdateHistoryStage = (
    tagId: string,
    newStage: 'germinating' | 'growing' | 'rooting' | 'hardened' | 'ready',
    newProgress: number
  ) => {
    const stageMapKo = {
      germinating: '발아기 / 접목 유도',
      growing: '신초 성장기',
      rooting: '스마트 배양 발근기',
      hardened: '경화기 (야외 순화 적응)',
      ready: '출하 가능 완료'
    };

    setHistoryData((prev) =>
      prev.map((h) =>
        h.tagId === tagId
          ? {
              ...h,
              growthStage: newStage,
              growthStageKo: stageMapKo[newStage],
              growthProgress: newProgress
            }
          : h
      )
    );
  };

  // Manual IoT togglers
  const handleToggleIrrigation = () => {
    setSmartFarmStatus((prev) => ({
      ...prev,
      irrigationActive: !prev.irrigationActive
    }));
  };

  const handleToggleFan = () => {
    setSmartFarmStatus((prev) => ({
      ...prev,
      fanActive: !prev.fanActive
    }));
  };

  // Calculate cart counts
  const cartTotalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-stone-800 antialiased flex flex-col">
      {/* Top Brand Navigation Bar */}
      <header className="bg-white border-b border-stone-200/80 sticky top-0 z-40 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('market')}>
              <div className="w-9 h-9 bg-emerald-700 rounded-xl flex items-center justify-center text-white shadow-sm shadow-emerald-700/20">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-stone-900 font-sans flex items-center gap-1">
                  GenomeTree <span className="text-xs bg-emerald-50 text-emerald-800 font-normal border border-emerald-100 px-1.5 py-0.5 rounded">스마트팜 묘목 직매장</span>
                </span>
                <p className="text-[9px] text-stone-400 -mt-0.5 font-mono">DNA-Certified Premium Saplings</p>
              </div>
            </div>

            {/* Desktop Navigation Items */}
            <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold">
              <button
                id="tab-market"
                onClick={() => setActiveTab('market')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'market'
                    ? 'bg-emerald-50 text-emerald-800 font-bold'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                품종 거래 장터
              </button>

              <button
                id="tab-trace"
                onClick={() => setActiveTab('trace')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'trace'
                    ? 'bg-emerald-50 text-emerald-800 font-bold'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                NFC/RFID 이력 추적
              </button>

              <button
                id="tab-cart"
                onClick={() => setActiveTab('cart')}
                className={`px-4 py-2 rounded-xl transition-all relative ${
                  activeTab === 'cart'
                    ? 'bg-emerald-50 text-emerald-800 font-bold'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                <span>주문/장바구니</span>
                {cartTotalQty > 0 && (
                  <span className="absolute -top-1.5 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold animate-pulse font-mono">
                    {cartTotalQty}
                  </span>
                )}
              </button>

              <button
                id="tab-admin"
                onClick={() => setActiveTab('admin')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'admin'
                    ? 'bg-emerald-50 text-emerald-800 font-bold'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                관리 콘솔
              </button>

              <button
                id="tab-supabase"
                onClick={() => setActiveTab('supabase')}
                className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1 ${
                  activeTab === 'supabase'
                    ? 'bg-emerald-50 text-emerald-800 font-bold'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Supabase 가이드</span>
              </button>
            </nav>

            {/* Cart Icon trigger for quick mobile access */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('cart')}
                className="relative p-2 text-stone-600 hover:text-emerald-700 hover:bg-stone-50 rounded-xl transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartTotalQty > 0 && (
                  <span className="absolute top-1 right-1 w-4.5 h-4.5 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold font-mono">
                    {cartTotalQty}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner Area */}
      <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-center">
            <div className="xl:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-800/60 backdrop-blur-sm px-5 py-2.5 rounded-full text-base md:text-lg font-bold border border-emerald-500/30 text-emerald-300">
                <Leaf className="w-5 h-5 text-emerald-400 animate-pulse" />
                <span>100% 냄새 없는 은행나무 스마트 팜</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight font-sans">
                <span className="text-emerald-400">DNA 인증 은행 수나무</span> 묘목
              </h1>
              <p className="text-xs md:text-sm text-stone-300 leading-relaxed max-w-xl">
                냄새 없는 은행 수나무임을 보증하는 NFC 태그 부착해 묘목의 이력 추적이 가능합니다.
              </p>
            </div>

            {/* Reservation Status Overlay on Hero */}
            <div className="xl:col-span-6 bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-7 border border-white/10 space-y-4 text-sm flex flex-col justify-between w-full">
              <div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
                  <span className="font-extrabold text-sm md:text-base text-amber-300 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    온라인 실시간 예약 현황
                  </span>
                  <span className="text-xs text-stone-300 font-mono">전국 출하 센터</span>
                </div>

                <div className="grid grid-cols-3 gap-3.5 mt-4">
                  <div className="bg-stone-900/40 p-3 rounded-xl border border-white/5 text-center">
                    <p className="text-stone-400 text-xs">예약 완료율</p>
                    <p className="font-bold text-base md:text-lg font-mono text-white mt-1.5">
                      89.4%
                    </p>
                  </div>
                  <div className="bg-stone-900/40 p-3 rounded-xl border border-white/5 text-center">
                    <p className="text-stone-400 text-xs">출하 대기묘</p>
                    <p className="font-bold text-base md:text-lg font-mono text-amber-300 mt-1.5">
                      15,400주
                    </p>
                  </div>
                  <div className="bg-stone-900/40 p-3 rounded-xl border border-white/5 text-center">
                    <p className="text-stone-400 text-xs">누적 예약수</p>
                    <p className="font-bold text-base md:text-lg font-mono text-white mt-1.5">
                      {(180000 + (orderLogs.reduce((acc, log) => acc + log.items.reduce((sum, item) => sum + item.quantity, 0), 0))).toLocaleString()}주
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-[11px] text-stone-300 pt-3 border-t border-white/5 mt-3">
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300">
                    실시간 예약접수 중
                  </span>
                  <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-300">
                    차량배차완료
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 font-mono">금일 {orderLogs.length}건 신규</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-10 w-full">
        {/* Mobile quick tabs subnav */}
        <div className="md:hidden flex flex-wrap gap-1.5 bg-white p-2.5 rounded-2xl border border-stone-200">
          <button
            onClick={() => setActiveTab('market')}
            className={`flex-1 text-center py-2 text-xs font-bold rounded-xl ${
              activeTab === 'market' ? 'bg-emerald-600 text-white' : 'text-stone-600'
            }`}
          >
            장터
          </button>
          <button
            onClick={() => setActiveTab('trace')}
            className={`flex-1 text-center py-2 text-xs font-bold rounded-xl ${
              activeTab === 'trace' ? 'bg-emerald-600 text-white' : 'text-stone-600'
            }`}
          >
            NFC이력
          </button>
          <button
            onClick={() => setActiveTab('cart')}
            className={`flex-1 text-center py-2 text-xs font-bold rounded-xl ${
              activeTab === 'cart' ? 'bg-emerald-600 text-white' : 'text-stone-600'
            }`}
          >
            카트 ({cartTotalQty})
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex-1 text-center py-2 text-xs font-bold rounded-xl ${
              activeTab === 'admin' ? 'bg-emerald-600 text-white' : 'text-stone-600'
            }`}
          >
            관리
          </button>
          <button
            onClick={() => setActiveTab('supabase')}
            className={`flex-1 text-center py-2 text-[10px] font-bold rounded-xl ${
              activeTab === 'supabase' ? 'bg-emerald-600 text-white' : 'text-stone-600'
            }`}
          >
            Supa
          </button>
        </div>

        {/* Tab views layout switches */}
        {activeTab === 'market' && (
          <div className="space-y-8 animate-fade-in">
            {/* Live Environment Monitoring */}
            <SmartFarmStatusCard
              status={smartFarmStatus}
              onToggleIrrigation={handleToggleIrrigation}
              onToggleFan={handleToggleFan}
            />

            {/* Product catalog title */}
            <div className="border-l-4 border-emerald-600 pl-4 py-1">
              <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">DNA 보증 묘목 품종 분양관</h2>
              <p className="text-xs text-stone-500 mt-1">원하시는 우량 수종을 클릭하여 카트에 담아 주문할 수 있습니다.</p>
            </div>

            {/* Catalog */}
            <ProductSection
              products={products}
              onAddToCart={handleAddToCart}
            />
          </div>
        )}

        {activeTab === 'trace' && (
          <div className="animate-fade-in">
            <NFCScanner historyData={historyData} />
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="animate-fade-in">
            <CartAndCheckout
              cartItems={cart}
              onUpdateQuantity={handleUpdateCartQuantity}
              onRemoveItem={handleRemoveCartItem}
              onClearCart={handleClearCart}
              onCheckoutSuccess={handleCheckoutSuccess}
            />
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="animate-fade-in">
            <AdminPanel
              products={products}
              historyData={historyData}
              onUpdateStock={handleUpdateStock}
              onUpdateAvailableDate={handleUpdateAvailableDate}
              onUpdateHistoryStage={handleUpdateHistoryStage}
              orderLogs={orderLogs}
            />
          </div>
        )}

        {activeTab === 'supabase' && (
          <div className="animate-fade-in">
            <SupabaseGuide />
          </div>
        )}
      </main>

      {/* Elegant Bottom Footer */}
      <footer className="bg-stone-900 text-stone-400 text-xs py-10 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
              <Leaf className="w-4.5 h-4.5" />
            </div>
            <span className="font-bold text-white tracking-wider">GenomeTree Inc.</span>
          </div>
          <p className="text-[11px] text-stone-500 max-w-lg mx-auto leading-relaxed">
            GenomeTree는 국가 유전 공학 분석 기술을 응용한 스마트 묘목 분양 전문 플랫폼입니다.<br />
            무균 배양실 및 스마트 묘동 IoT 실시간 제어 설비를 통해 건강한 원종 복제를 완벽 보장합니다.
          </p>
          <div className="text-[10px] text-stone-600 font-mono">
            © 2026 GenomeTree Co., Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
