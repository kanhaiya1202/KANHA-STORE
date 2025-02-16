import products from "../api/products.json"
import { fetchQuantityFromcartLS } from "./fetchQuantityFromcartLS";
import { getcartProductLocalS } from "./getcardProduct";
import { incrementDecrement } from "./incrementDecrement";
import { removeProductCard } from "./removeProductCard";
import { updateCartProdutTotal } from "./updateCartProdutTotal";

let cartProducts = getcartProductLocalS();

let filterProducts = products.filter((curElem) => {
    return cartProducts.some((cuProd) => 
        cuProd.id === curElem.id)

});

const cartElement = document.querySelector("#productCartContainerks");
const templateContainer = document.querySelector("#productCartTemplate");

const showCartProduct = () => {
    filterProducts.forEach((cuProd) =>{
        const{id,name,catagory,brand,price,stock,description,image} = cuProd;

        let productClone = document.importNode(templateContainer.content,true);

        const lSActualData = fetchQuantityFromcartLS(id,price);

        productClone.querySelector("#cardValue").setAttribute("id", `cards${id}`);
        productClone.querySelector(".category").textContent = catagory;
        productClone.querySelector(".productName").textContent = name;
        productClone.querySelector(".productImage").src = image;
        productClone.querySelector(".productImage").alt = name;
        productClone.querySelector(".productPrice").textContent = price;
        productClone.querySelector(".productQuantity").textContent = lSActualData.quantity;
        productClone.querySelector(".productPrice").textContent = lSActualData.price;
        
        productClone.querySelector(".stockElement").addEventListener("click",(event) =>{    
            incrementDecrement(event,id ,stock,price);
        });
       
        productClone.querySelector(".remove-to-cart-button").addEventListener("click",() => removeProductCard(id))  
 
        cartElement.append(productClone);
    })
}
showCartProduct();

updateCartProdutTotal()
