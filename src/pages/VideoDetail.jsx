import React from 'react';
import { useParams } from 'react-router-dom';

export default function VideoDetail() {
  const { id } = useParams();
  console.log(id);
  return <h1>VideoDetail</h1>;
}
