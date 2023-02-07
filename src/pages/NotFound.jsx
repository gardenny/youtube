import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col gap-y-10 justify-center items-center px-4">
      <BiErrorCircle className="text-9xl text-red-500" />
      <h1 className="text-4xl font-bold text-center leading-normal">
        요청하신 페이지를
        <br className="block sm:hidden" /> 찾을 수 없습니다.
      </h1>
      <p className="text-lg text-center leading-8">
        페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
        <br className="hidden sm:block" />
        입력하신 주소가 정확한지 다시 한 번 확인해 주시기 바랍니다.
      </p>
      <div className="flex gap-x-4">
        <Button path={-1} text={'이전 페이지'} />
        <Button path={'/'} text={'홈으로 이동'} />
      </div>
    </div>
  );
}

function Button({ path, text }) {
  const navigate = useNavigate();
  return (
    <button
      className="bg-light px-6 py-4 rounded-lg hover:opacity-50 transition-opacity"
      onClick={() => navigate(path, { replace: true })}
    >
      {text}
    </button>
  );
}
