// Searchbar script
const searchBar = document.querySelector("#search-bar");
const searchInput = document.querySelector("#search-input");

function URLtoLocalStorage(URL){
localStorage.setItem("fetchURL", URL);
}

function submitSearch(event) {
  event.preventDefault();
  const searchValue = searchInput.value;
  var searchURL = 'https://www.themealdb.com/api/json/v2/9973533/search.php?s='+ searchValue
  console.log(searchURL);
  URLtoLocalStorage(searchURL);
  document.location.replace('./results-page.html');
}

// Random featured meals script

var featuredMealImgEl = document.querySelectorAll(".carousel-item img")
var featuredMealCaptionEl = document.querySelectorAll(".carousel-caption")
console.log(featuredMealImgEl)

//this function retrieves images and names of random recipes from themealDB API
function randomMealDisplay(){
    fetch("https://www.themealdb.com/api/json/v2/9973533/randomselection.php")
        .then(function(response){
            return response.json()})
        .then(function(data){
            console.log(data);
            for (var i = 0; i < 3; i++){
                featuredMealImgEl[i].src = data.meals[i].strMealThumb;
                featuredMealCaptionEl[i].children[0].textContent = data.meals[i].strMeal;
                featuredMealCaptionEl[i].children[1].textContent = `${data.meals[i].strArea} Food`

                featuredMealImgEl[i].setAttribute('data-id', data.meals[i].idMeal);
                featuredMealCaptionEl[i].setAttribute('data-id', data.meals[i].idMeal);

                featuredMealCaptionEl[i].addEventListener('click',randomMealNavigate)
                featuredMealImgEl[i].addEventListener('click', randomMealNavigate);
            }
   });
}

//this function sets the selected meal's id to local storage
function storeMealId(idNumber) {
    localStorage.setItem("mealID", idNumber);
}

function randomMealNavigate(event){
var mealID = event.target.getAttribute('data-id');
storeMealId(mealID);

document.location.replace('./recipe-page.html');
}

randomMealDisplay();

// temp disabled 
// searchBar.addEventListener('submit', submitSearch)

