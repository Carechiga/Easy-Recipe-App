const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");

searchButton.addEventListener("click", async () => {
  const searchValue = searchInput.value;
  const response = await fetch(`https://www.themealdb.com/api/json/v2/9973533/search.php?s=${searchValue}`);
  const data = await response.json();
  console.log(data);


const resultsContainer = document.querySelector("#results-container");
  resultsContainer.innerHTML = "";
  
  data.meals.forEach(meal => {
  const recipeElement = document.createElement("li");
  recipeElement.textContent = meal.strMeal;
resultsContainer.appendChild(recipeElement);
  });
})
var requestUrl = 'www.themealdb.com/api/json/v2/9973533/search.php?s=Arrabiata';
var mealList = document.querySelector('ul');


function getApi() {
   
    
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (var i = 0; i < data.length; i++) {
          var listItem = document.createElement('ul');
          listItem.textContent = data[i].strSource;
          mealList.appendChild(listItem);
        }
      });
  }
  
  searchButton.addEventListener('click', getApi);
  

  function filterRecipes(recipes, filters) {
    return recipes.filter(recipe => {
      return Object.entries(filters).every(([key, value]) => {
        return recipe[key] === value;
      });
    });
  }
  async function getFilteredRecipes(filters) {
    const recipes = await getSearchResults("");
    return filterRecipes(recipes, filters);
  }
    