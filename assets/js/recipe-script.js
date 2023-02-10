var mealID = localStorage.getItem('mealID');
var recipeName = document.getElementById('recipe-name');
var recipeImg = document.getElementById('recipe-img');
var ingredientList = document.getElementById('ingredient-list');
var ingredientItem = document.querySelectorAll('.ingredient-item');
var instructions = document.getElementById('instructions');



//loads recipe info using mealID stored in localStorage

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
        var selectedMeal = data.meals[0];
        recipeName.textContent = selectedMeal.strMeal;
        recipeImg.src = selectedMeal.strMealThumb;
        //takes instructions and splits them in to different items
        var instructionsString = selectedMeal.strInstructions;
        var instructionsArray = instructionsString.split('.');

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

        
        //builds ingredient list items and appends to page        
        for(var i = 0; i < 20; i++){
            if(selectedMeal[`strIngredient` + (i + 1)]){
            var ingredientListItem = document.createElement('li');
            ingredientListItem.textContent = selectedMeal[`strMeasure` + (i + 1) ] + " " + selectedMeal[`strIngredient` + (i + 1)];
            ingredientListItem.classList.add('text-4xl', 'border-2', 'p-2');
            ingredientList.appendChild(ingredientListItem);}
        }

        //builds instruction list item and appends to page
        for(var i = 0; i < (instructionsArray.length - 1); i++){
            var instructionListItem = document.createElement('li');
            instructionListItem.textContent = instructionsArray[i];
            instructionListItem.classList.add('text-4xl', 'border-2', 'p-2');
            instructions.appendChild(instructionListItem);
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
        numEl.className = "text-center text-3xl"
        i++
        rowEl.append(numEl);
        for(const key in data[keys]){
            dataEl = document.createElement('td')
            dataEl.textContent = data[keys][key]
            rowEl.append(dataEl)
            dataEl.className = "text-center text-3xl"
        }
        tableBodyEl.append(rowEl)
    }
}
    
recipeDisplay();

    




