// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);


/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable

const cheap_tshirt = "https://www.loom.fr/products/le-t-shirt";
console.log(cheap_tshirt);

/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
const nbOfProducts = marketplace.length; //140
// 2. Log the variable
console.log(nbOfProducts);

// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
const brandsName =[]; 
marketplace.forEach(value => {brandsName.push(value.brand)});

// 2. Log the variable
const uniqueBrandsName = new Set(brandsName);
console.log(uniqueBrandsName);
// 3. Log how many brands we have
console.log(uniqueBrandsName.size);

// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price

function sort_by_price(marketplace){
  const sortPrice= marketplace.sort((value1,value2)=>(value1.price > value2.price)?1:-1); 
  //from the lowest to the highest price
  return sortPrice;
}
// 2. Create a variable and assign it the list of products by price from lowest to highest
const marketplace_sorted_by_price = sort_by_price(marketplace);
// 3. Log the variable
console.table(marketplace_sorted_by_price);

// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date

function sort_objects_by_date(marketplace){
  const sortDate= marketplace.sort((value1,value2)=>(value1.date < value2.date)?1:-1); 
  return sortDate;
}
// 2. Create a variable and assign it the list of products by date from recent to old
const marketplace_sorted_by_date=sort_objects_by_date(marketplace);
// 3. Log the variable
console.table(marketplace_sorted_by_date);

// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
let listPrice =[]; 
listPrice= marketplace.filter(function(x){ return x.price >= 50 && x.price <= 100});
listPrice= sort_by_price(listPrice)
// 2. Log the list
//It is better when it is ordered
console.table(sort_by_price(listPrice));

// 🎯 TODO: Average price
// 1. Determine the average price of the marketplace
// 2. Log the average

//I declare the variable with let because the value will change
let sum = 0; 
let tabPrice=[];

//We get the column with the prices
marketplace.forEach(value => {tabPrice.push(value.price)});
for(let i=1; i<tabPrice.length; i++){
  sum+=tabPrice[i];
}
let average=sum/tabPrice.length;
// 2. Log the average
console.log(average);
//89.85714285714286

/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
const brands = {};
brandsName.forEach(value => {brands[value] = []});
marketplace.forEach(value => {brands[value.brand].push(value)});

// 2. Log the variable
console.table(brands);

// 3. Log the number of products by brands
for (const key of Object.keys(brands)) {
  console.log(key +" : number of products :" + brands[key].length);
}


// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest

function sort_by_price_highest(marketplace){
  const sortPrice= marketplace.sort((value1,value2)=>(value1.price < value2.price)?1:-1); 
  //from the lowest to the highest price
  return sortPrice;
}

brandsName.forEach(value => {brands[value] = sort_by_price_highest(brands[value])});


// 2. Log the sort
//Products sorted by price for every key (brands)
for (const key of Object.keys(brands)) {
    console.table(brands[key]);
}

// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
//From old to recent
function sort_by_date_old_to_new(marketplace){
  const sortDate= marketplace.sort((value1,value2)=>(value1.date > value2.date)?1:-1); 
  return sortDate;
}
brandsName.forEach(value => {brands[value] = sort_by_date_old_to_new(brands[value])});

// 2. Log the sort
for (const key of Object.keys(brands)) {
  console.table(brands[key]);
}


/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products

//Function to retrieve the p90 
function math_p90(key){
  return brands[key][Math.round(brands[key].length*0.1)].price; 
}

// 2. Log the sort
Object.keys(brands).forEach(key => {console.log(key + " "+ math_p90(key))});



/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.
/*let newProd=true;
COTELE_PARIS.forEach(value => {if(Date.parse(value.date))<}{newProd})
It will always be false because of actual date
*/

// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€
let reasonablePrice = true;
COTELE_PARIS.forEach(value => {if(value.price > 100){reasonablePrice = false}});
console.log("The shop is a reasonable price shop : " + reasonablePrice);

// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product
let prod_uuid="";
COTELE_PARIS.forEach(value => {if(value.uuid == 'b56c6d88-749a-5b4c-b571-e5b5c6483131'){prod_uuid = value}});
console.log("The product with the uuid '`b56c6d88-749a-5b4c-b571-e5b5c6483131` is : " , prod_uuid.name);

// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product

COTELE_PARIS.forEach(value => {if(value.uuid = "b56c6d88-749a-5b4c-b571-e5b5c6483131"){delete value.uuid}});
console.table(COTELE_PARIS);


// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;
jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
console.log('blueJacket: ', blueJacket);
console.log('jacket :', jacket)

// 2. What do you notice?
//I notice that both have a new boolean property favorite

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};



// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties
//JSON.strigify pour stocker en format JSON plutôt que format object
jacket = JSON.parse(JSON.stringify(blueJacket));
jacket.favorite=true;
console.log('Blue Jacket', blueJacket);
console.log('Jacket', jacket);
console.log('end of tutorial');



/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
console.log('Save in local storage');
//function setItem pour stocker dans le local storage
window.localStorage.setItem("MY_FAVORITE_BRANDS",JSON.stringify(MY_FAVORITE_BRANDS));
// 2. log the localStorage
console.log(window.localStorage.getItem("MY_FAVORITE_BRANDS"));