import { getcartProductLocalS } from "./getcardProduct";

export const fetchQuantityFromcartLS =(id,price)=> {
    let cartProducts = getcartProductLocalS();

    let existingProduct = cartProducts.find((cuProd) =>
    cuProd.id === id);
    let quantity = 1;
    if(existingProduct){
        quantity = existingProduct.quantity;
        price = existingProduct.price;;

    }
    return{quantity,price}
};
