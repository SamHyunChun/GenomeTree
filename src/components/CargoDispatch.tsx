import React, { useState } from 'react';
import { Truck, MapPin, Calculator, ShieldCheck, CheckCircle2, Navigation, Clock, PhoneCall, AlertCircle } from 'lucide-react';

interface RouteState {
  origin: string;
  destination: string;
  truckType: string;
  hasCrane: boolean;
  needsPermit: boolean;
}

export default function CargoDispatch() {
  const [route, setRoute] = useState<RouteState>({
    origin: '충남 부여',
    destination: '경기 가평',
    truckType: '5ton',
    hasCrane: false,
    needsPermit: false,
  });

  const [inquiries, setInquiries] = useState<Array<any>>([
    {
      id: 'dis-01',
      date: '2026-06-30 08:30',
      route: '충남 부여 00양묘농원 → 경기 화성시',
      truck: '5톤 카고 (R8 은행나무 80주)',
      status: '배차완료',
      truckNo: '경기85바 3921',
      driver: '김*현 기사님',
    },
    {
      id: 'dis-02',
      date: '2026-06-30 09:15',
      route: '경북영주 00 은행양묘 → 강원 원주시',
      truck: '11톤 윙바디 (2년생 실생 6,000주)',
      status: '운송중',
      truckNo: '경북91아 1058',
      driver: '이*우 기사님',
    },
    {
      id: 'dis-03',
      date: '2026-06-30 11:45',
      route: '전남 순천 00조경 → 충북 청주시',
      truck: '1톤 트럭 (R10 특화목 5주)',
      status: '배차대기',
      truckNo: '대기중',
      driver: '배차 매칭중',
    }
  ]);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  // Distances and prices based on combinations (mock but logical)
  const truckTypes = [
    { id: '1ton', name: '1톤 트럭 (소량/포트묘용)', basePrice: 120000, capacity: '묘목 다발 300주 내외' },
    { id: '5ton', name: '5톤 카고 (R8 가로수 70-80주)', basePrice: 280000, capacity: 'R8 가로수 약 80주 / 5톤 규격' },
    { id: '11ton', name: '11톤 대형 (R12 가로수 30-40주)', basePrice: 420000, capacity: 'R12 가로수 약 35주 / 11톤 규격' },
    { id: '25ton', name: '25톤 트레일러 (대형 조경공사용)', basePrice: 650000, capacity: '대형 성목 및 대용량 조림' },
  ];

  const origins = ['충남 부여', '경북 영주', '전남 순천', '경기 여주', '전북 장수'];
  const destinations = ['경기 가평', '서울 강남', '인천 서구', '세종시', '강원 춘천', '경남 창원', '부산 해운대'];

  const calculatePrice = () => {
    // Generate a deterministically logical price
    const truck = truckTypes.find(t => t.id === route.truckType);
    if (!truck) return 0;

    let multiplier = 1.0;
    
    // Distance multiplier simulation
    const oIdx = origins.indexOf(route.origin);
    const dIdx = destinations.indexOf(route.destination);
    const distanceFactor = Math.abs((oIdx !== -1 ? oIdx : 1) - (dIdx !== -1 ? dIdx : 2)) + 1;
    
    multiplier += distanceFactor * 0.15;

    if (route.hasCrane) multiplier += 0.25; // Crane trucks are more expensive
    if (route.needsPermit) multiplier += 0.10; // Permit adds fee

    return Math.round((truck.basePrice * multiplier) / 1000) * 1000;
  };

  const handleRequestDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) {
      alert('연락처 정보를 모두 입력해주세요.');
      return;
    }

    const selectedTruck = truckTypes.find(t => t.id === route.truckType);
    const newInquiry = {
      id: `dis-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      route: `${route.origin} → ${route.destination}`,
      truck: `${selectedTruck?.name.split(' (')[0]} (${route.hasCrane ? '셀프로더 크레인 포함, ' : ''}배차 상담 요청)`,
      status: '배차대기',
      truckNo: '대기중',
      driver: '배차 매칭중',
    };

    setInquiries([newInquiry, ...inquiries]);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactName('');
      setContactPhone('');
    }, 4000);
  };

  const currentPrice = calculatePrice();

  return (
    <div className="space-y-8" id="cargo-dispatch-view">
      {/* Introduction Header */}
      <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 translate-x-10 translate-y-[-10px] pointer-events-none">
          <Truck className="w-80 h-80" />
        </div>
        <div className="relative z-10 space-y-3 max-w-2xl">
          <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            전국 양묘농원 연계 스마트 배차망
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">전국 수목 전문 화물 배차 시스템</h2>
          <p className="text-stone-300 text-xs md:text-sm leading-relaxed">
            뿌리분 굴취 후 즉시 현장으로 운송해야 활착률을 극대화할 수 있습니다. 
            조경수 전용 5톤/11톤 카고, 저상 트레일러(셀프로더)부터 대량 묘목 박스용 윙바디까지 실시간 맞춤 매칭을 지원합니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Real-time Calculator & Dispatch Inquiry */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Calculator className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-stone-950 text-base">간편 거리별 배차 견적 계산기</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">출발지 (전국 주요 양묘지)</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                <select
                  value={route.origin}
                  onChange={(e) => setRoute({ ...route, origin: e.target.value })}
                  className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                >
                  {origins.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">도착지 (식재 시공 현장)</label>
              <div className="relative">
                <Navigation className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                <select
                  value={route.destination}
                  onChange={(e) => setRoute({ ...route, destination: e.target.value })}
                  className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                >
                  {destinations.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">차량 규격 및 배차 타입</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {truckTypes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setRoute({ ...route, truckType: t.id })}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    route.truckType === t.id
                      ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600/30'
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-extrabold text-xs text-stone-900">{t.name.split(' (')[0]}</span>
                    {route.truckType === t.id && <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />}
                  </div>
                  <span className="text-[10px] text-stone-500 mt-1 leading-normal">{t.capacity}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Specialized options */}
          <div className="space-y-2.5 bg-stone-50 p-4 rounded-xl border border-stone-100">
            <h4 className="text-[11px] font-extrabold text-stone-600 uppercase tracking-wider">특수 장비 및 운송 옵션</h4>
            <div className="flex flex-wrap gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 font-semibold">
                <input
                  type="checkbox"
                  checked={route.hasCrane}
                  onChange={(e) => setRoute({ ...route, hasCrane: e.target.checked })}
                  className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                자체 크레인/셀프로더 차종 요청 (+25%)
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 font-semibold">
                <input
                  type="checkbox"
                  checked={route.needsPermit}
                  onChange={(e) => setRoute({ ...route, needsPermit: e.target.checked })}
                  className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                장재물 도로점용 허가 대행 요청 (+10%)
              </label>
            </div>
          </div>

          {/* Pricing display */}
          <div className="bg-amber-50/60 border border-amber-200/50 rounded-2xl p-4 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] text-amber-800 font-bold tracking-wide">실시간 예상 운송 단가 (편도 기준)</span>
              <p className="text-[11px] text-amber-700">거리 계산식 및 조경수 화물 표준 단가 연동 완료</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-stone-400 line-through mr-1.5">₩{(currentPrice * 1.12).toLocaleString()}</span>
              <span className="text-lg md:text-xl font-extrabold text-amber-900">
                ₩{currentPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Contact and Submission Form */}
          <form onSubmit={handleRequestDispatch} className="space-y-4 pt-2">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="w-4 h-4 text-emerald-600" />
              <span className="text-[11px] font-bold text-stone-700">배차 예약 및 배차 실시간 매칭 접수</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="담당자명 (예: 김현우 소장)"
                className="px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                required
              />
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="연락처 (예: 010-1234-5678)"
                className="px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                required
              />
            </div>

            {formSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold animate-pulse">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                배차 접수가 즉시 완료되었습니다! 곧 전담 배차반장이 전화를 드립니다.
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white py-3 rounded-xl text-xs font-extrabold shadow-sm shadow-emerald-950/20 transition-all flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4" />
                조경전문 기사 실시간 배차 접수하기
              </button>
            )}
          </form>
        </div>

        {/* Live Dispatch Management Board */}
        <div className="lg:col-span-5 bg-stone-50 p-6 rounded-2xl border border-stone-200 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200/60 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600 animate-spin-slow" />
                <h3 className="font-extrabold text-stone-950 text-base">오늘의 실시간 화물 배차 현황</h3>
              </div>
              <span className="bg-emerald-100 text-emerald-800 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full">
                LIVE UPDATE
              </span>
            </div>

            <div className="space-y-4.5 overflow-y-auto max-h-[360px] pr-1">
              {inquiries.map((inq) => (
                <div key={inq.id} className="bg-white p-4 rounded-xl border border-stone-100 shadow-2xs relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-stone-400 font-mono font-medium">{inq.date}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-tight ${
                      inq.status === '배차완료'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                        : inq.status === '운송중'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200/50'
                        : 'bg-amber-50 text-amber-700 border border-amber-200/50 animate-pulse'
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-xs text-stone-900 leading-normal mb-1">{inq.route}</h4>
                  <div className="space-y-1 mt-2 text-[11px] text-stone-500 font-medium">
                    <div className="flex items-center gap-1">
                      <span className="text-stone-400">차량:</span>
                      <strong className="text-stone-700 font-bold">{inq.truck}</strong>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-stone-400">배차정보:</span>
                      <span className="text-stone-700">{inq.truckNo} ({inq.driver})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200/60 space-y-3.5">
            <div className="flex items-center gap-2 text-stone-500 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>적재물 전용 화물보험 (메리츠 최대 2억 원) 전 차량 자동 가입 보장</span>
            </div>
            
            <div className="bg-emerald-950 text-white rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4.5 h-4.5 text-emerald-400" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-emerald-400 font-bold tracking-wider">긴급 배차지원센터 (24시간)</span>
                  <span className="text-xs font-bold">02-1566-9040</span>
                </div>
              </div>
              <a
                href="tel:02-1566-9040"
                className="bg-emerald-800 hover:bg-emerald-700 px-3 py-1.5 rounded-lg text-[10px] font-bold text-white transition-all shadow-xs"
              >
                전화 연결
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
