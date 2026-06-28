import { useState } from 'react';
import { Product, TreeHistory, OrderLog } from '../types';
import { Settings, Save, Edit3, ClipboardList, TrendingUp, ShieldAlert, Award, Calendar } from 'lucide-react';

interface AdminPanelProps {
  products: Product[];
  historyData: TreeHistory[];
  onUpdateStock: (productId: string, newStock: number) => void;
  onUpdateAvailableDate: (productId: string, newDate: string) => void;
  onUpdateHistoryStage: (tagId: string, newStage: 'germinating' | 'growing' | 'rooting' | 'hardened' | 'ready', newProgress: number) => void;
  orderLogs: OrderLog[];
}

export default function AdminPanel({
  products,
  historyData,
  onUpdateStock,
  onUpdateAvailableDate,
  onUpdateHistoryStage,
  orderLogs
}: AdminPanelProps) {
  // Editing state for products
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [tempStockValue, setTempStockValue] = useState<number>(0);
  const [tempDateValue, setTempDateValue] = useState<string>('');

  // Editing state for tree history logs
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [tempStage, setTempStage] = useState<'germinating' | 'growing' | 'rooting' | 'hardened' | 'ready'>('growing');
  const [tempProgress, setTempProgress] = useState<number>(50);

  const handleStartEditProduct = (prod: Product) => {
    setEditingStockId(prod.id);
    setTempStockValue(prod.stock);
    setTempDateValue(prod.availableDate);
  };

  const handleSaveProduct = (id: string) => {
    onUpdateStock(id, tempStockValue);
    onUpdateAvailableDate(id, tempDateValue);
    setEditingStockId(null);
  };

  const handleStartEditHistory = (hist: TreeHistory) => {
    setEditingTagId(hist.tagId);
    setTempStage(hist.growthStage);
    setTempProgress(hist.growthProgress);
  };

  const handleSaveHistory = (tagId: string) => {
    onUpdateHistoryStage(tagId, tempStage, tempProgress);
    setEditingTagId(null);
  };

  // Quick stats
  const totalStockCount = products.reduce((acc, p) => acc + p.stock, 0);
  const totalOrderRevenue = orderLogs.reduce((acc, log) => acc + log.totalAmount, 0);

  return (
    <div id="admin-panel-section" className="space-y-8 animate-fade-in">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-stone-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold text-stone-400 font-mono">스마트 온실 실시간 총 생장 수량</p>
            <p className="text-2xl font-black text-stone-900 mt-1 font-mono">
              {totalStockCount.toLocaleString()} <span className="text-xs font-normal text-stone-400">주/개</span>
            </p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold text-stone-400 font-mono">당일 주문 결제 총액</p>
            <p className="text-2xl font-black text-emerald-600 mt-1 font-mono">
              ₩{totalOrderRevenue.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
            <ClipboardList className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-stone-950 rounded-2xl p-5 flex items-center justify-between text-white shadow-sm">
          <div>
            <p className="text-xs font-semibold text-stone-400 font-mono">DNA 유전자 검증 수량</p>
            <p className="text-2xl font-black text-emerald-400 mt-1 font-mono">100% 검증 통과</p>
          </div>
          <div className="p-3 bg-emerald-900 text-emerald-300 rounded-xl">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Side: Product Stock and Shipping Date Control */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-stone-900">농장 실시간 판매 수량 및 출하일 관리</h3>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            스마트 팜 시설의 실제 실물 수종과 즉시 판매 가능한 재고를 수동으로 제어하며, 출하 준비 상태 및 일정을 변경합니다.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-600 border-collapse">
              <thead>
                <tr className="border-b border-stone-100 text-[10px] text-stone-400 uppercase tracking-wider">
                  <th className="py-3 px-2">품종 정보</th>
                  <th className="py-3 px-2">실시간 재고</th>
                  <th className="py-3 px-2">출하 일정</th>
                  <th className="py-3 px-2 text-right">관리 조치</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {products.map((prod) => {
                  const isEditing = editingStockId === prod.id;
                  return (
                    <tr key={prod.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="py-3 px-2">
                        <div className="font-bold text-stone-800">{prod.name}</div>
                        <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                          {prod.categoryKo} · {prod.certificationType}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        {isEditing ? (
                          <input
                            type="number"
                            value={tempStockValue}
                            onChange={(e) => setTempStockValue(Number(e.target.value))}
                            className="w-20 px-2 py-1 bg-stone-50 border border-stone-300 rounded font-mono font-bold text-stone-800 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        ) : (
                          <span className="font-mono font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                            {prod.stock.toLocaleString()}주
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        {isEditing ? (
                          <input
                            type="date"
                            value={tempDateValue}
                            onChange={(e) => setTempDateValue(e.target.value)}
                            className="px-2 py-1 bg-stone-50 border border-stone-300 rounded font-mono text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        ) : (
                          <span className="font-mono text-stone-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-stone-400" />
                            {prod.availableDate}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-right">
                        {isEditing ? (
                          <button
                            onClick={() => handleSaveProduct(prod.id)}
                            className="p-1 px-2.5 bg-emerald-600 text-white rounded text-[11px] font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-1 ml-auto"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>저장</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStartEditProduct(prod)}
                            className="p-1 px-2.5 bg-stone-100 text-stone-600 rounded text-[11px] font-semibold hover:bg-stone-200 transition-colors flex items-center gap-1 ml-auto border border-stone-200/50"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>수정</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: NFC/RFID Tag Live Status Control */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold text-stone-900">NFC / RFID 개별 스마트 묘목 상태 동기화</h3>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            사용자가 조회하는 개별 묘목들의 스마트 양묘 진척 상태 및 성장 단계를 수정합니다. 이 데이터는 RFID 검색창에 즉시 동기화됩니다.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-600 border-collapse">
              <thead>
                <tr className="border-b border-stone-100 text-[10px] text-stone-400 uppercase tracking-wider">
                  <th className="py-3 px-2">RFID 태그 ID</th>
                  <th className="py-3 px-2">생장 단계</th>
                  <th className="py-3 px-2">성장률 (%)</th>
                  <th className="py-3 px-2 text-right">관리 조치</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {historyData.map((hist) => {
                  const isEditing = editingTagId === hist.tagId;
                  return (
                    <tr key={hist.tagId} className="hover:bg-stone-50/50 transition-colors">
                      <td className="py-3 px-2">
                        <span className="font-mono font-bold text-amber-600">{hist.tagId}</span>
                        <div className="text-[10px] text-stone-400 mt-0.5 max-w-[150px] truncate">{hist.productName}</div>
                      </td>
                      <td className="py-3 px-2">
                        {isEditing ? (
                          <select
                            value={tempStage}
                            onChange={(e) => setTempStage(e.target.value as any)}
                            className="px-2 py-1 bg-stone-50 border border-stone-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          >
                            <option value="germinating">발아기 / 접목</option>
                            <option value="growing">신초 성장기</option>
                            <option value="rooting">발근기</option>
                            <option value="hardened">경화기 (적응)</option>
                            <option value="ready">출하 완료</option>
                          </select>
                        ) : (
                          <span className="font-medium text-stone-700 bg-stone-100 px-2 py-0.5 rounded text-[11px]">
                            {hist.growthStageKo}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        {isEditing ? (
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={tempProgress}
                            onChange={(e) => setTempProgress(Number(e.target.value))}
                            className="w-24 accent-emerald-600"
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="w-12 bg-stone-100 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-emerald-600 h-full" style={{ width: `${hist.growthProgress}%` }} />
                            </div>
                            <span className="font-mono font-bold text-stone-600 text-[10px]">{hist.growthProgress}%</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-2 text-right">
                        {isEditing ? (
                          <button
                            onClick={() => handleSaveHistory(hist.tagId)}
                            className="p-1 px-2.5 bg-emerald-600 text-white rounded text-[11px] font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-1 ml-auto"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>저장</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStartEditHistory(hist)}
                            className="p-1 px-2.5 bg-stone-100 text-stone-600 rounded text-[11px] font-semibold hover:bg-stone-200 transition-colors flex items-center gap-1 ml-auto border border-stone-200/50"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>수정</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Admin Order Log Section */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-emerald-600" />
          실시간 온라인 출하 및 결제 주문 장부 (총 {orderLogs.length}건)
        </h3>
        {orderLogs.length === 0 ? (
          <p className="text-xs text-stone-400 text-center py-6">오늘 접수된 온라인 주문이 아직 없습니다.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-600 border-collapse">
              <thead>
                <tr className="border-b border-stone-100 text-[10px] text-stone-400 uppercase tracking-wider">
                  <th className="py-3 px-2">주문 번호 / 일자</th>
                  <th className="py-3 px-2">주문자 및 품종 요약</th>
                  <th className="py-3 px-2">결제액</th>
                  <th className="py-3 px-2 text-right">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {orderLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-3 px-2 font-mono">
                      <div className="font-bold text-stone-800">{log.id}</div>
                      <div className="text-[10px] text-stone-400 mt-0.5">{log.date}</div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="font-semibold text-stone-800">{log.buyerName}</span>
                      <div className="text-[10px] text-stone-500 mt-0.5 truncate max-w-sm">
                        {log.items.map(item => `${item.productName} (${item.quantity}주)`).join(', ')}
                      </div>
                    </td>
                    <td className="py-3 px-2 font-mono font-bold text-stone-900">
                      ₩{log.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
