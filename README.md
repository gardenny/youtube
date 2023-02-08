![youtube](https://user-images.githubusercontent.com/110226567/217401670-260981f9-d5fe-4653-8793-8d8d3c12af74.png)

# ▶️ YouTube

YouTube 공식 웹사이트 클론 코딩 👉 [Demo](https://jone-youtube.netlify.app)

<br />

## 📢 프로젝트 개요

YouTube에서 제공하는 Data API를 이용한 클론 코딩 프로젝트로,<br />
YouTube의 핵심 기능인 인기 동영상 및 댓글 목록, 동영상 검색 및 재생 등을 구현하였습니다.<br />
대 유튜브 시대를 맞이하여 정말 실제 사이트를 이용하는 느낌이 들도록 최대한 비슷하게 구성하려고 노력하였습니다.

<br />

## 🗨️ 사용 기술

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=React-Router&logoColor=white"/>
  <img src="https://img.shields.io/badge/React Query-FF4154?style=flat-square&logo=React-Query&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=TailwindCSS&logoColor=white"/>
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=Postman&logoColor=white"/>
</p>

<br />

## 📋 주요 기능

- 인기 동영상 - mostPopular
- 키워드 검색 - searchByKeyword
- 동영상 재생 - iframe
- 댓글 목록 - commentThreads
- 관련 동영상 - relatedVideos

<br />

## 💻 소스 코드

전체 코드 보러 가기 👉 [Notion](https://imjone.notion.site/Youtube-ad0edcc0e5924199a9e4962f6c298b9b)

### 📍 API 요청 매개변수 정의

외부로부터 전달 받은 클라이언트를 통해 API 요청 메소드를 호출합니다.<br />
part와 쿼리 매개변수를 인자로 함께 전달하며, 최종적으로 응답 받은 데이터를 반환합니다.

```javascript
export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }
  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPoploar();
  }

  async channelImageURL(id) {
    return this.apiClient //
      .channels({ params: { part: 'snippet', id } })
      .then(response => response.data.items[0].snippet.thumbnails.default.url);
  }

  async relatedVideos(id) {
    return this.apiClient
      .search({
        params: {
          part: 'snippet',
          type: 'video',
          maxResults: 30,
          regionCode: 'KR',
          relatedToVideoId: id,
        },
      })
      .then(response => response.data.items.map(item => ({ ...item, id: item.id.videoId })));
  }

  async commentThreads(id) {
    return this.apiClient
      .comments({
        params: {
          part: 'snippet',
          order: 'relevance',
          videoId: id,
          maxResults: 20,
        },
      })
      .then(response => response.data.items.map(item => item.snippet.topLevelComment.snippet));
  }

  async #searchByKeyword(keyword) {
    return this.apiClient
      .search({
        params: {
          part: 'snippet',
          type: 'video',
          maxResults: 20,
          regionCode: 'KR',
          q: keyword,
        },
      })
      .then(response => response.data.items.map(item => ({ ...item, id: item.id.videoId })));
  }

  async #mostPoploar() {
    return this.apiClient
      .videos({
        params: {
          part: 'snippet',
          chart: 'mostPopular',
          maxResults: 20,
          regionCode: 'KR',
        },
      })
      .then(response => response.data.items);
  }
}
```

### 📍 유튜브 클라이언트 생성

실제 네트워크 통신이 일어나는 곳입니다.<br />
내부적으로 base URL과 API 요청에 필요한 Key를 가지고 있으며,<br />
인자로 전달 받은 `params` 객체를 기반으로 유튜브 백엔드에 데이터를 요청합니다.

```javascript
export default class YoutubeClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  async search(params) {
    return this.httpClient.get('search', params);
  }

  async videos(params) {
    return this.httpClient.get('videos', params);
  }

  async comments(params) {
    return this.httpClient.get('commentThreads', params);
  }

  async channels(params) {
    return this.httpClient.get('channels', params);
  }
}
```

### 📍 유튜브 인스턴스 공급

어느 컴포넌트에서든지 간편하게 데이터 요청을 할 수 있도록,<br />
네트워크 통신 로직을 지닌 `Youtube` 클래스의 인스턴스를 Context로 공급해주었습니다.<br />
이제 모든 하위 컴포넌트에서 자유롭게 데이터를 받아오고 접근할 수 있습니다.

```javascript
import Youtube from '../api/youtube';
import YoutubeClient from '../api/youtubeClient';

export const YoutubeApiContext = createContext();

// client를 생성하여 youtube 인스턴스에 전달
const client = new YoutubeClient();
const youtube = new Youtube(client);

// youtube 인스턴스 제공
export function YoutubeApiProvider({ children }) {
  return <YoutubeApiContext.Provider value={{ youtube }}>{children}</YoutubeApiContext.Provider>;
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
```

<br />

## 😊 배운 점 및 느낀 점

- 공식 문서를 읽으면서 API 사용법을 익히고, 원하는 정보를 빠르게 탐색할 수 있는 요령을 익힐 수 있었습니다.
- Postman과 Mock data를 활용하여 API 요청 데이터를 편리하게 관리할 수 있는 방법을 배울 수 있었습니다.
- 비동기 네트워크 통신 부분이 아직 많이 미흡하고, Web APIs를 다뤄보는 연습이 더 필요하다는 것을 느꼈습니다.
- 동영상 조회수 제공 및 리스트 무한 스크롤 등의 더욱 다양한 기능을 구현하지 못해 아쉬움이 많이 남습니다.
