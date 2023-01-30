import axios from 'axios';

// 데이터 통신 로직 분리
export default class FakeYoutube {
  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPoploar();
  }

  async #searchByKeyword() {
    return axios //
      .get(`/videos/search.json`)
      .then(response => response.data.items)
      .then(items => items.map(item => ({ ...item, id: item.id.videoId })));
  }

  async #mostPoploar() {
    return axios //
      .get(`/videos/popular.json`)
      .then(response => response.data.items);
  }
}
