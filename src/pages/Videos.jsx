import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useYoutubeApi } from '../context/YoutubeApiContext';
import Guidebar from '../components/Guidebar';
import VideoCard from '../components/VideoCard';

export default function Videos() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(['videos', keyword], () => youtube.search(keyword), {
    staleTime: 1000 * 60, // 받아온 데이터를 1분동안 캐싱
  });

  return (
    <section className="flex p-3">
      <Guidebar />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error ❌</p>}
      {videos && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 px-3 lg:px-10">
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </section>
  );
}
