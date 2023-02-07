import React from 'react';

const topGuide = [
  { icon: '/icons/home.svg', text: '홈' },
  { icon: '/icons/shorts.svg', text: 'Shorts' },
  { icon: '/icons/subscribe.svg', text: '구독' },
  { icon: '/icons/originals.svg', text: 'Originals' },
  { icon: '/icons/music.svg', text: 'YouTube Music' },
];
const middleGuide = [
  { icon: '/icons/locker.svg', text: '보관함' },
  { icon: '/icons/history.svg', text: '시청 기록' },
  { icon: '/icons/videos.svg', text: '내 동영상' },
  { icon: '/icons/later.svg', text: '나중에 볼 동영상' },
  { icon: '/icons/offline.svg', text: '오프라인 저장 동영상' },
  { icon: '/icons/like.svg', text: '좋아요 표시한 동영상' },
  { icon: '/icons/more.svg', text: '더보기' },
];
const bottomGuide = [
  { icon: '/icons/github.svg', text: 'JOne Github', href: 'https://github.com/IMJOne' },
  {
    icon: '/icons/notion.svg',
    text: 'JOne Notion',
    href: 'https://www.notion.so/imjone/Youtube-ad0edcc0e5924199a9e4962f6c298b9b',
  },
];
const makeGuideList = guide => {
  return guide.map(({ icon, text, href }, index) => (
    <a
      key={index}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-x-6 w-60 h-12 px-3 hover:bg-light rounded-2xl cursor-pointer  ${
        text === '홈' && 'bg-light rounded-2xl'
      }`}
    >
      <img src={icon} alt={text} />
      <span className="text-sm">{text}</span>
    </a>
  ));
};

export default function Guidebar() {
  return (
    <aside className="hidden lg:block">
      <div className="border-b border-light pb-3">{makeGuideList(topGuide)}</div>
      <div className="border-b border-light pb-3 mt-3">{makeGuideList(middleGuide)}</div>
      <div className="mt-3">{makeGuideList(bottomGuide)}</div>
    </aside>
  );
}
