/*CODE BLOCK STARTS ⤵️: *************** GLOBAL VARIABLES *************** :⤵️ CODE BLOCK STARTS*/

let searchForm = document.querySelector("#search-form");
let dropdownChoice = document.querySelector("#dropdown-choice");
let searchInput = document.querySelector("#search-input");
let drinkList = document.querySelector("#drink-list");
let baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/";
let mainShow = document.getElementById("mainShow");
let favoriteShow = document.getElementById("favoriteShow");
let saved = document.getElementById("saved");
let alerts = document.getElementById("alert");

/*CODE BLOCK ENDS ⤴️: ***************** GLOBAL VARIABLES ***************** :⤴️ CODE BLOCK ENDS*/

/*CODE BLOCK STARTS ⤵️: *************** This code block returns drinks + image + ingredients + instructions *************** :⤵️ CODE BLOCK STARTS*/

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
      let idUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="; // This is the base url for the drink id
      console.log(data.drinks);
      let indexes = [];

      // CODE CHUNK STARTS ⤵️: This function block returns a random drink from an array of drinks
      let randomDrink;
      let dIndex;
      let length = data.drinks.length;
      for (let j = 0; j < length; j++) {
        randomDrink = Math.floor(Math.random() * length);
        if (!indexes.includes(randomDrink)) {
          indexes.push(randomDrink);
        }

        if (indexes.length >= 1) {
          // <== This numerical value sets the number of drinks that will return on screen
          break;
        }
      }
      // CODE CHUNK ENDS ⤴️: This function block returns a random drink from an array of drinks

      // CODE CHUNK STARS ⤵️: This code chunk grabs all details of a drink using ID
      let cocktail, d_id;
      for (let i = 0; i < indexes.length; i++) {
        dIndex = indexes[i];
        cocktail = data.drinks[dIndex];
        d_id = cocktail.idDrink;
        fetch(idUrl + d_id)
          .then((res) => res.json())
          .then((data) => displayData(data));
        // CODE CHUNK ENDS ⤴️: This code chunk grabs all details of a drink using ID
      }
    });
}

/*CODE BLOCK ENDS ⤴️: *************** This code block returns drinks + image + ingredients + instructions *************** : ⤴️ CODE BLOCK ENDS*/

/*CODE BLOCK STARTS ⤵️: *************** This code block returns ingredients + measurements *************** :⤵️ CODE BLOCK STARTS*/

// CODE CHUNK STARTS ⤵️: This function fetches drinks by ID, then saves to favorites
function getFavorites(id) {
  drinkList.innerHTML = "";
  let idUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
  fetch(idUrl + id)
    .then((res) => res.json())
    .then((data) => displayData(data));
}
// CODE CHUNK ENDS ⤴️: This function fetches drinks by ID, then saves to favorites

