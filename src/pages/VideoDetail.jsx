import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useYoutubeApi } from '../context/YoutubeApiContext';
import ChannelInfo from '../components/ChannelInfo';
import RelatedVideos from '../components/RelatedVideos';
import CommentInfo from '../components/CommentInfo';
import formatAgo from '../util/date';

export default function VideoDetail() {
  // state로 받아온 video 객체를 바로 풀어줌
  const {
    state: { video },
  } = useLocation();
  const { youtube } = useYoutubeApi();
  const { data: comments } = useQuery(['comments', video], () => youtube.commentThreads(video.id), {
    staleTime: 1000 * 60, // 받아온 데이터를 1분동안 캐싱
  });

  const { title, channelId, channelTitle, publishedAt, description } = video.snippet;

  return (
    <section className="flex flex-col lg:flex-row gap-6 p-6 2xl:px-24">
      <article className="basis-4/6">
        <iframe
          id="player"
          type="text/html"
          width="100%"
          height="640"
          src={`https://www.youtube.com/embed/${video.id}`}
          title={title}
        />
        <div className="mt-3">
          <h2 className="text-xl font-bold">{title}</h2>
          <ChannelInfo id={channelId} name={channelTitle} />
          <div className="bg-neutral-800 p-3 rounded-xl">
            <p className="mb-2">{formatAgo(publishedAt, 'ko')}</p>
            <pre className="whitespace-pre-wrap break-all text-sm">{description}</pre>
          </div>
        </div>
        <div>
          <h3 className="my-6">댓글</h3>
          <CommentInfo comments={comments} />
        </div>
      </article>
      <section className="basis-2/6">
        <RelatedVideos id={video.id} />
      </section>
    </section>
  );
}
