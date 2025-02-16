import { getcartProductLocalS } from "./getcardProduct";
import { updateCartProdutTotal } from "./updateCartProdutTotal";

export const  incrementDecrement = (event,id ,stock,price) =>{

    const currentCardEelemet = document.querySelector(`#cards${id}`);
    const productQuantity = currentCardEelemet.querySelector(".productQuantity");
    const productPrice = currentCardEelemet.querySelector(".productPrice");

    
    let quantity = 1;
    let localStoragePrice = 0;

    let LocalCartProduct = getcartProductLocalS();
    let existingPro =  LocalCartProduct.find((cuProd) => cuProd.id === id);
    
    if(existingPro){
        quantity = existingPro.quantity;
        localStoragePrice = existingPro.price;

    }else{
        localStoragePrice = price;
        price = price;
    }

    // let qunatity = parseInt(productQuantity.getAttribute("data-quantity")) || 1;

    if(event.target.className === "cartIncrement"){
        if(quantity < stock){
            quantity += 1;
        }
        else if(quantity  ===  stock){
            quantity  = stock;
            localStoragePrice = price*stock;
        }
    }

    if(event.target.className === "cartDecrement"){
        if(quantity > 1){
            quantity -= 1;

        }
    }

    localStoragePrice = price * quantity;
    localStoragePrice = Number(localStoragePrice.toFixed(2))

    let updatedCard = {id, quantity, price:localStoragePrice}
    // ternery operator
    updatedCard = LocalCartProduct.map((cuProd)=>{
        return cuProd.id === id ? updatedCard :cuProd;
    })
    //console.log(updatedCard)

    localStorage.setItem("cartProductLS", JSON.stringify(updatedCard));

    productQuantity.innerText = quantity;
    productPrice.innerText = localStoragePrice;

    updateCartProdutTotal()
}