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
		`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
	);
	const response = await fetch(url); //url data를 가져오는 호출 함수 fetch()
	const data = await response.json(); //json은 객체를 텍스트화 시킨 파일 형태 확장자
	news = data.articles;
};

const getNewsByKeyword = async () => {
	// URL 객체를 생성할 때는 new 키워드를 반드시 사용해야 합니다.
	const url = new URL(
		`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?q=아이유`
	);
	const response = await fetch(url);
	const data = await response.json();
	news = data.articles;
}

const getNewsByCategory = async () => {
	const url = new URL(
		`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?category=science`
	);
	const response = await fetch(url);
	const data = response.json();
	news = data.articles;
}
			
	getLatestNews();
	getNewsByKeyword();
	getNewsByCategory();