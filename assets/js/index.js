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

};

// Show cards on screen using the createCard function
let cardContainer = document.getElementById('card-container');
for (let i = 0; i < recipeData.length; i++) {
    let card = createCard(recipeData[i]);
    cardContainer.appendChild(card)
}


