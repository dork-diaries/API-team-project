// GLOBAL VARIABLES
let searchForm = document.querySelector("#search-form");
let dropdownChoice = document.querySelector("#dropdown-choice");
let searchInput = document.querySelector("#search-input");
let drinkList = document.querySelector("#drink-list");
let baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/";

/*********************************** Search by Name or Ingredient ***********************************/
// FUNCTIONS
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
      //   RANDOM INFO
      //   let length = data.drinks.length;
      //   let random = math.floor(math.random());
      data.drinks.slice(0, 10).forEach((drink) => {
        drinkList.innerHTML += `<div>${drink.strDrink}</div>`;
      });
    });
}

// EVENT LISTENERS
// init
searchForm.addEventListener("submit", mainSearch);
