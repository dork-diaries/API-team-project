// GLOBAL VARIABLES
let searchForm = document.querySelector("#search-form");
let dropdownChoice = document.querySelector("#dropdown-choice");
let searchInput = document.querySelector("#search-input");
let drinkList = document.querySelector("#drink-list");
let baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/";

/**************** This code block returns drinks + image + ingredients + instructions ****************/

// function to search by name and by ingredient
function mainSearch(event) {
  event.preventDefault();
  drinkList.innerHTML = "";
  let queryParam = dropdownChoice.value === "cocktail" ? `search.php?s=${searchInput.value}` : `filter.php?i=${searchInput.value}`;
  let requestUrl = `${baseUrl}${queryParam}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data.drinks);
      let indexes = [];
      //   RANDOM INFO
      //   This function returns x number of drinks from an array of drinks
      let randomDrink;
      let dIndex;
      let length = data.drinks.length;
      for (let j = 0; j < length; j++) {
        randomDrink = Math.floor(Math.random() * length);
        if (!indexes.includes(randomDrink)) {
          indexes.push(randomDrink);
        }
        if (indexes.length >= 100) {
          // 4 is the number of drinks you want to return, you can change this number
          break;
        }
      }
      // This loop returns a random drink from an array of drinks along with the drink's ingredients, image, and instructions
      for (let i = 0; i < indexes.length; i++) {
        let ingredients = [];
        let measurements = [];
        dIndex = indexes[i];
        let ingredientsData = "";
        let instructionsData = "";
        for (let k = 1; k <= 15; k++) {
          if (`strIngredient${k}` in data.drinks[dIndex] && data.drinks[dIndex][`strIngredient${k}`] != null) {
            ingredients.push(data.drinks[dIndex][`strIngredient${k}`]);
          } else {
            break;
          }
          if (`strMeasure${k}` in data.drinks[dIndex] && data.drinks[dIndex][`strMeasure${k}`] != null) {
            measurements.push(data.drinks[dIndex][`strMeasure${k}`]);
          } else {
            break;
          }
        }
        console.log(measurements);
        console.log(ingredients);
        if (ingredients.length != 0) {
          ingredients.forEach((ingredient, index) => {
            ingredientsData += `<li>${measurements[index]} ${ingredient}</li>`;
          });
          // ingredientsData = `<p>Ingredients: ${ingredients.join(", ")}</p>`;
        }
        if (data.drinks[dIndex].strInstructions !== undefined) {
          instructionsData = `<h4 class="">Instructions:</h4><p class="text-sm">${data.drinks[dIndex].strInstructions}</p>`;
        } else {
          instructionsData = "";
        }
        console.log(ingredientsData);
        //     drinkList.innerHTML += `<div class="flex flex-col border-2 border-red-700 w-60 p-1 bg-red-100">
        //     <img src="${data.drinks[dIndex].strDrinkThumb}" alt="">
        //     <h3 class="text-center font-bold text-lg">${data.drinks[dIndex].strDrink}</h3>
        //     <br>
        //     ${ingredientsData}
        //     ${instructionsData}
        //     <button class="bg-red-300 border border-black p-1 justify-center">Favorite!</button>
        // </div>`;

        drinkList.innerHTML += `<div>
            <h4 style="font-size: 22px;">${data.drinks[dIndex].strDrink}</h4>
            <p><img height="200" width="200" src="${data.drinks[dIndex].strDrinkThumb}"></p>
            ${ingredientsData}
            ${instructionsData}
            </div>`;
      }
    });
}

// EVENT LISTENERS
// init
searchForm.addEventListener("submit", mainSearch);
