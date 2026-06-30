import { useState, useMemo, FormEvent } from 'react';
import {
  Trees,
  MapPin,
  Phone,
  Search,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Calendar,
  User,
  Clock,
  AlertCircle,
  TrendingUp,
  Award
} from 'lucide-react';

interface Wholesaler {
  id: string;
  name: string;
  region: 'gyeonggi' | 'chungcheong' | 'gyeongsang' | 'jeolla';
  regionKo: string;
  address: string;
  contact: string;
  mainProducts: {
    name: string;
    spec: string;
    price: number;
    stock: number;
    grade: string;
  }[];
  imageUrl: string;
  description: string;
  certified: boolean;
}

const INITIAL_WHOLESALERS: Wholesaler[] = [
  {
    id: 'ws-gyeonggi-01',
    name: '경기여주 00조경농원',
    region: 'gyeonggi',
    regionKo: '수도권 / 경기',
    address: '경기도 여주시 능서면 영릉로 234-10',
    contact: '010-3844-9911',
    mainProducts: [
      { name: '은행나무 특목 R12', spec: '수고 H3.5m 이상, 근원직경 R12cm, 균일수형', price: 180000, stock: 450, grade: '특A급' },
      { name: '은행나무 R15 독립수', spec: '수고 H4.0m 이상, 근원직경 R15cm, 원주형 수관', price: 280000, stock: 150, grade: '명품수' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=400',
    description: '여주 물안개 기후에 적응해 내한성이 강하고 목질이 치밀한 명품 은행나무 가로수를 다량 보유한 수도권 최대 규모 중간도매상입니다.',
    certified: true
  },
  {
    id: 'ws-chungcheong-01',
    name: '충남부여 00양묘농원',
    region: 'chungcheong',
    regionKo: '충청 / 세종',
    address: '충청남도 부여군 규암면 백제문로 455',
    contact: '010-8255-0391',
    mainProducts: [
      { name: '은행나무 R8 가로수용', spec: '수고 H3.0m, 근원직경 R8cm, 100% 수나무 보증', price: 85000, stock: 1200, grade: 'A급' },
      { name: '은행나무 R10 조경수', spec: '수고 H3.2m, 근원직경 R10cm, 지하고 1.8m 정형', price: 120000, stock: 800, grade: '특A급' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=400',
    description: '금강 유역의 비옥한 사질양토에서 재배되어 모세근 발달이 뛰어나며, 전수 DNA 유전성 분석 완료된 100% 무취 수나무 묘목을 전문 공급합니다.',
    certified: true
  },
  {
    id: 'ws-gyeongsang-01',
    name: '경북영주 00 은행양묘',
    region: 'gyeongsang',
    regionKo: '영남 / 경상',
    address: '경상북도 영주시 봉현면 소백산로 1120',
    contact: '010-5231-1804',
    mainProducts: [
      { name: '은행나무 H3.0m 독립수형', spec: '수고 H3.0m, 근원직경 R8~10cm, 자연형 수형', price: 95000, stock: 650, grade: 'A급' },
      { name: '은행나무 R12 특묘', spec: '수고 H3.5m, 근원직경 R12cm, 소백산 내한성 순화', price: 190000, stock: 300, grade: '특A급' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=400',
    description: '해발 400m 소백산 자락의 한계 기온에서 강하게 길러내어 강원, 경기 북부 등 혹한기 지역 식재 시 최고의 활착률을 자랑하는 고지대 특화 묘목입니다.',
    certified: true
  },
  {
    id: 'ws-jeolla-01',
    name: '전남 순천 00조경',
    region: 'jeolla',
    regionKo: '호남 / 전라',
    address: '전라남도 순천시 해룡면 남승룡로 152',
    contact: '010-9122-4456',
    mainProducts: [
      { name: '은행나무 R10 특화목', spec: '수고 H3.2m, 근원직경 R10cm, 밀식 가식재 완비', price: 110000, stock: 950, grade: 'A급' },
      { name: '은행나무 R15 대형 조경수', spec: '수고 H4.0m, 근원직경 R15cm, 단독 원형 분형', price: 290000, stock: 200, grade: '명품수' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1507223398984-7f485d2126e5?auto=format&fit=crop&q=80&w=400',
    description: '기후가 온화한 남도 지역에서 세심한 전지작업을 거쳐 둥글고 곧은 완벽한 원추형 수관을 가졌습니다. 남부 가로수 조성 사업 납품 실적 다수 보유.',
    certified: true
  }
];

export default function GinkgoWholesalersBanner() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Interactive spacing calculator states
  const [calcDistance, setCalcDistance] = useState<number>(2); // km
  const [calcSpacing, setCalcSpacing] = useState<number>(8); // meters
  const [isDoubleSided, setIsDoubleSided] = useState<boolean>(true);
  const [calcResult, setCalcResult] = useState<{ count: number; estimatedPrice: number; matchedMerchant: string } | null>(null);

  // Inquiry form states
  const [inquiryMerchant, setInquiryMerchant] = useState<string>('');
  const [inquiryName, setInquiryName] = useState<string>('');
  const [inquiryPhone, setInquiryPhone] = useState<string>('');
  const [inquiryQty, setInquiryQty] = useState<number>(100);
  const [inquiryNotes, setInquiryNotes] = useState<string>('');
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);
  const [showInquiryModal, setShowInquiryModal] = useState<boolean>(false);

  // Filtered Wholesalers
  const filteredWholesalers = useMemo(() => {
    return INITIAL_WHOLESALERS.filter((ws) => {
      const matchRegion = selectedRegion === 'all' || ws.region === selectedRegion;
      const matchSearch =
        ws.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ws.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ws.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ws.mainProducts.some((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchRegion && matchSearch;
    });
  }, [selectedRegion, searchTerm]);

  // Calculate trees & select best match
  const handleCalculate = () => {
    const totalMeters = calcDistance * 1000;
    const count = Math.ceil(totalMeters / calcSpacing) * (isDoubleSided ? 2 : 1);
    
    // Find the wholesaler with the most stock of R10 / R8 equivalent at best price
    let bestMerchant = INITIAL_WHOLESALERS[1]; // default 부여
    let matchedProductPrice = 120000; // 부여 R10 price
    
    // Simple heuristic to match based on quantity
    const matching = INITIAL_WHOLESALERS.find(ws => 
      ws.mainProducts.some(p => p.stock >= count)
    );
    if (matching) {
      bestMerchant = matching;
      const prod = matching.mainProducts.find(p => p.name.includes('R10') || p.name.includes('R8') || p.name.includes('H3.0m'));
      if (prod) matchedProductPrice = prod.price;
    }

    setCalcResult({
      count,
      estimatedPrice: count * matchedProductPrice,
      matchedMerchant: bestMerchant.name
    });
  };

  const handleOpenInquiry = (merchantName: string, recommendedQty?: number) => {
    setInquiryMerchant(merchantName);
    if (recommendedQty) setInquiryQty(recommendedQty);
    setInquirySubmitted(false);
    setShowInquiryModal(true);
  };

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) {
      alert('이름과 연락처를 모두 입력해주세요.');
      return;
    }
    setInquirySubmitted(true);
    setTimeout(() => {
      // Simulate real-world database delay
    }, 1000);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col space-y-8 pb-8">
      {/* 1. Header Promotinal Hero Container with Golden Image Background */}
      <div className="relative bg-stone-900 text-white min-h-[300px] md:min-h-[360px] flex items-center">
        {/* Generated Ginkgo Nursery Banner Image Background */}
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/ginkgo_nursery_banner_1782801906558.jpg"
            alt="National Ginkgo Tree Nursery"
            className="w-full h-full object-cover object-center opacity-45"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-amber-500 text-stone-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>전국 중간묘목상 우량 상품 통합 기획전</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
            전국 <span className="text-amber-300">은행나무 중간도매·양묘상</span>의<br className="hidden md:inline" />
            검증된 특화 가로수 실시간 입점 현황
          </h2>
          <p className="text-stone-300 text-xs md:text-sm max-w-2xl leading-relaxed">
            조경 식재 공사 설계, 대규모 신도시 도로 가로수 등 규격화된 수형의 은행 수나무가 필요한 조경 건설사 및 시공업체를 위해 전국 우수 중간묘목상의 보유 재고 및 규격별 단가를 한눈에 공개합니다.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <span className="text-[11px] bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-amber-200">
              ✓ DNA인증 100% 수나무 보증
            </span>
            <span className="text-[11px] bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-amber-200">
              ✓ 전국 화물 배차 및 굴취 인력 중개
            </span>
            <span className="text-[11px] bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-amber-200">
              ✓ 설계서 맞춤 견적 조율 지원
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Layout Content Wrapper */}
      <div className="px-6 md:px-8 space-y-8">
        
        {/* 2. Interactive Tree Quantity & Budget Estimator (가로수 계산기) */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50/40 rounded-2xl border border-amber-100 p-5 md:p-6 space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-amber-600 rounded-lg flex items-center justify-center text-white">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-stone-900 tracking-tight">
                가로수 은행나무 자동 견적 & 수량 산출기
              </h3>
              <p className="text-xs text-stone-500">조성 노선의 거리와 간격을 입력해 필요한 묘목 수량 및 도매가 견적을 미리 산출해 보세요.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-white p-4 rounded-xl border border-stone-150 shadow-xs">
            <div className="md:col-span-3 space-y-1.5">
              <label className="text-xs font-bold text-stone-600">가로수 구간 거리 (km)</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={calcDistance}
                onChange={(e) => setCalcDistance(parseFloat(e.target.value) || 0)}
                className="w-full text-xs p-2.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
            </div>
            <div className="md:col-span-3 space-y-1.5">
              <label className="text-xs font-bold text-stone-600">식재 간격 (m)</label>
              <input
                type="number"
                min="4"
                step="1"
                value={calcSpacing}
                onChange={(e) => setCalcSpacing(parseInt(e.target.value) || 0)}
                className="w-full text-xs p-2.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
            </div>
            <div className="md:col-span-3 space-y-1.5">
              <label className="text-xs font-bold text-stone-600">도로 식재 라인</label>
              <select
                value={isDoubleSided ? 'double' : 'single'}
                onChange={(e) => setIsDoubleSided(e.target.value === 'double')}
                className="w-full text-xs p-2.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              >
                <option value="double">양측 식재 (왕복 차선)</option>
                <option value="single">단측 식재 (일방향)</option>
              </select>
            </div>
            <div className="md:col-span-3">
              <button
                type="button"
                onClick={handleCalculate}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs p-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-amber-600/10 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>필요 규격 수량 산출</span>
              </button>
            </div>
          </div>

          {/* Calculator Result Box */}
          {calcResult && (
            <div className="bg-amber-500/10 border border-amber-300/40 p-4 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                  <CheckCircle2 className="w-4.5 h-4.5 text-amber-600" />
                  <span>설계 가이드 기준 최적 은행 수나무 매칭 완료</span>
                </div>
                <p className="text-stone-700 text-xs">
                  산출 수량: <strong className="text-stone-900 font-mono text-sm">{calcResult.count.toLocaleString()}주</strong> | 
                  추천 묘목상: <strong className="text-amber-800">{calcResult.matchedMerchant}</strong>
                </p>
                <p className="text-[11px] text-stone-500">
                  *충남부여 00양묘농원의 R8 가로수(주당 ₩85,000)를 기준으로 대량 견적이 매칭되었습니다. (NFC 원종 인증 필)
                </p>
              </div>

              <div className="text-left md:text-right space-y-1.5 min-w-[200px]">
                <p className="text-[11px] text-stone-500 font-mono">가로수 묘목 총 합계 추정가</p>
                <p className="text-amber-800 font-black text-lg font-mono">
                  ₩{calcResult.estimatedPrice.toLocaleString()}
                </p>
                <button
                  type="button"
                  onClick={() => handleOpenInquiry(calcResult.matchedMerchant, calcResult.count)}
                  className="px-4 py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-[11px] rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>이 조건으로 즉시 상담 예약</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3. Search & Region Filter Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          {/* Region Tabs */}
          <div className="flex flex-wrap gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
            {[
              { id: 'all', label: '전국 전체' },
              { id: 'gyeonggi', label: '경기/여주' },
              { id: 'chungcheong', label: '충청/부여' },
              { id: 'gyeongsang', label: '경상/영주' },
              { id: 'jeolla', label: '전라/순천' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedRegion(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedRegion === tab.id
                    ? 'bg-white text-stone-900 shadow-sm font-bold'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative max-w-xs w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-stone-400" />
            </span>
            <input
              type="text"
              placeholder="도매상 이름 또는 규격 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50/50"
            />
          </div>
        </div>

        {/* 4. Wholesalers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredWholesalers.length > 0 ? (
            filteredWholesalers.map((ws) => (
              <div
                key={ws.id}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-amber-300 transition-all hover:shadow-md flex flex-col justify-between"
              >
                <div className="p-5 space-y-4">
                  {/* Title & Badge */}
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded-md text-[10px] font-semibold border border-stone-200">
                          {ws.regionKo}
                        </span>
                        {ws.certified && (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md text-[10px] font-bold border border-amber-200">
                            DNA 100% 수나무
                          </span>
                        )}
                      </div>
                      <h4 className="font-extrabold text-stone-900 text-sm md:text-base tracking-tight flex items-center gap-1.5 mt-1">
                        <Trees className="w-4 h-4 text-emerald-600" />
                        <span>{ws.name}</span>
                      </h4>
                    </div>
                    
                    <span className="text-[10px] font-mono text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 font-bold">
                      실시간 상담가능
                    </span>
                  </div>

                  <p className="text-stone-500 text-xs leading-relaxed">
                    {ws.description}
                  </p>

                  {/* Wholesaler Spec Grid */}
                  <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-150 space-y-2.5">
                    <p className="font-bold text-[10px] text-stone-400 uppercase tracking-wider">주요 도매 보유 품목</p>
                    <div className="space-y-2">
                      {ws.mainProducts.map((p, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs border-b border-stone-100 pb-1.5 last:border-0 last:pb-0">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-stone-800">{p.name}</span>
                              <span className="text-[9px] bg-amber-100 text-amber-800 px-1 py-0.2 rounded font-bold font-mono">{p.grade}</span>
                            </div>
                            <p className="text-[10px] text-stone-500 mt-0.5">{p.spec}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-mono font-bold text-stone-900">₩{p.price.toLocaleString()}</p>
                            <p className="text-[10px] font-mono text-emerald-600">재고 {p.stock.toLocaleString()}주</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Address & Contact Details */}
                  <div className="space-y-1.5 text-xs text-stone-500 border-t border-stone-100 pt-3">
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                      <span className="truncate">{ws.address}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                      <span className="font-mono text-stone-700">{ws.contact}</span>
                    </p>
                  </div>
                </div>

                {/* Card CTA Buttons */}
                <div className="px-5 py-3.5 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] text-stone-400 font-mono">설계 자재 단가 승인 업체</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenInquiry(ws.name)}
                      className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-850 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      전화/견적 문의
                    </button>
                    <a
                      href={`tel:${ws.contact}`}
                      className="px-3 py-1.5 border border-stone-200 hover:bg-stone-100 text-stone-700 text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">즉시 연결</span>
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="lg:col-span-2 py-12 text-center space-y-3 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
              <AlertCircle className="w-8 h-8 text-stone-300 mx-auto" />
              <p className="text-stone-500 text-xs">검색 조건에 맞는 은행나무 중간묘목상이 없습니다.</p>
              <button
                onClick={() => { setSelectedRegion('all'); setSearchTerm(''); }}
                className="text-xs text-amber-600 font-semibold underline hover:text-amber-700 cursor-pointer"
              >
                필터 초기화
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 5. Interactive Site Inquiry Form Modal (상담 신청 모달) */}
      {showInquiryModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 max-w-md w-full overflow-hidden shadow-2xl animate-fade-in">
            <div className="bg-stone-950 text-white px-6 py-4 flex justify-between items-center">
              <div>
                <h4 className="font-extrabold text-sm md:text-base">은행나무 도매 출하 상담 신청</h4>
                <p className="text-[10px] text-stone-400 mt-0.5">선택 도매상과 실시간 협의 연락망이 구축됩니다.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowInquiryModal(false)}
                className="text-stone-400 hover:text-white text-xs font-bold font-mono px-2 py-1 rounded bg-white/5 border border-white/10"
              >
                닫기
              </button>
            </div>

            {!inquirySubmitted ? (
              <form onSubmit={handleInquirySubmit} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-600">대상 중간묘목상</label>
                  <input
                    type="text"
                    readOnly
                    value={inquiryMerchant}
                    className="w-full text-xs p-2.5 border border-stone-150 rounded-lg bg-stone-50 text-stone-700 font-bold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-600">성명 (담당자)</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="w-3.5 h-3.5 text-stone-400" />
                      </span>
                      <input
                        type="text"
                        placeholder="홍길동"
                        required
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="w-full text-xs pl-8 pr-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-600">상담 필요 수량 (주)</label>
                    <input
                      type="number"
                      min="10"
                      value={inquiryQty}
                      onChange={(e) => setInquiryQty(parseInt(e.target.value) || 0)}
                      className="w-full text-xs p-2.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-600">연락처</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                    </span>
                    <input
                      type="tel"
                      placeholder="010-1234-5678"
                      required
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-600">추가 협의 및 필요 규격사항 (선택)</label>
                  <textarea
                    rows={3}
                    placeholder="예: 가로수용 R10 균일목 500주, 지하고 1.8m 이상 검수 필 필요합니다."
                    value={inquiryNotes}
                    onChange={(e) => setInquiryNotes(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 mt-2 cursor-pointer shadow-sm shadow-amber-600/10"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>출하 협의 무료 신청하기</span>
                </button>
              </form>
            ) : (
              <div className="p-8 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-extrabold text-stone-900 text-sm md:text-base">출하 상담 접수 완료!</h5>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    선택하신 <strong>{inquiryMerchant}</strong>의 출하 담당자에게 정보가 발송되었습니다. 입력하신 번호로 영업일 기준 2시간 이내에 직접 안내 전화를 드립니다.
                  </p>
                </div>

                <div className="bg-stone-50 p-4 rounded-xl border border-stone-150 text-left space-y-1.5 text-xs">
                  <p className="text-stone-400 font-bold text-[10px] uppercase tracking-wider">접수된 상담 신청 명세</p>
                  <p className="text-stone-700">· 신청자: <span className="font-bold text-stone-900">{inquiryName}님</span></p>
                  <p className="text-stone-700">· 희망 수량: <span className="font-bold text-stone-900 font-mono">{inquiryQty.toLocaleString()}주</span></p>
                  <p className="text-stone-700">· 매칭 규격: <span className="font-mono text-amber-700 font-bold">DNA-Cert 은행나무 특화목</span></p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowInquiryModal(false)}
                  className="w-full py-2 bg-stone-900 hover:bg-stone-850 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  닫기
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
