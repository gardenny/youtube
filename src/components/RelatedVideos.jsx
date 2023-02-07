import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { useYoutubeApi } from '../context/YoutubeApiContext';
import LoadingSpinner from './LoadingSpinner';
import VideoCard from '../components/VideoCard';

// prettier-ignore
export default function RelatedVideos({ id }) {
  const { youtube } = useYoutubeApi();
  const { isLoading, error, data: videos } = useQuery(
    ['related', id],
    () => youtube.relatedVideos(id),
    { staleTime: 1000 * 60 * 5 }
  );

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {error && <p>Error ❌</p>}
      {videos && (
        <ul>
          {videos.map((video, index) => (
            <VideoCard key={index} video={video} type="list" />
          ))}
        </ul>
      )}
    </>
  );
}
