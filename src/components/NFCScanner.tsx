import { useState } from 'react';
import { TreeHistory } from '../types';
import { Search, Radio, QrCode, ClipboardCheck, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';

interface NFCScannerProps {
  historyData: TreeHistory[];
}

export default function NFCScanner({ historyData }: NFCScannerProps) {
  const [tagInput, setTagInput] = useState('');
  const [selectedHistory, setSelectedHistory] = useState<TreeHistory | null>(historyData[0] || null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (tagId: string) => {
    const trimmed = tagId.trim();
    const found = historyData.find(h => h.tagId.toLowerCase() === trimmed.toLowerCase());
    if (found) {
      setSelectedHistory(found);
      setErrorMsg('');
    } else {
      setErrorMsg(`해당 NFC/RFID 태그 일련번호 [${trimmed}]를 찾을 수 없습니다.`);
      setSelectedHistory(null);
    }
  };

  const presetTags = historyData.map(h => h.tagId);

  return (
    <div id="nfc-scanner-section" className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-600 animate-pulse" />
            NFC / RFID 개별 묘목 이력 조회 시스템
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            묘목마다 부착된 NFC 스마트 태그 또는 RFID 칩 정보를 조회하여 유전적 부모 정보 및 유통 이력을 투명하게 검증합니다.
          </p>
        </div>
        <div className="flex items-center gap-1 bg-stone-100 text-stone-600 text-xs px-2.5 py-1.5 rounded-lg font-mono">
          <QrCode className="w-3.5 h-3.5" />
          <span>ISO/IEC 15693 호환</span>
        </div>
      </div>

      {/* Input container */}
      <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/60">
        <label className="block text-xs font-semibold text-stone-600 mb-2">
          NFC / RFID 태그 번호 입력 (또는 데모 프리셋 클릭)
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
              <QrCode className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="예: GT-G-3M-1024"
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-stone-800 font-mono"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch(tagInput);
              }}
            />
          </div>
          <button
            id="btn-search-tag"
            onClick={() => handleSearch(tagInput)}
            className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-bold hover:bg-stone-800 transition-colors flex items-center gap-1"
          >
            <Search className="w-4 h-4" />
            <span>조회</span>
          </button>
        </div>

        {/* Presets */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-stone-400 font-medium">데모 태그 샘플:</span>
          {presetTags.map(tag => (
            <button
              key={tag}
              onClick={() => {
                setTagInput(tag);
                handleSearch(tag);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all border ${
                selectedHistory?.tagId === tag
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold'
                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Error message */}
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-800 rounded-2xl flex items-start gap-2 border border-red-100">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-semibold">{errorMsg}</p>
            <p className="mt-0.5 text-red-600">입력하신 태그 번호가 정확한지 확인해 주시거나, 위에 제공된 데모 태그 샘플 중 하나를 선택해 주세요.</p>
          </div>
        </div>
      )}

      {/* Result presentation */}
      {selectedHistory ? (
        <div className="border border-stone-200 rounded-3xl overflow-hidden shadow-inner bg-stone-50/20">
          {/* Header */}
          <div className="bg-stone-900 p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold bg-emerald-500 text-white rounded-full font-mono mb-1">
                정품 DNA 인증필(Verified)
              </span>
              <h3 className="text-base font-bold text-white">{selectedHistory.productName}</h3>
            </div>
            <div className="text-left sm:text-right font-mono text-xs">
              <span className="text-stone-400">NFC 태그 ID :</span>{' '}
              <span className="text-emerald-400 font-bold">{selectedHistory.tagId}</span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 space-y-8">
            {/* Tree Growth Progress Timeline */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1">
                  <span>실시간 스마트 양묘 성장 진척도</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">
                    {selectedHistory.growthProgress}%
                  </span>
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  {selectedHistory.growthStageKo}
                </span>
              </div>

              {/* Graphical representation of the timeline */}
              <div className="relative">
                {/* Background Line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-stone-200 -translate-y-1/2" />
                {/* Active Progress Line */}
                <div
                  className="absolute top-1/2 left-0 h-1 bg-emerald-600 -translate-y-1/2 transition-all duration-500"
                  style={{ width: `${selectedHistory.growthProgress}%` }}
                />

                {/* Milestones */}
                <div className="relative flex justify-between items-center text-center">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 transition-all ${
                      selectedHistory.growthProgress >= 20 ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-stone-400 border border-stone-300'
                    }`}>
                      1
                    </div>
                    <span className="text-[11px] font-medium mt-2 text-stone-600">모수삽목</span>
                    <span className="text-[9px] text-stone-400 font-mono mt-0.5">{selectedHistory.cuttingDate}</span>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 transition-all ${
                      selectedHistory.growthProgress >= 50 ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-stone-400 border border-stone-300'
                    }`}>
                      2
                    </div>
                    <span className="text-[11px] font-medium mt-2 text-stone-600">발근완료</span>
                    <span className="text-[9px] text-stone-400 font-mono mt-0.5">{selectedHistory.rootingDate}</span>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 transition-all ${
                      selectedHistory.growthProgress >= 80 ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-stone-400 border border-stone-300'
                    }`}>
                      3
                    </div>
                    <span className="text-[11px] font-medium mt-2 text-stone-600">경화야외적응</span>
                    <span className="text-[9px] text-stone-400 font-mono mt-0.5">완료</span>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 transition-all ${
                      selectedHistory.growthProgress >= 100 ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-stone-400 border border-stone-300'
                    }`}>
                      4
                    </div>
                    <span className="text-[11px] font-medium mt-2 text-stone-600">최종출하</span>
                    <span className="text-[9px] text-stone-400 font-mono mt-0.5">{selectedHistory.shippingDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tree Data Grid Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-stone-100 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider font-sans border-b border-stone-100 pb-2">
                  유전 정보 및 모수 이력 (Genetic Origin)
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">지정 모수 식별 번호</span>
                    <span className="font-mono font-bold text-stone-800">{selectedHistory.motherTreeNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">DNA 유전자 대조 검증</span>
                    <span className="font-bold text-emerald-600">100% 일치 판정</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">DNA 마커 정보 (SSR)</span>
                    <span className="font-mono text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded text-[10px]">
                      {selectedHistory.dnaMarkerCode}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-stone-100 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider font-sans border-b border-stone-100 pb-2">
                  주요 양묘 기록 (Nursery Timeline)
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">채취 및 삽목 완료일</span>
                    <span className="font-mono text-stone-800 font-medium">{selectedHistory.cuttingDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">발근 및 이식 판정일</span>
                    <span className="font-mono text-stone-800 font-medium">{selectedHistory.rootingDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">공식 출하 예정일자</span>
                    <span className="font-mono text-stone-800 font-medium">{selectedHistory.shippingDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inspector Notes */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex gap-3">
              <ClipboardCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-emerald-900">현장 양묘 전문가 검정 소견</h4>
                <p className="text-xs text-stone-700 leading-relaxed">{selectedHistory.notes}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-stone-50 rounded-2xl p-8 text-center border border-dashed border-stone-300">
          <HelpCircle className="w-10 h-10 text-stone-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-stone-600">태그 정보가 조회되지 않았습니다.</p>
          <p className="text-xs text-stone-400 mt-1">위의 데모 태그 샘플 단추를 클릭하여 가상 NFC 조회를 테스트해 보세요.</p>
        </div>
      )}
    </div>
  );
}
