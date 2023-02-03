import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';

import share from '../icons/share.svg';
import offline from '../icons/offline.svg';
import clip from '../icons/clip.svg';
import save from '../icons/save.svg';

export default function ChannelInfo({ id, name }) {
  const { youtube } = useYoutubeApi();
  const { data: url } = useQuery(
    // prettier-ignore
    ['channel', id],
    () => youtube.channelImageURL(id),
    { staleTime: 1000 * 60 * 5 }
  );

  return (
    <div className="flex flex-col lg:flex-row justify-between items-baseline lg:items-center">
      <div className="flex gap-x-3 my-3 items-center">
        {url && <img className="w-10 h-10 rounded-full" src={url} alt={name} />}
        <p className="font-medium">{name}</p>
        <button className="bg-neutral-200 h-9 text-neutral-900 px-4 ml-3 rounded-full text-sm">구독</button>
      </div>
      <div className="flex">
        <InfoButton icon={share} text={'공유'} />
        <InfoButton icon={offline} text={'오프라인 저장'} />
        <InfoButton icon={clip} text={'클립'} />
        <InfoButton icon={save} text={'저장'} />
      </div>
    </div>
  );
}

function InfoButton({ icon, text }) {
  return (
    <div className="flex items-center gap-x-1 h-9 bg-neutral-800 ml-2 first:ml-0 mb-3 lg:mb-0 px-4 rounded-full text-sm">
      <img src={icon} alt={text} />
      <span>{text}</span>
    </div>
  );
}
