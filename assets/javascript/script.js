// GLOBAL VARIABLES
let searchForm = document.querySelector("#search-form");
let dropdownChoice = document.querySelector("#dropdown-choice");
let searchInput = document.querySelector("#search-input");
let drinkList = document.querySelector("#drink-list");
let baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/";
let favoriteBtn = document.querySelector("#favorite-button");
let Favorite = JSON.parse(localStorage.getItem("favorite")) || [];
let favoriteList = JSON.parse(localStorage.getItem("favorite-list")) || [];

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
      console.log(data.drinks);
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
        dIndex = indexes[i];
        let ingredientsData, instructionsData;
        for (let k = 1; k <= 15; k++) {
          if (`strIngredient${k}` in data.drinks[dIndex] && data.drinks[dIndex][`strIngredient${k}`] != null) {
            ingredients.push(data.drinks[dIndex][`strIngredient${k}`]);
          } else {
            break;
          }
        }
        // console.log(ingredients);
        if (ingredients.length != 0) {
          ingredientsData = `<p>Ingredients: ${ingredients.join(", ")}</p>`;
        } else {
          ingredientsData = "";
        }
        if (data.drinks[dIndex].strInstructions !== undefined) {
          instructionsData = `<p>Instructions: ${data.drinks[dIndex].strInstructions}</p>`;
        } else {
          instructionsData = "";
        }
        drinkList.innerHTML += `<div>
            <h4 style="font-size: 22px;">${data.drinks[dIndex].strDrink}</h4>
            <p><img height="200" width="200" src="${data.drinks[dIndex].strDrinkThumb}"></p>
            ${ingredientsData}
            ${instructionsData}
            </div>`;
      }
    });
}

function addToFavorites() {
  console.log("button clicked");

  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let currentFavorite = "Margarita";
      // data.drinks.idDrink;
      console.log(currentFavorite);
      favoriteList.push(currentFavorite);
      localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
    });
}
// EVENT LISTENERS
// init
searchForm.addEventListener("submit", mainSearch);

favoriteBtn.addEventListener("click", addToFavorites);
