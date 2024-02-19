
let news = [];

const getLatestNews = async () => {
	const url = new URL(
		`https://jju-news-api.netlify.app/top-headlines`
	);
	const response = await fetch(url); //url data를 가져오는 호출 함수 fetch()
	const data = await response.json(); //json은 객체를 텍스트화 시킨 파일 형태 확장자
	news = data.articles;
};

const getNewsByKeyword = async () => {
	// URL 객체를 생성할 때는 new 키워드를 반드시 사용해야 합니다.
	const url = new URL(
		`https://jju-news-api.netlify.app/top-headlines?q=아이유`
	);
	const response = await fetch(url);
	const data = await response.json();
	news = data.articles;
}

const getNewsByCategory = async () => {
	const url = new URL(
		`https://jju-news-api.netlify.app/top-headlines?category=science`
	);
	const response = await fetch(url);
	const data = response.json();
	news = data.articles;
}
			
	getLatestNews();
	getNewsByKeyword();
	getNewsByCategory();