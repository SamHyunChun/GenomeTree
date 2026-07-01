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
import GinkgoWholesalersBanner from './components/GinkgoWholesalersBanner';
import CargoDispatch from './components/CargoDispatch';
import LaborBrokerage from './components/LaborBrokerage';
import GinkgoStory from './components/GinkgoStory';
import GenomeTreeIntro from './components/GenomeTreeIntro';
import GinkgoEducation from './components/GinkgoEducation';
import BiodiversityAudit from './components/BiodiversityAudit';

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
  const [marketSubTab, setMarketSubTab] = useState<'genome' | 'wholesalers' | 'dna' | 'seedling' | 'cargo' | 'manpower' | 'story' | 'education' | 'biodiversity'>('dna');
  const [showDnaSeedling, setShowDnaSeedling] = useState(true);

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
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => {
              setActiveTab('market');
              setMarketSubTab('dna');
              setShowDnaSeedling(true);
            }}>
              <div className="w-9 h-9 bg-emerald-700 rounded-xl flex items-center justify-center text-white shadow-sm shadow-emerald-700/20">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-stone-900 font-sans flex items-center gap-1">
                  MaleGinkgo <span className="text-xs bg-emerald-50 text-emerald-800 font-normal border border-emerald-100 px-1.5 py-0.5 rounded">스마트팜 묘목 직매장</span>
                </span>
                <p className="text-[9px] text-stone-400 -mt-0.5 font-mono">DNA-Certified Premium Saplings</p>
              </div>
            </div>

            {/* Desktop Navigation Items */}
            <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold">
              <button
                id="tab-market"
                onClick={() => {
                  setActiveTab('market');
                  setMarketSubTab('dna');
                  setShowDnaSeedling(true);
                }}
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

        {/* Secondary Navigation Row (Sub-Tabs) */}
        <div className="border-t border-stone-100 bg-stone-50/70 py-1.5 shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
              <button
                id="subtab-genome"
                onClick={() => {
                  setActiveTab('market');
                  setMarketSubTab('genome');
                  setShowDnaSeedling(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'market' && marketSubTab === 'genome'
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/50 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100 border border-transparent'
                }`}
              >
                게놈트리 소개
              </button>

              <button
                id="subtab-story"
                onClick={() => {
                  setActiveTab('market');
                  setMarketSubTab('story');
                  setShowDnaSeedling(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'market' && marketSubTab === 'story'
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/50 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100 border border-transparent'
                }`}
              >
                은행나무 이야기
              </button>

              <button
                id="subtab-wholesalers"
                onClick={() => {
                  setActiveTab('market');
                  setMarketSubTab('wholesalers');
                  setShowDnaSeedling(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'market' && marketSubTab === 'wholesalers'
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/50 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100 border border-transparent'
                }`}
              >
                타 사업자 은행나무 보유현황
              </button>

              <button
                id="subtab-cargo"
                onClick={() => {
                  setActiveTab('market');
                  setMarketSubTab('cargo');
                  setShowDnaSeedling(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'market' && marketSubTab === 'cargo'
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/50 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100 border border-transparent'
                }`}
              >
                전국 화물 배차
              </button>

              <button
                id="subtab-manpower"
                onClick={() => {
                  setActiveTab('market');
                  setMarketSubTab('manpower');
                  setShowDnaSeedling(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'market' && marketSubTab === 'manpower'
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/50 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100 border border-transparent'
                }`}
              >
                굴취인력 중개
              </button>

              <button
                id="subtab-education"
                onClick={() => {
                  setActiveTab('market');
                  setMarketSubTab('education');
                  setShowDnaSeedling(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'market' && marketSubTab === 'education'
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/50 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100 border border-transparent'
                }`}
              >
                교육 프로그램
              </button>

              <button
                id="subtab-biodiversity"
                onClick={() => {
                  setActiveTab('market');
                  setMarketSubTab('biodiversity');
                  setShowDnaSeedling(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'market' && marketSubTab === 'biodiversity'
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/50 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100 border border-transparent'
                }`}
              >
                생물다양성 실사
              </button>

              {showDnaSeedling && (
                <>
                  <button
                    id="subtab-dna"
                    onClick={() => {
                      setActiveTab('market');
                      setMarketSubTab('dna');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap animate-fade-in ${
                      activeTab === 'market' && marketSubTab === 'dna'
                        ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/50 shadow-xs'
                        : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100 border border-transparent'
                    }`}
                  >
                    DNA인증묘
                  </button>

                  <button
                    id="subtab-seedling"
                    onClick={() => {
                      setActiveTab('market');
                      setMarketSubTab('seedling');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap animate-fade-in ${
                      activeTab === 'market' && marketSubTab === 'seedling'
                        ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/50 shadow-xs'
                        : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100 border border-transparent'
                    }`}
                  >
                    실생묘
                  </button>
                </>
              )}
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
            {/* 0. Genome Tree Introduction Tab */}
            {marketSubTab === 'genome' && (
              <div className="animate-fade-in">
                <GenomeTreeIntro />
              </div>
            )}

            {/* 1. Wholesalers Directory Tab */}
            {marketSubTab === 'wholesalers' && (
              <div className="space-y-6 animate-fade-in">
                <GinkgoWholesalersBanner />
                
                {/* 하단 탭바 영역 렌더링 */}
                <div className="bg-white border border-stone-200 rounded-3xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm animate-fade-in">
                  <div className="space-y-1 text-left">
                    <p className="text-emerald-800 font-extrabold text-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      MaleGinkgo 전문관 및 생태 실증 서비스 바로가기
                    </p>
                    <p className="text-xs text-stone-500">
                      당사 직영 우량 유전 감별 묘동 상품 및 현장 환경 분석 시스템으로 신속하게 이동해 보실 수 있습니다.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-1.5 bg-stone-50 p-1.5 rounded-2xl border border-stone-200/80 w-fit self-start md:self-center">
                    <button
                      onClick={() => {
                        setActiveTab('market');
                        setMarketSubTab('dna');
                        setShowDnaSeedling(true);
                      }}
                      className="px-4 py-2 bg-white hover:bg-emerald-50 text-stone-600 hover:text-emerald-800 font-bold text-xs rounded-xl border border-stone-200/60 hover:border-emerald-200/60 shadow-xs transition active:scale-[0.98]"
                    >
                      DNA인증묘
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('market');
                        setMarketSubTab('seedling');
                        setShowDnaSeedling(true);
                      }}
                      className="px-4 py-2 bg-white hover:bg-emerald-50 text-stone-600 hover:text-emerald-800 font-bold text-xs rounded-xl border border-stone-200/60 hover:border-emerald-200/60 shadow-xs transition active:scale-[0.98]"
                    >
                      실생묘
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('market');
                        setMarketSubTab('biodiversity');
                        setShowDnaSeedling(false);
                      }}
                      className="px-4 py-2 bg-white hover:bg-emerald-50 text-stone-600 hover:text-emerald-800 font-bold text-xs rounded-xl border border-stone-200/60 hover:border-emerald-200/60 shadow-xs transition active:scale-[0.98]"
                    >
                      생물다양성 실사
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Clonal DNA Certified Plants Tab */}
            {marketSubTab === 'dna' && (
              <div className="space-y-8 animate-fade-in">
                {/* Live Environment Monitoring */}
                <SmartFarmStatusCard
                  status={smartFarmStatus}
                  onToggleIrrigation={handleToggleIrrigation}
                  onToggleFan={handleToggleFan}
                />

                {/* Product catalog title */}
                <div className="border-l-4 border-emerald-600 pl-4 py-1">
                  <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">DNA 보증 클론 묘목 분양관</h2>
                  <p className="text-xs text-stone-500 mt-1">첨단 연구시설에서 특화 생산되어 100% 품종과 무취/우량 유전자가 검증 완료된 명품 수나무 묘동입니다.</p>
                </div>

                {/* Catalog (DNA Clones Only) */}
                <ProductSection
                  products={products.filter(p => p.certificationType !== '일반 실생')}
                  onAddToCart={handleAddToCart}
                />
              </div>
            )}

            {/* 3. Seed-Grown Seedlings Tab */}
            {marketSubTab === 'seedling' && (
              <div className="space-y-8 animate-fade-in">
                {/* Seed-grown seedling educational tip box */}
                <div className="bg-gradient-to-r from-stone-50 to-stone-100 p-5 rounded-2xl border border-stone-200 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold text-xl border border-amber-100 flex-shrink-0">
                    🌱
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-stone-900">보급형 실생묘 (Seed-grown Seedlings) 분양관</h3>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      실생묘는 엄선된 정품 종자(은행/이팝나무 씨앗)를 직파종하여 키운 자연 양묘 상품입니다. DNA 복제 클론묘에 비해 개당 가격이 절반 이하로 매우 실용적이며, 임야 대규모 식림이나 완충 조경 녹지 조성 시 비용 절감 효과가 매우 탁월합니다.
                    </p>
                  </div>
                </div>

                {/* Product catalog title */}
                <div className="border-l-4 border-stone-500 pl-4 py-1">
                  <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">대량 녹화용 실생 묘목 상품</h2>
                  <p className="text-xs text-stone-500 mt-1">대규모 시공 계약 및 화물 묶음 배차 상담 가능합니다.</p>
                </div>

                {/* Catalog (Seedlings Only) */}
                <ProductSection
                  products={products.filter(p => p.certificationType === '일반 실생')}
                  onAddToCart={handleAddToCart}
                />
              </div>
            )}

            {marketSubTab === 'biodiversity' && (
              <div className="animate-fade-in">
                <BiodiversityAudit />
              </div>
            )}

            {/* 4. National Cargo Dispatch Tab */}
            {marketSubTab === 'cargo' && (
              <div className="animate-fade-in">
                <CargoDispatch />
              </div>
            )}

            {/* 5. Tree Digging Labor Brokerage Tab */}
            {marketSubTab === 'manpower' && (
              <div className="animate-fade-in">
                <LaborBrokerage />
              </div>
            )}

            {/* 5.1. Ginkgo Education Tab */}
            {marketSubTab === 'education' && (
              <div className="animate-fade-in">
                <GinkgoEducation />
              </div>
            )}

            {/* 6. Ginkgo Story Tab */}
            {marketSubTab === 'story' && (
              <div className="animate-fade-in">
                <GinkgoStory />
              </div>
            )}
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
            <span className="font-bold text-white tracking-wider">MaleGinkgo Inc.</span>
          </div>
          <p className="text-[11px] text-stone-500 max-w-lg mx-auto leading-relaxed">
            MaleGinkgo는 국가 유전 공학 분석 기술을 응용한 스마트 묘목 분양 전문 플랫폼입니다.<br />
            무균 배양실 및 스마트 묘동 IoT 실시간 제어 설비를 통해 건강한 원종 복제를 완벽 보장합니다.
          </p>
          <div className="text-[10px] text-stone-600 font-mono">
            © 2026 MaleGinkgo Co., Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
