// 데이터 통신 로직 분리
export default class Youtube {
  // axios 인스턴스
  constructor(apiClient) {
    this.apiClient = apiClient; // 외부로부터 주입 받은 클라이언트
  }
  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async channelImageURL(id) {
    return this.apiClient //
      .channels({ params: { part: 'snippet', id } })
      .then(response => response.data.items[0].snippet.thumbnails.default.url);
  }

  async getVideoInfo(id) {
    // debugger;
    return this.apiClient
      .videos({
        params: {
          part: 'snippet,statistics',
          id,
          type: 'video',
          maxResults: 25,
          regionCode: 'KR',
        },
      })
      .then(response => response.data.items);
  }

  async relatedVideos(id) {
    const idList = [];
    const videoId = await this.apiClient
      .search({
        params: {
          part: 'snippet',
          type: 'video',
          maxResults: 25,
          regionCode: 'KR',
          relatedToVideoId: id,
        },
      })
      .then(response => response.data.items.map(item => `&id=${item.id.videoId}`));
    idList.push(videoId.join(''));
    return this.getVideoInfo(idList.join(''));
  }

  async #searchByKeyword(keyword) {
    // 전달 받은 클라이언트의 search 함수 호출
    return this.apiClient
      .search({
        // 필요한 params에 대한 정보를 담은 객체
        params: {
          part: 'snippet',
          type: 'video',
          maxResults: 25,
          regionCode: 'KR',
          q: keyword,
        },
      })
      .then(response => response.data.items.map(item => ({ ...item, id: item.id.videoId })));
  }

  async #mostPopular() {
    return this.apiClient
      .videos({
        params: {
          part: 'snippet',
          chart: 'mostPopular',
          maxResults: 25,
          regionCode: 'KR',
        },
      })
      .then(response => response.data.items);
  }
}
