import React from 'react';
import { useNavigate } from 'react-router-dom';

import formatAgo from '../util/date';

export default function VideoCard({ video, type }) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;

  const navigate = useNavigate();
  const isList = type === 'list';

  return (
    <li
      className={`${isList ? 'flex gap-1 m-2' : ''} cursor-pointer`}
      onClick={() => navigate(`/videos/watch/${video.id}`, { state: { video } })}
    >
      <img className={`${isList ? 'w-60 mr-2' : 'w-full'} rounded-xl`} src={thumbnails.medium.url} alt={title} />
      <div className="flex">
        <div className="pr-6">
          <p className="font-semibold mt-3 mb-1.5 line-clamp-2 leading-snug">{title}</p>
          <p className="text-sm text-grey">{channelTitle}</p>
          <p className="text-sm text-grey">{formatAgo(publishedAt, 'ko')}</p>
        </div>
      </div>
    </li>
  );
}
