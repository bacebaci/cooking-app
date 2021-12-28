let fullReciepeContainer = document.querySelector('#full-recipe-container');
let searchContainer = document.querySelector('#search-container');
let tagContainer = document.querySelector('#tag-container');

// Function for random number
function getRandom(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function for creating card
function createCard(cardData) {
    // create elements in card;
    let card= document.createElement('div');
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

// Print cards on screen with pagination
let cardContainer = document.getElementById('card-container');
// Number of cards per page
let perPage = 9;
// Starting element index
let currentIndex = 0;

printCards(perPage);

// Print cards on loading page
function printCards(lastElementOfPage) {
    cardContainer.innerHTML = "";

    for(let i = currentIndex; i < lastElementOfPage; i++){
      if(typeof recipeData[i] == 'undefined'){
          continue;
      }

      let card = createCard(recipeData[i]);
      cardContainer.appendChild(card);
    }
}

// Print cards on next page
let nexPage = document.getElementsByClassName('next-page');
for (let i = 0; i < nexPage.length; i++) {
    nexPage[i].addEventListener('click', () => {
        if (recipeData.length <= currentIndex + perPage){
            return false;
        }
        currentIndex += perPage;
        printCards(currentIndex + perPage);
    })
}

// Print cards on previous page
let previousPage = document.getElementsByClassName('previous-page');
for (let i = 0; i < previousPage.length; i++) {
    previousPage[i].addEventListener('click', () => {
        if (currentIndex == 0) {
            return false
        }
        currentIndex -= perPage;
        printCards(currentIndex + perPage);
    })
}





