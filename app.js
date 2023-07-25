'use strict';

const productsList = [];
let roundsOfVoting = 25;
let chartObj = null;

function CreateProduct(name, source){
  this.name = name;
  this.source = source;
  this.timesShown = 0;
  this.timesClicked = 0;
}

productsList.push(new CreateProduct('bag', 'img/assets/bag.jpg'));
productsList.push(new CreateProduct('banana', 'img/assets/banana.jpg'));
productsList.push(new CreateProduct('bathroom', 'img/assets/bathroom.jpg'));
productsList.push(new CreateProduct('boots', 'img/assets/boots.jpg'));
productsList.push(new CreateProduct('breakfast', 'img/assets/breakfast.jpg'));
productsList.push(new CreateProduct('bubblegum', 'img/assets/bubblegum.jpg'));
productsList.push(new CreateProduct('chair', 'img/assets/chair.jpg'));
productsList.push(new CreateProduct('cthulhu', 'img/assets/cthulhu.jpg'));
productsList.push(new CreateProduct('dog-duck', 'img/assets/dog-duck.jpg'));
productsList.push(new CreateProduct('dragon', 'img/assets/dragon.jpg'));
productsList.push(new CreateProduct('pen', 'img/assets/pen.jpg'));
productsList.push(new CreateProduct('pet-sweep', 'img/assets/pet-sweep.jpg'));
productsList.push(new CreateProduct('scissors', 'img/assets/scissors.jpg'));
productsList.push(new CreateProduct('shark', 'img/assets/shark.jpg'));
productsList.push(new CreateProduct('sweep', 'img/assets/sweep.png'));
productsList.push(new CreateProduct('tauntaun', 'img/assets/tauntaun.jpg'));
productsList.push(new CreateProduct('unicorn', 'img/assets/unicorn.jpg'));
productsList.push(new CreateProduct('water-can', 'img/assets/water-can.jpg'));
productsList.push(new CreateProduct('wine-glass', 'img/assets/wine-glass.jpg'));

let imgEls = document.querySelectorAll('img');
let voteTrackerEl = document.getElementById('vote-tracker');

console.log('Current Products: ', productsList);

function generateRandomProduct(){
  return Math.floor(Math.random() * productsList.length);
}

function renderProducts() {
  let product1 = productsList[generateRandomProduct()];
  let product2 = productsList[generateRandomProduct()];
  let product3 = productsList[generateRandomProduct()];
  console.log('Products to Render ', imgEls, product1, product2, product3);
  while (product1.name === product2.name || product1.name === product3.name || product2.name === product3.name){
    product2 = productsList[generateRandomProduct()];
    product3 = productsList[generateRandomProduct()];
  }
  console.log('RENDERED IMAGES ', imgEls);
  console.log('FUTURE IMAGES ', product1.name, product2.name, product3.name);
  while (imgEls[0].id === product1.name || imgEls[0].id === product2.name || imgEls[0].id === product3.name || imgEls[1].id === product1.name || imgEls[1].id === product2.name || imgEls[1].id === product3.name || imgEls[2].id === product1.name || imgEls[2].id === product2.name || imgEls[2].id === product3.name){
    product1 = productsList[generateRandomProduct()];
    product2 = productsList[generateRandomProduct()];
    product3 = productsList[generateRandomProduct()];
    while (product1.name === product2.name || product1.name === product3.name || product2.name === product3.name){
      product2 = productsList[generateRandomProduct()];
      product3 = productsList[generateRandomProduct()];
    }
  }
  imgEls[0].src = product1.source;
  imgEls[0].id = product1.name;
  product1.timesShown += 1;
  imgEls[1].src = product2.source;
  imgEls[1].id = product2.name;
  product2.timesShown += 1;
  imgEls[2].src = product3.source;
  imgEls[2].id = product3.name;
  product3.timesShown += 1;
}

function resultsButton(){
  const ul = document.getElementById('results');
  ul.innerHTML = '';
  const li = document.createElement('li');
  if(roundsOfVoting > 0){
    let text = ('Sorry, you need to vote ' + roundsOfVoting + ' more times to see results!');
    li.appendChild(document.createTextNode(text));
    ul.appendChild(li);
  } else {
    for(let h = 0; h < productsList.length; h++){
      let text = (productsList[h].name + ' had ' + productsList[h].timesClicked + ' votes and was seen ' + productsList[h].timesShown + ' times.');
      let lis = document.createElement('li');
      lis.appendChild(document.createTextNode(text));
      ul.appendChild(lis);
      console.log('loop ran');
    }
  }
}

function handleClick(event){
  let imgClicked = event.target.id;
  productsList.forEach(image => {
    if(image.name === imgClicked){
      image.timesClicked += 1;
    }
  });
  console.log('Updated Products: ', productsList);
  if(roundsOfVoting > 1){
    renderProducts();
    roundsOfVoting--;
  } else {
    voteTrackerEl.removeEventListener('click', handleClick);
    chartObj = drawChart();
    roundsOfVoting--;
  }
}

renderProducts();
voteTrackerEl.addEventListener('click', handleClick);

function drawChart() {
  let labels = [];
  let timesShownValues = [];
  let timesClickedValues = [];
  productsList.forEach(product => {
    labels.push(product.name);
    timesShownValues.push(product.timesShown);
    timesClickedValues.push(product.timesClicked);
  });
  return new Chart(canvasEl, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Times Shown',
        data: timesShownValues,
        borderWidth: 1,
      }, {
        label: 'Times Clicked',
        data: timesClickedValues,
        borderWidth: 1,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

const canvasEl = document.getElementById('chart');


