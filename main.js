/**
 *  브라우저에서 지원하는 기능을 Web Api라 한다.
 *  (Ajax, fetch, setTimeout, eventhandler)
 * 
 *  ★★ async() - async를 통해서 비동기 함수를 만들 수 있다.
 *  ★★ await - 시간 걸리는 코드를 기다려줄 수 있다.
 */

//뉴스를 가져오는 함수

const API_KEY = `ea02c6c81d7a411692d739a2f9e1dac1`;
let news = [];

const getLatestNews = async () => {
    const url = new URL(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );
		const response = await fetch(url); //url data를 가져오는 호출 함수 fetch()
    const data = await response.json(); //json은 객체를 텍스트화 시킨 파일 형태 확장자
    news = data.articles;
    console.log('ddddd', news);
};

getLatestNews();

// for(let i = 0; i < 20; i++) {
//   console.log("after", 1);
// }