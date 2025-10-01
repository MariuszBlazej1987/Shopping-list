const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemClear = document.getElementById("clear");
const filter = document.querySelector(".filter");
const inputFilter = document.querySelector("#filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;



function displayItems(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item))
    checkUI();
}

function getItemsFromStorage(){
    let itemsFromStorage;
    if(localStorage.getItem("items") === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem("items"));
    }
    return itemsFromStorage;
}

function addItemToStorage(item){
    const itemsFromStorage = getItemsFromStorage();
    
    itemsFromStorage.push(item);

    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function createButton(classes){
    const button = document.createElement("button");
    button.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    return button;
}

function createIcon(classes){
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
} 

function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function onAddItemSubmit(e){
    e.preventDefault();
    const newItem = itemInput.value;
    if(newItem === ""){
        alert("Please add an item!");
        return;
    }

    if(isEditMode){
        const itemToEdit = itemList.querySelector(".edit-mode");
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove("edit-mode");
        itemToEdit.remove();
        isEditMode = false;
    }
    
    addItemToDOM(newItem);

    addItemToStorage(newItem);

    checkUI();

    itemInput.value = "";

    
}

function addItemToDOM(item){
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(item));

    const button = createButton("remove-item btn-link text-red");
    li.appendChild(button);

    itemList.appendChild(li);
}


function setItemToEdit(item){
    isEditMode = true;
    itemList.querySelectorAll("li").forEach((i) => i.classList.remove("edit-mode"));
    item.classList.add("edit-mode");
    formBtn.innerHTML = "<i class='fa-solid fa-pen'></i> Update Item";
    formBtn.style.backgroundColor = "#228B22";
    itemInput.value = item.textContent;
}

function onClickItem(e){
    if(e.target.parentElement.classList.contains("remove-item")){
        removeItem(e.target.parentElement.parentElement);
    }else{
        setItemToEdit(e.target);
    }
}


function removeItem(item){
    
    if(confirm("Are you Sure?")){

        item.remove();

        removeItemFromStorage(item.textContent);

        checkUI();
    }
}

function clearItems(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }

    localStorage.removeItem("items");

    checkUI();
}

function checkUI(){

    itemInput.value = "";

    const items = itemList.querySelectorAll("li");
    if(items.length === 0){
        itemClear.style.display = "none";
        filter.style.display = "none";
    }else{
        itemClear.style.display = "block";
        filter.style.display = "block";
    }

    formBtn.innerHTML = "<i class='fa-solid fa-plus'></i> Add Item";
    formBtn.style.backgroundColor = "#333"
    isEditMode == false;

}

function filterItems(e){
    const items = itemList.querySelectorAll("li");
    const text = e.target.value.toLowerCase();

    items. forEach(item => {
        const itemName  = item.firstChild.textContent.toLocaleLowerCase();
        if(itemName.includes(text)){
            item.style.display = "flex";
        }else{
            item.style.display = "none";
        }
    })
}



// Event Listeners
itemForm.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", onClickItem);
itemClear.addEventListener("click", clearItems);
inputFilter.addEventListener("input", filterItems)
document.addEventListener("DOMContentLoaded", displayItems);


checkUI();