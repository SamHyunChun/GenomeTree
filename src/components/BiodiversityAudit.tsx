import React, { useState } from 'react';
import { 
  Shield, 
  Activity, 
  Leaf, 
  CheckCircle, 
  Trees, 
  Search, 
  FileText, 
  Globe, 
  AlertCircle, 
  Sparkles,
  Plus,
  ArrowRight,
  TrendingUp,
  FileCheck,
  MapPin
} from 'lucide-react';

interface AuditRecord {
  id: string;
  date: string;
  location: string;
  area: string;
  inspector: string;
  score: number;
  grade: 'S' | 'A' | 'B' | 'C';
  status: '완료' | '심사중' | '보완필요';
}

const INITIAL_AUDITS: AuditRecord[] = [
  {
    id: 'BD-2026-081',
    date: '2026-06-25',
    location: '충남 아산시 배방읍 수목 단지',
    area: '4,500 m²',
    inspector: '김태균 책임연구원',
    score: 94,
    grade: 'S',
    status: '완료'
  },
  {
    id: 'BD-2026-079',
    date: '2026-06-12',
    location: '전북 완주군 봉동읍 양묘림',
    area: '12,000 m²',
    inspector: '이지은 선임평가원',
    score: 88,
    grade: 'A',
    status: '완료'
  },
  {
    id: 'BD-2026-074',
    date: '2026-05-28',
    location: '경기 여주시 능서면 조경수 필지',
    area: '8,200 m²',
    inspector: '박상현 박사',
    score: 76,
    grade: 'B',
    status: '보완필요'
  },
  {
    id: 'BD-2026-085',
    date: '2026-06-29',
    location: '강원 홍천군 북방면 산림조합',
    area: '15,000 m²',
    inspector: '정해원 책임연구원',
    score: 91,
    grade: 'A',
    status: '심사중'
  }
];

