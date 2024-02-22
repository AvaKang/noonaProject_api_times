const API_KEY = `ea02c6c81d7a411692d739a2f9e1dac1`;
let newsList = [];
const menus = document.querySelectorAll('.menus button');
menus.forEach(menu => menu.addEventListener('click',(event) => getNewsByCategory(event))) //ES6 버전
/* ES5버전
menus.forEach(function(menu) {
	menu.addEventListener('click', function(event) {
			getNewsByCategory(event);
	});
}); 
*/

// 뉴스 가져오기
const getNews = async (url) => {
	const response = await fetch(url); //url data를 가져오는 호출 함수 fetch()
	const data = await response.json(); //json은 객체를 텍스트화 시킨 파일 형태 확장자
	newsList = data.articles;
	render();
}

// api 가져오기
const getLatestNews = () => {
	const url = new URL(`https://jju-news-api.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`);
											//`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
	getNews(url);
};

// 카테고리 기사 가져오기
const getNewsByCategory = (event) => {
	const category = event.target.textContent.toLowerCase();
	const url = new URL(`https://jju-news-api.netlify.app/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`); //카테고리 추가
											//http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?category=science
	getNews(url);
}

// 키워드 기사 가져오기
const getNewsByKeyword = () => {
	const keyword = document.getElementById('mobile-input-data').value;
	const url = new URL(`https://jju-news-api.netlify.app/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`); //키워드 추가
											//http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?q=아이유
	getNews(url);
}

//image error
const imgError = (image) => {
	image.onerror = null; // 이미지 에러 핸들러를 중복 호출하지 않도록 이벤트 리스너를 제거합니다.
	image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU";
};

/* news content */
const render = () => {
	const newsHtml = newsList.map(news => `<div class="row news-list">
		<div class="col-lg-4 news-image">
			<img src="${news.urlToImage}" alt="뉴스 이미지" class="news-img-size" onerror="imgError(this)">
		</div>
		<div class="col-lg-8 news-content">
			<h2 class="news-title">${news.title}</h2>
			<p>${news.description == null || news.description == "" ? "내용없음": news.description.length > 200 ? news.description.substring(0, 200) + "..." : news.description}</p>
			<div>${news.source.name || "no source"}  ${moment(news.publishedAt).fromNow()}</div>
		</div>
	</div>`
	).join('');

	document.getElementById('news-board').innerHTML = newsHtml;

};

/* mobile menus */
let $mobileMenuButton = document.getElementById('mobileMenuButton');
let $mobileMenus = document.getElementById('mobileMenus');
let $mobileMenuClose = document.getElementById('mobileMenuClose');
let $mobileSearchButton = document.getElementById('mobileSearchButton');
let $mobileSearchForm = document.querySelector('.mobile-search-form');
let $mobileInputData = document.getElementById('mobile-input-data');

$mobileMenuButton.addEventListener('click', () => {
	$mobileMenus.style.width = '250px'
});

$mobileMenuClose.addEventListener('click', () => {
	$mobileMenus.style.width = '0'
});

$mobileSearchButton.addEventListener('click', (event) => {
	$mobileSearchForm.classList.toggle('on');
	
	/* toggle 방법 2
	if($mobileSearchForm.classList.contains('on')){
		$mobileSearchForm.classList.remove('on');
	} else {
		$mobileSearchForm.classList.add('on');		
	} */

	/** toggle 방법3
	 * 검색아이콘을 안 눌렀을 경우에는 queryInput.disabled = true;
	 * 검색아이콘을 눌렀을 경우에는 queryInput.disabled = false;
	 */
});

//콤마 없애는 방법 (구글검색: array to string javascript)
//join은 map함수와 자주 같이 쓰인다.
			
getLatestNews();
render();
