// 데이터 통신 로직 분리
export default class Youtube {
  // axios 인스턴스
  constructor(apiClient) {
    this.apiClient = apiClient; // 외부로부터 주입 받은 클라이언트
  }
  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPoploar();
  }

  async channelImageURL(id) {
    this.httpClient //
      .channels({ params: { part: 'snippet', id } })
      .then(response => response.data.items[0].snippet.thumbnails.default.url);
  }

  async #searchByKeyword(keyword) {
    // 전달 받은 클라이언트의 search 함수 호출
    return this.apiClient
      .search({
        // 필요한 params에 대한 정보를 담은 객체
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
    return this.apiClient
      .videos({
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