// This loop returns a random drink from an array of drinks along with the drink's ingredients paired with measurements, image, and instructions
function displayData(data) {
  console.log(data);
  let drink = data.drinks[0];
  let ingredients = [];
  let measures = [];
  let ingredientsData, instructionsData, portions;
  // CODE CHUNK STARTS ⤵️: This function block pints the ingredients data from an array of drinks
  for (let k = 1; k <= 15; k++) {
    if (`strIngredient${k}` in drink && drink[`strIngredient${k}`] != null) {
      ingredients.push(drink[`strIngredient${k}`]);
    } else {
      break;
    }
  }
  // CODE CHUNK ENDS ⤴️: This function block pints the ingredients data from an array of drinks

  // CODE CHUNK STARTS ⤵️: This function block pints the measurement data from an array of drinks
  for (let a = 1; a <= 15; a++) {
    if (`strIngredient${a}` in drink && drink[`strMeasure${a}`] != null && drink[`strMeasure${a}`] != "") {
      measures.push(drink[`strMeasure${a}`]);
    } else {
      break;
    }
  }
  // CODE CHUNK ENDS ⤴️: This function block pints the measurement data from an array of drinks

  // CODE CHUNK STARTS ⤵️: This function block concatenates ingredients + measurement data from an array of drinks
  portions = `<ul>`; // This is the start of the unordered list
  for (let b = 0; b < ingredients.length; b++) {
    if (measures[b] == null || measures[b] == undefined) {
      measures[b] = "";
    }
    portions += `<li>${ingredients[b]} - ${measures[b]}</li>`;
  }
  if (ingredients.length != 0) {
    ingredientsData = `<p><b>Ingredients</b>: ${portions}</p>`;
  } else {
    ingredientsData = "";
  }
  portions += `</ul>`; // This line closes the <ul> tag
  // CODE CHUNK ENDS ⤴️: This function block concatenates ingredients + measurement data from an array of drinks

  // CODE CHUNK STARTS ⤵️: This function block prints the ingredients + measurement + instructions + image data  (with save button) to the screen
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

  <button class="text-sm py-2 px-4 rounded bg-blue-400" onclick='saveCocktail("${drink.strDrink}")'>Add to Favorites</button> 
  </div>`;
}
// CODE CHUNK ENDS ⤴️: This function block prints the ingredients + measurement + instructions + image data to the screen

/*CODE BLOCK ENDS ⤴️: *************** This code block returns ingredients + measurements *************** :⤴️ CODE BLOCK ENDS*/

/*CODE BLOCK STARTS ⤵️: *************** This code block saves retrievable cocktails to local storage *************** :⤵️ CODE BLOCK STARTS*/

function favoriteSearch() {
  mainShow.style.display = "none";
  favoriteShow.style.display = "block";
  drinkList.innerHTML = "";
}
function mainSearchInit() {
  favoriteShow.style.display = "none";
  mainShow.style.display = "block";
  drinkList.innerHTML = "";
}

// Grabs all past cocktails
let dataStorage = JSON.parse(localStorage.getItem("cocktailName")) || [];
// Function to save a searched cocktail name in local storage.
let saveCocktail = function (name) {
  let flag = false;
  if (dataStorage) {
    // Checks if a name is already present in local storage
    for (let i = 0; i < dataStorage.length; i++) {
      if (dataStorage[i] === name) {
        flag = true;
      }
    }
  }
  // CODE CHUNK STARTS ⤵️: This function block displays a message if a cocktail saves successfully or is already saved
  if (!flag) {
    dataStorage.push(name);
    localStorage.setItem("cocktailName", JSON.stringify(dataStorage));
    alerts.innerHTML = `<div class="p-3 bg-green-300 border-green-900 text-green-700 font-bold rounded">Cocktails saved!</div>`;
    setTimeout(() => {
      alerts.innerHTML = "";
    }, 3000);
  } else {
    alerts.innerHTML = `<div class="p-3 bg-red-300 border-red-900 text-red-700 font-bold rounded">Cocktails already present!</div>`;
    setTimeout(() => {
      alerts.innerHTML = "";
    }, 3000);
  }
  // CODE CHUNK ENDS ⤴️: This function block displays a message if a cocktail saves successfully or is already saved

  // This loads the cocktails again.
  loadCocktails();
};

// CODE CHUNK STARTS ⤵️: This function block displays all saved cocktails
function loadCocktails() {
  saved.innerHTML = ""; // Clears everything in saved cocktails field

  if (dataStorage.length > 0) {
    for (let i = 0; i < dataStorage.length; i++) {
      saved.innerHTML += `<div class="lg:w-1/4 md:w-4/12 sm:w-1/2 p-3">
            <button class="bg-red-500 rounded py-3 px-7 hover:bg-red-600 font-bold text-white w-full" onclick="getFavorites('${dataStorage[i]}')">${dataStorage[i]}</button>
        </div>`;
    }
  } else {
    saved.innerHTML += `<div class="lg:w-1/4 md:w-4/12 sm:w-1/2 p-3">
          No cocktails present!
      </div>`;
  }
}
// CODE CHUNK ENDS ⤴️: This function block displays all saved cocktails

/*CODE BLOCK ENDS ⤴️: *************** This code block saves retrievable cocktails to local storage *************** :⤴️ CODE BLOCK ENDS*/

/*CODE BLOCK STARTS ⤵️: *************** This code block contains event listeners *************** :⤵️ CODE BLOCK STARTS*/

// EVENT LISTENERS
// init
searchForm.addEventListener("submit", mainSearch);

/*CODE BLOCK ENDS ⤴️: *************** This code block contains event listeners *************** :⤴️ CODE BLOCK ENDS*/
