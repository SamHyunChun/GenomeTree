import React, { useState } from 'react';
import { Users, ClipboardCheck, ArrowRight, PhoneCall, Award, Calculator, Info, CheckCircle2, UserCheck } from 'lucide-react';

interface CalculationState {
  caliper: number; // R (근원직경 in cm)
  treeCount: number; // 수량 (주)
  soilType: 'normal' | 'sandy' | 'clay';
}

export default function LaborBrokerage() {
  const [calc, setCalc] = useState<CalculationState>({
    caliper: 10,
    treeCount: 50,
    soilType: 'normal',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('충청');

  const [laborTeams] = useState([
    {
      id: 'team-01',
      name: '부여 00 굴취단',
      region: '충청 / 세종',
      leader: '000 반장',
      experience: '경력 22년',
      crewSize: '기공 5명, 조공 3명',
      rating: '9.9/10',
      description: 'NFC인증 대형 은행나무 굴취 국내 최다 시공. 뿌리분 깨짐률 0.1% 미만을 보장하는 충청 최고 명문팀입니다.',
      status: '즉시출동가능',
    },
    {
      id: 'team-02',
      name: '소백산 자락 베테랑 굴취조',
      region: '영남 / 경상',
      leader: '000 반장',
      experience: '경력 18년',
      crewSize: '기공 4명, 조공 2명',
      rating: '9.8/10',
      description: '추운 고지대 동결 토양 굴취 특화. 고사 방지를 위한 마포/고무줄 결속 작업 속도가 매우 신속합니다.',
      status: '예약대기',
    },
    {
      id: 'team-03',
      name: '순천만 광역 조경굴취 연합',
      region: '호남 / 전라',
      leader: '000반장',
      experience: '경력 25년',
      crewSize: '기공 8명, 조공 5명 (대형팀)',
      rating: '9.9/10',
      description: 'R20 이상의 특대형 은행나무 및 노거수 이식 전문. 굴착기 특수 집게 작업 연계가 매끄럽게 지원됩니다.',
      status: '즉시출동가능',
    }
  ]);

  // Root ball calculations based on standard landscape specifications (조경공사 표준시방서)
  // Root Ball Diameter = R * 4 (minimum for simple trees) or R * 5 or R * 6 (standard for high quality/expensive trees)
  const rootBallDiameter = calc.caliper * 5; // 5 times R is standard
  
  // Volume estimate of root ball (approximating as a semi-sphere or double cone)
  // Vol = 2/3 * pi * (r^3)
  const rInMeters = (rootBallDiameter / 2) / 100;
  const rootBallVolume = (2 / 3) * Math.PI * Math.pow(rInMeters, 3);
  
  // Soil density: normal is ~1.8 ton/m3, sandy is ~1.6, clay is ~2.0
  const densityMap = { normal: 1.8, sandy: 1.6, clay: 2.0 };
  const soilDensity = densityMap[calc.soilType];
  const rootBallWeight = rootBallVolume * soilDensity * 1000; // in kg

  // Labor productivity estimation
  // R8-10 tree: 1 skilled digger can dig around 10-15 trees per day (with manual digging)
  // Larger trees require more labor exponentially
  const getRequiredLabor = () => {
    let baseTreesPerManDay = 15;
    if (calc.caliper > 8) baseTreesPerManDay = 10;
    if (calc.caliper > 12) baseTreesPerManDay = 5;
    if (calc.caliper > 15) baseTreesPerManDay = 2;
    if (calc.caliper > 20) baseTreesPerManDay = 0.5; // requires machine & team

    const rawDays = calc.treeCount / baseTreesPerManDay;
    const recommendedCrew = Math.max(2, Math.min(10, Math.ceil(rawDays / 3))); // aim for a 3-day job max
    const totalDaysNeeded = Math.ceil(rawDays / recommendedCrew);

    return {
      crewSize: recommendedCrew,
      daysNeeded: totalDaysNeeded,
      totalManDays: Math.ceil(rawDays),
    };
  };

  const laborInfo = getRequiredLabor();
  const skilledDiggerCost = 250000; // KRW/day
  const helperCost = 160000; // KRW/day
  
  // Distribute team: 60% skilled, 40% helper
  const skilledCount = Math.ceil(laborInfo.crewSize * 0.6);
  const helperCount = Math.max(1, laborInfo.crewSize - skilledCount);
  
  const dailyLaborCost = (skilledCount * skilledDiggerCost) + (helperCount * helperCost);
  const totalLaborCost = dailyLaborCost * laborInfo.daysNeeded;

  const handleRegisterRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('연락처 정보를 입력해주세요.');
      return;
    }
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setName('');
      setPhone('');
    }, 4000);
  };

  return (
    <div className="space-y-8" id="labor-brokerage-view">
      {/* Introduction Header */}
      <div className="bg-gradient-to-br from-stone-900 to-emerald-950 text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 translate-x-10 translate-y-[-10px] pointer-events-none">
          <Users className="w-80 h-80" />
        </div>
        <div className="relative z-10 space-y-3 max-w-2xl">
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            조경용 굴취 전문 연계 인력망
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">명품 굴취·분작업 숙련공 중개 및 매칭</h2>
          <p className="text-stone-300 text-xs md:text-sm leading-relaxed">
            은행나무 가로수 굴취는 뿌리분(Root Ball)의 안전한 성형이 생사여부를 결정합니다. 
            대한민국 조경공사 표준시방서를 철저하게 준수하고 고무줄 결속, 마포 감기, 목대를 상하지 않게 하는 최고의 베테랑 굴취 기공들을 다이렉트로 연결합니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Interactive Forestry Calculator */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Calculator className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-stone-950 text-base">뿌리분 규격 및 투입 인력 공정 산출기</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">근원직경 R (가로수 규격)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="4"
                  max="40"
                  value={calc.caliper}
                  onChange={(e) => setCalc({ ...calc, caliper: parseInt(e.target.value) || 8 })}
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-bold text-stone-800 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
                <span className="text-xs font-bold text-stone-600">cm (R)</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">작업할 수목 수량</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={calc.treeCount}
                  onChange={(e) => setCalc({ ...calc, treeCount: parseInt(e.target.value) || 10 })}
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-bold text-stone-800 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
                <span className="text-xs font-bold text-stone-600">주 (나무)</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">양묘장 토질 상태</label>
              <select
                value={calc.soilType}
                onChange={(e) => setCalc({ ...calc, soilType: e.target.value as any })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                <option value="normal">보통 토사 (일반)</option>
                <option value="sandy">사질양토 (모래질, 고난도)</option>
                <option value="clay">점토질 (찰흙질, 무거움)</option>
              </select>
            </div>
          </div>

          {/* Rootball Technical Output */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4.5 rounded-2xl border border-stone-100">
            <div className="space-y-2">
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wide">산림조경 시방서 기준 뿌리분 크기</span>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-500">뿌리분 지름 (5 * R):</span>
                  <strong className="text-stone-900 font-bold">{rootBallDiameter} cm</strong>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-500">뿌리분 깊이 (지름의 70%):</span>
                  <strong className="text-stone-800 font-semibold">{Math.round(rootBallDiameter * 0.7)} cm</strong>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-500">뿌리분 형태:</span>
                  <strong className="text-emerald-700 font-bold">보통분 (원종 인증식 둥근분)</strong>
                </div>
              </div>
            </div>

            <div className="space-y-2 border-t sm:border-t-0 sm:border-l border-stone-200/60 sm:pl-4">
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wide">예상 중량 및 운반 규격</span>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-500">주당 예상 흙무게:</span>
                  <strong className="text-stone-950 font-bold">약 {Math.round(rootBallWeight)} kg</strong>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-500">전체 토사 총중량:</span>
                  <strong className="text-stone-950 font-bold">약 {((rootBallWeight * calc.treeCount) / 1000).toFixed(1)} 톤</strong>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-500">토질 강도 계수:</span>
                  <span className="text-stone-600 font-mono">x{soilDensity} ({calc.soilType})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Productivity Calculations */}
          <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 space-y-3">
            <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold">
              <Info className="w-4 h-4 text-emerald-600" />
              <span>권장 투입 굴취 노무진 구성원</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white p-3 rounded-xl border border-emerald-100">
                <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wide">권장 기공 팀원수</span>
                <strong className="text-emerald-800 text-base font-extrabold">{skilledCount}명</strong>
              </div>
              <div className="bg-white p-3 rounded-xl border border-emerald-100">
                <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wide">보조 조공 팀원수</span>
                <strong className="text-emerald-800 text-base font-extrabold">{helperCount}명</strong>
              </div>
              <div className="bg-white p-3 rounded-xl border border-emerald-100">
                <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wide">예상 소요 작업 기간</span>
                <strong className="text-emerald-800 text-base font-extrabold">{laborInfo.daysNeeded}일간</strong>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs pt-2 border-t border-emerald-100">
              <span className="text-stone-500 font-medium">총 노무비 예산 (표준 노임 기준):</span>
              <strong className="text-sm font-extrabold text-stone-900">
                ₩{totalLaborCost.toLocaleString()} 원
              </strong>
            </div>
          </div>

          {/* Quick labor query request */}
          <form onSubmit={handleRegisterRequest} className="space-y-3 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="의뢰인 성명"
                className="px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                required
              />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="전화번호"
                className="px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                required
              />
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                <option value="충청">충청 / 세종 지역</option>
                <option value="영남">영남 / 경북 / 경남</option>
                <option value="호남">호남 / 전라 지역</option>
                <option value="경기">경기 / 인천 / 서울</option>
              </select>
            </div>

            {formSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold animate-pulse">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                인력 매칭 요청이 완료되었습니다! 10분 내로 전문 굴취 반장이 상담 전화를 드립니다.
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white py-3 rounded-xl text-xs font-extrabold shadow-sm shadow-emerald-950/20 transition-all flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                선택한 조건으로 최적 숙련공 배정 요청하기
              </button>
            )}
          </form>
        </div>

        {/* Labor Teams Directory */}
        <div className="lg:col-span-5 bg-stone-50 p-6 rounded-2xl border border-stone-200 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-stone-950 text-base">지역별 조경 굴취 드림팀</h3>
              </div>
              <span className="text-[10px] bg-stone-200 text-stone-700 px-2 py-0.5 rounded-full font-bold">
                정예 3개 조
              </span>
            </div>

            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
              {laborTeams.map((team) => (
                <div key={team.id} className="bg-white p-4.5 rounded-xl border border-stone-200/60 shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 font-bold px-2 py-0.5 rounded-md border border-emerald-100">
                      {team.region}
                    </span>
                    <span className={`text-[10px] font-extrabold ${team.status === '즉시출동가능' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      ● {team.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mb-2">
                    <h4 className="font-extrabold text-xs text-stone-900">{team.name}</h4>
                    <span className="text-[10px] text-stone-400">{team.id === 'team-01' ? ':' : '|'}</span>
                    <span className="text-[10px] text-stone-500 font-bold">{team.leader}</span>
                  </div>

                  <p className="text-[11px] text-stone-500 leading-normal font-medium mb-3">
                    {team.description}
                  </p>

                  <div className="flex justify-between items-center bg-stone-50 px-3 py-2 rounded-lg border border-stone-100 text-[11px]">
                    <div>
                      <span className="text-stone-400">구인규모:</span>{' '}
                      <span className="text-stone-700 font-bold">{team.crewSize}</span>
                    </div>
                    <div>
                      <span className="text-stone-400">경력:</span>{' '}
                      <span className="text-stone-700 font-bold">{team.experience}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200 space-y-3">
            <div className="flex items-center gap-2 text-stone-500 text-xs">
              <UserCheck className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" />
              <span>작업 중 사고 및 고사 하자 발생 시 공제조합 보험 처리 100% 지원</span>
            </div>

            <div className="bg-emerald-950 text-white rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4.5 h-4.5 text-emerald-400" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-emerald-400 font-bold tracking-wider">인력 중개 긴급지원 (24시간)</span>
                  <span className="text-xs font-bold font-mono">010-8842-1052</span>
                </div>
              </div>
              <a
                href="tel:010-8842-1052"
                className="bg-emerald-800 hover:bg-emerald-700 px-3 py-1.5 rounded-lg text-[10px] font-bold text-white transition-all shadow-xs"
              >
                반장 직통
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
