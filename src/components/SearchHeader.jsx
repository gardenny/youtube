import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function SearchHeader() {
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const { keyword } = useParams();

  const handleChagne = e => setText(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/videos/${text}`);
  };

  // keyword params가 변경될 때마다 검색 키워드 자동 변경
  useEffect(() => setText(keyword || ''), [keyword]);

  return (
    <header className="sticky top-0 z-10 w-full flex flex-col justify-between gap-3 sm:flex-row items-center bg-black p-4">
      <div className="self-baseline sm:self-auto flex gap-x-3">
        <img src={'/icons/trigger.svg'} alt="menu" />
        <Link to={'/'} className="flex items-center">
          <img src={'/icons/logo.svg'} alt="YouTube" />
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="w-full sm:w-6/12 2xl:w-4/12 h-10 flex justify-center">
        <input
          className="w-full px-4 bg-transparent outline-none border border-neutral-700 rounded-l-full"
          type="text"
          placeholder="검색"
          value={text}
          onChange={handleChagne}
        />
        <button className="px-5 bg-neutral-800 border border-l-0 border-neutral-700 rounded-r-full" type="submit">
          <img src={'/icons/search.svg'} alt="search" />
        </button>
      </form>
      <div className="flex gap-x-3 absolute right-3 sm:static">
        <img src={'/icons/make.svg'} alt="make" />
        <img src={'/icons/notice.svg'} alt="notice" />
        <a className="w-8 h-8" href="https://github.com/IMJOne" target="_blank" rel="noopener noreferrer">
          <img className="w-full rounded-full" src="/avatar.jpg" alt="avatar" />
        </a>
      </div>
    </header>
  );
}
