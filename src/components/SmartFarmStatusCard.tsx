import { useState, useEffect } from 'react';
import { SmartFarmStatus } from '../types';
import { Thermometer, Droplets, Wind, RefreshCw, Radio } from 'lucide-react';

interface SmartFarmStatusCardProps {
  status: SmartFarmStatus;
  onToggleIrrigation: () => void;
  onToggleFan: () => void;
}

export default function SmartFarmStatusCard({
  status,
  onToggleIrrigation,
  onToggleFan
}: SmartFarmStatusCardProps) {
  const [time, setTime] = useState<string>('방금 전');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')} 업데이트`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="smartfarm-status-section" className="bg-gradient-to-br from-stone-50 to-emerald-50/40 rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-sans">
              스마트팜 실시간 관제 센터
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1 font-mono">
            GenomeTree 첨단 IoT 환경 제어 시스템 실시간 데이터
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-full text-xs text-stone-600 font-mono">
          <RefreshCw className="w-3 h-3 animate-spin text-emerald-600" />
          <span>{time}</span>
        </div>
      </div>

      {/* Grid of sensors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Temperature */}
        <div className="bg-white border border-stone-100 p-5 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <p className="text-sm font-medium text-stone-500">생장 온도</p>
            <p className="text-3xl font-bold font-mono text-stone-900">
              {status.temperature.toFixed(1)} <span className="text-xl font-normal text-stone-400">°C</span>
            </p>
            <span className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded-full">
              최적 구간 (22~26°C)
            </span>
          </div>
          <div className="p-3.5 bg-red-50 text-red-500 rounded-2xl">
            <Thermometer className="w-7 h-7" />
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-white border border-stone-100 p-5 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <p className="text-sm font-medium text-stone-500">대기 습도</p>
            <p className="text-3xl font-bold font-mono text-stone-900">
              {status.humidity.toFixed(1)} <span className="text-xl font-normal text-stone-400">%</span>
            </p>
            <span className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-blue-100 text-blue-800 rounded-full">
              습도 자동 추종 중
            </span>
          </div>
          <div className="p-3.5 bg-blue-50 text-blue-500 rounded-2xl">
            <Droplets className="w-7 h-7" />
          </div>
        </div>

        {/* Soil Moisture */}
        <div className="bg-white border border-stone-100 p-5 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <p className="text-sm font-medium text-stone-500">토양 수분량</p>
            <p className="text-3xl font-bold font-mono text-stone-900">
              {status.soilMoisture.toFixed(1)} <span className="text-xl font-normal text-stone-400">%</span>
            </p>
            <span className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded-full">
              충분 (45% 이상)
            </span>
          </div>
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Radio className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Actuator Controls */}
      <div className="border-t border-stone-200/60 pt-6">
        <h3 className="text-sm font-semibold text-stone-700 mb-4 flex items-center gap-1.5">
          <span>제어 가능한 장비 수동 작동</span>
          <span className="text-[10px] font-normal text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
            관리자 권한 연동
          </span>
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Irrigation Button */}
          <button
            id="btn-toggle-irrigation"
            onClick={onToggleIrrigation}
            className={`flex-1 flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 font-medium ${
              status.irrigationActive
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/10'
                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${status.irrigationActive ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                <Droplets className={`w-5 h-5 ${status.irrigationActive ? 'animate-bounce' : ''}`} />
              </div>
              <div className="text-left">
                <p className="text-xs opacity-80">관수 장비</p>
                <p className="text-sm font-bold">스마트 미세 분무 관수</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${status.irrigationActive ? 'bg-white animate-pulse' : 'bg-stone-300'}`} />
              <span className="text-xs font-mono">{status.irrigationActive ? '가동 중' : '대기 상태'}</span>
            </div>
          </button>

          {/* Fan Button */}
          <button
            id="btn-toggle-fan"
            onClick={onToggleFan}
            className={`flex-1 flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 font-medium ${
              status.fanActive
                ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/10'
                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${status.fanActive ? 'bg-amber-400 text-white' : 'bg-amber-50 text-amber-600'}`}>
                <Wind className={`w-5 h-5 ${status.fanActive ? 'animate-spin' : ''}`} style={{ animationDuration: status.fanActive ? '2s' : '0s' }} />
              </div>
              <div className="text-left">
                <p className="text-xs opacity-80">환풍 장비</p>
                <p className="text-sm font-bold">상부 기류 순환 대형 팬</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${status.fanActive ? 'bg-white animate-pulse' : 'bg-stone-300'}`} />
              <span className="text-xs font-mono">{status.fanActive ? '회전 중' : '대기 상태'}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
