const searchBar = document.querySelector("#search-bar");
const searchInput = document.querySelector("#search-input");
var resultsList = document.getElementById('results-list');
var searchTerm = document.getElementById('search-content');
var resultBody = document.getElementById('resultsBody');

function URLtoLocalStorage(URL){
localStorage.setItem("fetchURL", URL);
}

function submitSearch(event) {
  event.preventDefault();
  const searchValue = searchInput.value;
  localStorage.setItem('searchTerm', searchValue);
  var searchURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='+ searchValue
  console.log(searchURL);
  URLtoLocalStorage(searchURL);
  document.location.replace('./results-page.html');
}

//dynamically creates result elements for recipes of the searched criteria using data from local storage
function loadPage(){
    searchTerm.textContent = "Search Results: " + localStorage.getItem('searchTerm');
    var fetchURL = localStorage.getItem('fetchURL');
    console.log(fetchURL);
    fetch(fetchURL)
    .then(function(response){
        return response.json()})
        .then(function(data){
            console.log(data);
            //will return the following message if there are no valid search results
            if(!data.meals){
                resultBody.textContent = "Could not find any recipes with the current search criteria"
                resultBody.classList.add('text-red-500','text-center')
            }
            //will return up to 30 result items of the current search criteria
            for(var i = 0; i < 30; i++){
                if(data.meals[i]){
                var resultItemImg = document.createElement('img');
                resultItemImg.setAttribute('src', data.meals[i].strMealThumb);
                resultItemImg.setAttribute('data-id', data.meals[i].idMeal);

                var resultItemName = document.createElement('h3');
                resultItemName.setAttribute('data-id', data.meals[i].idMeal);
                resultItemName.textContent = data.meals[i].strMeal;
                resultItemName.classList.add('my-1', 'pointer-events-none');

                var resultItemTags = document.createElement('label');
                resultItemTags.setAttribute('data-id', data.meals[i].idMeal);
                resultItemTags.textContent = data.meals[i].strArea;
                resultItemTags.classList.add('btn', 'my-1', 'pointer-events-none');

                var resultItemCategory = document.createElement('label');
                resultItemCategory.setAttribute('data-id', data.meals[i].idMeal);
                resultItemCategory.textContent = data.meals[i].strCategory;
                resultItemCategory.classList.add('btn', 'my-1', 'pointer-events-none');

                var resultListItem = document.createElement('li');
                resultListItem.setAttribute('data-id', data.meals[i].idMeal);
                resultListItem.classList.add('card', 'p-8', 'w-96', 'bg-base-100', 'shadow-xl', 'mx-auto', 'bg-gray-200', 'mx-2', 'my-2', 'w-full', 'md:w-1/4');

                resultListItem.appendChild(resultItemImg);
                resultListItem.appendChild(resultItemName);
                resultListItem.appendChild(resultItemTags);
                resultListItem.appendChild(resultItemCategory);
                resultsList.appendChild(resultListItem);
                }
            }
        })
}

//takes user to the recipe page of the result that they selected
function navigateToRecipe(event){
    event.preventDefault();
    var selectedMealID = event.target.getAttribute('data-id');
    localStorage.setItem("mealID", selectedMealID);
    document.location.replace('./recipe-page.html');
}

loadPage();

searchBar.addEventListener('submit', submitSearch)
resultsList.addEventListener('click', navigateToRecipe)