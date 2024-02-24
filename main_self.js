const API_KEY = `ea02c6c81d7a411692d739a2f9e1dac1`;
let newsList = [];
const menus = document.querySelectorAll('.menus button');
menus.forEach(menu => menu.addEventListener('click',(event) => getNewsByCategory(event))) //ES6 버전

//뉴스 url 전역 변수 (코드 리펙토링)
let url = new URL(`https://jju-api-times-pagination.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`);

//페이지 네이션 totalResults 변수
let totalResults = 0; //기본값 0으로 설정
let page = 1; //현제 보고있는 페이지 1
const pageSize = 10; //한번에 10개의 데이터 가져오기
const groupSize = 5; //페이지네이션을 5개씩 보여주기

// 뉴스 가져오기
const getNews = async () => {
	try{
		//url 호출 전에 세팅하고  fetch를 호출해줘야 한다.
		url.searchParams.set('page', page); // 1.ulr뒤에 2.&page=page(페이지 파라미터를 세팅)을 붙인 후 3.fetch 실행
		url.searchParams.set('pageSize', pageSize); // 1.url뒤에 2.&pageSize=pageSize(페이지 파라미터를 세팅) 을 붙인 후 3.fetch 실행

		//에러 검사하고 싶은 모든 코드 넣어주자!
		const response = await fetch(url); //url data를 가져오는 호출 함수 fetch()
		const data = await response.json(); //json은 객체를 텍스트화 시킨 파일 형태 확장자
		if(response.status === 200) {
			if(data.articles.length === 0){
				throw new Error('No result for this search');
			}
			newsList = data.articles;
			totalResults = data.totalResults; //totalResults
			render();
			paginationRender();
			console.log(data);
		} else {
			throw new Error(data.message)
		}
	}catch(error){
		errorRender(error.message);
	}
};

// api 가져오기
const getLatestNews = () => {
	url = new URL(`https://jju-api-times-pagination.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`);
							//`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
	getNews(url);
};

// 카테고리 기사 가져오기
const getNewsByCategory = (event) => {
	const category = event.target.textContent.toLowerCase();
	url = new URL(`https://jju-api-times-pagination.netlify.app/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`); //카테고리 추가
							//http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?category=science
	getNews(url);
}

// 키워드 기사 가져오기
const getNewsByKeyword = () => {
	const keyword = document.getElementById('mobile-input-data').value;
	url = new URL(`https://jju-api-times-pagination.netlify.app/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`); //키워드 추가
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

//에러 메시지 출력
const errorRender = (errorMessage) => {
	const errorHTML = `<div class="alert alert-danger" role="alert">
	${errorMessage}
	</div>`;
	
	document.getElementById('news-board').innerHTML = errorHTML
};

/* ==============mobile slide menus============== */
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

/* =================에러 핸들링================= */
/**
* 1. try문 안에 있는 코드를 실행 하다가 에러가 나면
* 2. catch 안에 들어가 에러를 실행
* 3. 에러가 없다면 catch블락을 무시하고 넘어간다.
* Error메시지 : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
*/
let weight = 29;
try{
	//코드를 입력
	//이 안에서 에러가 발생하면
	if(weight < 30) {
		throw new Error('당신은너무 말랐어'); //에러가 발생되는 순간 try 코드는 끝이남
	}
}catch(error){
	//try안에 발생하는 에러를 catch가 잡아주는 곳
	//catch는 error을 매개변수로 받는다.
	//console.log('내가 잡은 에러는', error.message)
}

/* ================리펙토링 사용================= */
let message = '';

const martHtml = () => {
	message = `<div class="row message">누나 가전에 와주셔서 감사하고 항상 건강하세요!</div>`;
	
	document.getElementById('message-wrap').innerHTML = message;
}

const buyTv = () => {
	console.log('TV 구매 감사드립니다.')
	martHtml();
}

const buyAC = () => {
	console.log('AC 구매 감사드립니다.')
	martHtml();
}

const buyCellphone = () => {
	console.log('phone 구매 감사드립니다.')
	martHtml();
}

martHtml();

/* ==============페이지 네이션================= */
/**
 * 페이지 네이션 작업에 알아야 할 공식
 * 
 * //api에서 알 수 있는 정보
 * 1. totalResults : 총 몇개의 결과가 있는지
 * 2. page : 현재 보고있는 페이지
 * 
 * //우리가 정해야 하는 정보
 * 1. pageSize : 한번에 몇개의 데이터를 가져올지(api문서에서 정한 기본값은 20개이다)
 * 2. groupSize : 한번에 몇개의 페이지를 페이지네이션에서 보여줄지
 * 
 * //우리가 계산해야 하는 정보
 * 1. totalPage : 전체 페이지가 몇개인지 구하는 방법 (Math.ceil(totalResults / pageSize))
 * 									소수점 올리는 함수 Math.ceil()
 * 2. pageGroup : 몇번째 페이지 그룹에 속해 있는지 구하는 방법 (Math.ceil(pageGroup / groupSize))
 * 3. lastPage : 마지막값 구하는 방법 ((pageGroup * groupSize))
 * 4. firstPage : 첫번째 페이지 구하는 방법 (마지막 - (groupSize - 1))
 */

	/**
	 * URL에 쿼리 더하기
	 * URL 객체로 선언한 url(new URL())을 써서 선언한 url은 URL객체에서 제공하는 다양한 함수들을 쓸 수 있다.
	 * .URLSearchParams()는 query에 있는 파라미터들을 추가, 삭제 하거나 값을 가져오는 등 다양한 작업이 가능하다.
	 * 참고url: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
	 */

const paginationRender = () => {
	//totalResults
	//page
	//pageSize
	//groupSize
	//totalPages
	const totalPages = Math.ceil(totalResults/pageSize);

	//pageGroup
	const pageGroup = Math.ceil(page/groupSize);
	console.log('pageGroup', pageGroup)
	
	//lastPage
	let lastPage = pageGroup * groupSize
	//만약 마지막 페이지 그룹이 그룹사이즈 보다 작다면? lastPage = totalPages으로 변경
	if(lastPage > totalPages) {
		lastPage = totalPages;
	}

	//firstPage
	const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);
	console.log('firstPage', firstPage)

	let paginationHTML = `<li class="page-item" onclick="moveToPage(${page-1})"><a class="page-link" href="#">Previous</a></li>`;

	for(let i = firstPage; i < lastPage; i++){
		paginationHTML += `<li class="page-item ${
			i === page ? 'active' : ''
		}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
	}

	paginationHTML += `<li class="page-item" onclick="moveToPage(${page+1})"><a class="page-link" href="#">Next</a></li>`;
	document.querySelector('.pagination').innerHTML = paginationHTML

	// <nav aria-label="Page navigation example">
	// 	<ul class="pagination">
	// 		<li class="page-item"><a class="page-link" href="#">Previous</a></li>
	// 		<li class="page-item"><a class="page-link" href="#">1</a></li>
	// 		<li class="page-item"><a class="page-link" href="#">2</a></li>
	// 		<li class="page-item"><a class="page-link" href="#">3</a></li>
	// 		<li class="page-item"><a class="page-link" href="#">Next</a></li>
	// 	</ul>
	// </nav>
};

const moveToPage = (pageNum) => {
	console.log('moveToPage', pageNum);
	page = pageNum;
	getNews()
};
paginationRender();