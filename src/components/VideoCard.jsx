import React from 'react';
import { useNavigate } from 'react-router-dom';
import formatAgo from '../util/date';

export default function VideoCard({ video, type }) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;

  const navigate = useNavigate();
  const isList = type === 'list';

  return (
    <li
      className={`${isList ? 'flex gap-x-2' : ''} cursor-pointer`}
      onClick={() => navigate(`/videos/watch/${video.id}`, { state: { video } })}
    >
      <img className={`${isList ? 'w-48 mb-2' : 'w-full mb-3'} rounded-xl`} src={thumbnails.medium.url} alt={title} />
      <div className="flex">
        <div className="pr-6">
          <p className={`font-medium mb-1.5 line-clamp-2 leading-snug ${isList && 'text-sm'}`}>{title}</p>
          <p className={`text-grey ${isList ? 'text-xs ' : 'text-sm'}`}>{channelTitle}</p>
          <p className={`text-grey ${isList ? 'text-xs ' : 'text-sm'}`}>{formatAgo(publishedAt, 'ko')}</p>
        </div>
      </div>
    </li>
  );
}