export default function BiodiversityAudit() {
  // Simulator State
  const [area, setArea] = useState<number>(3000);
  const [density, setDensity] = useState<number>(150); // trees per 1000m²
  const [companionSpecies, setCompanionSpecies] = useState<number>(4);
  const [soilType, setSoilType] = useState<string>('sandy-loam');
  const [waterProximity, setWaterProximity] = useState<boolean>(true);

  // Audit Request State
  const [audits, setAudits] = useState<AuditRecord[]>(INITIAL_AUDITS);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newLocation, setNewLocation] = useState<string>('');
  const [newArea, setNewArea] = useState<number>(2500);
  const [newInspector, setNewInspector] = useState<string>('신청인 지정 연구원');

  // Dynamic simulation calculations
  const calculateBiodiversityScore = () => {
    let score = 50;

    // Area factor (Larger size is better for ecological stability)
    if (area > 10000) score += 15;
    else if (area > 5000) score += 10;
    else score += 5;

    // Density factor (Too crowded or too sparse reduces structural diversity)
    if (density >= 100 && density <= 200) score += 15;
    else if (density > 200) score -= 5; // overpopulated, lower score
    else score += 8;

    // Companion species factor (Extremely critical for biodiversity!)
    score += Math.min(companionSpecies * 5, 25);

    // Soil quality factor
    if (soilType === 'clay') score += 5;
    if (soilType === 'sandy-loam') score += 10;
    if (soilType === 'loam') score += 15;

    // Proximity to water (buffer zones, rivers improve bird/insect diversity)
    if (waterProximity) score += 15;

    return Math.min(score, 100);
  };

  const score = calculateBiodiversityScore();
  
  const getGrade = (s: number) => {
    if (s >= 90) return { letter: 'S', color: 'bg-emerald-500 text-white', border: 'border-emerald-600', text: '최우수 (Excellent Ecological Corridor)' };
    if (s >= 80) return { letter: 'A', color: 'bg-teal-500 text-white', border: 'border-teal-600', text: '우수 (Highly Biodiverse)' };
    if (s >= 70) return { letter: 'B', color: 'bg-amber-500 text-white', border: 'border-amber-600', text: '보통 (Moderately Stable)' };
    return { letter: 'C', color: 'bg-rose-500 text-white', border: 'border-rose-600', text: '미흡 (Needs Restoration Plans)' };
  };

  const currentGrade = getGrade(score);

  const handleRequestAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocation) return;

    const newRecord: AuditRecord = {
      id: `BD-2026-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      location: newLocation,
      area: `${newArea.toLocaleString()} m²`,
      inspector: newInspector || '대기 중 (중앙연구소 배정)',
      score: 0,
      grade: 'C',
      status: '심사중'
    };

    setAudits([newRecord, ...audits]);
    setNewLocation('');
    setShowForm(false);
  };

  return (
    <div className="space-y-8 animate-fade-in" id="biodiversity-audit-container">
      
      {/* 1. Introductory Hero Card */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-emerald-950 rounded-3xl p-6 md:p-8 text-white border border-emerald-900/40 relative overflow-hidden shadow-xl" id="bio-intro-hero">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3.5 max-w-3xl">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              EU &amp; 글로벌 ESG 규제 및 산림생물다양성 실사 대응
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              생물다양성 현장 실사 <span className="text-emerald-400 font-black">(Biodiversity Due Diligence)</span>
            </h1>
            <p className="text-stone-300 text-xs md:text-sm leading-relaxed">
              MaleGinkgo는 단순 조경수 판매를 넘어, 식재지의 생태적 건전성과 종다양성을 과학적으로 실사 및 검증합니다. 
              단일 수종(Monoculture) 밀집으로 인한 생태 고립을 예방하고, 자생 지피식물과의 조화로운 동반 식재 가이드를 통해 산림법 및 글로벌 ESG 실사 기준에 완벽 부합하는 생태 통로를 복원합니다.
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 flex-shrink-0 lg:w-80">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-stone-400">국제 표준 준수</p>
              <p className="text-sm font-bold text-white mt-0.5">TNFD / ESG 공급망 실사</p>
              <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> 100% 실사 적합성 가이드 제공
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Biodiversity Interactive Simulator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="bio-simulator-section">
        {/* Input Parameters Form (Left Side) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-7 border border-stone-200 shadow-xs space-y-6">
          <div className="border-l-4 border-emerald-600 pl-4 py-0.5">
            <h2 className="text-lg font-extrabold text-stone-900 tracking-tight flex items-center gap-1.5">
              <Activity className="w-5 h-5 text-emerald-600 animate-pulse" />
              식재 환경 생물다양성 실증 자가 진단
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">계획하시는 식재 구역의 생태 환경을 입력하여 예측 등급을 산출해 보세요.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {/* Area Slider */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 flex justify-between">
                <span>계획 식재 총 면적</span>
                <span className="text-emerald-700 font-mono">{area.toLocaleString()} m²</span>
              </label>
              <input 
                type="range" 
                min="500" 
                max="30000" 
                step="500"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>500 m²</span>
                <span>30,000 m²</span>
              </div>
            </div>

            {/* Density Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 flex justify-between">
                <span>식재 밀도 (1,000m²당 수량)</span>
                <span className="text-emerald-700 font-mono">{density} 주</span>
              </label>
              <input 
                type="range" 
                min="50" 
                max="400" 
                step="10"
                value={density}
                onChange={(e) => setDensity(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>50주 (낮음)</span>
                <span>400주 (과밀)</span>
              </div>
            </div>

            {/* Understory Companion Species count */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 flex justify-between">
                <span>혼합 지피식물 및 동반 수종 수</span>
                <span className="text-emerald-700 font-mono">{companionSpecies} 종</span>
              </label>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setCompanionSpecies(Math.max(0, companionSpecies - 1))}
                  className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold flex items-center justify-center transition"
                >
                  -
                </button>
                <div className="flex-1 text-center font-mono font-bold text-stone-800 bg-stone-50 border border-stone-200 rounded-lg py-1">
                  {companionSpecies} 개 수종
                </div>
                <button 
                  onClick={() => setCompanionSpecies(Math.min(10, companionSpecies + 1))}
                  className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold flex items-center justify-center transition"
                >
                  +
                </button>
              </div>
              <p className="text-[10px] text-amber-600 font-medium">※ 잔디 외 자생 들꽃, 관목 등을 함께 식재할수록 우수한 등급이 나옵니다.</p>
            </div>

            {/* Soil Type Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700">식재지 토양 성상</label>
              <select 
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 font-medium"
              >
                <option value="clay">점토질 (Clay) - 통수 미흡</option>
                <option value="sandy-loam">사양토 (Sandy Loam) - 통풍 양호</option>
                <option value="loam">양토 (Loam) - 부식질 풍부 및 생태 최적</option>
              </select>
            </div>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/60 flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-stone-800 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-teal-600" />
                식재지 인근 500m 이내 하천, 저수지 혹은 산림림지 인접 여부
              </p>
              <p className="text-[10px] text-stone-500">수체(Waterbody)나 원시림 인근 식재 시 생태 복원 시너지가 가중됩니다.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={waterProximity} 
                onChange={(e) => setWaterProximity(e.target.checked)} 
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:width-5 after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>

        {/* Realtime Feedback Card (Right Side) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-stone-50 to-stone-100 rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              실시간 AI 예측 진단 결과
            </span>

            <div className="flex items-center gap-5 bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black ${currentGrade.color} shadow-sm`}>
                {currentGrade.letter}
              </div>
              <div>
                <p className="text-xs text-stone-500 font-mono">예측 생물다양성 실사 등급</p>
                <p className="text-base font-extrabold text-stone-900 mt-0.5">{currentGrade.text}</p>
                <div className="w-full bg-stone-100 h-2 rounded-full mt-2 overflow-hidden flex">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${score}%` }} />
                </div>
                <p className="text-[10px] text-stone-400 font-mono mt-1 text-right">종합 생태 점수: {score}/100점</p>
              </div>
            </div>

            {/* Practical Advice Section */}
            <div className="space-y-2.5 pt-2">
              <p className="text-xs font-bold text-stone-800">📋 실사 등급 향상을 위한 제안:</p>
              <ul className="text-xs text-stone-600 space-y-2 pl-1">
                {companionSpecies < 5 && (
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-500 mt-0.5">💡</span>
                    <span>은행 단일종 식재보다 <strong>자생 구절초, 벌개미취, 조팝나무</strong> 등 초화·관목류를 4종 이상 혼식하여 벌·나비 서식처를 개선하세요. (+15점 상승 가능)</span>
                  </li>
                )}
                {density > 200 && (
                  <li className="flex items-start gap-1.5">
                    <span className="text-rose-500 mt-0.5">⚠️</span>
                    <span>현재 식재 예정 밀도가 다소 높습니다. 수목 간격을 <strong>최소 4~5m 이상</strong>으로 조율하면 하부 식생 성장에 매우 유리합니다.</span>
                  </li>
                )}
                {!waterProximity && (
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-500 mt-0.5">💧</span>
                    <span>인근 하천 연계가 불가한 경우, 구역 내에 작은 <strong>생태둠벙(웅덩이)이나 간이 수분 공급지</strong>를 설계해 보강 조치할 수 있습니다.</span>
                  </li>
                )}
                {companionSpecies >= 5 && density >= 100 && density <= 200 && (
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 mt-0.5">✨</span>
                    <span>아주 모범적인 생태 친화형 배치입니다! 이대로 현장 실사를 신청하시면 <strong>ESG 조경 우수 인증서</strong> 발급 요건에 충족될 가능성이 매우 높습니다.</span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => setShowForm(true)}
              className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md shadow-emerald-700/10 flex items-center justify-center gap-1.5 transition active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              정식 현장 실사 의뢰하기
            </button>
          </div>
        </div>
      </div>

      {/* 3. Real On-site Audit Management (Table) */}
      <div className="bg-white rounded-3xl p-6 md:p-7 border border-stone-200 shadow-xs space-y-6" id="bio-audit-management">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="border-l-4 border-stone-700 pl-4 py-0.5">
            <h2 className="text-lg font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-700" />
              지역별 현장 생물다양성 실사 대장
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">전국 지자체 조경 사업 및 스마트 양묘지 생태 실사 내역과 판정 결과입니다.</p>
          </div>

          <button 
            onClick={() => setShowForm(!showForm)}
            className="self-start sm:self-center px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-stone-600" />
            {showForm ? '의뢰 폼 닫기' : '신규 실사 의뢰 양식'}
          </button>
        </div>

        {/* Floating request form if toggled */}
        {showForm && (
          <form onSubmit={handleRequestAudit} className="bg-emerald-50/50 border border-emerald-100/80 p-5 rounded-2xl space-y-4 animate-fade-in">
            <h3 className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              신규 산림 생물다양성 현장 실사 의뢰서
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-600">식재지 상세 주소</label>
                <input 
                  type="text" 
                  placeholder="예: 강원도 정선군 화암면 필지" 
                  value={newLocation} 
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 font-medium"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-600">대상 면적 (m²)</label>
                <input 
                  type="number" 
                  value={newArea} 
                  onChange={(e) => setNewArea(Number(e.target.value))}
                  className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 font-mono font-medium"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-600">검수 요청 소속 (또는 연구원)</label>
                <input 
                  type="text" 
                  value={newInspector} 
                  onChange={(e) => setNewInspector(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 font-medium"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2.5 pt-1">
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-lg transition"
              >
                취소
              </button>
              <button 
                type="submit" 
                className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition flex items-center gap-1 shadow-sm"
              >
                의뢰 접수
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </form>
        )}

        {/* Audit Table */}
        <div className="overflow-x-auto rounded-2xl border border-stone-200/80">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 text-[10px] font-bold font-mono tracking-wider uppercase">
                <th className="p-4">실사 ID</th>
                <th className="p-4">실사 일자</th>
                <th className="p-4">식재 대상지</th>
                <th className="p-4">실사 면적</th>
                <th className="p-4 text-center">생태 점수</th>
                <th className="p-4 text-center">등급 판정</th>
                <th className="p-4 text-center">진행 상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs font-medium">
              {audits.map((audit) => (
                <tr key={audit.id} className="hover:bg-stone-50/75 transition-colors">
                  <td className="p-4 font-mono font-bold text-stone-600">{audit.id}</td>
                  <td className="p-4 text-stone-500 font-mono">{audit.date}</td>
                  <td className="p-4 text-stone-900">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                      {audit.location}
                    </span>
                  </td>
                  <td className="p-4 text-stone-600 font-mono">{audit.area}</td>
                  <td className="p-4 text-center font-mono font-bold text-stone-800">
                    {audit.status === '심사중' && audit.score === 0 ? '-' : `${audit.score}점`}
                  </td>
                  <td className="p-4 text-center">
                    {audit.status === '심사중' && audit.score === 0 ? (
                      <span className="text-stone-400 text-[10px] font-bold font-mono">-</span>
                    ) : (
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black font-mono ${getGrade(audit.score).color}`}>
                        {audit.grade}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      audit.status === '완료' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50' 
                        : audit.status === '심사중' 
                        ? 'bg-amber-50 text-amber-700 border border-amber-200/50 animate-pulse'
                        : 'bg-rose-50 text-rose-700 border border-rose-200/50'
                    }`}>
                      {audit.status === '완료' && <CheckCircle className="w-3 h-3" />}
                      {audit.status === '심사중' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                      {audit.status === '보완필요' && <AlertCircle className="w-3 h-3" />}
                      {audit.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Ecological Value Propositions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="bio-value-grid">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center font-bold">
            <Trees className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-stone-900 pt-1">생태 통로(Ecological Corridor) 확보</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            도시 가로림 조성 시 다른 자생 조경수와 교차 배치하여 도시 조류 및 소형 영장류, 곤충들의 먹이식물 이동 환경을 보강합니다.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="w-10 h-10 bg-teal-50 text-teal-700 rounded-xl flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-stone-900 pt-1">탄소 고정 능력 극대화</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            일정 수준의 다년생 지초 식생을 하부에 유지하면 토양 미생물 활성이 증가하여 질소 고정 효과 및 묘목의 탄소 상쇄 능력이 28% 이상 상승합니다.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-700 rounded-xl flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-stone-900 pt-1">병충해 자연 억제력</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            수목 단일 군락은 한 번 병해충이 발생하면 치명적입니다. 생물다양성 실사를 바탕으로 설계된 동반 수종 혼식 설계는 천적 매칭을 통한 해충 예방력을 높입니다.
          </p>
        </div>
      </div>

    </div>
  );
}
