import React, { useState } from 'react';
import { BookOpen, Sparkles, Award, Compass, Heart, Shield, Landmark, Calendar } from 'lucide-react';

interface StorySection {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  content: string[];
  highlight: string;
  badge: string;
  bgGradient: string;
}

export default function GinkgoStory() {
  const [activeStory, setActiveStory] = useState<string>('fossil');

  const stories: StorySection[] = [
    {
      id: 'fossil',
      title: '2억 7천만 년을 버텨온 "살아있는 화석"',
      subtitle: '공룡의 시대부터 인류의 문명까지 살아남은 기적의 생명력',
      icon: <Compass className="w-6 h-6 text-amber-600" />,
      badge: '지구 역사상 가장 강인한 나무',
      bgGradient: 'from-amber-50 to-orange-50/40 border-amber-200/60',
      content: [
        '은행나무는 약 2억 7천만 년 전 고생대 페름기에 출현하여 중생대 쥐라기와 백악기에 이르기까지 공룡과 함께 지구를 지배했던 식물군입니다.',
        '빙하기의 혹독한 기후 변화와 대멸종 속에서도 살아남아, 현대까지 단 하나의 종(Ginkgo biloba)만이 온전히 살아남아 인류와 함께 숨 쉬고 있습니다.',
        '이러한 강인함은 현대 도심의 매연, 공해, 심지어 강한 방사선(1945년 히로시마 원폭 투하 중심지 근처에서도 은행나무만은 이듬해 봄 다시 싹을 틔웠습니다)에도 굴하지 않고 굳건히 견디는 경이로운 생명력의 원천입니다.'
      ],
      highlight: '“지구 생태계의 모든 대격변을 목격하고도 살아남은 유일무이한 인류의 동반자입니다.”'
    },
    {
      id: 'guardian',
      title: '도심을 정화하는 ‘초록 가디언’',
      subtitle: '대기 정화와 방화벽 역할을 묵묵히 수행하는 친환경 방호벽',
      icon: <Shield className="w-6 h-6 text-emerald-600" />,
      badge: '공해 정화 및 안전 지킴이',
      bgGradient: 'from-emerald-50 to-teal-50/40 border-emerald-200/60',
      content: [
        '은행나무 잎에 다량 함유된 플라보노이드와 은행산(Ginkgolic Acid) 성분은 강력한 살충·살균 작용을 하여 벌레나 진딧물이 꼬이지 않으며, 병충해에 전혀 걸리지 않습니다.',
        '매연과 중금속(납, 아황산가스 등)을 탁월하게 흡수하여 대기를 깨끗하게 정화하고, 넓고 수분이 풍부한 목재 특성으로 인해 조선시대에는 화재를 막는 방화수(防火樹)로서 궁궐과 사찰 주변에 집중 식재되었습니다.',
        '가을철 노란 단풍은 심리적인 평온함을 선사하며, 여름철 무성한 잎사귀는 도심의 열섬 현상을 획기적으로 낮추는 천연 그늘막 역할을 합니다.'
      ],
      highlight: '“대기 공해를 정화하고, 화재 확산을 억제하며, 병충해마저 스스로 이겨내는 완벽한 도시형 가로수입니다.”'
    },
    {
      id: 'gender',
      title: 'DNA 감별 기술과 가로수의 혁신',
      subtitle: '악취 없는 쾌적한 가을 도심을 여는 DNA 성별 감정 분석',
      icon: <Award className="w-6 h-6 text-indigo-600" />,
      badge: '스마트 산림 바이오 기술',
      bgGradient: 'from-indigo-50 to-violet-50/40 border-indigo-200/60',
      content: [
        '은행나무는 암나무와 수나무가 따로 존재하는 이성(異性) 식물입니다. 가을철 골칫거리인 고약한 냄새를 풍기는 열매는 오직 ‘암나무’에서만 열립니다.',
        '과거에는 묘목이 최소 15년 이상 성목으로 자라나 꽃을 피우기 전까지는 외관상 성별을 전혀 구분할 수 없어, 가로수로 무작위 식재된 후 매년 가을 악취 민원이 끊이지 않았습니다.',
        '국립산림과학원이 세계 최초로 개발한 ‘은행나무 DNA 성별 감별법’은 불과 1년생 묘목의 잎사귀 단 0.1g만으로도 수나무 여부를 99.9% 정확도로 사전 감정합니다. 본 플랫폼에서 인증하는 DNA인증묘는 바로 이 바이오 기술이 적용된 스마트 수나무 묘목입니다.'
      ],
      highlight: '“첨단 산림 바이오 기술로 악취 없는 쾌적하고 아름다운 황금빛 가을 거리를 만들어 나갑니다.”'
    },
    {
      id: 'culture',
      title: '천 년의 수명, 역사 속 수호목',
      subtitle: '민족의 흥망성쇠를 함께하며 마을을 지켜온 영목(靈木)',
      icon: <Landmark className="w-6 h-6 text-amber-700" />,
      badge: '역사적 가치와 스토리텔링',
      bgGradient: 'from-stone-50 to-amber-50/30 border-stone-200/60',
      content: [
        '대한민국에는 천 년 이상의 수명을 지닌 천연기념물 은행나무들이 전국 각지에서 마을의 성황당이자 정신적 지주로 보존되어 있습니다.',
        '가장 대표적인 경기도 양평 용문사 은행나무(천연기념물 제30호)는 신라 마의태자가 나라를 잃은 슬픔을 안고 심었다고 전해지며, 높이 42m, 수령 1,100년이 넘는 동양 최대 크기의 나무입니다. 나라에 큰 재앙이나 전란이 닥칠 때마다 스스로 울음소리를 내어 경고했다는 신비로운 설화가 깃들어 있습니다.',
        '영양분이 잎과 기둥으로 고루 통하는 덕에 거대한 고사목 없이 영원한 생명을 영위하며, 가을마다 황금색 왕관을 쓴 듯한 경이로운 자태로 우리 산천의 기품을 드러냅니다.'
      ],
      highlight: '“천 년의 시간 동안 민족의 슬픔과 기쁨을 묵묵히 지켜봐 준 살아있는 역사 그 자체입니다.”'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in" id="ginkgo-story-view">
      {/* Visual Banner */}
      <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-10 pointer-events-none">
          <BookOpen className="w-96 h-96" />
        </div>
        <div className="relative z-10 space-y-3.5 max-w-2xl">
          <span className="bg-white/20 text-white border border-white/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            황금빛 시간의 기록
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">천 년의 생명력을 품은 은행나무 이야기</h2>
          <p className="text-amber-50 text-xs md:text-sm leading-relaxed">
            한반도의 고대 역사부터 최첨단 생명공학(DNA) 기술의 영역까지, 은행나무는 늘 쾌적한 환경과 아름다운 자연 경관을 가꾸어 주는 인류의 최고의 자연 친구였습니다. 은행나무에 얽힌 흥미진진한 인문학적·과학적 이야기를 만나보세요.
          </p>
        </div>
      </div>

      {/* Story Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-2.5">
          <h3 className="text-stone-400 font-extrabold text-[11px] tracking-wider uppercase mb-3 px-1">
            스토리 카테고리 선택
          </h3>
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-2 lg:pb-0 scrollbar-none">
            {stories.map((story) => (
              <button
                key={story.id}
                onClick={() => setActiveStory(story.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 flex-shrink-0 min-w-[240px] lg:min-w-0 ${
                  activeStory === story.id
                    ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-500/30'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/50'
                }`}
              >
                <div className={`p-2 rounded-xl bg-white shadow-xs border ${activeStory === story.id ? 'border-amber-200' : 'border-stone-100'}`}>
                  {story.icon}
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-amber-700 block">{story.badge}</span>
                  <h4 className="font-extrabold text-stone-900 text-xs tracking-tight">{story.title.split(' ‘')[0].split(' "')[0].split(' ‘')[0]}</h4>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-amber-50/40 border border-amber-200/40 p-4 rounded-2xl hidden lg:block space-y-2.5 mt-4">
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-800">
              <Calendar className="w-4 h-4" />
              <span>알고 계셨나요? (은행나무 상식)</span>
            </div>
            <p className="text-[10px] text-amber-700/90 leading-relaxed font-medium">
              은행나무는 침엽수나 활엽수 어디에도 엄밀히 속하지 않는 독특한 식물군입니다. 진화적으로는 침엽수와 공통 조상을 공유하며, 겉씨식물(Gymnosperm)에 해당하여 잣나무나 소나무에 친척 관계가 더 가깝습니다!
            </p>
          </div>
        </div>

        {/* Story Detail Panel */}
        <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between">
          {(() => {
            const current = stories.find(s => s.id === activeStory);
            if (!current) return null;
            return (
              <div className="space-y-6 animate-fade-in" key={current.id}>
                {/* Header of detail */}
                <div className="space-y-2">
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-2.5 py-1 rounded-full tracking-wide inline-block border border-amber-200/30">
                    {current.badge}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight leading-tight">
                    {current.title}
                  </h3>
                  <p className="text-stone-500 font-bold text-xs md:text-sm">
                    {current.subtitle}
                  </p>
                </div>

                {/* Highlight Quote Box */}
                <div className={`p-4.5 rounded-2xl border ${current.bgGradient} italic text-xs md:text-sm font-semibold text-stone-800 relative pl-10`}>
                  <span className="absolute left-4 top-3 text-2xl font-serif text-amber-500 opacity-60">“</span>
                  {current.highlight}
                </div>

                {/* Content paragraphs */}
                <div className="space-y-4 text-xs md:text-sm text-stone-600 leading-relaxed font-medium">
                  {current.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Bottom CTA / Link to NFC / Smart Farm */}
          <div className="border-t border-stone-100 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <span className="text-stone-500 text-xs font-bold">인류의 영원한 자연 파트너, 은행나무를 아끼고 소중히 합시다.</span>
            </div>
            
            <div className="text-xs text-stone-400 font-mono">
              Ginkgo biloba L. 1771
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
