export function showToast(operator,id)  {
    const toast = document.createElement("div");
    toast.classList .add("toast");

    if(operator === "add"){
        toast.textContent = `Product with ID ${id} has been add!`;
    }else{
        toast.textContent = `Product with ID ${id} has been delete!`;
    }

    document.body.appendChild(toast);

    setTimeout(() =>{
     toast.remove();
    },2000)
}