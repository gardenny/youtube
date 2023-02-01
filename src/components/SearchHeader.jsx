import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as Logo } from '../icons/logo.svg';
import { ReactComponent as Search } from '../icons/search.svg';

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
    <header className="sticky top-0 z-10 w-full flex items-center bg-black p-4">
      <Link to={'/'} className="flex items-center">
        <Logo width="128" height="26" fill="black" />
      </Link>
      <form onSubmit={handleSubmit} className="w-full h-10 flex justify-center">
        <input
          className="w-5/12 px-4 outline-none border border-zinc-400 rounded-l-full"
          type="text"
          placeholder="검색"
          value={text}
          onChange={handleChagne}
        />
        <button className="px-5 bg-neutral-100 border border-l-0 border-zinc-400 rounded-r-full" type="submit">
          <Search width="24" height="24" fill="black" />
        </button>
      </form>
    </header>
  );
}
