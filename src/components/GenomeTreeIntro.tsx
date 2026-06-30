import React, { useState } from 'react';
import { Dna, ShieldCheck, Search, Award, RefreshCw, BarChart2, Info, CheckCircle2, ChevronRight, Activity, HelpCircle } from 'lucide-react';

interface GeneMarker {
  id: string;
  name: string;
  chromosome: number;
  location: string;
  functionTitle: string;
  description: string;
  impact: string;
}

export default function GenomeTreeIntro() {
  const [selectedMarker, setSelectedMarker] = useState<string>('sex');
  const [hoveredChr, setHoveredChr] = useState<number | null>(null);

  // Ginkgo Biloba Genome is famous for being huge (10.6 Gb, 3.5x human genome) and has 12 chromosomes.
  const markers: GeneMarker[] = [
    {
      id: 'sex',
      name: 'Gb_Sex_M1 (성결정 유전자 마커)',
      chromosome: 2,
      location: 'Chr 2 - 45.2 Mb',
      functionTitle: '암수나무 조기 원천 판별',
      description: '은행나무의 성별을 좌우하는 성염색체 상의 특정 DNA 염기서열 마커입니다. 묘목 잎 단 0.1g에서 추출한 DNA 증폭(PCR)을 통해 악취가 나지 않는 "수나무" 여부를 99.9% 신뢰도로 진단해 냅니다.',
      impact: '가로수 식재 후 가을철 발생하는 열매 악취 민원의 근본적이고 선제적인 해결책 제공.'
    },
    {
      id: 'flavonoid',
      name: 'Gb_FLS3 (플라보놀 합성효소 유전자)',
      chromosome: 5,
      location: 'Chr 5 - 128.7 Mb',
      functionTitle: '혈행 개선 물질 합성 극대화',
      description: '혈액 순환 개선 및 혈관 보호 효능을 가진 핵심 성분인 플라보놀 배당체(Flavonoid glycosides)의 합성 단계를 제어하는 효소 유전자 군집입니다. 이 유전자가 활성화된 개체는 잎의 약리 성분 함량이 월등히 높습니다.',
      impact: '은행잎 추출 약리 원료로서의 상업적 가치 및 제약 가치 극대화.'
    },
    {
      id: 'ginkgolide',
      name: 'Gb_LPS_Terp (테르페노이드 고리화효소)',
      chromosome: 8,
      location: 'Chr 8 - 14.8 Mb',
      functionTitle: '뇌혈류 증진 및 치매 예방 물질 생산',
      description: '은행나무에만 특이적으로 존재하는 독보적인 약리 성분인 징코라이드(Ginkgolide)와 빌로발라이드(Bilobalide)의 생합성 초기 경로를 담당하는 유전자입니다. 뇌 세포 활성화 및 강력한 항산화 작용을 돕습니다.',
      impact: '기억력 개선, 뇌혈류 장애 개선 의약품 제조의 핵심 기초 마커.'
    },
    {
      id: 'resistance',
      name: 'Gb_PR10 (병해충 및 환경 스트레스 방어 단백질)',
      chromosome: 11,
      location: 'Chr 11 - 92.1 Mb',
      functionTitle: '공해/방사선 극복 및 불사(不死)의 저항성',
      description: '화학적 가뭄, 중금속 오염, 도심 매연, 강력한 유해 광선(방사선 포함) 하에서도 단백질 구조를 유지하고 세포 사멸을 막는 방어 단백질 유전자입니다. 은행나무가 2억 7천만 년 동안 무수한 빙하기와 멸종 속에서도 변함없이 생존해 온 생명력의 본질입니다.',
      impact: '도심 매연과 아황산가스 차단 등 친환경 가로수 방호벽 기능 극대화.'
    }
  ];

  const chromosomes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const currentMarker = markers.find(m => m.id === selectedMarker) || markers[0];

  return (
    <div className="space-y-8 animate-fade-in" id="genome-tree-intro-view">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 translate-x-12 pointer-events-none">
          <Dna className="w-96 h-96 animate-pulse" />
        </div>
        <div className="relative z-10 space-y-3 max-w-2xl">
          <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            세계 최초 은행나무 게놈 10.6Gb 해독 및 상용화
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">게놈트리(Genome Tree) 바이오 테크놀로지</h2>
          <p className="text-stone-300 text-xs md:text-sm leading-relaxed">
            인간 유전체의 약 3.5배에 달하는 대용량 거대 게놈(Giant Genome)을 정밀 해독하여 탄생한 스마트 가로수 솔루션.
            DNA 레벨에서 암수 성별과 약리 물질 합성 능력을 사전에 100% 감별·보증하여 냄새 없고 고부가 가치를 실현하는 새로운 도시 산림의 미래를 엽니다.
          </p>
        </div>
      </div>

      {/* Tech Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-3xs flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">거대 유전체 크기 (Genome Size)</span>
            <p className="text-xl md:text-2xl font-black text-indigo-950">10.6 Billion bp</p>
          </div>
          <span className="text-[10.5px] text-stone-500 font-medium leading-relaxed mt-3">
            인간 게놈(3.2 Gb)의 약 <strong>3.5배</strong>에 달하는 크기로, 수억 년 축적된 방대한 저항성 유전 정보 수록.
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-3xs flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">전체 염색체 수 (Chromosomes)</span>
            <p className="text-xl md:text-2xl font-black text-emerald-900">2n = 24 (12쌍)</p>
          </div>
          <span className="text-[10.5px] text-stone-500 font-medium leading-relaxed mt-3">
            성염색체를 포함한 총 12쌍의 염색체에 <strong>약 43,000개</strong>의 기능성 유전자 코딩 정보가 맵핑되어 있습니다.
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-3xs flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">성별 판별 신뢰성 (Accuracy)</span>
            <p className="text-xl md:text-2xl font-black text-amber-900">99.9% DNA 보증</p>
          </div>
          <span className="text-[10.5px] text-stone-500 font-medium leading-relaxed mt-3">
            국립산림과학원 특허 기술 연계, 묘목 단계에서 <strong>Gp-MSP 분자 마커</strong> 기반 PCR 유전자 분석 완료.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Interactive Genome Map Visualizer */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-3xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              <h3 className="font-extrabold text-stone-950 text-base">인터랙티브 게놈 염색체 맵 (Ginkgo Chromosome Map)</h3>
            </div>
            <span className="text-[10px] bg-indigo-50 text-indigo-800 border border-indigo-100 font-bold px-2 py-0.5 rounded-full">
              12 Chromosomes
            </span>
          </div>

          <p className="text-xs text-stone-500 leading-normal font-medium">
            아래 염색체 바를 클릭하거나 우측 기능 목록을 탭하여 은행나무 유전정보에 등재된 핵심 유용 바이오 유전자를 조회해보세요.
          </p>

          {/* Simulated Chromosome Visual Grid */}
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 space-y-5">
            <div className="flex items-end justify-between gap-1.5 h-32 md:h-36 px-2">
              {chromosomes.map((chr) => {
                const isSelected = currentMarker.chromosome === chr;
                const isHovered = hoveredChr === chr;
                // Height scaling just for fun visual variation
                const heightClass = [
                  'h-[90%]', 'h-[95%]', 'h-[85%]', 'h-[80%]',
                  'h-[88%]', 'h-[75%]', 'h-[70%]', 'h-[82%]',
                  'h-[65%]', 'h-[60%]', 'h-[73%]', 'h-[50%]'
                ][chr - 1];

                return (
                  <div
                    key={chr}
                    className="flex flex-col items-center flex-1 group cursor-pointer"
                    onMouseEnter={() => setHoveredChr(chr)}
                    onMouseLeave={() => setHoveredChr(null)}
                    onClick={() => {
                      const matched = markers.find(m => m.chromosome === chr);
                      if (matched) {
                        setSelectedMarker(matched.id);
                      }
                    }}
                  >
                    {/* DNA Bands within chromosome */}
                    <div className={`w-full ${heightClass} rounded-full relative transition-all duration-300 flex flex-col justify-around py-2 overflow-hidden ${
                      isSelected 
                        ? 'bg-gradient-to-t from-indigo-600 via-indigo-500 to-indigo-400 ring-2 ring-indigo-600/50 shadow-sm' 
                        : isHovered 
                        ? 'bg-indigo-300' 
                        : 'bg-stone-300/80'
                    }`}>
                      {/* Visual band dashes representing genetic loci */}
                      <span className={`w-full h-1 block ${isSelected ? 'bg-indigo-200' : 'bg-stone-200/50'}`} />
                      <span className={`w-full h-1 block ${isSelected ? 'bg-indigo-100' : 'bg-stone-400/40'}`} />
                      <span className={`w-full h-1.5 block ${isSelected ? 'bg-amber-300' : 'bg-stone-400/20'}`} />
                      <span className={`w-full h-1 block ${isSelected ? 'bg-indigo-100' : 'bg-stone-200/50'}`} />
                    </div>
                    <span className={`text-[9px] mt-2 font-mono font-bold tracking-tight transition-all ${
                      isSelected ? 'text-indigo-600 font-extrabold' : 'text-stone-400'
                    }`}>
                      Chr {chr}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Scale guide */}
            <div className="flex items-center justify-between text-[10px] text-stone-400 font-semibold border-t border-stone-200/60 pt-2 px-1">
              <span>0.0 Mb</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-indigo-500 inline-block" />
                선택된 염색체
                <span className="w-2.5 h-2.5 rounded-xs bg-amber-400 inline-block ml-2" />
                활성 유용 마커 Locus
              </span>
              <span>약 900.0 Mb</span>
            </div>
          </div>

          {/* Quick Select Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {markers.map((marker) => (
              <button
                key={marker.id}
                onClick={() => setSelectedMarker(marker.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  selectedMarker === marker.id
                    ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600/20'
                    : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-stone-400 font-mono">Chr {marker.chromosome} Locus</span>
                  {selectedMarker === marker.id && <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />}
                </div>
                <h4 className="font-extrabold text-xs text-stone-900 mt-1">{marker.functionTitle}</h4>
              </button>
            ))}
          </div>
        </div>

        {/* Genome Detail Panel & PCR Flow */}
        <div className="lg:col-span-5 bg-stone-50 p-6 rounded-2xl border border-stone-200 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-stone-200/60 pb-3">
              <Search className="w-5 h-5 text-indigo-600" />
              <h3 className="font-extrabold text-stone-950 text-base">유전자 분석 상세서 (Analysis Report)</h3>
            </div>

            {/* Selected Marker Detail Card */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] bg-indigo-50 text-indigo-700 font-mono font-bold px-2 py-0.5 rounded-md border border-indigo-100">
                  {currentMarker.location}
                </span>
                <span className="text-[10.5px] font-extrabold text-indigo-600">
                  {currentMarker.functionTitle}
                </span>
              </div>

              <h4 className="font-extrabold text-xs text-stone-900 font-mono leading-tight">
                {currentMarker.name}
              </h4>

              <p className="text-[11.5px] text-stone-600 leading-relaxed font-medium">
                {currentMarker.description}
              </p>

              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-100 text-[11px] space-y-1">
                <span className="text-stone-400 font-bold block uppercase tracking-wide">실제 현장 적용 및 기대효과 (Impact)</span>
                <p className="text-stone-700 font-semibold leading-normal">{currentMarker.impact}</p>
              </div>
            </div>

            {/* PCR Analysis Workflow */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold text-stone-400 uppercase tracking-wider px-1">DNA 수나무 인증 및 분석 절차</h4>
              
              <div className="space-y-2">
                <div className="bg-white p-3 rounded-xl border border-stone-100 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center font-mono font-bold text-xs text-indigo-700">1</div>
                  <div className="text-[11px]">
                    <strong className="text-stone-800 block">잎사귀 시료 채취 (0.1g)</strong>
                    <span className="text-stone-500">육안 구분이 불가능한 1년생 묘목에서 고유 시료 채집</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-stone-100 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center font-mono font-bold text-xs text-indigo-700">2</div>
                  <div className="text-[11px]">
                    <strong className="text-stone-800 block">PCR 특이적 프라이머 분석</strong>
                    <span className="text-stone-500">Gp-MSP 분자 프라이머를 활용한 성결정 밴드 분석</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-stone-100 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center font-mono font-bold text-xs text-indigo-700">3</div>
                  <div className="text-[11px]">
                    <strong className="text-stone-800 block">NFC 데이터베이스 등록 & NFC 태깅</strong>
                    <span className="text-stone-500">인증번호 부여 및 성목 출하 시 개체 추적 바코드/NFC 연동</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200/60 space-y-3">
            <div className="flex items-center gap-2 text-stone-500 text-xs font-semibold">
              <ShieldCheck className="w-4.5 h-4.5 text-indigo-600 flex-shrink-0" />
              <span>본 기술은 국립산림과학원의 기술 특허를 연계한 표준 분석 기법입니다.</span>
            </div>

            <div className="bg-slate-950 text-white rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Dna className="w-5 h-5 text-indigo-400" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-indigo-400 font-bold tracking-wider">DNA인증 및 분석 의뢰 센터</span>
                  <span className="text-xs font-bold">국내 유일 민간 분석 연계 서비스</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert('DNA 성별 감별 및 분석 서비스 의뢰 안내가 이메일로 전송되었습니다 (시뮬레이션).')}
                className="bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg text-[10px] font-bold text-white transition-all shadow-xs"
              >
                의뢰 문의
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
