import React, { useState } from 'react';
import { BookOpen, Award, GraduationCap, Calendar, Clock, MapPin, Users, CheckCircle2, ChevronRight, HelpCircle, Briefcase, FileText } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  period: string;
  time: string;
  location: string;
  target: string;
  capacity: string;
  fee: string;
  instructor: string;
  curriculum: string[];
  benefits: string[];
  gradient: string;
  textAccent: string;
}

export default function GinkgoEducation() {
  const [selectedCourse, setSelectedCourse] = useState<string>('digging');
  const [applyName, setApplyName] = useState('');
  const [applyPhone, setApplyPhone] = useState('');
  const [applyCourse, setApplyCourse] = useState('digging');
  const [applySuccess, setApplySuccess] = useState(false);

  const courses: Course[] = [
    {
      id: 'digging',
      title: '고급 조경굴취 및 분감기 마스터 과정',
      subtitle: '대형 은행나무 및 노거수 이식 정밀 굴취 실무 기술',
      badge: '현장 실무 기술',
      period: '2026.08.10 ~ 2026.08.14 (5일 과정)',
      time: '매일 09:00 ~ 17:00 (총 40시간)',
      location: 'MaleGinkgo 호남 교육농장 및 야외 실습장',
      target: '조경 식재 숙련가, 굴취 반장 지망자 및 조경 전공자',
      capacity: '정원 15명 (선착순 마감)',
      fee: '무료 (국가 인적자원개발 컨소시엄 지원)',
      instructor: '순천만 베테랑 000 반장 외 기술고문단',
      curriculum: [
        '조경수 수종별 뿌리 분포 분석 및 굴취 설계',
        '뿌리분 크기 산정 공식 및 야외 정밀 실측',
        '새끼줄, 녹화마대, 반생을 활용한 명품 분감기법 실습',
        '굴착기 집게 및 크레인 결속 슬링벨트 안전 매듭법',
        '단근(뿌리끊기) 조치 후 세근(잔뿌리) 발생 유도 기술'
      ],
      benefits: [
        'MaleGinkgo 공식 1급 굴취전문 기술 이수증 발급',
        '우수 수료자 전국 조경 연합 굴취조 우선 취업 매칭 연계',
        '실습용 안전 장구(보호구, 정밀 전정가위 등) 전원 무상 제공'
      ],
      gradient: 'from-amber-500/10 via-amber-600/5 to-transparent border-amber-200/50',
      textAccent: 'text-amber-800'
    },
    {
      id: 'dna-tech',
      title: '스마트 산림 바이오 & DNA 감별 분석 실무',
      subtitle: 'NFC 태그 관리 및 현장 분자 진단 장비 운용 교육',
      badge: '스마트 바이오',
      period: '2026.09.02 ~ 2026.09.04 (3일 과정)',
      time: '매일 10:00 ~ 16:00 (총 18시간)',
      location: '게놈트리 중앙 생명공학 연구소',
      target: '스마트 양묘장 운영 사업자 및 임업 분야 구직자',
      capacity: '정원 10명',
      fee: '본인 부담금 10만원 (교재 및 실험 키트 비용 포함)',
      instructor: '박영선 박사 (중앙연구소 책임연구원)',
      curriculum: [
        '식물 유전학 및 은행나무 10.6Gb 게놈 지도 이해',
        'Gp-MSP 분자 마커를 이용한 DNA 추출 및 PCR 실습',
        '전기영동 분석을 통한 암수 성별 감정 실무',
        '개체식별 NFC 스마트 카드 발급 및 가공 연동',
        '스마트 양묘 센서 IoT 실시간 모니터링 시스템 관리'
      ],
      benefits: [
        '산림 바이오 테크놀로지 실무 분석 자격 부여',
        'MaleGinkgo 보증 묘목 위탁 분석소 창업 컨설팅 지원',
        '수나무 감별 전용 간이 PCR 키트 1세트 기념 증정'
      ],
      gradient: 'from-indigo-500/10 via-indigo-600/5 to-transparent border-indigo-200/50',
      textAccent: 'text-indigo-800'
    },
    {
      id: 'cargo-safety',
      title: '초대형 조경수 상하차 및 안전 운송 직무',
      subtitle: '저상 트레일러 운용 및 도로 교통법 준수 안전 가이드',
      badge: '안전·물류',
      period: '2026.08.25 ~ 2026.08.26 (2일 과정)',
      time: '매일 13:00 ~ 18:00 (총 10시간)',
      location: '충청 화물 물류 허브 교육관',
      target: '화물 차주, 특수 트레일러 기사 및 조경 현장 소장',
      capacity: '정원 30명',
      fee: '무료 (전액 지원)',
      instructor: '윤민수 팀장 (화물 안전 협회 전임강사)',
      curriculum: [
        '초대형 조경수 무게중심 배분 및 적재 하중 계산',
        '운송 중 바람 저항에 따른 가지 부러짐 방지 결속법',
        '저상 슬라이딩 트레일러(셀프로더) 진입각 및 유도 안전 수칙',
        '과적 단속 가이드 및 높이 제한 도로 우회 요령',
        '비상 돌발 상황 시 전도 방지 및 2차 사고 대응 훈련'
      ],
      benefits: [
        '조경수 전문 안전운송 우수 차주 인증 마크 부여',
        'MaleGinkgo 플랫폼 화물 예약 시 배차 우선 순위 가산점',
        '화물 운전 장거리 특화 무릎 보호대 패키지 지원'
      ],
      gradient: 'from-emerald-500/10 via-emerald-600/5 to-transparent border-emerald-200/50',
      textAccent: 'text-emerald-800'
    },
    {
      id: 'venerable',
      title: '천년 노거수 보존 및 문화재 치료 교육',
      subtitle: '마을 수호목과 천연기념물 보존을 위한 외과수술 및 환경 관리',
      badge: '전통 보존',
      period: '2026.09.15 ~ 2026.09.18 (4일 과정)',
      time: '매일 09:00 ~ 16:00 (총 24시간)',
      location: '양평 용문사 야외 보존 교육센터',
      target: '나무의사 및 나무병원 종사자, 지자체 녹지 담당 공무원',
      capacity: '정원 20명',
      fee: '지자체 위탁 비용 (개인 신청 시 별도 문의)',
      instructor: '한동엽 문화재 실사 위원',
      curriculum: [
        '천년 은행나무 역사적 가치와 스토리텔링 해설 기법',
        '고사 가지 진단 및 무균 충전 외과수술 공정 실습',
        '뿌리 호흡 쇠퇴 진단 및 토양 개량 멀칭 공법',
        '태풍 대비 지지대 설계 및 상부 쇠조임 장비 적용',
        '문화재청 천연기념물 보존 및 유지 보수 법령 세미나'
      ],
      benefits: [
        '문화재 조경 보존 실무 전문가 이수증 수여',
        '문화재 외과수술 현장 참관 및 실습 기회 보장',
        '노거수 정밀 생장 진단 스마트 센서 패키지 시험권'
      ],
      gradient: 'from-stone-500/10 via-stone-600/5 to-transparent border-stone-200/50',
      textAccent: 'text-stone-800'
    }
  ];

  const currentCourse = courses.find(c => c.id === selectedCourse) || courses[0];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyName || !applyPhone) {
      alert('신청자 이름과 연락처를 입력해 주세요.');
      return;
    }
    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setApplyName('');
      setApplyPhone('');
    }, 5000);
  };

  return (
    <div className="space-y-8 animate-fade-in" id="ginkgo-education-view">
      {/* Banner */}
      <div className="bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-8 pointer-events-none">
          <GraduationCap className="w-96 h-96" />
        </div>
        <div className="relative z-10 space-y-3 max-w-2xl">
          <span className="bg-white/20 text-white border border-white/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" />
            MaleGinkgo 인재 양성 아카데미
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">전통 임업의 미래를 여는 현장 맞춤형 교육 프로그램</h2>
          <p className="text-teal-50 text-xs md:text-sm leading-relaxed">
            2억 7천만 년의 수명을 이어온 은행나무 굴취 기술부터 첨단 바이오 DNA 감별 장비 운용, 그리고 영목 보존 외과수술 실무까지! 현장 최고 권위자들이 전수하는 명품 무료·국비 지원 직무 교육을 지금 신청하세요.
          </p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Course select & apply form */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* List of Courses */}
          <div className="space-y-2.5">
            <h3 className="text-stone-400 font-extrabold text-[11px] tracking-wider uppercase px-1">
              개설 강좌 목록 (수강 신청 가능)
            </h3>
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-2 lg:pb-0 scrollbar-none">
              {courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => {
                    setSelectedCourse(course.id);
                    setApplyCourse(course.id);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 flex-shrink-0 min-w-[250px] lg:min-w-0 ${
                    selectedCourse === course.id
                      ? 'border-teal-500 bg-teal-50/40 ring-1 ring-teal-500/20'
                      : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/50'
                  }`}
                >
                  <div className={`p-2 rounded-xl bg-white shadow-2xs border ${selectedCourse === course.id ? 'border-teal-200' : 'border-stone-100'}`}>
                    <GraduationCap className={`w-5 h-5 ${selectedCourse === course.id ? 'text-teal-600' : 'text-stone-400'}`} />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9.5px] font-bold text-teal-700 block">{course.badge}</span>
                    <h4 className="font-extrabold text-stone-900 text-xs tracking-tight">{course.title}</h4>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Apply Form */}
          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4">
            <div className="flex items-center gap-1.5 text-stone-950 font-bold text-sm">
              <FileText className="w-4 h-4 text-teal-600" />
              <span>간편 교육 참가 신청서</span>
            </div>

            {applySuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center space-y-1.5 animate-fade-in">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-extrabold text-xs text-emerald-900">교육 접수가 완료되었습니다!</h4>
                <p className="text-[10.5px] text-emerald-700 leading-normal">
                  기재해주신 연락처로 담당 교육코디네이터가 24시간 이내에 개별 연락 및 상세 안내 공문을 발송해 드리겠습니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[10.5px] font-bold text-stone-500 mb-1">수강 희망 강좌</label>
                  <select
                    value={applyCourse}
                    onChange={(e) => {
                      setApplyCourse(e.target.value);
                      setSelectedCourse(e.target.value);
                    }}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 font-semibold text-stone-700 focus:outline-none focus:ring-1 focus:ring-teal-500/50"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold text-stone-500 mb-1">신청자 성함</label>
                  <input
                    type="text"
                    value={applyName}
                    onChange={(e) => setApplyName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-teal-500/50 font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold text-stone-500 mb-1">연락처 (휴대폰)</label>
                  <input
                    type="tel"
                    value={applyPhone}
                    onChange={(e) => setApplyPhone(e.target.value)}
                    placeholder="010-1234-5678"
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-teal-500/50 font-medium"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-500 text-white font-extrabold p-2.5 rounded-lg shadow-2xs transition-all text-xs"
                >
                  무료 수강 접수하기
                </button>
              </form>
            )}

            <div className="text-[10px] text-stone-400 font-semibold leading-normal">
              * 정원 초과 시 조기 마감되거나 예비 수강생으로 자동 전환됩니다.
            </div>
          </div>
        </div>

        {/* Right column: Course Details */}
        <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl border border-stone-200 shadow-2xs space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Header */}
            <div className="space-y-2 border-b border-stone-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-teal-50 text-teal-800 font-extrabold px-2.5 py-1 rounded-full border border-teal-100">
                  {currentCourse.badge}
                </span>
                <span className="text-stone-400 text-xs font-bold">인적자원공단 우수 훈련 매뉴얼</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight leading-tight">
                {currentCourse.title}
              </h3>
              <p className="text-stone-500 font-bold text-xs md:text-sm">
                {currentCourse.subtitle}
              </p>
            </div>

            {/* Practical Course Info Icons Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-stone-50 p-4.5 rounded-2xl border border-stone-100 text-xs text-stone-700">
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4.5 h-4.5 text-teal-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-stone-400 font-bold block text-[9.5px] uppercase">교육 기간</span>
                  <span className="font-semibold">{currentCourse.period}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4.5 h-4.5 text-teal-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-stone-400 font-bold block text-[9.5px] uppercase">교육 시간</span>
                  <span className="font-semibold">{currentCourse.time}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-teal-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-stone-400 font-bold block text-[9.5px] uppercase">실습 장소</span>
                  <span className="font-semibold">{currentCourse.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Users className="w-4.5 h-4.5 text-teal-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-stone-400 font-bold block text-[9.5px] uppercase">모집 정원 및 강사</span>
                  <span className="font-semibold">{currentCourse.capacity} / {currentCourse.instructor}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Award className="w-4.5 h-4.5 text-teal-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-stone-400 font-bold block text-[9.5px] uppercase">수강 비용</span>
                  <span className="font-semibold font-mono text-teal-700">{currentCourse.fee}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Briefcase className="w-4.5 h-4.5 text-teal-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-stone-400 font-bold block text-[9.5px] uppercase">추천 대상</span>
                  <span className="font-semibold">{currentCourse.target}</span>
                </div>
              </div>
            </div>

            {/* Curriculum vs Benefits List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-stone-400 uppercase tracking-wider px-1">교육 커리큘럼 (Curriculum)</h4>
                <ul className="space-y-2 text-xs text-stone-600 font-semibold leading-relaxed">
                  {currentCourse.curriculum.map((item, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-teal-600 font-mono font-bold mt-0.5">{idx + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-stone-400 uppercase tracking-wider px-1">이수 특전 & 혜택 (Benefits)</h4>
                <div className="space-y-2.5">
                  {currentCourse.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex gap-2 bg-emerald-50/50 border border-emerald-100 p-2.5 rounded-xl">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <p className="text-[11.5px] text-stone-700 font-bold leading-normal">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-stone-100 pt-5 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-stone-400">
            <div className="flex items-center gap-1.5">
              <HelpCircle className="w-4.5 h-4.5 text-stone-400" />
              <span>단체 및 기업 맞춤식 위탁 교육 설계 문의: 02-555-TREE</span>
            </div>
            <span>MaleGinkgo 아카데미 본부</span>
          </div>

        </div>

      </div>
    </div>
  );
}
