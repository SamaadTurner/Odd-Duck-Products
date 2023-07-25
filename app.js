'use strict'; 


// far that keeps track of the number of rounds for voting
let roundsOfVoting = 25;
// array that will store all of the pictureList
let pictureList = [];

// const image1Element = document.getElementById('image1');
// const image2Element = document.getElementById('image2');
// const image3Element = document.getElementById('image3');
// const pictureContainer = document.getElementById('picture-container');
// create constructor func
function Picture(name, src) {
    this.name = name;
    this.src = src;
    this.timesClicked = 0;
    this.timesSeen = 0;
    pictureList.push(this);
  }

  // all of the pictureList
new Picture('bag', 'img/assets/bag.jpg');
new Picture('banana', 'img/assets/banana.jpg');
new Picture('bathroom', 'img/assets/bathroom.jpg');
new Picture('boots', 'img/assets/boots.jpg');
new Picture('breakfast', 'img/assets/breakfast.jpg');
new Picture('bubblegum', 'img/assets/bubblegum.jpg');
new Picture('chair', 'img/assets/chair.jpg');
new Picture('cthulhu', 'img/assets/cthulhu.jpg');
new Picture('dog-duck', 'img/assets/dog-duck.jpg');
new Picture('dragon', 'img/assets/dragon.jpg');
new Picture('pen', 'img/assets/pen.jpg');
new Picture('pet-sweep', 'img/assets/pet-sweep.jpg');
new Picture('scissors', 'img/assets/scissors.jpg');
new Picture('shark', 'img/assets/shark.jpg');
new Picture('sweep', 'img/assets/sweep.png');
new Picture('tauntaun', 'img/assets/tauntaun.jpg');
new Picture('unicorn', 'img/assets/unicorn.jpg');
new Picture('water-can', 'img/assets/water-can.jpg');
new Picture('wine-glass', 'img/assets/wine-glass.jpg');


// required selectors for DOM
let imgEls = document.querySelectorAll('img');
let voteTrackerEl = document.getElementById('vote-tracker');


// displayRandompictureList();
// console.log(pictureList);

// generate random number to pick an product from array
function generateRandomPicture(){
  return Math.floor(Math.random() * pictureList.length);

}
function renderProducts() {
  let picture1 = pictureList[generateRandomPicture()];
  let picture2 = pictureList[generateRandomPicture()];
  let picture3 = pictureList[generateRandomPicture()];
  while (picture1.name === picture2.name || picture1.name === picture3.name || picture2.name === picture3.name){
    picture2 = pictureList[generateRandomPicture()];
    picture3 = pictureList[generateRandomPicture()];
  }
  while (imgEls[0].id === picture1.name || imgEls[0].id === picture2.name || imgEls[0].id === picture3.name || imgEls[1].id === picture1.name || imgEls[1].id === picture2.name || imgEls[1].id === picture3.name || imgEls[2].id === picture1.name || imgEls[2].id === picture2.name || imgEls[2].id === picture3.name){
    picture1 = pictureList[generateRandomPicture()];
    picture2 = pictureList[generateRandomPicture()];
    picture3 = pictureList[generateRandomPicture()];
    while (picture1.name === picture2.name || picture1.name === picture3.name || picture2.name === picture3.name){
      picture2 = pictureList[generateRandomPicture()];
      picture3 = pictureList[generateRandomPicture()];
    }
  }
  imgEls[0].src = picture1.src;
  imgEls[0].id = picture1.name;
  picture1.timeSeen += 1;
  imgEls[1].src = picture2.src;
  imgEls[1].id = picture2.name;
  picture2.timeSeen += 1;
  imgEls[2].src = picture3.src;
  imgEls[2].id = picture3.name;
  picture3.timeSeen += 1;

}







// // for loop to display 3 images 25 times 
// for(let i = 0; i <=roundsOfVoting;i++){
//     function displayRandompictureList() {
//         let randomPictureIndex1 = Math.floor(Math.random() * pictureList.length);
//         let randomPictureIndex2 = Math.floor(Math.random() * pictureList.length);
//         let randomPictureIndex3 = Math.floor(Math.random() * pictureList.length);
    
//         while(randomPictureIndex1 === randomPictureIndex2 === randomPictureIndex3) {
//         randomPictureIndex2 = Math.floor(Math.random() * pictureList.length);
//         }
    
//         image1Element.src = pictureList[randomPictureIndex1].src;
//         image1Element.alt = pictureList[randomPictureIndex1].name;
//         image2Element.src = pictureList[randomPictureIndex2].src;
//         image2Element.alt = pictureList[randomPictureIndex2].name;
//         image3Element.src = pictureList[randomPictureIndex3].src;
//         image3Element.alt = pictureList[randomPictureIndex3].name;
//         pictureList[randomPictureIndex1].timesSeen++;
//         pictureList[randomPictureIndex2].timesSeen++;
//     }
// }

  // code that runs when a user has voted on a picture
 // handles the event of which picture was clicked on
function handleClick(event){
  let imgClicked = event.target.id;
  pictureList.forEach(image => {
    if(image.name === imgClicked){
      image.timesClicked += 1;
    }
  });
  if(roundsOfVoting > 1){
    renderProducts();
    roundsOfVoting--;
  } else {
    voteTrackerEl.removeEventListener('click', handleClick);
    roundsOfVoting--;
    writeData('products', pictureList);
  }
}
// adds the click listener for the above function
voteTrackerEl.addEventListener('click', handleClick);


// calls the function to display photos that dont match and are new
renderProducts();
// a function to write votes/seen values to local storage
function writeData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}