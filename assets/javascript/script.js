// GLOBAL VARIABLES
let searchForm = document.querySelector("#search-form");
let dropdownChoice = document.querySelector("#dropdown-choice");
let searchInput = document.querySelector("#search-input");
let drinkList = document.querySelector("#drink-list");
let baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/";

/*********************************** Search by Name ***********************************/

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
      console.log(data);

      //   This declaration declares a block-scoped local variable that randomly selects a drink from the array of drinks
      let length = data.drinks.length;
      let randomDrink = Math.floor(Math.random() * length);

      /**************** This code block returns all drinks from the array of drinks ****************/

      /* data.drinks.slice(randomDrink).forEach((drink) => {
        drinkList.innerHTML += `<div>${drink.strDrink}</div>`;
      });
    });
}
*/

      /**************** This code block returns only one drink from the array of drinks ****************/
      drinkList.innerHTML += `<div>${data.drinks[randomDrink].strDrink}</div>`;
    });
}

/**************** This code block returns four drinks from the array of drinks ****************/

// EVENT LISTENERS
// init
searchForm.addEventListener("submit", mainSearch);
