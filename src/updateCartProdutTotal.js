import { getcartProductLocalS } from "./getcardProduct";

export const updateCartProdutTotal = () => {
    let productSubTotal = document.querySelector(".productSubTotal");
    let productFinalTotal = document.querySelector(".productFinalTotal")

    let LocalCartProduct = getcartProductLocalS();
    let initialValue = 0;
    let totalProductPrice = LocalCartProduct.reduce((accum,cuProd) =>{
        let productPrice = parseInt(cuProd.price) || 0;
        return accum+productPrice;
    },
    initialValue);
    // console.log(totalProductPrice);
    productSubTotal.textContent = `₹${totalProductPrice}`;
    productFinalTotal.textContent = `₹${totalProductPrice+50}`
}