import React from 'react';
import { FadeLoader } from 'react-spinners';

export default function LoadingSpinner() {
  return (
    <div className="w-full flex justify-center items-center">
      <FadeLoader color="#f1f1f1" />
    </div>
  );
}
