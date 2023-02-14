// Searchbar script
const searchBar = document.querySelector("#search-bar");
const searchInput = document.querySelector("#search-input");

function URLtoLocalStorage(URL){
localStorage.setItem("fetchURL", URL);
}

function submitSearch(event) {
  event.preventDefault();
  const searchValue = searchInput.value;
  localStorage.setItem('searchTerm', searchValue);
  var searchURL = 'https://www.themealdb.com/api/json/v2/9973533/search.php?s='+ searchValue
  console.log(searchURL);
  URLtoLocalStorage(searchURL);
  document.location.replace('./results-page.html');
}

// Random featured meals script

var featuredMealImgEl = document.querySelectorAll(".carousel-item img")
var featuredMealCaptionEl = document.querySelectorAll(".carousel-caption")

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
            for (var i = 3; i < 10;i++){
                displayCards(data,i)
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
console.log(`EVENT: ${event} ${mealID}`)

document.location.replace('./recipe-page.html');
}

function displayCards(data,i){
    cardContainer = $("#card-container")
    card  =$("<div>");
    image = $("<img>");
    title = $("<p>");
    subtitle = $("<p>");

    card.attr("class", "card w-80 shadow-2xl mx-auto my-8")
    image.attr("data-id",data.meals[i].idMeal)
    image.attr("src",data.meals[i].strMealThumb)
    title.attr("class", "card-title mt-4 ml-4")
    title.attr("data-id",data.meals[i].idMeal)
    title.text(data.meals[i].strMeal)
    subtitle.text(`${data.meals[i].strArea} Food`)
    subtitle.attr("data-id",data.meals[i].idMeal)
    subtitle.attr("class", "mb-4 ml-4")

    card.append(image);
    card.append(title);
    card.append(subtitle);
    cardContainer.append(card)
     
    card.click(randomMealNavigate)
}

randomMealDisplay();

searchBar.addEventListener('submit', submitSearch)

