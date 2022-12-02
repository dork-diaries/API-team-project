// GLOBAL VARIABLES
let searchForm = document.querySelector("#search-form");
let dropdownChoice = document.querySelector("#dropdown-choice");
let searchInput = document.querySelector("#search-input");
let drinkList = document.querySelector("#drink-list");
let baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/";
/**************** This code block returns drinks + image + ingredients + instructions ****************/
// FUNCTIONS
function mainSearch(event) {
  event.preventDefault();
  drinkList.innerHTML = "";
  let queryParam = dropdownChoice.value === "cocktail" ? `search.php?s=${searchInput.value}` : `filter.php?i=${searchInput.value}`;
  let requestUrl = `${baseUrl}${queryParam}`;
  console.log(requestUrl);
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let idUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
      console.log(data.drinks);
      let indexes = [];
      //   RANDOM INFO
      //   This function returns a random drink from an array of drinks
      let randomDrink;
      let dIndex;
      let length = data.drinks.length;
      for (let j = 0; j < length; j++) {
        randomDrink = Math.floor(Math.random() * length);
        if (!indexes.includes(randomDrink)) {
          indexes.push(randomDrink);
        }
        if (indexes.length >= 4) {
          break;
        }
      }
      let cocktail, d_id;
      // TODO: Restrict the number of drinks displayed to x, using hide class
      for (let i = 0; i < indexes.length; i++) {
        dIndex = indexes[i];
        cocktail = data.drinks[dIndex];
        // Getting all details of a drink using ID
        d_id = cocktail.idDrink;
        fetch(idUrl + d_id)
          .then((res) => res.json())
          .then((data) => displayData(data));
      }
    });
}
// This loop returns a random drink from an array of drinks along with the drink's ingredients paired with measurements, image, and instructions
function displayData(data) {
  console.log(data);
  let drink = data.drinks[0];
  let ingredients = [];
  let measures = [];
  let ingredientsData, instructionsData, ingred_measures;
  for (let k = 1; k <= 15; k++) {
    if (`strIngredient${k}` in drink && drink[`strIngredient${k}`] != null) {
      ingredients.push(drink[`strIngredient${k}`]);
    } else {
      break;
    }
  }

  for (let a = 1; a <= 15; a++) {
    if (`strIngredient${a}` in drink && drink[`strMeasure${a}`] != null && drink[`strMeasure${a}`] != "") {
      measures.push(drink[`strMeasure${a}`]);
    } else {
      break;
    }
  }
  // console.log(ingredients);
  ingred_measures = `<ul>`;
  for (let b = 0; b < ingredients.length; b++) {
    if (measures[b] == null || measures[b] == undefined) {
      measures[b] = "";
    }
    ingred_measures += `<li>${ingredients[b]} - ${measures[b]}</li>`;
  }
  if (ingredients.length != 0) {
    ingredientsData = `<p><b>Ingredients</b>: ${ingred_measures}</p>`;
  } else {
    ingredientsData = "";
  }

  ingred_measures += `</ul>`;
  // if (measures.length != 0) {
  //   ingred_measures = `<p><b>Measurements</b>: ${measures.join(", ")}</p>`;
  // }else{
  //   ingred_measures = '';
  // }
  if (drink.strInstructions !== undefined) {
    instructionsData = `<p><b>Instructions</b>: ${drink.strInstructions}</p>`;
  } else {
    instructionsData = "";
  }
  drinkList.innerHTML += `<div>
  <h4 style="font-size: 22px;">${drink.strDrink}</h4>
  <p><img height="200" width="200" src="${drink.strDrinkThumb}"></p>
  ${ingredientsData}
  ${instructionsData}
  </div>`;
}
// EVENT LISTENERS
// init
searchForm.addEventListener("submit", mainSearch);
