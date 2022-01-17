let fullReciepeContainer = document.querySelector('#full-recipe-container');
let searchContainer = document.querySelector('#search-container');
let cardRecipeContainer = document.getElementById('card-recipe-container');
let previousPage = document.getElementsByClassName('previous-page');
let currentPageElements = document.getElementsByClassName('current-page');
let cardContainer = document.getElementById('card-container'); // Print cards on screen with pagination
let nexPage = document.getElementsByClassName('next-page');

let filteredData = [];
let recipeData = allRecipesData;
const perPage = 9; // Number of cards per page
let currentIndex = 0; // Starting element index
let currentPage = 1;

// Function for random number
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function for creating card
function createCard(cardData) {
    // create elements in card;
    let card = document.createElement('div');
    let imgContainer = document.createElement('div');
    let imgCard = document.createElement('img');
    let bodyCard = document.createElement('div');
    let titleCard = document.createElement('h5');
    let action = document.createElement('button');
    let link = document.createElement('a')

    // add classList
    card.classList.add('card');
    imgContainer.classList.add('card-img-top');
    bodyCard.classList.add('card-body');

    // populate elements in card
    // image
    imgCard.src = './images/' + getRandom(1, 37) + '.jpg';
    imgContainer.appendChild(imgCard);
    // title
    titleCard.innerText = cardData.name;
    bodyCard.appendChild(titleCard);
    // tags
    cardData.tags.forEach((tag) => {
        let tagLink = document.createElement('a');
        tagLink.classList.add('card-link');
        tagLink.innerText = '#' + tag;
        tagLink.addEventListener('click', function (e) {

            resetPagination();

            let clickedTag = e.target.innerText;
            let onlyTagName = clickedTag.replace('#', '');
            location.hash = '#tag-' + onlyTagName
            filteredData = allRecipesData.filter((oneRecipe) => {
                return oneRecipe.tags.includes(onlyTagName);
            });

            recipeData = filteredData;
            printCards(perPage);
            calculateAndSetTotalPagesNumber();
        })


        bodyCard.appendChild(tagLink);
    })
    // action
    link.innerText = "Open Recipe";
    link.href = '#' + cardData.id;
    action.appendChild(link);
    // card
    card.appendChild(imgContainer);
    card.appendChild(bodyCard);
    card.appendChild(action);

    return card;

}

function resetPagination() {
    currentIndex = 0;
    currentPage = 1;

    for (let i = 0; i < currentPageElements.length; i++) {
        currentPageElements[i].innerText = currentPage;
    }
}

// Print cards on loading page
function printCards(lastElementOfPage) {
    cardContainer.innerHTML = "";

    for (let i = currentIndex; i < lastElementOfPage; i++) {
        if (typeof recipeData[i] == 'undefined') {
            continue;
        }

        let card = createCard(recipeData[i]);
        cardContainer.appendChild(card);
    }
}

function calculateAndSetTotalPagesNumber() {
    let totalPages = document.getElementsByClassName('total-pages')
    for (let i = 0; i < totalPages.length; i++) {
        totalPages[i].innerText = Math.ceil(recipeData.length / perPage)
    }
}

function calculateCurrentPage(incrementInd) {
    if (incrementInd) {
        currentPage++;
    } else {
        currentPage--;
    }

    for (let i = 0; i < currentPageElements.length; i++) {
        currentPageElements[i].innerText = currentPage;
    }
}

function renderFullRecipe() {
    let id = location.hash.replace('#', '');
    // find the recipe by id
    let recipe = recipeData.find(r => r.id === id);

    let recipeName = document.getElementsByClassName('recipe-name');
    let ulingredients = document.getElementsByClassName('ingredients');
    let instructions = document.getElementsByClassName("instructions");

    ulingredients[0].innerHTML = "";
    recipeName[0].innerText = recipe.name;
    recipe.ingredients.forEach((ing) => {
        let li = document.createElement('li');
        li.innerText = ing;
        ulingredients[0].appendChild(li)
    })
    instructions[0].innerText = recipe.instructions;
}

function handleRoute() {
    let currentHash = location.hash
    if (currentHash == '' || currentHash == '#' || currentHash.includes('tag-')) {
        // display card recipe container
        cardRecipeContainer.style.display = 'flex';
        fullReciepeContainer.style.display = 'none';
        searchContainer.style.display = "flex";

    } else {
        cardRecipeContainer.style.display = 'none';
        searchContainer.style.display = 'none';
        fullReciepeContainer.style.display = 'flex';
        renderFullRecipe()
    }
}

// Event Listeners on load and hashchange
window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);

// Print cards on next page
for (let i = 0; i < nexPage.length; i++) {
    nexPage[i].addEventListener('click', () => {
        if (recipeData.length <= currentIndex + perPage) {
            return false;
        }
        currentIndex += perPage;
        printCards(currentIndex + perPage);
        calculateCurrentPage(true);
    })
}

// Print cards on previous page
for (let i = 0; i < previousPage.length; i++) {
    previousPage[i].addEventListener('click', () => {
        if (currentIndex == 0) {
            return false
        }
        currentIndex -= perPage;
        printCards(currentIndex + perPage);
        calculateCurrentPage(false)
    })
}

// Invoke printCards function
printCards(perPage);
calculateAndSetTotalPagesNumber();





