import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function ChannelInfo({ id, name }) {
  const { youtube } = useYoutubeApi();
  const { data: url } = useQuery(
    // prettier-ignore
    ['channel', id],
    () => youtube.channelImageURL(id),
    { staleTime: 1000 * 60 * 5 }
  );

  return (
    <div className="flex flex-col xl:flex-row justify-between items-baseline xl:items-center">
      <div className="flex gap-x-3 my-3 items-center">
        {url && <img className="w-10 h-10 rounded-full" src={url} alt={name} />}
        <p className="font-medium">{name}</p>
        <button className="bg-neutral-200 h-9 text-neutral-900 px-4 ml-3 rounded-full text-sm">구독</button>
      </div>
      <div className="flex">
        <InfoButton icon={'/icons/like.svg'} text={'좋아요'} />
        <InfoButton icon={'/icons/share.svg'} text={'공유'} />
        <InfoButton icon={'/icons/offline.svg'} text={'오프라인 저장'} />
        <InfoButton icon={'/icons/clip.svg'} text={'클립'} />
        <InfoButton icon={'/icons/save.svg'} text={'저장'} />
      </div>
    </div>
  );
}

function InfoButton({ icon, text }) {
  return (
    <div className="flex items-center gap-x-1 h-9 bg-neutral-800 ml-2 first:ml-0 mb-3 xl:mb-0 px-4 rounded-full text-sm">
      <img src={icon} alt={text} />
      <span className="hidden md:block">{text}</span>
    </div>
  );
}
