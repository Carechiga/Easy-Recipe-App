var mealID = localStorage.getItem('mealID');
var recipeName = document.getElementById('recipe-name');
var recipeImg = document.getElementById('recipe-img');
var ingredientList = document.getElementById('ingredient-list');
var ingredientArray = ['strIngredient1', 'strIngredient2', 'strIngredient3', 'strIngredient4','strIngredient5', 'strIngredient6', 'strIngredient7', 'strIngredient8', 'strIngredient9', 'strIngredient10', 'strIngredient11', 'strIngredient12','strIngredient13', 'strIngredient14', 'strIngredient15', 'strIngredient16','strIngredient17', 'strIngredient18', 'strIngredient19', 'strIngredient20',];

var tableBodyEl = document.getElementById('table-body')

var ingredients = [];

//main function to display data. Includes fetching, parsing, and displaying
function recipeDisplay(){
    //fetch recipe ingredients/picture/name
    fetch("https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=" + mealID)
        .then(function(response){
            return response.json()})
        .then(async function(data){
            console.log(data);
            recipeName.textContent = data.meals[0].strMeal;
            recipeImg.src = data.meals[0].strMealThumb;

            //get ingredients and add them to array ingredients to poll nutrition data
            console.log(`Parsing recipe ingredient list:`)
            for(const key in data.meals[0]){
                if(key.includes("strIngredient") && data.meals[0][key] !== "" ){
                    ingredients.push(data.meals[0][key])
                    console.log(`${key}: ${data.meals[0][key]}`)
                }
            }
            //get nutrition data and display
            var nutritionData = await pollNutritionData(ingredients)
            console.log(`Nutrition Data:`)
            console.log(nutritionData)
            nutritionDisplay(nutritionData)

            
            //display ingredient list
            for(var i = 0; i < ingredientArray.length; i++){
                var currentIngredient = ingredientArray[i];
                if(data.meals[0].currentIngredient !== ""){
                    // console.log(currentIngredient);
                    var recipeListItem = document.createElement('li');
                    recipeListItem.textContent = data.meals[0].currentIngredient;
                    recipeListItem.append(ingredientList);
                }
            }
        })
}


async function pollNutritionData(ingredients){
    console.log(`Polling nutrition data:`)
    //create search query URL
    var len = ingredients.length;
    for (i = 0 , x = 1; i<len-1; i++, x++){
        ingredients.splice(i+x,0," : ");
    }
    query = ingredients.join("")
    var url = 'https://api.api-ninjas.com/v1/nutrition?query='+query;
    console.log(`poll URL created: ${url}`)
    //get nutritional data
    response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-Api-Key': 'Rd5DJlBsPPGEuoAatIFHdw==yShsY7nfSzo4wXLP',
            'Content-Type': 'application/json',
            },
        });
    data = response.json()
    return data
}

//displays nutrition data by creating and populating table elements
function nutritionDisplay(data){
    console.log(`Displaying nutrition table data...`)
    i = 1
    for (const keys in data){
        rowEl = document.createElement('tr')
        numEl = document.createElement('th')
        numEl.textContent = i;
        i++
        rowEl.append(numEl);
        for(const key in data[keys]){
            dataEl = document.createElement('td')
            dataEl.textContent = data[keys][key]
            rowEl.append(dataEl)
            dataEl.className = "text-center"
        }
        tableBodyEl.append(rowEl)
    }
}
    
recipeDisplay();

// Countdown timer
function startTimer() {
    var input = document.getElementById("secondsInput").value;
    if (isNaN(input) || input <= 0) {
        document.getElementById("timer").innerHTML = "Please enter a number in the box!"
        return;
    }

var seconds = parseInt(input, 10);
countdown = setInterval(function() {
    seconds--;
    document.getElementById("timer").innerHTML = "Time remaining: " + seconds + " seconds";
      if (seconds <= 0) {
        clearInterval(countdown);
        document.getElementById("timer").innerHTML = "Time's up!";
      }
    }, 1000);
  }
    



