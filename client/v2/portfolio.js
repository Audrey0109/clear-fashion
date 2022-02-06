// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page -> stock info
let currentProducts = [];
let currentPagination = {};
let currentBrand= "";
let favoriteProduct=[];

// inititiate selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectSort=document.querySelector('#sort-select');
const selectBrand=document.querySelector('#sort-brand');
const spanNbNewProducts=document.querySelector('#nbNewProducts');
const spanp50=document.querySelector('#p50');
const spanp90=document.querySelector('#p90');
const spanp95=document.querySelector('#p95');
const spanLastRealeased=document.querySelector('#last-released');



/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=selectPage] - current page to fetch
 * @param  {Number}  [size=selectShow] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    //le fectch récupère l'information
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

//DECLARATION OF ALL THE RENDERS

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

const renderIndicators= pagination => {
  const {count}=pagination;
  spanNbProducts.innerHTML=count;
}

/**
 * Render brand selector
 * @param  {Object} brand
 */
 const renderBrands = products => {
  const brand=[];
  const options= products.map(obj => {
    if (!brand.includes(obj.brand)){
      brand.push(obj.brand);
      return '<option value="${obj.brand}"${currentBrand===obj.brand ? "selected": ""}>${obj.brand}</option>'
    }
  });
  options.unshift('<option value="">All brands</option>')

  selectBrand.innerHTML = options.join('');
  if(currentBrand===""){
    selectBrand.selectedIndex = 0;
  }
};

//new products
const renderNewProducts = products => {
  let count=0;
  var today= new Date();
  for (let i=0; i<products.length; i++){
    var test= products[i].released;
    var test2= new Date(test);
    var rep= Math.floor((today-test2)/(1000*60*60*24));
    if(rep<=14){
      count=count+1;
    }
  }
  spanNbNewProducts.innerHTML=count;
}

//p50
const renderP50 = products => {
  var idx=parseInt(products.length*0.5);
  var sorted= sort_by_price_asc(products);
  var count=sorted[idx].price;
  spanp50.innerHTML=count;
}

//p90
const renderP90 = products => {
  var idx=parseInt(products.length*0.9);
  var sorted= sort_by_price_asc(products);
  var count=sorted[idx].price;
  spanp90.innerHTML=count;
}

//p95
const renderP95 = products => {
  var idx=parseInt(products.length*0.95);
  var sorted= sort_by_price_asc(products);
  var count=sorted[idx].price;
  spanp95.innerHTML=count;
}

//Last Released
const renderLastReleased=products =>{
  console.log(products);
  var sorted= SortDateAsc(products);
  var count=sorted[0].released; //the first one on the list is the last released
  spanLastRealeased.innerHTML=count;
}

//Always add the new created renders here to have them displayed
const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  renderP50(products);
  renderP90(products);
  renderP95(products);
  renderLastReleased(products);
  renderNewProducts(products);
  renderBrands(products);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */
selectShow.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);


/**
 * Select the pages to display
 * @type {[type]}
 */
 selectPage.addEventListener('change', event => {
  currentPagination.currentPage=parseInt(event.target.value);
  refresh
});


/**
 * Select the pages to display
 * @type {[type]}
 */
 selectPage.addEventListener('change', event => {
  fetchProducts()
    .then(setCurrentProducts)
    .then(()=> render(currentProducts,currentPagination))
});

/**
 * Sort the of products to display 
 * @type {[type]}
 */ 
 selectSort.addEventListener('change', event => {
  const choice=selectSort.value; //asc or desc value
  var temp=[];
  if (choice== "price-desc"){
    temp=sort_by_price_desc(currentProducts);
  }
  if (choice=="price-asc"){
    temp=sort_by_price_asc(currentProducts);
  }
  if (choice=="date-asc"){
    temp=SortDateAsc(currentProducts);
  }
  if (choice=="date-desc"){
    temp=SortDateDesc(currentProducts);
  }
  console.log(temp);
  fetchProducts(currentPagination.currentPage,currentPagination.size)
    .then(setCurrentProducts)
    .then(()=> render(temp, currentPagination));
});

/**
 * Select the brands of products to display 
 * @type {[type]}
 */
 selectBrand.addEventListener('change', event => {
  const choice=selectBrand.value; 
  var temp=[];
  if (choice== "loom"){
    temp= brandsName.forEach(value => {brands[value] = sort_by_date_old_to_new(brands[value])});
  }
  if (choice=="1083"){
    temp=sort_by_price_asc(currentProducts);
  }
  if (choice=="dedicated"){
    temp=SortDateAsc(currentProducts);
  }
  if (choice=="aatise"){
    temp=SortDateDesc(currentProducts);
  }
  if (choice=="adresse"){
    temp=SortDateDesc(currentProducts);
  }
  console.log(temp);
  fetchProducts(currentPagination.currentPage,currentPagination.size)
    .then(setCurrentProducts)
    .then(()=> render(temp, currentPagination));
});


/**
 * Select the products released recently (less than 2 weeks)
 * @type {[type]}
 */
 document.getElementById('recent_released').addEventListener('click', function() {
  currentProducts.forEach(obj => { 
    obj.new=trye
    if((new Date()-new Date(obj.released))> (24*60*60*1000*14)){
      obj.new=false;
    }
  })
});




//Functions used 

function SortDateAsc(marketplace){
  return marketplace.sort((a,b)=> new Date(b.released) - new Date(a.released));
}

function SortDateDesc(marketplace){
  return marketplace.sort((a,b)=> new Date(a.released) - new Date(b.released));
}


function sort_by_price_asc(marketplace){
  const sortPrice= marketplace.sort((value1,value2)=>(value1.price > value2.price)?1:-1); 
  //from the lowest to the highest price
  return sortPrice;
}

function sort_by_price_desc(marketplace){
  const sortPrice= marketplace.sort((value1,value2)=>(value1.price < value2.price)?1:-1); 
  //from the highest to the lowest price
  return sortPrice;
}

