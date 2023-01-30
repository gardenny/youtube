import { createContext, useContext } from 'react';
import FakeYoutube from '../api/fakeYoutube';
// import Youtube from '../api/youtube';

export const YoutubeApiContext = createContext();

// 네트워크 통신 로직 스위칭
const youtube = new FakeYoutube(); // new Youtube();

// youtube 인스턴스 제공
export function YoutubeApiProvider({ children }) {
  return <YoutubeApiContext.Provider value={{ youtube }}>{children}</YoutubeApiContext.Provider>;
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
