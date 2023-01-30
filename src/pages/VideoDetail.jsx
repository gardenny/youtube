import React from 'react';
import { useParams } from 'react-router-dom';

export default function VideoDetail() {
  const { videoId } = useParams();
  console.log(videoId);
  return <h1>VideoDetail</h1>;
}
