import axios from 'axios';

// 데이터 통신 로직 분리
export default class FakeYoutubeClient {
  async search(keyword) {
    // 미리 만들어둔 연관된 동영상 목록 혹은 검색 결과 목록 반환
    return axios.get(`/videos/${keyword ? 'search' : 'related'}.json`);
  }

  async videos() {
    return axios.get('/videos/popular.json');
  }

  async comments() {
    return axios.get('/videos/comments.json');
  }

  async channels() {
    return axios.get('/videos/channel.json');
  }
}
