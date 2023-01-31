import { createContext, useContext } from 'react';

import Youtube from '../api/youtube';
import FakeYoutubeClient from '../api/fakeYoutubeClient';
// import YoutubeClient from '../api/youtubeClient';

export const YoutubeApiContext = createContext();

// 네트워크 통신 로직 스위칭
const client = new FakeYoutubeClient(); // new YoutubeClient();
const youtube = new Youtube(client);

// youtube 인스턴스 제공
export function YoutubeApiProvider({ children }) {
  return <YoutubeApiContext.Provider value={{ youtube }}>{children}</YoutubeApiContext.Provider>;
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
