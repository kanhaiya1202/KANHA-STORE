export const homeQuantityToggle = (event,id,stock) =>{
    const currentCardEelemet = document.querySelector(`#card${id}`);

    const productQuantity = currentCardEelemet.querySelector(".productQuantity");

    let qunatity = parseInt(productQuantity.getAttribute("data-quantity")) || 1;

    if(event.target.className === "cartIncreament"){
        if(qunatity < stock){
                qunatity += 1;
        }
        else if(qunatity ===  stock){
            qunatity = stock;
        }
    }

    if(event.target.className === "cartDecrement"){
        if(qunatity > 1){
            qunatity -= 1;

        }
    }

    productQuantity.innerText = qunatity; 
    productQuantity.setAttribute("data-quantity",qunatity.toString());
    return qunatity;

};