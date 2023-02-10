let dropdown = document.querySelector("#dropdown");
(async()=> {var url = 'https://themealdb.com/api/json/v2/9973533/categories.php';
console.log(`poll URL created: ${url}`)
//get filter with categories
var response = await fetch(url, {
    method: 'GET',
    mode:"cors",
    headers: {
        'Access-Control-Allow-Origin': "*",
        'Content-Type': 'application/json',
        },
    });
data = response.json()
console.log(data)
})()


dropdown.addEventListener("change", async function() {
  let selectedOption = this.options[this.selectedIndex].value;
  console.log(selectedOption);

  
var url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' +selectedOption;
console.log(`poll URL created: ${url}`)
//get options selected
var response = await fetch(url, {
    method: 'GET',
    headers: {
        
        'Content-Type': 'application/json',
        },
    });
data = response.json()
console.log(data)
});



