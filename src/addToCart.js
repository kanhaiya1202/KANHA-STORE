import { getcartProductLocalS } from "./getcardProduct";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

getcartProductLocalS();

export const addToCart = (event,id,stock) => {

    let arrLocalStorageProduct = getcartProductLocalS();
    const currentProEle = document.querySelector(`#card${id}`);

    let quantity = currentProEle.querySelector(".productQuantity").innerText;
    let price = currentProEle.querySelector(".productPrice").innerText;

    price = price.replace("₹" ,"");

    let existingPro = arrLocalStorageProduct.find(
        (curElem) => curElem.id === id);
    

    if(existingPro && quantity > 1){
        quantity = Number(existingPro.quantity) + Number(quantity);
        price = Number(price * quantity);

        
        let updatedCard = {id, quantity, price}
        // ternery operator
        updatedCard = arrLocalStorageProduct.map((curElem)=>{
            return curElem.id === id ? updatedCard :curElem;
             })


        // updatedCard = arrLocalStorageProduct.map((curElem) => {
        //     if(curElem.id === id){
        //         updatedCard;
        //     }else{
        //         curElem;
        //     }
        // })
        console.log(updatedCard)

        localStorage.setItem("cartProductLS", JSON.stringify(updatedCard));


    }
    
    if(existingPro){
       return false;
    }


    price = Number(price * quantity);
    quantity = Number(quantity);
    

    let updateCard = {id, quantity, price}
    arrLocalStorageProduct.push(updateCard);
    localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));

    updateCartValue(arrLocalStorageProduct);
    
    showToast("add",id);
};