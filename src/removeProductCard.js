import { getcartProductLocalS } from "./getcardProduct";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

export const removeProductCard = (id) => {
    let cartProducts = getcartProductLocalS();
    cartProducts = cartProducts.filter((cuProd) => cuProd.id !== id);

    localStorage.setItem("cartProductLS",JSON.stringify(cartProducts))

    let removeDiv = document.getElementById(`cards${id}`);
    if (removeDiv){
        removeDiv.remove();
        showToast("delete",id);
    }
    

    updateCartValue(cartProducts);
}