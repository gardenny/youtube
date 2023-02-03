import { createContext, useContext } from 'react';

import Youtube from '../api/youtube';
// import YoutubeClient from '../api/youtubeClient';
import FakeYoutubeClient from '../api/fakeYoutubeClient';

export const YoutubeApiContext = createContext();

// 네트워크 통신 로직 스위칭
// 원하는 client를 생성하여 youtube 인스턴스에 전달
// const client = new YoutubeClient();
const client = new FakeYoutubeClient();
const youtube = new Youtube(client);

// youtube 인스턴스 제공
export function YoutubeApiProvider({ children }) {
  return <YoutubeApiContext.Provider value={{ youtube }}>{children}</YoutubeApiContext.Provider>;
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
