//* URL base
const baseUrl = "https://ecommercebackend.fundamentos-29.repl.co/";
//* boton del carrito de compras
//* Mostrar y ocultar
const cartToggle = document.querySelector('.cart__toggle');
const cartBlock = document.querySelector('.cart__block');
//* broshure de productos
const productsList = document.querySelector('#products-container');
//* carrito de comoras
const cart = document.querySelector('#car');
const cartList = document.querySelector('#cart__list');
//*vaciar el carrito
emptyCartButton = document.querySelector('#empty__cart')
// Array que resiva los elementos que deben ir en el carrito de compras
let cartProducts = [];

//* Logica para mostrar y ocultar
cartToggle.addEventListener('click',() =>{
    cartBlock.classList.toggle("nav__cart__visible")
})
eventListenerLoader() 
//*iteraciondel incio del codigo
function eventListenerLoader() {
     //*cuando se presiona el boton 'ADD TO CART' 
     productsList.addEventListener('click',addProduct) 
     //*cunado se presiona el boton 'Delete' 
     cart.addEventListener('click',deleteProduct) 
     //*cuando se presiona el boton epty cart
     emptyCartButton.addEventListener('click', emptyCart)
    } 
    function getProducts() {
    axios.get(baseUrl)
    .then(function(response){
        const products = response.data
        printProducts(products)
    })
    .catch(function(error){
        console.log(error)
    })
}
getProducts()
function printProducts(products){
    let html = '';
    for(let i = 0; i < products.length;i++){
        html += `
        <div class="product__container">
         <div class="product__container__img">
          <img  src="${products[i].image}" alt="image">
         </div>
         <div class="product__container__name">
          <p>${products[i].name}</p>
         </div>
         <div class="product__container__price">
          <p>$ ${products[i].price.toFixed(2)}</p>
         </div>
         <div class="product__container__button">
          <button class="cart__button add__to__cart" id="add__to__cart" data-id="${products[i].id}">Add to cart</button>
          <button class="product_details">View Details</button>
          </div>
        </div>
        `
    }
    productsList.innerHTML = html
}
//*Agregar productos al carrito
//*1. Capturar la informacion del producto al que se le de click.
function addProduct(event){
    if(event.target.classList.contains('add__to__cart')){
        //*contains valida si el elemento existe dentro de la clase
        const product = event.target.parentElement.parentElement
        //*parentElemt ayuda acceder al padre inmediatamente superior del elemnto.
        //*console.log(product)
        cartProductElements(product)
    }   
}
//*2. Transformar la informacion HTML a un array de objetos.
//*2.1. Debo validar si el elemento selecionado ya se encuentra dentro del carrito,
//* si existe, le debo smar una unidad para que no se repita.
function cartProductElements(product){
    const infoProduct = {
        id: product.querySelector('button').getAttribute('data-id'), 
        image: product.querySelector('img').src,
        name: product.querySelector('.product__container__name p').textContent,
        price: product.querySelector('.product__container__price p').textContent,
        //*textContent me permite pedir el texto qu econtiene un elemento
        quantity: 1
    }
    //*agregar un contador.
    //*si dentro de carProducts ya existe un ID igual al que tengo previamente
    //*alojado en infoproduct, entonces le sumo 1 a la cantidad.
    //* SOME valia si existe uno o algun elemento dentro del array que cumpla la condicion.
    if(cartProducts.some(product => product.id === infoProduct.id)){
        //*si el productoal darle click en infoproduct a existe en carproduct, entonces:
        const product = cartProducts.map(product => {
            //*al tener u producto que ya exxiste dentro cartproduct,entonce debo mapear
            //*y sumarle una unidad ala cantidad del elemento igual
            if(product.id === infoProduct.id){
                product.quantity++;
                return product;
            } else {
                return product;
            }
        })
        cartProducts = [...product]
    } else {
        cartProducts = [...cartProducts, infoProduct]
    }
    console.log(cartProducts)
    cartElementsHTML()
}
//*3. Debo imprimir, pintar, dibujar o mostrar en pantalla los productos dentro del carrito.
function cartElementsHTML() {
    cartList.innerHTML="";
    cartProducts.forEach(product => {
        const div = document.createElement("div");
        div.innerHTML = `
         <div class="cart__product">
          <div class="cart__product__image">
           <img src="${product.image}">
           </div>
          <div class="cart__product__description">
           <p>${product.name}</p>
           <p>Precio: ${product.price}</p>
           <p>Cantidad: ${product.quantity}</p>
          </div>
          <div class="cart__product__button">
           <button class="delete__product" data-id="${product.id}">
            Delete
           </button>
          </div> 
         </div>   
         <hr>
        `;
        //*appenchild permite inserta elementos al DOM, muy similar a innerHTML
        cartList.appendChild(div);
    })
}
//*Eliminar productos del carrito
function deleteProduct(event){
    if(event.target.classList.contains("delete__product")){
        const productId = event.target.getAttribute("data-id")
        cartProducts = cartProducts.filter(product => product.id !== productId)
        cartElementsHTML()
    }
}
//*Vaciar el carrito completo
function emptyCart() {
    cartProducts = [];
    cartElementsHTML();
}
