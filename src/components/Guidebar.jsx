import React from 'react';

import home from '../icons/home.svg';
import shorts from '../icons/shorts.svg';
import subscribe from '../icons/subscribe.svg';
import originals from '../icons/originals.svg';
import music from '../icons/music.svg';
import locker from '../icons/locker.svg';
import history from '../icons/history.svg';
import videos from '../icons/videos.svg';
import later from '../icons/later.svg';
import offline from '../icons/offline.svg';
import like from '../icons/like.svg';
import more from '../icons/more.svg';
import github from '../icons/github.svg';
import notion from '../icons/notion.svg';

const topGuide = [
  { icon: home, text: '홈' },
  { icon: shorts, text: 'Shorts' },
  { icon: subscribe, text: '구독' },
  { icon: originals, text: 'Originals' },
  { icon: music, text: 'YouTube Music' },
];
const middleGuide = [
  { icon: locker, text: '보관함' },
  { icon: history, text: '시청 기록' },
  { icon: videos, text: '내 동영상' },
  { icon: later, text: '나중에 볼 동영상' },
  { icon: offline, text: '오프라인 저장 동영상' },
  { icon: like, text: '좋아요 표시한 동영상' },
  { icon: more, text: '더보기' },
];
const bottomGuide = [
  { icon: github, text: 'JOne Github', href: 'https://github.com/IMJOne' },
  { icon: notion, text: 'JOne Notion', href: 'https://www.notion.so/imjone/Youtube-ad0edcc0e5924199a9e4962f6c298b9b' },
];
const makeGuideList = guide => {
  return guide.map(({ icon, text, href }, index) => (
    <a
      key={index}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-x-6 w-60 h-12 px-3 hover:bg-light rounded-2xl cursor-pointer  ${
        icon === home && 'bg-light rounded-2xl'
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
