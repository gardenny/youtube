import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useYoutubeApi } from '../context/YoutubeApiContext';
import VideoCard from '../components/VideoCard';

export default function Videos() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoding,
    error,
    data: videos,
  } = useQuery(['videos', keyword], () => youtube.search(keyword), {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div>Videos {keyword ? `🔎${keyword}` : '🔥'}</div>
      {isLoding && <p>Loading...</p>}
      {error && <p>Error ❌</p>}
      {videos && (
        <ul>
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </>
  );
}