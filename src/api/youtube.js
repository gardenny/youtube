import axios from 'axios';

// 데이터 통신 로직 분리
export default class Youtube {
  // axios 인스턴스
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }
  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPoploar();
  }

  async #searchByKeyword(keyword) {
    return this.httpClient //
      .get('search', {
        params: {
          part: 'snippet',
          maxResults: 25,
          type: 'video',
          regionCode: 'KR',
          q: keyword,
        },
      })
      .then(response => response.data.items)
      .then(items => items.map(item => ({ ...item, id: item.id.videoId })));
  }

  async #mostPoploar() {
    return this.httpClient //
      .get('videos', {
        params: {
          part: 'snippet',
          maxResults: 25,
          chart: 'mostPopular',
          regionCode: 'KR',
        },
      })
      .then(response => response.data.items);
  }
}
