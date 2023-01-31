import axios from 'axios';

// 데이터 통신 로직 분리
export default class FakeYoutubeClient {
  async search() {
    // 미리 정해진 데이터를 가져오기 때문에 keyword 받아올 필요 ❌
    return axios.get('/videos/search.json');
  }

  async videos() {
    return axios.get('/videos/popular.json');
  }
}
