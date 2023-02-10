const searchBar = document.querySelector("#search-bar");
const searchInput = document.querySelector("#search-input");

function URLtoLocalStorage(URL){
localStorage.setItem("fetchURL", URL);
}

function submitSearch(event) {
  event.preventDefault();
  const searchValue = searchInput.value;
  var searchURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='+ searchValue
  console.log(searchURL);
  URLtoLocalStorage(searchURL);
  document.location.replace('./results-page.html');
}

searchBar.addEventListener('submit', submitSearch)

function loadPage(){
var fetchURL = localStorage.getItem('fetchURL');
console.log(fetchURL);
fetch(fetchURL)
.then(function(response){
    return response.json()})
    .then(function(data){
        console.log(data);
})
}

loadPage();