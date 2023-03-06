const productSection = document.querySelector('.products');
const Products = [...products];

function setProducts(arr){
    let productHTML;
    if(arr.length < 1){
        productHTML = `<h6 class="not-found">Sorry, no item found</h6>`
    }
    else{
        productHTML = arr.map(({id,title,company,image,price})=>{
            return `<article class="product">
                        <img src=${image} alt="">
                        <h1>${title}</h1>
                        <p>$ ${price}</p>
                    </article>`
        }).join('');
    }
    productSection.innerHTML = productHTML;
}

setProducts(products);
const val = document.getElementById('search');

val.addEventListener('keyup',()=>{
    const value = val.value.toLowerCase();

    const productArr = Products.filter(({title})=>{
        return title.toLowerCase().includes(value);
    });

    setProducts(productArr);
})


// btns filter
const companies = ["All",...new Set(Products.map((product)=>{
    return product.company;
}))]

const company = document.querySelector('.list');
const companyListHTML = companies.map((comp)=>{
    return `<li class="list-items" data-comp=${comp}>${comp}</li>`
}).join('');

company.innerHTML = companyListHTML;

company.addEventListener('click',function(e){
    if(e.target.classList.contains('list-items')){
        // console.log(e.target);
        val.value = '';
        const currTarget = e.target;

        if(currTarget.dataset.comp === "All"){
            return setProducts(Products);
        }

        const productArr = Products.filter(({company}) => {
            return company === currTarget.dataset.comp;
        });
        setProducts(productArr);
    }
})
